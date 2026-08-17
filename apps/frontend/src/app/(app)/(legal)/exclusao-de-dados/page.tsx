export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import {
  LegalList,
  LegalPage,
  LegalSection,
} from '@gitroom/frontend/components/legal/legal.page.component';
import { legalCompany } from '@gitroom/frontend/components/legal/legal.constants';

export const metadata: Metadata = {
  title: `Exclusão de dados do usuário | ${legalCompany.brand}`,
  description:
    'Como solicitar a exclusão dos seus dados e a desconexão das contas sociais no Social Post.',
};

export default async function DataDeletionPage() {
  return (
    <LegalPage
      title="Exclusão de dados do usuário"
      intro={
        <>
          Esta página explica como excluir os dados tratados pelo{' '}
          {legalCompany.brand}, marca do grupo {legalCompany.group} (CNPJ{' '}
          {legalCompany.document}), incluindo as informações obtidas das contas
          de redes sociais que você conectou à Plataforma.
        </>
      }
    >
      <LegalSection title="1. Excluir um canal conectado">
        <p>
          Para remover os dados de uma rede social específica sem encerrar a
          conta:
        </p>
        <LegalList
          items={[
            <>
              Acesse {legalCompany.website} e faça login na sua conta.
            </>,
            'Na tela de canais, clique no menu do canal desejado e escolha "Desconectar" ou "Excluir".',
            'Confirme a operação.',
          ]}
        />
        <p>
          Ao desconectar, apagamos imediatamente os tokens de acesso, o perfil
          público, as métricas e o histórico de publicações associados àquele
          canal.
        </p>
      </LegalSection>

      <LegalSection title="2. Excluir a conta e todos os dados">
        <p>
          Para eliminar integralmente sua conta e todos os dados associados,
          envie um e-mail para {legalCompany.email} com o assunto{' '}
          <strong>&quot;Exclusão de dados&quot;</strong>, a partir do endereço
          de e-mail cadastrado na Plataforma, informando:
        </p>
        <LegalList
          items={[
            'Nome completo ou razão social;',
            'E-mail utilizado no cadastro;',
            'Quais dados deseja excluir (conta inteira ou canais específicos).',
          ]}
        />
        <p>
          Também é possível abrir a solicitação pelo WhatsApp{' '}
          {legalCompany.phone}. {legalCompany.businessHours}
        </p>
        <p>
          Confirmamos o recebimento em até 5 dias úteis e concluímos a exclusão
          em até 30 dias, enviando uma confirmação por e-mail.
        </p>
      </LegalSection>

      <LegalSection title="3. Revogar o acesso pela própria rede social">
        <p>
          Você também pode remover a autorização diretamente na plataforma de
          origem. Isso interrompe o acesso da nossa aplicação aos seus dados
          imediatamente:
        </p>
        <LegalList
          items={[
            <>
              <strong>Facebook / Instagram / Threads:</strong>{' '}
              <a
                className="text-newTableTextFocused hover:underline"
                href="https://www.facebook.com/settings?tab=applications"
                target="_blank"
                rel="noreferrer"
              >
                Configurações → Aplicativos e sites
              </a>{' '}
              → localize &quot;Social Post&quot; → Remover.
            </>,
            <>
              <strong>Google / YouTube:</strong>{' '}
              <a
                className="text-newTableTextFocused hover:underline"
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noreferrer"
              >
                Conta Google → Apps de terceiros com acesso à conta
              </a>{' '}
              → localize &quot;Social Post&quot; → Remover acesso.
            </>,
            <>
              <strong>LinkedIn, TikTok, X e demais canais:</strong> acesse as
              configurações de aplicativos autorizados da respectiva plataforma
              e revogue a permissão.
            </>,
          ]}
        />
        <p>
          Após a revogação, recomendamos também desconectar o canal na
          Plataforma para que os registros locais sejam apagados.
        </p>
      </LegalSection>

      <LegalSection title="4. O que é excluído">
        <LegalList
          items={[
            'Tokens de acesso e credenciais de todas as integrações;',
            'Dados de perfil das contas conectadas;',
            'Conteúdos, rascunhos, agendamentos e mídias enviadas;',
            'Métricas e relatórios armazenados;',
            'Dados de cadastro e preferências da conta.',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. O que pode ser retido">
        <p>
          Podemos preservar, pelo prazo legal, registros de acesso exigidos pelo
          Marco Civil da Internet (Lei nº 12.965/2014), documentos fiscais
          relativos a pagamentos e informações necessárias para o exercício de
          direitos em processo judicial ou administrativo. Esses registros ficam
          restritos e não são utilizados para nenhuma outra finalidade.
        </p>
        <p>
          Publicações já enviadas às redes sociais permanecem sob controle da
          respectiva plataforma e devem ser removidas diretamente nela.
        </p>
      </LegalSection>

      <LegalSection title="6. Contato">
        <p>
          Dúvidas sobre exclusão de dados ou sobre o exercício dos seus direitos
          como titular podem ser enviadas para{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href={`mailto:${legalCompany.email}`}
          >
            {legalCompany.email}
          </a>{' '}
          ou pelo WhatsApp/telefone{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href={`tel:${legalCompany.phoneLink}`}
          >
            {legalCompany.phone}
          </a>
          . {legalCompany.businessHours} Consulte também a{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href="/privacidade"
          >
            Política de Privacidade
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
