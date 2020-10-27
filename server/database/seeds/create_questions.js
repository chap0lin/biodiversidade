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
    ])
    }
}