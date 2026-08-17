import { FC, ReactNode } from 'react';
import {
  legalCompany,
  legalRoutes,
} from '@gitroom/frontend/components/legal/legal.constants';

export const LegalSection: FC<{ title: string; children: ReactNode }> = (
  props
) => {
  const { title, children } = props;

  return (
    <section className="flex flex-col gap-[12px]">
      <h2 className="text-[20px] font-[600] text-newTextColor">{title}</h2>
      <div className="flex flex-col gap-[12px] text-[15px] leading-[24px] text-newTableText">
        {children}
      </div>
    </section>
  );
};

export const LegalList: FC<{ items: ReactNode[] }> = (props) => {
  const { items } = props;

  return (
    <ul className="flex flex-col gap-[8px] ps-[20px] list-disc">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export const LegalPage: FC<{
  title: string;
  intro: ReactNode;
  children: ReactNode;
}> = (props) => {
  const { title, intro, children } = props;

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px] pb-[24px] border-b border-newBorder">
        <h1 className="text-[28px] font-[600] text-newTextColor">{title}</h1>
        <div className="text-[14px] text-newTableText">
          Última atualização: {legalCompany.lastUpdate}
        </div>
        <div className="text-[15px] leading-[24px] text-newTableText">
          {intro}
        </div>
      </div>

      {children}

      <div className="flex flex-col gap-[8px] pt-[24px] border-t border-newBorder text-[14px] text-newTableText">
        <div>
          {legalCompany.legalName} — CNPJ {legalCompany.document}
        </div>
        <div>
          {legalCompany.address}
          <br />
          {legalCompany.addressComplement}
        </div>
        <div>
          E-mail:{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href={`mailto:${legalCompany.email}`}
          >
            {legalCompany.email}
          </a>
        </div>
        <div>
          WhatsApp e telefone:{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href={`tel:${legalCompany.phoneLink}`}
          >
            {legalCompany.phone}
          </a>
        </div>
        <div>{legalCompany.businessHours}</div>
        <div className="flex flex-wrap gap-[12px] pt-[8px]">
          {legalRoutes.map((route) => (
            <a
              key={route.path}
              className="hover:text-newTextColor"
              href={route.path}
            >
              {route.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
