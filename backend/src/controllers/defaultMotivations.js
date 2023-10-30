const defaultMotivations = [
    {
        answer: "Layered Pattern",
        explanation: "Motivação: O padrão em camadas é adotado para melhorar a separação de preocupações, facilitando a manutenção e a escalabilidade do sistema. Ele permite que diferentes partes do aplicativo sejam desenvolvidas e modificadas de forma independente, tornando o código mais organizado e mais fácil de entender."
    },

    {
        answer: "Model-View-Controller Pattern",
        explanation: "Motivação: O padrão Modelo-Visão-Controlador (MVC) é escolhido para separar claramente a lógica de negócios (modelo) da apresentação (visão) e do controle de fluxo (controlador) em um aplicativo. Isso melhora a modularidade e a manutenção do código, facilitando a adaptação da interface do usuário e a evolução da lógica subjacente."
    },

    {
        answer: "Service-Oriented Pattern",
        explanation: "Motivação: O padrão orientado a serviços é selecionado para promover a reutilização de componentes de software como serviços independentes. Isso melhora a interoperabilidade, a escalabilidade e a flexibilidade do sistema, permitindo que diferentes partes do aplicativo se comuniquem por meio de interfaces bem definidas."
    },

    {
        answer: "Real-Time Agent",
        explanation: "Motivação: A arquitetura de agente em tempo real é adotada para suportar comunicações em tempo real, como chat, jogos online ou aplicações de colaboração. Isso garante que os dados e eventos sejam processados e entregues instantaneamente, criando uma experiência de usuário altamente responsiva."
    },

    {
        answer: "Peer-to-Peer Pattern",
        explanation: "Motivação: O padrão peer-to-peer é escolhido para permitir a comunicação direta entre pares (dispositivos) sem a necessidade de um servidor central. Isso pode melhorar a escalabilidade e a redundância do sistema, tornando-o adequado para aplicativos descentralizados, como compartilhamento de arquivos e chamadas de vídeo."
    },

    {
        answer: "Client-Server Pattern",
        explanation: "Motivação: O padrão cliente-servidor é adotado para dividir as responsabilidades entre um cliente e um servidor. Isso permite a escalabilidade e a gerenciabilidade eficazes de aplicativos que precisam de processamento centralizado e compartilhamento de recursos entre várias instâncias do cliente."
    },

    {
        answer: "Publish-Subscribe Pattern",
        explanation: "Motivação: O padrão publicação-assinatura é escolhido para permitir a distribuição eficiente de eventos e mensagens a um grande número de destinatários. Isso é útil em cenários em que diferentes partes do sistema precisam ser notificadas sobre eventos, como atualizações em tempo real e notícias."
    },

    {
        answer: "Clusters",
        explanation: "Motivação: A utilização de clusters visa melhorar a escalabilidade e a disponibilidade do sistema, permitindo que várias máquinas trabalhem juntas como um grupo. Isso é útil quando é necessário lidar com cargas de trabalho intensivas e garantir alta disponibilidade, como em aplicativos de grande escala e alta demanda."
    },

    {
        answer: "PHP Framework - Laravel",
        explanation: "Motivação: A escolha do framework Laravel em PHP é motivada pela capacidade de desenvolver aplicativos da web de maneira rápida e eficaz. Ele fornece um conjunto de ferramentas e convenções que aceleram o desenvolvimento, enquanto mantém um código organizado e de fácil manutenção."
    },

    {
        answer: "C Framework - ASP.NET MVC",
        explanation: "Motivação: O uso do framework ASP.NET MVC em C# é impulsionado pela integração estreita com a plataforma Windows e as bibliotecas da Microsoft. Isso é benéfico para o desenvolvimento de aplicativos corporativos escaláveis e de alto desempenho que se beneficiam da infraestrutura da Microsoft."
    },

    {
        answer: "Java Framework - Spring MVC",
        explanation: "Motivação: A escolha do framework Spring MVC em Java é motivada pela robustez e versatilidade do ecossistema Java. Ele é amplamente utilizado para criar aplicativos empresariais escaláveis e é conhecido por sua facilidade de integração com outras tecnologias."
    },

    {
        answer: "Python Framework - Django",
        explanation: "Motivação: A utilização do framework Django em Python é devido à sua simplicidade e rapidez de desenvolvimento. É uma ótima escolha para aplicativos da web que precisam ser desenvolvidos de forma ágil, seguindo práticas de desenvolvimento web modernas."
    },

    {
        answer: "React-Native",
        explanation: "Motivação: A escolha do React Native é impulsionada pela necessidade de desenvolver aplicativos móveis multiplataforma usando tecnologias web, como JavaScript. Isso permite economizar tempo e recursos ao criar aplicativos para iOS e Android com uma base de código compartilhada."
    },

    {
        answer: "SQL",
        explanation: "Motivação: A adoção de SQL é motivada pela necessidade de armazenar, consultar e gerenciar dados de maneira estruturada e relacional. O SQL fornece um modelo de dados poderoso para sistemas que requerem transações consistentes e consultas complexas."
    },

    {
        answer: "NoSQL",
        explanation: "Motivação: A escolha de NoSQL é motivada por cenários em que a flexibilidade e a escalabilidade são mais importantes do que a consistência transacional estrita. NoSQL é adequado para armazenar e recuperar dados não estruturados ou semiestruturados, como dados de mídia social e logs de eventos."
    },

    {
        answer: "SOAP",
        explanation: "Motivação: A utilização de SOAP (Simple Object Access Protocol) é motivada por requisitos de comunicação estruturada e padronizada em ambientes corporativos. Ele fornece um modelo de mensagens com uma forte definição de tipos e é adequado para integrações entre sistemas empresariais."
    },

    {
        answer: "REST",
        explanation: "Motivação: A escolha de REST (Representational State Transfer) é motivada pela necessidade de uma abordagem simples e escalável para a exposição de serviços na web. REST usa métodos HTTP padrão e é amplamente adotado para criar APIs web de fácil consumo e interação."
    },

    {
        answer: "Safety",
        explanation: "Motivação: A ênfase na segurança é fundamental para proteger os sistemas e os dados contra ameaças. A decisão de priorizar a segurança é motivada pela necessidade de proteger informações confidenciais, garantir a integridade dos dados e prevenir vulnerabilidades."
    },

    {
        answer: "Usability",
        explanation: "Motivação: A usabilidade é priorizada para criar uma experiência de usuário agradável e eficaz. Isso é motivado pela necessidade de criar produtos e sistemas que sejam fáceis de usar, atraentes para os usuários e atendam às suas necessidades de forma eficiente."
    },
];

module.exports = defaultMotivations;
