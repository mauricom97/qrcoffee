/** Landing page copy (Portuguese) — consumed as `welcome` in catalog */
export const welcomePt = {
  hero: {
    title:
      "Atendimento mais rápido, organizado e eficiente para bares e restaurantes",
    subtitle:
      "Gerencie pedidos, mesas, comandas e atendimento em um único sistema pensado para melhorar a experiência do cliente e a produtividade da equipe.",
    ctaDemo: "Ver demonstração",
    ctaTrial: "Testar gratuitamente",
  },
  heroBenefits: [
    { label: "Atendimento mais ágil" },
    { label: "Organização de pedidos e comandas" },
    { label: "Comunicação direta com a cozinha" },
    { label: "Controle completo das vendas" },
  ],
  imgAltPresentation: "Painel de pedidos, mesas e equipe em atendimento",
  problems: {
    title: "Problemas comuns no atendimento de bares e restaurantes",
    intro: "Muitos estabelecimentos enfrentam dificuldades como:",
    items: [
      "Demora no registro de pedidos",
      "Erros de comunicação entre salão e cozinha",
      "Comandas desorganizadas",
      "Dificuldade em acompanhar pedidos em andamento",
      "Clientes esperando para pedir ou fechar a conta",
    ],
    affect: "Esses problemas afetam diretamente:",
    impacts: [
      "a experiência do cliente",
      "a eficiência da equipe",
      "o faturamento do estabelecimento",
    ],
  },
  solution: {
    title: "Um sistema pensado para organizar e acelerar o atendimento",
    intro:
      "Nosso sistema centraliza todo o fluxo de atendimento do estabelecimento em uma única plataforma. Com ele é possível:",
    items: [
      "registrar pedidos rapidamente",
      "acompanhar mesas em tempo real",
      "organizar comandas automaticamente",
      "enviar pedidos diretamente para a cozinha",
      "acompanhar o andamento do atendimento",
    ],
    closing: "Tudo de forma simples e intuitiva.",
  },
  howItWorks: {
    title: "Como o sistema funciona",
    steps: [
      {
        title: "Registro de pedidos",
        text: "Pedidos podem ser registrados rapidamente pela equipe ou pelo próprio cliente, dependendo do modelo de atendimento do estabelecimento.",
      },
      {
        title: "Organização automática das comandas",
        text: "Cada mesa ou cliente possui uma comanda digital que organiza todos os pedidos realizados.",
      },
      {
        title: "Comunicação direta com a cozinha",
        text: "Assim que um pedido é feito, ele aparece automaticamente para preparação. Isso reduz erros e agiliza o fluxo da cozinha.",
      },
      {
        title: "Controle do atendimento",
        text: "O sistema permite acompanhar: mesas abertas, pedidos em preparo, pedidos finalizados e contas em aberto.",
      },
    ],
  },
  features: {
    title: "Funcionalidades do sistema",
    items: [
      {
        title: "Gestão de mesas",
        desc: "Visualização clara das mesas: ocupadas, livres e comandas abertas.",
      },
      {
        title: "Gestão de pedidos",
        desc: "Controle de pedidos em preparo, entregues e histórico completo.",
      },
      {
        title: "Comandas digitais",
        desc: "Organização automática de tudo que foi consumido em cada mesa ou cliente.",
      },
      {
        title: "Painel de controle",
        desc: "Vendas do dia, movimentação e pedidos em andamento em tempo real.",
      },
    ],
    extraTitle: "Recursos adicionais",
    extras: [
      "Cardápio digital",
      "Pedidos pelo cliente (opcional)",
      "Relatórios de vendas",
      "Histórico de atendimento",
    ],
  },
  benefits: {
    title: "Mais eficiência no atendimento, melhor experiência para o cliente",
    items: [
      { text: "Redução no tempo de atendimento" },
      { text: "Menos erros em pedidos" },
      { text: "Melhor comunicação entre equipe e cozinha" },
      { text: "Maior controle sobre vendas e operação" },
      { text: "Melhor experiência para o cliente" },
    ],
  },
  demo: {
    title: "Demonstração do sistema",
    intro:
      "Conheça o painel de atendimento, controle de mesas, gestão de pedidos e relatórios de vendas.",
    imgAlt: "Painel de atendimento, mesas e pedidos",
    cta: "Ver demonstração do sistema",
  },
  audience: {
    title: "Para quem é o sistema",
    intro:
      "Ideal para qualquer estabelecimento que queira organizar e melhorar o atendimento ao cliente.",
    labels: [
      { label: "Bares" },
      { label: "Restaurantes" },
      { label: "Cafeterias" },
      { label: "Lanchonetes" },
      { label: "Bistrôs" },
      { label: "Pubs" },
    ],
  },
  ctaFinal: {
    title: "Transforme o atendimento do seu estabelecimento",
    text: "Modernize a forma como seu bar ou restaurante atende clientes, organize pedidos com eficiência e tenha controle total da operação.",
    trial: "Começar teste gratuito",
    book: "Agendar demonstração",
  },
  testimonials: {
    title: "O que dizem nossos clientes",
    items: [
      {
        text: "A QRCoffee trouxe super atendimento pro nosso dia a dia. Pedidos organizados e em minutos na mesa.",
        author: "João Silva",
        role: "Cliente fiel",
      },
      {
        text: "Interface intuitiva e suporte rápido. Meus clientes adoram e a operação ficou muito mais fluida.",
        author: "Maria Oliveira",
        role: "Proprietária de café",
      },
      {
        text: "Integração perfeita com nosso fluxo. Relatórios claros e menos erros de pedido. Recomendo.",
        author: "Pedro Santos",
        role: "Gerente de restaurante",
      },
    ],
  },
  footer: {
    problems: "Problemas",
    solution: "Solução",
    how: "Como funciona",
    features: "Funcionalidades",
    benefits: "Benefícios",
    demo: "Demonstração",
    plans: "Planos",
    contact: "Contato",
    privacy: "Privacidade",
    rights: "Todos os direitos reservados.",
  },
};

export type WelcomeMessages = typeof welcomePt;
