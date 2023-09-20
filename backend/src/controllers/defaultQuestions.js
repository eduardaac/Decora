const defaultQuestions = [
  {
    //Questão 1
    label: 'Qual o domínio do software?',
    options: [
      { text: 'Négocio', answers: [{ answer: ['Layered Pattern', 'Model-View-Controller Pattern'] }] },
      { text: 'Acadêmico', answers: [{ answer: ['Layered Pattern'] }] },
      { text: 'Hospital', answers: [{ answer: ['Layered Pattern', 'Service-Oriented Pattern'] }] },
      { text: 'Jogo em tempo real', answers: [{ answer: ['Real-Time Agent'] }] },
      { text: 'Conferência Web / Stream (áudio/vídeo)', answers: [{ answer: ['Peer-to-Peer Pattern'] }] },
      { text: 'Outro' },
    ],
    priority: 1,
    category: 'styles',
  },

  {
    //Questão 2
    label: 'Este software tem características de uma aplicação distribuída?',
    options: [
      { text: 'Sim', answers: [{ answer: ['Client-Server Pattern', 'Service-Oriented Pattern'] }] },
      { text: 'Não' },
      { text: 'Não sei' },
    ],
    priority: 1,
    category: 'styles',
  },

  {
    //Questão 3
    label: 'O número de usuários aos quais o software deve atender é um número conhecido, ou o sistema prevê resiliência e escalabilidade, isto é, capacidade de modificação na quantidade de recursos providos a partir de demanda variante?',
    options: [
      { text: 'Sim', answers: [{ answer: ['Publish-Subscribe Pattern', 'Clusters'] }] },
      { text: 'Não' },
      { text: 'Não sei' },
    ],
    priority: 1,
    category: 'styles',
  },

  {
    //Questão 4
    label: 'A equipe que desenvolverá o software já possui expertise em algum tipo de tecnologia??',
    options: [
      { text: 'PHP', answers: [{ answer: ['PHP Framework - Laravel'] }] },
      { text: 'C', answers: [{ answer: ['C Framework - ASP.NET MVC'] }] },
      { text: 'Java', answers: [{ answer: ['Java Framework - Spring MVC'] }] },
      { text: 'Python', answers: [{ answer: ['Python Framework - Django'] }] },
      { text: 'React Native', answers: [{ answer: ['React-Native'] }] },
      { text: 'Nenhuma das opções' },
    ],
    priority: 2,
    category: 'technologies',
  },

  {
    //Questão 5
    label: 'A equipe que desenvolverá o software já possui expertise em que tipo de banco de dados?',
    options: [
      { text: 'SQL', answers: [{ answer: ['SQL'] }] },
      { text: 'NoSQL', answers: [{ answer: ['NoSQL'] }] },
      { text: 'Ambos', answers: [{ answer: ['SQL', 'NoSQL'] }] },
    ],
    priority: 1,
    category: 'technologies',
  },

  {
    //Questão 6
    label: 'O software deve realizar interação(ões) com outro(s) software(s)?',
    options: [
      { text: 'Sim', answers: [{ answer: ['Service-Oriented Pattern'] }] },
      { text: 'Não' },
      { text: 'Não sei' },
    ],
    priority: 1,
    category: 'styles',
  },

  {
    //Questão 7
    label: 'No que tange aos dados que serão transmitidos para outro software, os tipos de dados seguem regras estritas de tipagem e validação?',
    options: [
      { text: 'Sim', answers: [{ answer: ['SOAP'] }] },
      { text: 'Não', answers: [{ answer: ['REST'] }] },
      { text: 'Não sei' },
    ],
    priority: 1,
    category: 'styles',
  },

  {
    //Questão 8
    label: 'Com relação à disponibilidade, caso haja indisponibilidade temporária do software, os usuários podem correr risco, serem feridos ou terem perdas financeiras ou de outra natureza?',
    options: [
      { text: 'Sim', answers: [{ answer: ['Multi-tier Pattern', 'Clusters', 'Availability'] }] },
      { text: 'Não' },
      { text: 'Não sei' },
    ],
    priority: 1,
    category: 'styles',
  },

  {
    //Questão 9
    label: 'Com relação à manutenibilidade do software, há perspectivas de mudanças/evoluções frequentes no sistema?',
    options: [
      { text: 'Sim', answers: [{ answer: ['Layered Pattern', 'Model-View-Controller Pattern'] }] },
      { text: 'Não' },
      { text: 'Não sei' },
    ],
    priority: 1,
    category: 'styles',
  },

  {
    //Questão 10
    label: 'Com relação à segurança, o software armazenará dados importantes de interesse de terceiros?',
    options: [
      { text: 'Sim', answers: [{ answer: ['Safety'] }] },
      { text: 'Não' },
      { text: 'Não sei' },
    ],
    priority: 1,
    category: 'decisions',
  },

  {
    //Questão 11
    label: 'Com relação à usuabilidade, o software possui necessidade de eficiência do usuário com relação a auto-aprendizado, minimização do impacto de erros ou relacionado?',
    options: [
      { text: 'Sim', answers: [{ answer: ['Usability'] }] },
      { text: 'Não' },
      { text: 'Não sei' },
    ],
    priority: 1,
    category: 'decisions',
  },

  {
    //Questão 12
    label: 'A elasticidade da base de dados, ou seja, a capacidade do software escalar sua tecnologia de armazenamento bem como os dados armazenados, é um fator importante?',
    options: [
      { text: 'Sim', answers: [{ answer: ['NoSQL'] }] },
      { text: 'Não', answers: [{ answer: ['SQL'] }] },
      { text: 'Não sei' },
    ],
    priority: 2,
    category: 'technologies',
  },

];

module.exports = defaultQuestions;
