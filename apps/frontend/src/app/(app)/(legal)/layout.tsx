export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { legalCompany } from '@gitroom/frontend/components/legal/legal.constants';

export default async function LegalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-newBgColor flex flex-1 justify-center p-[12px] min-h-screen w-full text-newTextColor">
      <div className="w-full max-w-[860px] flex flex-col gap-[20px] py-[40px]">
        <a href={legalCompany.website} className="flex">
          <LogoTextComponent />
        </a>
        <div className="bg-newBgColorInner rounded-[12px] p-[24px] md:p-[40px]">
          {children}
        </div>
      </div>
    </div>
  );
}
