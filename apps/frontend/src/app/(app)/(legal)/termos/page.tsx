export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import {
  LegalList,
  LegalPage,
  LegalSection,
} from '@gitroom/frontend/components/legal/legal.page.component';
import { legalCompany } from '@gitroom/frontend/components/legal/legal.constants';

export const metadata: Metadata = {
  title: `Termos de Serviço | ${legalCompany.brand}`,
  description:
    'Condições de uso da plataforma Social Post para agendamento e publicação em redes sociais.',
};

export default async function TermsPage() {
  return (
    <LegalPage
      title="Termos de Serviço"
      intro={
        <>
          Estes Termos de Serviço regulam o uso da plataforma {
            legalCompany.brand
          }
          , operada pelo {legalCompany.legalName} (CNPJ{' '}
          {legalCompany.document}), disponível em {legalCompany.website}. Ao
          criar uma conta ou utilizar o serviço, você declara que leu, entendeu
          e concorda integralmente com estas condições.
        </>
      }
    >
      <LegalSection title="1. Descrição do serviço">
        <p>
          A Plataforma permite criar, agendar, publicar e analisar conteúdo em
          redes sociais e canais de mensagem conectados pelo próprio usuário,
          por meio das APIs oficiais de cada provedor. O serviço é oferecido no
          estado em que se encontra e pode ser alterado, ampliado ou
          descontinuado mediante aviso prévio razoável.
        </p>
      </LegalSection>

      <LegalSection title="2. Cadastro e conta">
        <LegalList
          items={[
            'Você deve ter no mínimo 18 anos e capacidade civil para contratar.',
            'As informações fornecidas no cadastro devem ser verdadeiras, completas e atualizadas.',
            'Você é responsável por manter a confidencialidade das credenciais de acesso e por todas as atividades realizadas na sua conta.',
            'Notifique-nos imediatamente em caso de uso não autorizado da conta.',
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Conexão de contas de redes sociais">
        <p>
          Ao conectar um canal, você autoriza a Plataforma a agir em seu nome
          nos limites das permissões concedidas. Você declara ser titular ou
          possuir autorização legítima do titular da conta conectada. O uso de
          cada rede social permanece sujeito aos termos e políticas do
          respectivo provedor, incluindo os{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href="https://developers.facebook.com/terms/"
            target="_blank"
            rel="noreferrer"
          >
            Termos da Plataforma Meta
          </a>
          , os{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href="https://www.youtube.com/t/terms"
            target="_blank"
            rel="noreferrer"
          >
            Termos de Serviço do YouTube
          </a>{' '}
          e a{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noreferrer"
          >
            Google API Services User Data Policy
          </a>
          . A suspensão, alteração ou revogação de acesso por parte desses
          provedores pode afetar funcionalidades da Plataforma, sem que isso
          configure descumprimento contratual da nossa parte.
        </p>
      </LegalSection>

      <LegalSection title="4. Conteúdo do usuário">
        <p>
          Você mantém a titularidade de todo o conteúdo que envia. Ao utilizar a
          Plataforma, concede-nos uma licença limitada, não exclusiva e
          revogável para armazenar, processar, formatar e transmitir esse
          conteúdo exclusivamente com a finalidade de executar as publicações e
          funcionalidades solicitadas por você.
        </p>
        <p>
          Você é o único responsável pelo conteúdo publicado, incluindo direitos
          autorais, direitos de imagem, marcas e conformidade com a legislação
          aplicável e as políticas de cada rede social.
        </p>
      </LegalSection>

      <LegalSection title="5. Uso proibido">
        <p>É vedado utilizar a Plataforma para:</p>
        <LegalList
          items={[
            'Publicar conteúdo ilegal, difamatório, discriminatório, violento, sexualmente explícito envolvendo menores ou que incite ódio.',
            'Praticar spam, automação abusiva, engajamento artificial ou qualquer violação das políticas das redes sociais conectadas.',
            'Violar direitos de propriedade intelectual ou de terceiros.',
            'Distribuir malware, tentar acesso não autorizado, realizar engenharia reversa ou sobrecarregar a infraestrutura.',
            'Revender, sublicenciar ou disponibilizar o serviço a terceiros sem autorização escrita.',
          ]}
        />
        <p>
          O descumprimento pode levar à suspensão imediata da conta, sem prejuízo
          das medidas legais cabíveis.
        </p>
      </LegalSection>

      <LegalSection title="6. Planos, pagamentos e cancelamento">
        <p>
          Quando houver plano pago, os valores, o ciclo de cobrança e os limites
          de uso são apresentados no momento da contratação. A renovação é
          automática até que você cancele. O cancelamento pode ser feito a
          qualquer momento e passa a valer ao fim do período já pago, sem
          reembolso proporcional, salvo disposição legal em contrário. O direito
          de arrependimento previsto no art. 49 do Código de Defesa do
          Consumidor é assegurado em até 7 dias da contratação.
        </p>
      </LegalSection>

      <LegalSection title="7. Disponibilidade e suporte">
        <p>
          Empregamos esforços razoáveis para manter a Plataforma disponível, mas
          não garantimos operação ininterrupta ou livre de erros. Podem ocorrer
          interrupções por manutenção programada, falhas de terceiros ou eventos
          fora do nosso controle. O suporte é prestado pelo e-mail{' '}
          {legalCompany.email} e pelo WhatsApp/telefone {legalCompany.phone}.{' '}
          {legalCompany.businessHours}
        </p>
      </LegalSection>

      <LegalSection title="8. Limitação de responsabilidade">
        <p>
          Na máxima extensão permitida pela lei, a Plataforma não se
          responsabiliza por lucros cessantes, perda de dados, danos indiretos
          ou consequenciais decorrentes do uso ou da impossibilidade de uso do
          serviço, nem por falhas, bloqueios, suspensões ou alterações de
          política impostas pelas redes sociais conectadas. A responsabilidade
          total, quando cabível, fica limitada ao valor pago pelo usuário nos 12
          meses anteriores ao evento.
        </p>
      </LegalSection>

      <LegalSection title="9. Privacidade">
        <p>
          O tratamento de dados pessoais é descrito na{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href="/privacidade"
          >
            Política de Privacidade
          </a>
          , que integra estes Termos. A exclusão de dados segue o procedimento
          descrito em{' '}
          <a
            className="text-newTableTextFocused hover:underline"
            href="/exclusao-de-dados"
          >
            Exclusão de dados do usuário
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="10. Encerramento">
        <p>
          Você pode encerrar sua conta a qualquer momento. Podemos suspender ou
          encerrar o acesso em caso de violação destes Termos, exigência legal
          ou risco à segurança da Plataforma, com aviso sempre que possível.
        </p>
      </LegalSection>

      <LegalSection title="11. Alterações dos termos">
        <p>
          Estes Termos podem ser atualizados. Mudanças relevantes serão
          comunicadas por e-mail ou por aviso na Plataforma com antecedência
          razoável. O uso continuado após a vigência implica concordância com a
          nova versão.
        </p>
      </LegalSection>

      <LegalSection title="12. Lei aplicável e foro">
        <p>
          Estes Termos são regidos pelas leis da República Federativa do Brasil.
          Fica eleito o foro do domicílio do consumidor para dirimir
          controvérsias, quando aplicável a legislação consumerista; nos demais
          casos, o foro da comarca de São José, Santa Catarina, sede da empresa.
        </p>
      </LegalSection>

      <LegalSection title="13. Contato">
        <p>
          {legalCompany.legalName} — CNPJ {legalCompany.document}
          <br />
          {legalCompany.address}
          <br />
          {legalCompany.addressComplement}
          <br />
          E-mail: {legalCompany.email}
          <br />
          WhatsApp e telefone: {legalCompany.phone}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
