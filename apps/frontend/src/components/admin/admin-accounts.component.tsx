'use client';

import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useUser } from '@gitroom/frontend/components/layout/user.context';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { Button } from '@gitroom/react/form/button';
import { LoadingComponent } from '@gitroom/frontend/components/layout/loading';

interface AccountOrganization {
  id: string;
  role: string;
  disabled: boolean;
  organization: {
    id: string;
    name: string;
    subscription: {
      subscriptionTier: string;
      isLifetime: boolean;
    } | null;
  };
}

interface AccountRow {
  id: string;
  name: string | null;
  lastName: string | null;
  email: string;
  providerName: string;
  isSuperAdmin: boolean;
  activated: boolean;
  createdAt: string;
  lastOnline: string;
  organizations: AccountOrganization[];
}

interface AccountsResponse {
  items: AccountRow[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

const useAccountsList = (params: {
  page: number;
  limit: number;
  search: string;
}) => {
  const fetch = useFetch();
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
    ...(params.search ? { search: params.search } : {}),
  });
  const key = `/admin/accounts?${query.toString()}`;
  return useSWR<AccountsResponse>(key, async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to load accounts');
    }
    return res.json();
  });
};

const GRID = 'grid grid-cols-[1fr_120px_160px_1fr] gap-[12px]';

export const AdminAccountsComponent: FC = () => {
  const user = useUser();
  const fetch = useFetch();
  const t = useT();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading, error } = useAccountsList({ page, limit, search });

  const onApplySearch = useCallback(() => {
    setPage(0);
    setSearch(searchInput.trim());
  }, [searchInput]);

  const onClear = useCallback(() => {
    setPage(0);
    setSearch('');
    setSearchInput('');
  }, []);

  const impersonate = useCallback(
    (userOrganizationId: string) => async () => {
      await fetch('/user/impersonate', {
        method: 'POST',
        body: JSON.stringify({ id: userOrganizationId }),
      });
      window.location.reload();
    },
    []
  );

  if (!user?.isSuperAdmin) {
    return (
      <div className="text-textColor p-[20px]">
        {t('no_access_to_page', 'You do not have access to this page.')}
      </div>
    );
  }

  const totalPages = data ? Math.max(1, Math.ceil(data.total / limit)) : 1;

  return (
    <div className="flex flex-col gap-[16px] text-textColor">
      <div className="flex items-center justify-between">
        <div className="text-[20px] font-[600]">
          {t('admin_accounts', 'Accounts')}
        </div>
        <div className="text-[13px] opacity-70">
          {data ? `${data.total} ${t('admin_total', 'total')}` : ''}
        </div>
      </div>

      <div className="flex flex-wrap gap-[12px] items-end bg-newBgColorInner border border-newTableBorder rounded-[8px] p-[12px]">
        <div className="flex flex-col gap-[6px]">
          <div className="text-[12px] opacity-70">
            {t('admin_accounts_search', 'Name, email or id contains')}
          </div>
          <div className="flex gap-[8px]">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onApplySearch();
              }}
              placeholder="user@example.com"
              className="bg-newBgColorInner h-[38px] border border-newTableBorder rounded-[8px] px-[10px] text-[14px] text-textColor min-w-[240px]"
            />
            <Button onClick={onApplySearch}>{t('apply', 'Apply')}</Button>
          </div>
        </div>

        <div className="flex flex-col gap-[6px]">
          <div className="text-[12px] opacity-70">
            {t('admin_per_page', 'Per page')}
          </div>
          <select
            value={limit}
            onChange={(e) => {
              setPage(0);
              setLimit(parseInt(e.target.value, 10));
            }}
            className="bg-newBgColorInner h-[38px] border border-newTableBorder rounded-[8px] px-[10px] text-[14px] text-textColor"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <Button secondary onClick={onClear}>
          {t('admin_clear_filters', 'Clear filters')}
        </Button>
      </div>

      {isLoading ? (
        <LoadingComponent />
      ) : error ? (
        <div className="text-red-400">
          {t('admin_accounts_load_failed', 'Failed to load accounts.')}
        </div>
      ) : !data || data.items.length === 0 ? (
        <div className="opacity-70">
          {t('admin_accounts_empty', 'No accounts found.')}
        </div>
      ) : (
        <div className="border border-newTableBorder rounded-[8px] overflow-hidden">
          <div
            className={`${GRID} px-[12px] py-[10px] bg-newBgColorInner text-[12px] uppercase opacity-70 border-b border-newTableBorder`}
          >
            <div>{t('admin_accounts_user', 'User')}</div>
            <div>{t('admin_accounts_provider', 'Provider')}</div>
            <div>{t('admin_accounts_dates', 'Created / Last online')}</div>
            <div>{t('admin_accounts_organizations', 'Organizations')}</div>
          </div>
          {data.items.map((row) => (
            <div
              key={row.id}
              className={`${GRID} px-[12px] py-[10px] text-[13px] border-b border-newTableBorder last:border-b-0 items-start`}
            >
              <div className="break-all">
                <div className="flex items-center gap-[6px] flex-wrap">
                  <span>{row.email}</span>
                  {row.isSuperAdmin && (
                    <span className="text-[11px] px-[6px] rounded-[4px] bg-forth text-white">
                      {t('admin_accounts_superadmin', 'Superadmin')}
                    </span>
                  )}
                  {!row.activated && (
                    <span className="text-[11px] px-[6px] rounded-[4px] bg-red-700 text-white">
                      {t('admin_accounts_not_activated', 'Not activated')}
                    </span>
                  )}
                </div>
                <div className="opacity-60 text-[12px]">
                  {[row.name, row.lastName].filter(Boolean).join(' ') || '—'}
                </div>
                <div className="opacity-60 text-[12px]">{row.id}</div>
              </div>
              <div className="opacity-90">{row.providerName}</div>
              <div className="opacity-90">
                <div>{new Date(row.createdAt).toLocaleString()}</div>
                <div className="opacity-60 text-[12px]">
                  {new Date(row.lastOnline).toLocaleString()}
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                {row.organizations.length === 0 ? (
                  <div className="opacity-60">—</div>
                ) : (
                  row.organizations.map((org) => (
                    <div
                      key={org.id}
                      className="flex items-center justify-between gap-[8px]"
                    >
                      <div className="break-all">
                        <div>{org.organization.name}</div>
                        <div className="opacity-60 text-[12px]">
                          {org.role} /{' '}
                          {org.organization.subscription?.subscriptionTier ||
                            'FREE'}
                          {org.organization.subscription?.isLifetime &&
                            ` / ${t('admin_accounts_lifetime', 'Lifetime')}`}
                          {org.disabled &&
                            ` / ${t('admin_accounts_disabled', 'Disabled')}`}
                        </div>
                      </div>
                      <Button
                        secondary
                        className="!h-[28px] !px-[10px] text-[12px] whitespace-nowrap"
                        onClick={impersonate(org.id)}
                      >
                        {t('impersonate', 'Impersonate')}
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-[13px] opacity-70">
          {t('admin_page', 'Page')} {page + 1} {t('admin_of', 'of')}{' '}
          {totalPages}
        </div>
        <div className="flex gap-[8px]">
          <Button
            secondary
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            {t('previous', 'Previous')}
          </Button>
          <Button
            disabled={!data?.hasMore}
            onClick={() => setPage((p) => p + 1)}
          >
            {t('next', 'Next')}
          </Button>
        </div>
      </div>
    </div>
  );
};
