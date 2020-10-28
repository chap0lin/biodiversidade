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
            {
                question: 'Foram os cristalógrafos responsáveis pelas imagens que ajudaram a revelar a configuração da molécula do DNA.',
                option_1: 'James Watson e Francis Crick',
                option_2: 'Rosalind Franklin e Maurice Wilkins',
                option_3: 'Hugh Davson e James Danielli',
                option_4: 'Erwin Chargaff e Linus Pauling',
                answer: 1
            },
            {
                question: 'Em que parte da célula ocorre a replicação do DNA?',
                option_1: 'complexo de Golgi',
                option_2: 'hialoplasma ',
                option_3: 'núcleo',
                option_4: 'retículo endoplasmático',
                answer: 2
            },
            {
                question: 'Qual base nitrogenada que ocorre no DNA, mas NÃO ocorre no RNA?',
                option_1: 'adenina',
                option_2: 'guanina',
                option_3: 'timina',
                option_4: 'uracila',
                answer: 2
            },
            {
                question: 'Um trabalho realizado por diversos países com a finalidade de desvendar a sequência de todos os pares de nucleotídeos do DNA de um organismo:',
                option_1: 'Vinculação Gênica',
                option_2: 'Dogma Central da Biologia',
                option_3: 'Mapeamento',
                option_4: 'Projeto Genoma',
                answer: 3
            },
            {
                question: 'O tipo de rearranjo cromossômico em que parte do cromossomo se quebra e se liga a um cromossomo não-homólogo é chamado...',
                option_1: 'deleção',
                option_2: 'inversão',
                option_3: 'não disjunção',
                option_4: 'translocação',
                answer: 3
            },
            {
                question: 'Mutação cromossômica numérica, que ocorre quando os cromossomos são duplicados e a célula não se divide, de modo que todos os pares de cromossomos homólogos são afetados:',
                option_1: 'aneuploidia',
                option_2: 'trissomia',
                option_3: 'poliploidia',
                option_4: 'translocação',
                answer: 2
            },
            {
                question: 'O termo ploidia relaciona-se ao número de cromossomos das células de um organismo. Em humanos, quase todas as células são:',
                option_1: 'haploides',
                option_2: 'diploides',
                option_3: 'triploides',
                option_4: 'poliploides',
                answer: 1
            },
            {
                question: 'Como é popularmente conhecido o quadro resultante da trissomia do cromossomo 21?',
                option_1: 'Síndrome de cri du chat',
                option_2: 'Síndrome de Down',
                option_3: 'Síndrome de Klinefelter',
                option_4: 'Síndrome de Turner ',
                answer: 1
            },
            {
                question: 'Refere-se à natureza da replicação do DNA:',
                option_1: 'conservativa',
                option_2: 'dispersiva',
                option_3: 'semiconservativa',
                option_4: 'citoplasmática',
                answer: 2
            },
            {
                question: 'Qual desses é um códon de finalização no RNA mensageiro?',
                option_1: 'AUG',
                option_2: 'UAG',
                option_3: 'CCC',
                option_4: 'CAG',
                answer: 1
            },
            {
                question: 'No caso em que a substituição de um nucleotídeo no DNA não provoca mudança na sequência de aminoácidos da proteína correspondente, a mutação é chamada:',
                option_1: 'mutação deletéria',
                option_2: 'missense mutation',
                option_3: 'mutação sinônima',
                option_4: 'nonsense mutation',
                answer: 2
            },
            {
                question: 'Na molécula do DNA, adenina e timina ligam-se por meio de...',
                option_1: 'ligação fosfodiéster',
                option_2: 'uma ponte de hidrogênio',
                option_3: 'duas pontes de hidrogênio',
                option_4: 'três pontes de hidrogênio',
                answer: 2
            },
            {
                question: 'Nos genes que apresentam a informação biológica descontínua, que seções são efetivamente codificadoras?',
                option_1: 'íntrons',
                option_2: 'éxons',
                option_3: 'promotores',
                option_4: 'UTR',
                answer: 1
            },
            {
                question: 'Como são chamadas as pequenas moléculas circulares de DNA, em bactérias, capazes de sofrer replicação independentemente do cromossomo?',
                option_1: 'ribossomos',
                option_2: 'fímbrias',
                option_3: 'microssomos',
                option_4: 'plasmídeos',
                answer: 3
            },
            {
                question: 'Forma-se quando vários ribossomos se ligam a uma molécula de mRNA, para que ocorra a síntese de várias moléculas da proteína:',
                option_1: 'peroxissomo',
                option_2: 'glioxissomo',
                option_3: 'polissomo',
                option_4: 'nucleossomo',
                answer: 2
            },
            {
                question: 'Qual dessas enzimas promove o desenrolamento da molécula de DNA, para o processo de replicação?',
                option_1: 'DNA Helicase',
                option_2: 'DNA Ligase',
                option_3: 'DNA Polimerase I',
                option_4: 'DNA Polimerase III',
                answer: 0
            },
            {
                question: 'Alteração citogenética associada à leucemia mieloide crônica, resulta de uma translocação recíproca envolvendo os cromossomos 9 a 22:',
                option_1: 'cromossomo Philadelphia',
                option_2: 'isocromossomo 22q',
                option_3: 'trissomia do 22',
                option_4: 'cromossomo em anel',
                answer: 0
            },
            {
                question: 'A organização molecular do DNA foi decifrada em 1953, por...',
                option_1: 'James Watson e Francis Crick',
                option_2: 'Rosalind Franklin e Maurice Wilkins',
                option_3: 'Hugh Davson e James Danielli',
                option_4: 'Erwin Chargaff e Linus Pauling',
                answer: 0
            },
            {
                question: 'Se uma das cadeias do DNA apresentar a sequência TAG CCC GTA, a região correspondente da outra cadeia apresentará...',
                option_1: 'TAG CCC GTA',
                option_2: 'UAG CCC GUA',
                option_3: 'ATC GGG CAT',
                option_4: 'AUC GGG CAU',
                answer: 2
            },
            {
                question: 'Qual desses cariótipos ocorre nas células de pacientes com Síndrome de Turner?',
                option_1: '46, XX',
                option_2: '46, XY',
                option_3: '45, X',
                option_4: '47, XXY',
                answer: 2
            },
            {
                question: 'Qual dessas pode ser consequência de uma não disfunção de cromossomos sexuais durante a meiose?',
                option_1: 'Síndrome de Klinefelter',
                option_2: 'Síndrome de Cri Du Chat',
                option_3: 'Síndrome de Down',
                option_4: 'Síndrome de Patau',
                answer: 0
            },
            {
                question: 'A enzima RNA polimerase destaca-se no processo de...',
                option_1: 'replicação',
                option_2: 'transcrição',
                option_3: 'tradução',
                option_4: 'transdução',
                answer: 1
            },
            {
                question: 'Como é chamada a retirada de íntrons do transcrito primário de RNA e reunião dos éxons?',
                option_1: 'splicing',
                option_2: 'crossing over',
                option_3: 'permafrost',
                option_4: 'ipso facto',
                answer: 0
            },
            {
                question: 'A diferença entre o DNA do chimpanzé e de humanos está...',
                option_1: 'abaixo dos 5%',
                option_2: 'entre 5% e 10%',
                option_3: 'entre 10% e 15%',
                option_4: 'entre 15% e 20%',
                answer: 0
            },
            {
                question: 'Como são chamados os monômeros das grandes moléculas de proteína?',
                option_1: 'aminoácidos',
                option_2: 'monossacarídeos',
                option_3: 'nucleotídeos',
                option_4: 'ácidos graxos',
                answer: 0
            },
            {
                question: 'Na espécie humana, qual dessas células é haploide?',
                option_1: 'neurônio',
                option_2: 'espermatozoide ',
                option_3: 'eritrócito',
                option_4: 'neutrófilo',
                answer: 1
            },
            {
                question: 'Qual desses componentes da célula contém informações para as características do organismo?',
                option_1: 'cromossomo',
                option_2: 'centríolo',
                option_3: 'lisossomo',
                option_4: 'peroxissomo',
                answer: 0
            },
            {
                question: 'O primeiro organismo a ter seu genoma completamente conhecido foi...',
                option_1: 'uma bactéria',
                option_2: 'uma levedura',
                option_3: 'um verme',
                option_4: 'uma planta',
                answer: 0
            },
            {
                question: 'Quais são as bases nitrogenadas pirimídicas do DNA?',
                option_1: 'adenina e guanina',
                option_2: 'citosina e timina',
                option_3: 'guanina e citosina',
                option_4: 'adenina e timina',
                answer: 1
            },
            {
                question: 'Segundo o modelo de Watson e Crick, na molécula do DNA as duas cadeias são...',
                option_1: 'paralelas',
                option_2: 'antiparalelas',
                option_3: 'perpendiculares',
                option_4: 'concêntricas',
                answer: 1
            },
            {
                question: 'Qual dessas enzimas viola o dogma central da biologia molecular?',
                option_1: 'DNA helicase',
                option_2: 'transcriptase reversa',
                option_3: 'DNA polimerase',
                option_4: 'RNA polimerase',
                answer: 1
            },
            {
                question: 'Qual dessas doenças resulta de mutação gênica por substituição de uma única base nitrogenada no DNA?',
                option_1: 'anemia falciforme',
                option_2: 'câncer cervical',
                option_3: 'leucemia mieloide crônica',
                option_4: 'síndrome de Down',
                answer: 0
            },
            {
                question: 'O genoma humano tem cerca de quantos genes?',
                option_1: '6000',
                option_2: '21000',
                option_3: '30000',
                option_4: '42000',
                answer: 1
            },
            {
                question: 'O Brasil entrou no cenário do estudo de genomas por ocasião do sequenciamento da...',
                option_1: 'levedura Saccharomyces cerevisiae',
                option_2: 'planta Arabidopsis thaliana',
                option_3: 'bactéria Xylella fastidiosa',
                option_4: 'bactéria Escherichia coli',
                answer: 2
            },
            {
                question: 'Quais dessas são as bases nitrogenadas púricas dos ácidos nucleicos?',
                option_1: 'adenina e citosina',
                option_2: 'citosina e timina',
                option_3: 'adenina e guanina',
                option_4: 'timina e uracila',
                answer: 2
            },
            {
                question: 'Na molécula do DNA, guanina e citosina ligam-se por meio de...',
                option_1: 'ligação fosfodiéster',
                option_2: 'uma ponte de hidrogênio',
                option_3: 'duas pontes de hidrogênio',
                option_4: 'três pontes de hidrogênio',
                answer: 3
            },
            {
                question: 'Que moléculas de RNA obedecem ao código genético, formando um elo físico e informacional entre a sequência de nucleotídeos do mRNA maduro e a sequência de aminoácidos no polipeptídeo?',
                option_1: 'rRNA',
                option_2: 'tRNA',
                option_3: 'hnRNA',
                option_4: 'snRNA',
                answer: 1
            },
            {
                question: 'Além do genoma nuclear, existem outros genomas, localizados em organelas citoplasmáticas. Quais são essas organelas?',
                option_1: 'mitocôndrias e cloroplastos',
                option_2: 'ribossomos e cromossomos',
                option_3: 'retículo endoplasmático e complexo de Golgi',
                option_4: 'lisossomos e vacúolos',
                answer: 0
            },
            {
                question: 'Qual desses cientistas propôs a Teoria Endossimbiótica?',
                option_1: 'Rosalind Franklin',
                option_2: 'Thomas Morgan',
                option_3: 'Lynn Margulis',
                option_4: 'Camilo Golgi',
                answer: 2
            },
            {
                question: 'Qual dessas NÃO se refere ao genoma mitocondrial humano?',
                option_1: 'abriga 37 genes',
                option_2: 'hereditariedade uniparental',
                option_3: 'duplo filamento circular',
                option_4: 'representa mais de 10% do DNA celular',
                answer: 3
            },
    ])
    }
}