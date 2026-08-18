import {
  AuthTokenDetails,
  PostDetails,
  PostResponse,
  SocialProvider,
} from '@gitroom/nestjs-libraries/integrations/social/social.integrations.interface';
import {
  BadBody,
  SocialAbstract,
} from '@gitroom/nestjs-libraries/integrations/social.abstract';
import dayjs from 'dayjs';
import { Integration } from '@prisma/client';
import { makeId } from '@gitroom/nestjs-libraries/services/make.is';
import { ArticleApiDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/article.api.dto';
import { Tool } from '@gitroom/nestjs-libraries/integrations/tool.decorator';
import { getSsrfSafeDispatcher } from '@gitroom/nestjs-libraries/dtos/webhooks/ssrf.safe.dispatcher';
import { isSafePublicHttpsUrl } from '@gitroom/nestjs-libraries/dtos/webhooks/webhook.url.validator';

// Everything the user fills in the "Add Channel" form. It is stored as the
// channel's access token (base64 JSON), the same way WordPress / ListMonk keep
// their instance credentials.
type ArticleApiSettings = {
  name: string;
  postUrl: string;
  apiKey: string;
  authorsUrl?: string;
  categoriesUrl?: string;
  fieldTitle?: string;
  fieldContent?: string;
  fieldAuthor?: string;
  fieldCategories?: string;
  fieldCoverImage?: string;
  fieldStatus?: string;
  fieldPublishedAt?: string;
};

// Any public https URL, or empty for the optional fields.
const URL_VALIDATION = `/^https:\\/\\/(?:www\\.)?[\\w\\-]+(\\.[\\w\\-]+)+([\\/?#][^\\s]*)?$/`;
const OPTIONAL_URL_VALIDATION = `/^$|^https:\\/\\/(?:www\\.)?[\\w\\-]+(\\.[\\w\\-]+)+([\\/?#][^\\s]*)?$/`;
// A payload key, optionally dotted for nested bodies (data.attributes.title).
const FIELD_NAME_VALIDATION = `/^$|^[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*$/`;
const FIELD_HINT =
  'The exact field name your API expects. Supports dots for nested payloads (data.attributes.title). Leave empty to not send this field.';

export class ArticleApiProvider
  extends SocialAbstract
  implements SocialProvider
{
  identifier = 'article-api';
  name = 'Article API';
  isBetweenSteps = false;
  editor = 'html' as const;
  scopes = [] as string[];
  override maxConcurrentJob = 5;
  dto = ArticleApiDto;
  maxLength() {
    return 100000;
  }

  async generateAuthUrl() {
    const state = makeId(6);
    return {
      url: state,
      codeVerifier: makeId(10),
      state,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthTokenDetails> {
    return {
      refreshToken: '',
      expiresIn: 0,
      accessToken: '',
      id: '',
      name: '',
      picture: '',
      username: '',
    };
  }

  async customFields() {
    return [
      {
        key: 'name',
        label: 'Channel name',
        validation: `/.+/`,
        type: 'text' as const,
        hint: 'How this channel is displayed inside Social Post.',
      },
      {
        key: 'postUrl',
        label: 'Create post URL',
        validation: URL_VALIDATION,
        type: 'text' as const,
        hint: 'The endpoint that receives the article, called with POST.',
      },
      {
        key: 'apiKey',
        label: 'API Key',
        validation: `/.+/`,
        type: 'password' as const,
        hint: 'Sent on every request as "Authorization: Bearer <key>".',
      },
      {
        key: 'authorsUrl',
        label: 'Authors list URL',
        validation: OPTIONAL_URL_VALIDATION,
        type: 'text' as const,
        optional: true,
        hint: 'Optional. Must answer a GET with [{ "id": "...", "name": "..." }]. Leave empty to hide the author field.',
      },
      {
        key: 'categoriesUrl',
        label: 'Categories list URL',
        validation: OPTIONAL_URL_VALIDATION,
        type: 'text' as const,
        optional: true,
        hint: 'Optional. Must answer a GET with [{ "id": "...", "name": "..." }]. Leave empty to hide the categories field.',
      },
      {
        key: 'fieldTitle',
        label: 'Payload field: Title',
        defaultValue: 'title',
        validation: FIELD_NAME_VALIDATION,
        type: 'text' as const,
        optional: true,
        hint: FIELD_HINT,
      },
      {
        key: 'fieldContent',
        label: 'Payload field: Content',
        defaultValue: 'content',
        validation: FIELD_NAME_VALIDATION,
        type: 'text' as const,
        optional: true,
        hint: FIELD_HINT,
      },
      {
        key: 'fieldAuthor',
        label: 'Payload field: Author',
        defaultValue: 'author',
        validation: FIELD_NAME_VALIDATION,
        type: 'text' as const,
        optional: true,
        hint: FIELD_HINT,
      },
      {
        key: 'fieldCategories',
        label: 'Payload field: Categories',
        defaultValue: 'categories',
        validation: FIELD_NAME_VALIDATION,
        type: 'text' as const,
        optional: true,
        hint: FIELD_HINT,
      },
      {
        key: 'fieldCoverImage',
        label: 'Payload field: Cover image',
        defaultValue: 'coverImage',
        validation: FIELD_NAME_VALIDATION,
        type: 'text' as const,
        optional: true,
        hint: FIELD_HINT,
      },
      {
        key: 'fieldStatus',
        label: 'Payload field: Status',
        defaultValue: 'status',
        validation: FIELD_NAME_VALIDATION,
        type: 'text' as const,
        optional: true,
        hint: FIELD_HINT,
      },
      {
        key: 'fieldPublishedAt',
        label: 'Payload field: Published at',
        defaultValue: 'publishedAt',
        validation: FIELD_NAME_VALIDATION,
        type: 'text' as const,
        optional: true,
        hint: FIELD_HINT,
      },
    ];
  }

  async authenticate(params: {
    code: string;
    codeVerifier: string;
    refresh?: string;
  }) {
    const body = this.decode(params.code);

    const postUrl = body.postUrl?.trim().replace(/\/+$/, '') || '';
    const listUrl = (body.authorsUrl || body.categoriesUrl || '').trim();

    if (!(await isSafePublicHttpsUrl(postUrl))) {
      return 'The Create post URL must be a public HTTPS address.';
    }

    if (listUrl && !(await isSafePublicHttpsUrl(listUrl))) {
      return 'The Authors / Categories URLs must be public HTTPS addresses.';
    }

    // Only a list URL can be probed without creating a post, so the API key is
    // verified against it when available. Without one there is nothing safe to
    // call, and the first scheduled post is what surfaces a wrong key.
    if (listUrl) {
      let response: Response;
      try {
        response = await fetch(listUrl, {
          headers: {
            Authorization: `Bearer ${body.apiKey}`,
            Accept: 'application/json',
          },
          // @ts-ignore - undici-only option; blocks SSRF to internal IPs
          dispatcher: getSsrfSafeDispatcher(),
        });
      } catch (err) {
        console.log(err);
        return 'Could not reach your API. Check the URLs and that they are publicly accessible.';
      }

      if (response.status === 401 || response.status === 403) {
        return 'Your API rejected the API Key.';
      }

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        console.log(
          `Article API auth failed for ${listUrl} (HTTP ${response.status})`,
          errorBody.slice(0, 500)
        );
        return `Your API returned an unexpected error (HTTP ${response.status}).`;
      }
    }

    return {
      refreshToken: '',
      expiresIn: dayjs().add(100, 'years').unix() - dayjs().unix(),
      accessToken: params.code,
      id: Buffer.from(postUrl).toString('base64'),
      name: body.name,
      picture: '',
      username: body.name,
    };
  }

  private decode(token: string): ArticleApiSettings {
    return JSON.parse(Buffer.from(token, 'base64').toString());
  }

  // Custom provider functions are invoked from the backend HTTP endpoint
  // (`/integrations/function`) - which is NOT a Temporal activity - so they must
  // use a plain `fetch` (with the SSRF guard) rather than `this.fetch`, which
  // calls `Context.current()` and throws outside an activity. This mirrors how
  // `authenticate` issues its request.
  private async list(token: string, key: 'authorsUrl' | 'categoriesUrl') {
    const body = this.decode(token);
    const url = body[key]?.trim();

    if (!url) {
      return [];
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${body.apiKey}`,
        Accept: 'application/json',
      },
      // @ts-ignore - undici-only option; blocks SSRF to internal IPs
      dispatcher: getSsrfSafeDispatcher(),
    });

    const list = await response.json();

    return (Array.isArray(list) ? list : []).map((item: any) => ({
      id: String(item.id),
      name: String(item.name),
    }));
  }

  @Tool({
    description: 'Get list of authors',
    dataSchema: [],
  })
  async authorsList(token: string) {
    return this.list(token, 'authorsUrl');
  }

  @Tool({
    description: 'Get list of categories',
    dataSchema: [],
  })
  async categoriesList(token: string) {
    return this.list(token, 'categoriesUrl');
  }

  // Writes `value` under a (possibly dotted) key, so a mapping of
  // `data.attributes.title` produces `{ data: { attributes: { title } } }`.
  // The path comes from user input, so the prototype-chain keys are refused -
  // otherwise `__proto__.x` would pollute every object in the process.
  private setByPath(target: any, path: string, value: any) {
    const keys = path.split('.');

    if (
      keys.some((key) =>
        ['__proto__', 'constructor', 'prototype'].includes(key)
      )
    ) {
      return;
    }

    const last = keys.pop()!;

    const parent = keys.reduce((current, key) => {
      if (typeof current[key] !== 'object' || current[key] === null) {
        current[key] = {};
      }
      return current[key];
    }, target);

    parent[last] = value;
  }

  async post(
    id: string,
    accessToken: string,
    postDetails: PostDetails<ArticleApiDto>[],
    integration: Integration
  ): Promise<PostResponse[]> {
    const body = this.decode(accessToken);
    const settings = postDetails?.[0]?.settings;

    // The user maps every canonical value to the field name their API expects.
    // An empty mapping (or a missing value) drops the field from the payload.
    const payload = [
      { field: body.fieldTitle, value: settings?.title },
      { field: body.fieldContent, value: postDetails?.[0]?.message },
      { field: body.fieldAuthor, value: settings?.author },
      {
        field: body.fieldCategories,
        value: settings?.categories?.length ? settings.categories : undefined,
      },
      { field: body.fieldCoverImage, value: settings?.main_image?.path },
      { field: body.fieldStatus, value: settings?.status },
      { field: body.fieldPublishedAt, value: dayjs().toISOString() },
    ].reduce((all, { field, value }) => {
      if (!field?.trim() || value === undefined || value === '') {
        return all;
      }

      this.setByPath(all, field.trim(), value);
      return all;
    }, {} as any);

    const requestBody = JSON.stringify(payload);

    // `this.fetch` only treats 200 / 201 as success, which is too strict for a
    // user-supplied API - 202 (queued) and 204 (no content) are just as common.
    // The status is branched on here instead, keeping the SSRF guard.
    const response = await fetch(body.postUrl.trim(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${body.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: requestBody,
      // @ts-ignore - undici-only option; blocks SSRF to internal IPs
      dispatcher: getSsrfSafeDispatcher(),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');

      // Rate limiting and server errors are transient - throw a plain error so
      // the workflow retries the activity instead of failing the post.
      if (
        response.status === 408 ||
        response.status === 429 ||
        response.status >= 500
      ) {
        throw new Error(
          `Article API responded with HTTP ${response.status}: ${errorBody.slice(
            0,
            500
          )}`
        );
      }

      throw new BadBody(
        this.identifier,
        errorBody || '{}',
        requestBody,
        response.status === 401 || response.status === 403
          ? 'Your API rejected the request. Check the API Key of this channel.'
          : `Your API rejected the article (HTTP ${response.status}). Check the payload field mapping of this channel.`
      );
    }

    // 204 and non-JSON answers are valid - there is just nothing to read back.
    const submit = await response.json().catch(() => ({} as any));

    // The response shape is as free as the request one, so the common id / url
    // keys are probed and anything unknown just leaves the field empty.
    return [
      {
        id: postDetails?.[0].id,
        status: 'completed',
        postId: String(submit?.id ?? submit?._id ?? submit?.postId ?? ''),
        releaseURL: String(
          submit?.url ?? submit?.link ?? submit?.permalink ?? ''
        ),
      },
    ];
  }
}
