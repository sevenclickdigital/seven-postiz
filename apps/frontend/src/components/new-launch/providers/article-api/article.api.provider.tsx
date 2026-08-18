'use client';

import { FC } from 'react';
import {
  PostComment,
  withProvider,
} from '@gitroom/frontend/components/new-launch/providers/high.order.provider';
import { Input } from '@gitroom/react/form/input';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';
import { ArticleApiAuthor } from '@gitroom/frontend/components/new-launch/providers/article-api/article.api.author';
import { ArticleApiCategories } from '@gitroom/frontend/components/new-launch/providers/article-api/article.api.categories';
import { MediaComponent } from '@gitroom/frontend/components/media/media.component';
import { ArticleApiDto } from '@gitroom/nestjs-libraries/dtos/posts/providers-settings/article.api.dto';

const ArticleApiSettings: FC = () => {
  const form = useSettings();
  return (
    <>
      <Input label="Title" {...form.register('title')} />
      <ArticleApiAuthor {...form.register('author')} />
      <ArticleApiCategories {...form.register('categories')} />
      {/* Free text: the accepted values depend entirely on the target API. */}
      <Input label="Status" {...form.register('status')} />
      <MediaComponent
        label="Cover picture"
        description="Add a cover picture"
        {...form.register('main_image')}
      />
    </>
  );
};
export default withProvider({
  postComment: PostComment.COMMENT,
  minimumCharacters: [],
  SettingsComponent: ArticleApiSettings,
  CustomPreviewComponent: undefined,
  dto: ArticleApiDto,
  maximumCharacters: 100000,
});
