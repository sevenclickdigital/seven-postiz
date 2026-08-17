export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import {
  LegalList,
  LegalPage,
  LegalSection,
} from '@gitroom/frontend/components/legal/legal.page.component';
import { legalCompany } from '@gitroom/frontend/components/legal/legal.constants';

export const metadata: Metadata = {
  title: `Política de Privacidade | ${legalCompany.brand}`,
  description:
    'Como o Social Post coleta, utiliza, armazena e protege os dados dos seus usuários.',
};

export default async function PrivacyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      intro={
        <>
          Esta Política de Privacidade descreve como o {legalCompany.brand},
          marca do grupo {legalCompany.group} (CNPJ {legalCompany.document}),
          coleta, utiliza, compartilha e protege as informações dos usuários da
          plataforma disponível em {legalCompany.website} (a
          &quot;Plataforma&quot;). Ao criar uma conta ou conectar um perfil de
          rede social, você concorda com as práticas descritas aqui.
        </>
      }
    >
      <LegalSection title="1. Quem é o controlador dos dados">
        <p>
          O controlador dos dados pessoais tratados na Plataforma é o{' '}
          {legalCompany.legalName}, inscrito no CNPJ sob o nº{' '}
          {legalCompany.document}, com endereço na {legalCompany.address},{' '}
          {legalCompany.addressComplement}.
        </p>
        <p>
          Para qualquer assunto relacionado à privacidade, incluindo o exercício
          dos seus direitos como titular, entre em contato pelo e-mail{' '}
          {legalCompany.email} ou pelo WhatsApp/telefone {legalCompany.phone}.{' '}
          {legalCompany.businessHours}
        </p>
      </LegalSection>

      <LegalSection title="2. Dados que coletamos">
        <p>
          Coletamos apenas os dados necessários para operar a Plataforma:
        </p>
        <LegalList
          items={[
            <>
              <strong>Dados de cadastro:</strong> nome, endereço de e-mail,
              senha (armazenada de forma criptografada), empresa e preferências
              de idioma e fuso horário.
            </>,
            <>
              <strong>Dados das contas sociais conectadas:</strong> identificador
              público, nome de exibição, foto de perfil, páginas, canais e
              tokens de acesso fornecidos pelas plataformas (Meta/Facebook,
              Instagram, Threads, Google/YouTube, LinkedIn, TikTok, X, entre
              outras) quando você autoriza a conexão.
            </>,
            <>
              <strong>Conteúdo que você cria:</strong> textos, imagens, vídeos,
              agendamentos, comentários e demais materiais enviados por você
              para publicação.
            </>,
            <>
              <strong>Métricas e analytics:</strong> dados de desempenho das
              publicações (alcance, impressões, curtidas, comentários,
              visualizações) obtidos das APIs oficiais das redes sociais.
            </>,
            <>
              <strong>Dados técnicos:</strong> endereço IP, tipo de navegador,
              sistema operacional, registros de acesso e logs de erro, usados
              para segurança e diagnóstico.
            </>,
            <>
              <strong>Dados de pagamento:</strong> quando aplicável, processados
              diretamente por operadores de pagamento; não armazenamos números
              completos de cartão.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Como usamos os dados">
        <LegalList
          items={[
            'Autenticar você e manter sua conta segura.',
            'Publicar e agendar conteúdo nas contas sociais que você conectou, por sua ordem expressa.',
            'Exibir métricas e relatórios de desempenho das suas publicações.',
            'Prestar suporte técnico e responder às suas solicitações.',
            'Enviar comunicações operacionais sobre a sua conta, o serviço ou alterações nestes documentos.',
            'Prevenir fraudes, abusos e violações dos termos de uso.',
            'Cumprir obrigações legais e regulatórias.',
          ]}
        />
        <p>
          Não vendemos, alugamos nem comercializamos dados pessoais. Não
          utilizamos dados obtidos das APIs das plataformas sociais para
          publicidade direcionada, nem para treinar modelos de inteligência
          artificial de uso geral.
        </p>
      </LegalSection>

      <LegalSection title="4. Bases legais (LGPD)">
        <p>
          O tratamento dos dados ocorre com fundamento na Lei nº 13.709/2018
          (LGPD), especialmente: execução de contrato (art. 7º, V), cumprimento
          de obrigação legal (art. 7º, II), consentimento do titular (art. 7º,
          I) — em especial para a conexão de contas sociais — e legítimo
          interesse (art. 7º, IX) para segurança e melhoria do serviço.
        </p>
      </LegalSection>

      <LegalSection title="5. Uso de dados das plataformas conectadas">
        <p>
          Ao conectar uma conta, você concede à Plataforma acesso limitado por
          meio das APIs oficiais. Esse acesso é usado exclusivamente para as
          funcionalidades que você solicita: publicar, agendar, ler métricas e
          gerenciar o conteúdo daquela conta.
        </p>
        <LegalList
          items={[
            <>
              <strong>Meta (Facebook, Instagram, Threads):</strong> tratamos os
              dados obtidos conforme os Termos da Plataforma Meta. Tokens são
              armazenados de forma criptografada e revogados quando você
              desconecta o canal.
            </>,
            <>
              <strong>Google e YouTube:</strong> o uso e a transferência de
              informações recebidas das APIs do Google seguem a{' '}
              <a
                className="text-newTableTextFocused hover:underline"
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noreferrer"
              >
                Google API Services User Data Policy
              </a>
              , incluindo os requisitos de Uso Limitado (Limited Use). O uso do
              YouTube pela Plataforma está sujeito aos{' '}
              <a
                className="text-newTableTextFocused hover:underline"
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noreferrer"
              >
                Termos de Serviço do YouTube
              </a>{' '}
              e à{' '}
              <a
                className="text-newTableTextFocused hover:underline"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Política de Privacidade do Google
              </a>
              .
            </>,
            'Você pode revogar o acesso a qualquer momento, dentro da Plataforma ou diretamente nas configurações de aplicativos conectados da rede social.',
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Compartilhamento com terceiros">
        <p>
          Compartilhamos dados apenas quando necessário para operar o serviço,
          com as seguintes categorias de destinatários:
        </p>
        <LegalList
          items={[
            'Redes sociais conectadas, para executar as publicações e leituras que você solicita.',
            'Provedores de infraestrutura, armazenamento e envio de e-mail, sob contrato e obrigação de confidencialidade.',
            'Processadores de pagamento, quando houver assinatura paga.',
            'Autoridades públicas, quando exigido por lei ou ordem judicial.',
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Retenção e exclusão">
        <p>
          Mantemos os dados enquanto sua conta estiver ativa. Ao desconectar um
          canal, os tokens e credenciais correspondentes são removidos. Ao
          solicitar a exclusão da conta, seus dados pessoais, conteúdos e
          credenciais são eliminados em até 30 dias, ressalvados os registros
          que devemos preservar por obrigação legal (por exemplo, registros de
          acesso, nos termos do Marco Civil da Internet, e documentos fiscais).
        </p>
        <p>
          Instruções detalhadas estão na página{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href="/exclusao-de-dados"
          >
            Exclusão de dados do usuário
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="8. Segurança">
        <p>
          Adotamos medidas técnicas e administrativas para proteger os dados,
          incluindo transmissão via HTTPS/TLS, criptografia de senhas e tokens,
          controle de acesso baseado em permissões e registros de auditoria.
          Nenhum sistema é totalmente imune a incidentes; em caso de violação
          relevante, comunicaremos os titulares e a ANPD conforme a legislação.
        </p>
      </LegalSection>

      <LegalSection title="9. Seus direitos">
        <p>
          Como titular, você pode solicitar a qualquer momento: confirmação da
          existência de tratamento; acesso aos dados; correção de dados
          incompletos ou desatualizados; anonimização, bloqueio ou eliminação de
          dados desnecessários; portabilidade; informação sobre
          compartilhamentos; e revogação do consentimento. Envie o pedido para{' '}
          {legalCompany.email} ou pelo WhatsApp {legalCompany.phone};
          responderemos em até 15 dias.
        </p>
      </LegalSection>

      <LegalSection title="10. Cookies">
        <p>
          Utilizamos cookies estritamente necessários para autenticação e
          manutenção da sessão, além de cookies de preferência (idioma, tema).
          Cookies analíticos, quando ativos, servem apenas para medir o uso
          agregado da Plataforma. Você pode bloquear cookies no navegador, mas
          isso pode impedir o funcionamento do login.
        </p>
      </LegalSection>

      <LegalSection title="11. Menores de idade">
        <p>
          A Plataforma não se destina a menores de 18 anos e não coletamos
          intencionalmente dados de crianças e adolescentes. Caso identifiquemos
          esse tipo de cadastro, a conta será removida.
        </p>
      </LegalSection>

      <LegalSection title="12. Transferência internacional">
        <p>
          Parte da infraestrutura e dos serviços integrados pode estar
          localizada fora do Brasil. Nesses casos, adotamos salvaguardas
          contratuais adequadas, conforme o art. 33 da LGPD.
        </p>
      </LegalSection>

      <LegalSection title="13. Alterações desta política">
        <p>
          Podemos atualizar esta Política a qualquer momento. Mudanças
          relevantes serão comunicadas por e-mail ou por aviso dentro da
          Plataforma. A data da última atualização está indicada no topo desta
          página.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
