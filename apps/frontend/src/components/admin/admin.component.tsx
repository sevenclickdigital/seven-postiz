'use client';

import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useUser } from '@gitroom/frontend/components/layout/user.context';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import {
  AddAnnouncement,
  ImpersonatePanel,
  ImportDebugPost,
} from '@gitroom/frontend/components/layout/impersonate';
import { AdminAccountsComponent } from '@gitroom/frontend/components/admin/admin-accounts.component';
import { AdminErrorsComponent } from '@gitroom/frontend/components/admin/admin-errors.component';
import { AdminStatsComponent } from '@gitroom/frontend/components/admin/admin-stats.component';

const AdminTools = () => {
  const t = useT();
  return (
    <div className="flex flex-col gap-[12px]">
      <ImpersonatePanel />
      <div className="bg-newBgColorInner border border-newTableBorder rounded-[8px] p-[12px] flex flex-col gap-[12px]">
        <div className="text-[16px] font-[600]">
          {t('admin_debug_tools', 'Debug tools')}
        </div>
        <div className="flex items-center gap-[10px] flex-wrap">
          <ImportDebugPost />
          <AddAnnouncement />
        </div>
      </div>
    </div>
  );
};

export const AdminComponent = () => {
  const user = useUser();
  const t = useT();
  const [tab, setTab] = useState('tools');

  const list = useMemo(
    () => [
      { tab: 'tools', label: t('admin_tools', 'Tools') },
      { tab: 'accounts', label: t('admin_accounts', 'Accounts') },
      { tab: 'errors', label: t('admin_errors', 'Errors') },
      { tab: 'stats', label: t('admin_stats', 'Stats') },
    ],
    [t]
  );

  if (!user?.isSuperAdmin) {
    return (
      <div className="text-textColor">
        {t('no_access_to_page', 'You do not have access to this page.')}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <h3 className="text-[20px]">{t('administration', 'Administration')}</h3>
      <div className="flex gap-[8px] flex-wrap">
        {list.map(({ tab: tabKey, label }) => (
          <div
            key={tabKey}
            onClick={() => setTab(tabKey)}
            className={clsx(
              'cursor-pointer px-[16px] h-[36px] flex items-center rounded-[8px] border border-newTableBorder hover:bg-boxHover',
              tabKey === tab && 'bg-boxHover'
            )}
          >
            {label}
          </div>
        ))}
      </div>

      {tab === 'tools' && <AdminTools />}
      {tab === 'accounts' && <AdminAccountsComponent />}
      {tab === 'errors' && <AdminErrorsComponent />}
      {tab === 'stats' && <AdminStatsComponent />}
    </div>
  );
};
