const defaultQuestions = [
  {
    //Questão 1
    label: 'Qual o domínio do software?',
    options: [
      { type: 'Négocio', answers: [{ answer: ['Layered Pattern', 'Model-View-Controller Pattern'] }] },
      { type: 'Acadêmico', answers: [{ answer: ['Layered Pattern'] }] },
      { type: 'Hospital', answers: [{ answer: ['Layered Pattern', 'Service-Oriented Pattern'] }] },
      { type: 'Jogo em tempo real', answers: [{ answer: ['Real-Time Agent'] }] },
      { type: 'Conferência Web / Stream (áudio/vídeo)', answers: [{ answer: ['Peer-to-Peer Pattern'] }] },
      { type: 'Outro' },
    ],
    priority: 3,
  },

  {
    //Questão 2
    label: 'Este software tem características de uma aplicação distribuída?',
    options: [
      { type: 'Sim', answers: [{ answer: ['Client-Server Pattern', 'Service-Oriented Pattern'] }] },
      { type: 'Não' },
      { type: 'Não sei' },
    ],
    priority: 3,
  },

  {
    //Questão 3
    label: 'O número de usuários aos quais o software deve atender é um número conhecido, ou o sistema prevê resiliência e escalabilidade, isto é, capacidade de modificação na quantidade de recursos providos a partir de demanda variante?',
    options: [
      { type: 'Sim', answers: [{ answer: ['Publish-Subscribe Pattern', 'Clusters'] }] },
      { type: 'Não' },
      { type: 'Não sei' },
    ],
    priority: 3,
  },

  {
    //Questão 4
    label: 'A equipe que desenvolverá o software já possui expertise em algum tipo de tecnologia??',
    options: [
      { type: 'PHP', answers: [{ answer: ['PHP Framework - Laravel'] }] },
      { type: 'C', answers: [{ answer: ['C Framework - ASP.NET MVC'] }] },
      { type: 'Java', answers: [{ answer: ['Java Framework - Spring MVC'] }] },
      { type: 'Python', answers: [{ answer: ['Python Framework - Django'] }] },
      { type: 'React Native', answers: [{ answer: ['React-Native'] }] },
      { type: 'Nenhuma das opções' },
    ],
    priority: 3,
  },

  {
    //Questão 5
    label: 'A equipe que desenvolverá o software já possui expertise em que tipo de banco de dados?',
    options: [
      { type: 'SQL', answers: [{ answer: ['SQL'] }] },
      { type: 'NoSQL', answers: [{ answer: ['NoSQL'] }] },
      { type: 'Ambos', answers: [{ answer: ['SQL', 'NoSQL'] }] },
    ],
    priority: 3,
  },

  {
    //Questão 6
    label: 'O software deve realizar interação(ões) com outro(s) software(s)?',
    options: [
      { type: 'Sim', answers: [{ answer: ['Service-Oriented Pattern'] }] },
      { type: 'Não' },
      { type: 'Não sei' },
    ],
    priority: 3,
  },

  {
    //Questão 7
    label: 'No que tange aos dados que serão transmitidos para outro software, os tipos de dados seguem regras estritas de tipagem e validação?',
    options: [
      { type: 'Sim', answers: [{ answer: ['SOAP'] }] },
      { type: 'Não', answers: [{ answer: ['REST'] }] },
      { type: 'Não sei' },
    ],
    priority: 3,
  },

  {
    //Questão 8
    label: 'Com relação à disponibilidade, caso haja indisponibilidade temporária do software, os usuários podem correr risco, serem feridos ou terem perdas financeiras ou de outra natureza?',
    options: [
      { type: 'Sim', answers: [{ answer: ['Multi-tier Pattern', 'Clusters', 'Availability'] }] },
      { type: 'Não' },
      { type: 'Não sei' },
    ],
    priority: 3,
  },

  {
    //Questão 9
    label: 'Com relação à manutenibilidade do software, há perspectivas de mudanças/evoluções frequentes no sistema?',
    options: [
      { type: 'Sim', answers: [{ answer: ['Layered Pattern', 'Model-View-Controller Pattern'] }] },
      { type: 'Não' },
      { type: 'Não sei' },
    ],
    priority: 3,
  },
  {
    //Questão 10
    label: 'Com relação à segurança, o software armazenará dados importantes de interesse de terceiros?',
    options: [
      { type: 'Sim', answers: [{ answer: ['Safety'] }] },
      { type: 'Não' },
      { type: 'Não sei' },
    ],
    priority: 3,
  },

  {
    //Questão 11
    label: 'Com relação à usuabilidade, o software possui necessidade de eficiência do usuário com relação a auto-aprendizado, minimização do impacto de erros ou relacionado?',
    options: [
      { type: 'Sim', answers: [{ answer: ['Usability'] }] },
      { type: 'Não' },
      { type: 'Não sei' },
    ],
    priority: 3,
  },

  {
    //Questão 12
    label: 'A elasticidade da base de dados, ou seja, a capacidade do software escalar sua tecnologia de armazenamento bem como os dados armazenados, é um fator importante?',
    options: [
      { type: 'Sim', answers: [{ answer: ['NoSQL'] }] },
      { type: 'Não', answers: [{ answer: ['SQL'] }] },
      { type: 'Não sei' },
    ],
    priority: 3,
  },

];

module.exports = defaultQuestions;
