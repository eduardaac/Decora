const defaultQuestions = [
  {
    label: 'Teste questão',
    options: [
      { type: 'Business', answers: [{ answer: ['Layered Pattern', 'Model-View-Controller Pattern'] }] },
      { type: 'Academic', answers: [{ answer: ['Layered Pattern'] }] },
      { type: 'Hospital', answers: [{ answer: ['Layered Pattern', 'Service-Oriented Pattern'] }] },
      { type: 'Real-time game', answers: [{ answer: ['Real-Time Agent'] }] },
      { type: 'Web Conference / Stream (audio/video)', answers: [{ answer: ['Peer-to-Peer Pattern'] }] },
      { type: 'Other' },
    ],
    priority: 3,
  },

  // Adicione mais perguntas padrão aqui...
];

module.exports = defaultQuestions;
