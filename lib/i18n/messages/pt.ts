import type { MessageCatalog } from "./en";

/**
 * Portuguese. DRAFT — needs review by a native speaker, and the legal and
 * medical wording needs counsel/pharmacist sign-off, before `pt` may be marked
 * available in ../locales.ts.
 *
 * Written in Brazilian Portuguese, since Brazil is the larger mapped market
 * (see ../country-language.ts). Portugal is mapped to the same catalog; if the
 * two must differ, split into pt-BR and pt-PT rather than compromising both.
 */
export const pt: MessageCatalog = {
  "language.detected": "Detectamos a sua região",
  "language.question": "Deseja mudar o idioma?",
  "language.stay": "Continuar em {language}",
  "language.switch": "Mudar para {language}",

  "notFound.eyebrow": "Página não encontrada",
  "notFound.title": "Este caminho de farmácia não existe.",
  "notFound.description":
    "A página que você procura pode ter sido movida ou removida, ou o endereço pode estar incorreto. Vamos colocar você de volta no caminho.",
  "notFound.backHome": "Voltar ao início",
  "notFound.verification": "Verificação de farmácias",
  "notFound.links.inventoryUpload": "Envio de estoque",
  "notFound.links.pharmacyPortal": "Portal da farmácia",
  "notFound.links.support": "Suporte",
  "notFound.copyright": "© {year} ZoikoMeds. Todos os direitos reservados.",

  "footer.tagline":
    "Infraestrutura global de disponibilidade de medicamentos — buscar, sinalizar, verificar. Não somos uma farmácia. Sem prescrição, dispensação ou orientação médica.",
  "footer.status.monitoring": "Monitoramento da infraestrutura ativo",
  "footer.status.markets": "Estrutura para mais de 47 mercados planejados",
  "footer.badge.privacy": "Privacidade em primeiro lugar",
  "footer.badge.verified": "Farmácias verificadas",
  "footer.badge.noStock": "Nenhum estoque exposto",

  "footer.columns.platform": "Plataforma",
  "footer.columns.pharmacies": "Farmácias",
  "footer.columns.providers": "Profissionais de saúde",
  "footer.columns.enterprise": "Empresas e inteligência",
  "footer.columns.company": "Empresa",
  "footer.columns.legal": "Jurídico e confiança",

  "footer.platform.search": "Buscar medicamentos",
  "footer.platform.createAccount": "Criar conta",
  "footer.platform.savedSearches": "Buscas salvas",
  "footer.platform.alerts": "Alertas de disponibilidade",
  "footer.platform.caregiver": "Acesso para cuidadores",
  "footer.platform.confidence": "Confiança na disponibilidade",

  "footer.pharmacies.join": "Entrar na rede",
  "footer.pharmacies.portal": "Portal da farmácia",
  "footer.pharmacies.verification": "Padrões de verificação",
  "footer.pharmacies.inventory": "Envio de estoque",
  "footer.pharmacies.confirmations": "Solicitações de confirmação",
  "footer.pharmacies.support": "Suporte para farmácias",

  "footer.providers.overview": "Visão geral para profissionais",
  "footer.providers.patientSupport": "Fluxos de apoio ao paciente",
  "footer.providers.careTeam": "Acesso da equipe de cuidado",
  "footer.providers.signals": "Sinais de disponibilidade",
  "footer.providers.referral": "Orientação para encaminhamentos",
  "footer.providers.support": "Suporte para profissionais",

  "footer.enterprise.solutions": "Soluções corporativas",
  "footer.enterprise.signal": "Inteligência ZoikoSignal™",
  "footer.enterprise.availApi": "API ZoikoAvail™",
  "footer.enterprise.medibase": "Dados MediBase™",
  "footer.enterprise.healthSystems": "Sistemas de saúde",
  "footer.enterprise.government": "Governo e saúde pública",

  "footer.company.about": "Sobre a ZoikoMeds",
  "footer.company.healthcare": "Zoiko Healthcare",
  "footer.company.group": "Zoiko Group",
  "footer.company.careers": "Carreiras",
  "footer.company.press": "Imprensa",
  "footer.company.contact": "Contato",

  "footer.legal.trustCenter": "Central de confiança",
  "footer.legal.privacyCenter": "Central de privacidade",
  "footer.legal.terms": "Termos de uso",
  "footer.legal.cookies": "Configurações de cookies",
  "footer.legal.medicalDisclaimer": "Aviso médico",
  "footer.legal.controlledMedicine": "Política de medicamentos controlados",
  "footer.legal.accessibility": "Acessibilidade",

  "footer.bottom.privacy": "Privacidade",
  "footer.bottom.terms": "Termos",
  "footer.bottom.cookies": "Cookies",
  "footer.bottom.accessibility": "Acessibilidade",
  "footer.bottom.compliance": "Conformidade",

  "footer.hq.us": "Sede nos EUA",
  "footer.hq.eu": "Sede na UE",
  "footer.operator":
    "© {year} ZoikoMeds | A ZoikoMeds é uma plataforma regulada operada pela Zoiko Healthcare Inc | A Zoiko Healthcare Inc é uma subsidiária da Zoiko Group Inc",
  "footer.copyright": "© {year} Zoiko Group Inc. Todos os direitos reservados.",
  "footer.disclaimer.intro":
    "A ZoikoMeds fornece informações sobre a disponibilidade de medicamentos em farmácias verificadas participantes.",
  "footer.disclaimer.emphasis":
    "A ZoikoMeds não é uma farmácia, não prescreve, dispensa, vende, entrega nem recomenda medicamentos, e não fornece orientação médica.",
  "footer.disclaimer.rest":
    "As informações de disponibilidade são baseadas em confiança e não garantem o estoque. Regras de prescrição, o julgamento do farmacêutico, requisitos de verificação e as leis de cada jurisdição sempre se aplicam. Em caso de emergência médica, procure imediatamente os serviços de emergência locais.",
};
