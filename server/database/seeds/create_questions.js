module.exports = {
    async seed(knex){
        await knex('questions').insert([
            {
                question: 'Quanto maior a superposição dos nichos ecológicos de duas espécies, maior será ...',
                option_1: 'a competição',
                option_2: 'a protocooperação',
                option_3: 'o potencial biótico',
                option_4: 'o bioma',
                answer: 0
            },
            {
                question: 'Termo adotado por Van Potter em 1970/71 para integrar aspectos das ciências naturais com valores humanos, viabilizando o que ele chamou de “Ponte para o Futuro”',
                option_1: 'Alelobiose',
                option_2: 'Bioética',
                option_3: 'Biotecnologia',
                option_4: 'Sociobiologia',
                answer: 1
            },
            {
                question: 'As características abaixo são observadas e primatas do novo mundo, exceto:',
                option_1: 'cauda preênsil',
                option_2: 'geralmente arborícolas',
                option_3: 'polegares opositores',
                option_4: 'nariz achatado, com narinas abertas para os lados',
                answer: 2
            },
            {
                question: 'Qual o dedo mais importante dos hominídeos?',
                option_1: 'anelar',
                option_2: 'médio',
                option_3: 'indicador',
                option_4: 'polegar',
                answer: 3
            },
            {
                question: 'Como são chamadas as espécies que possuem nichos ecológicos semelhantes, porém habitam regiões geográficas distintas?',
                option_1: 'competidoras',
                option_2: 'equivalentes ecológicos',
                option_3: 'sinfílicas',
                option_4: 'pioneiras',
                answer: 1
            },
            {
                question: 'Papagaio verdadeiro, pipira vermelha e sanhaço são pássaros frugívoros. Portanto, pertencem à mesma ...',
                option_1: 'família',
                option_2: 'guilda',
                option_3: 'classe',
                option_4: 'ordem',
                answer: 1
            },
            {
                question: 'O nicho ecológico da espécie humana é muito amplo. Por este motivo a espécie é considerada ...',
                option_1: 'cosmopolita',
                option_2: 'especialista',
                option_3: 'generalista',
                option_4: 'euriécia',
                answer: 2
            },
            {
                question: 'Qual desses primatas pertence à mesma família do gorila?',
                option_1: 'chimpanzé',
                option_2: 'gibão',
                option_3: 'bugio',
                option_4: 'babuíno',
                answer: 0
            },
            {
                question: 'A quem é classicamente atribuído o princípio da exclusão competitiva?',
                option_1: 'Charles Elton',
                option_2: 'Georgy Gause',
                option_3: 'Eugene Odum',
                option_4: 'George Evelyn Hutchinson',
                answer: 1
            },
            {
                question: 'Qual dessas NÃO é uma referência ao nicho ecológico de uma espécie?',
                option_1: 'função ecológica',
                option_2: 'posição trófica',
                option_3: 'endereço',
                option_4: 'profissão',
                answer: 2
            },
            {
                question: 'Eventualmente, indivíduos de espécies diferentes, porém aparentadas, conseguem cruzar e originar filhotes, aos quais chamamos de ...',
                option_1: 'híbridos',
                option_2: 'intersexuados',
                option_3: 'ginandromorfos',
                option_4: 'espécies exóticas',
                answer: 0
            },
            {
                question: 'Qual desses animais tem pai e mãe da mesma espécie?',
                option_1: 'mula',
                option_2: 'orangotango',
                option_3: 'ligre',
                option_4: 'tambacu',
                answer: 1
            },
            {
                question: 'Qual desses ambientes contém maior biodiversidade de espécies?',
                option_1: 'Floresta Amazônica',
                option_2: 'Deserto de Atacama',
                option_3: 'Lago Titicaca',
                option_4: 'Lagoa da Pampulha',
                answer: 0
            },
            {
                question: 'Como é chamada uma espécie que se encontra fora de sua área de distribuição natural?',
                option_1: 'dominante',
                option_2: 'exótica',
                option_3: 'chave',
                option_4: 'autóctone',
                answer: 1
            },
            {
                question: 'Das extinções em massa, a mais conhecida pelo desaparecimento dos dinossauros, é a que ocorreu há cerca de...',
                option_1: '450 milhões de anos',
                option_2: '377 milhões de anos',
                option_3: '351 milhões de anos',
                option_4: '65 milhões de anos',
                answer: 3
            },
            {
                question: 'Qual desses animais já foi extinto?',
                option_1: 'mico-leão-dourado',
                option_2: 'onça pintada',
                option_3: 'lobo guará',
                option_4: 'tiranossauro',
                answer: 3
            },
            {
                question: 'Principal evento pelo qual muitas espécies continentais da fauna brasileira se tornam ameaçadas:',
                option_1: 'degradação de habitat',
                option_2: 'tráfico ilegal',
                option_3: 'coleta de ovos',
                option_4: 'tsunami',
                answer: 0
            },
            {
                question: 'Ave integrante da lista de espécies ameaçadas de extinção, por conta da perda de habitat, captura e tráfico ilegal:',
                option_1: 'ararinha azul',
                option_2: 'bem-te-vi',
                option_3: 'pardal',
                option_4: 'pássaro dodô',
                answer: 0
            },
            {
                question: 'A multiplicidade da vida em seres de muitas formas, cores e tamanhos, adaptados à sobrevivência nos mais variados ambientes:',
                option_1: 'alelobiose',
                option_2: 'biodiversidade',
                option_3: 'hot spot',
                option_4: 'nicho ecológico',
                answer: 1
            },
            {
                question: 'Proteínas específicas de defesa elaboradas por células competentes do sistema imunológico:',
                option_1: 'anticorpos',
                option_2: 'antígenos',
                option_3: 'vacinas',
                option_4: 'lectinas',
                answer: 0
            },
            {
                question: 'Como pode ser chamada a variabilidade genética dentro da mesma espécie?',
                option_1: 'genoma específico',
                option_2: 'biodiversidade interespecífica ',
                option_3: 'biodiversidade intraespecífica',
                option_4: 'antibiodiversisade',
                answer: 2
            },
            {
                question: 'Quais dessas são fontes de variabilidade nos seres vivos?',
                option_1: 'seleção natural e deriva genética',
                option_2: 'clonagem e monocultura ',
                option_3: 'mutação e recombinação genética',
                option_4: 'mutação e seleção natural',
                answer: 2
            },
            {
                question: 'Qual o termo usado para a vida animal de uma determinada região?',
                option_1: 'fauna',
                option_2: 'flora',
                option_3: 'biota',
                option_4: 'zoocoria',
                answer: 0
            },
            {
                question: 'Qual desses é um mamífero brasileiro criticamente em perigo de extinção?',
                option_1: 'mero',
                option_2: 'guaiamum',
                option_3: 'guariba',
                option_4: 'elefante',
                answer: 2
            },
            {
                question: 'Qual desses não tem relação com o aumento da biodiversidade?',
                option_1: 'evolução',
                option_2: 'mutação',
                option_3: 'apoptose',
                option_4: 'recombinação gênica',
                answer: 2
            },
            {
                question: 'Espécies exóticas invasoras podem provocar desequilíbrios ecológicos porque geralmente...',
                option_1: 'não possuem predadores naturais',
                option_2: 'não competem com espécies locais',
                option_3: 'apresentam elevada taxa de migração',
                option_4: 'cruzam com várias espécies locais',
                answer: 0
            },
            {
                question: 'Em relação à coloração da pelagem de coelhos, qual dessas é a variedade selvagem?',
                option_1: 'aguti',
                option_2: 'albino',
                option_3: 'chinchila',
                option_4: 'himalaia',
                answer: 0
            },
            {
                question: 'Qual o termo usado para o conjunto de vegetais de uma determinada região?',
                option_1: 'fauna',
                option_2: 'flora',
                option_3: 'biota',
                option_4: 'epifitismo',
                answer: 1
            },
    ])
    }
}