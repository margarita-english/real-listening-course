import type { Unit } from '../types'

const unit11: Unit = {
  slug: 'unit11-scott',
  title: 'Unit 11 — Scott',
  subtitle: 'A Place I Know Well',
  steps: [
    // ─── 1. PRE-LISTENING COMPREHENSION ─────────────────────────────────────
    {
      id: '1a',
      kind: 'mcq',
      sectionLabel: '1. Pre-Listening Comprehension',
      part: 'A  Schema building',
      instruction:
        'We heard Scott talking about his family in Unit 3. Scott is a 23-year-old man from Australia. How much do you know about Australia? Circle the correct answer.',
      questions: [
        {
          number: 1,
          stem: 'Australia is the',
          options: ['fourth', 'fifth', 'sixth'],
          answer: 'sixth',
        },
        {
          number: 2,
          stem: 'About ___ percent of the population of Australia live in the country\'s 10 largest cities, mainly on the eastern seaboard and in the south-eastern corner.',
          options: ['30', '50', '70'],
          answer: '70',
        },
        {
          number: 3,
          stem: 'Residents of Australia born overseas make up about',
          options: ['one quarter', 'one half', 'two thirds'],
          answer: 'one quarter',
        },
        {
          number: 4,
          stem: 'The capital of Australia is',
          options: ['Canberra', 'Sydney', 'Adelaide'],
          answer: 'Canberra',
        },
      ],
    },

    {
      id: '1b',
      kind: 'qa',
      sectionLabel: '1. Pre-Listening Comprehension',
      part: 'B  Discussion',
      instruction: 'Think about the questions. Write your answers in the answer box and receive feedback.',
      questions: [
        { number: 1, question: 'Do you know anything else about Australia?' },
        { number: 2, question: 'Why do you think Scott decided to leave Australia and go to live in London?' },
        { number: 3, question: 'Do you know what an Australian accent sounds like?' },
      ],
    },

    {
      id: '1c',
      kind: 'gapFill',
      sectionLabel: '1. Pre-Listening Comprehension',
      part: 'C  Normalisation',
      audioFile: 'unit11/176.mp3',
      audioLabel: 'Track 176',
      instruction:
        'This exercise is designed to help you get used to Scott\'s voice. Before you listen, try to predict which words, or which types of words (nouns, adjectives, prepositions, parts of verbs, etc.) will fit in the gaps. Then listen and check your answers.',
      questions: [
        { number: 1,  text: 'Maida Vale is ___ ___ from Regent\'s Park.',                                     answers: ['not', 'far'] },
        { number: 2,  text: 'Scott ___ to Maida Vale just over a ___ ago.',                                   answers: ['moved', 'year'] },
        { number: 3,  text: 'He says Maida Vale is ___ a ___ nice part of London.',                           answers: ['actually', 'really'] },
        { number: 4,  text: 'It\'s very ___.',                                                                answers: ['quiet'] },
        { number: 5,  text: 'The ___ are very wide.',                                                         answers: ['streets'] },
        { number: 6,  text: '___ lives in mansionettes.',                                                     answers: ['Everyone'] },
        { number: 7,  text: 'When you ___ down the ___, every house ___ exactly the same.',                   answers: ['walk', 'street', 'looks'] },
        { number: 8,  text: 'Mansionettes are something the ___ are keen on, according to Scott.',            answers: ['French'] },
        { number: 9,  text: 'A mansionette is ___ a block of two- or three-___ ___.',                        answers: ['basically', 'bedroom', 'apartments'] },
        { number: 10, text: 'Scott\'s address is ___ Elgin Mansions and there is another ___ next ___ called Biddulph Mansions.', answers: ['96', 'block', 'door'] },
      ],
    },

    // ─── 2. LISTENING COMPREHENSION ─────────────────────────────────────────
    {
      id: '2a',
      kind: 'qa',
      sectionLabel: '2. Listening Comprehension',
      part: 'A  Questions',
      audioFile: 'unit11/177.mp3',
      audioLabel: 'Track 177',
      instruction:
        'In this first exercise, Scott talks about Maida Vale and the apartment he shares. Listen and answer the questions.',
      questions: [
        { number: 1, question: 'What are mansion blocks in Maida Vale made from?',                            modelAnswer: 'Red brick.' },
        { number: 2, question: 'What is Maida Vale full of?',                                                 modelAnswer: 'Canals.' },
        { number: 3, question: 'How many people live in Scott\'s apartment altogether?',                      modelAnswer: 'Four people (Scott and three others).' },
        { number: 4, question: 'Describe them.',                                                              modelAnswer: 'There is a couple in the main bedroom and Scott plus one other single man in the two single rooms.' },
        { number: 5, question: 'How many single and double bedrooms are there?',                              modelAnswer: 'One double bedroom and two single bedrooms (a three-bedroom apartment).' },
        { number: 6, question: 'Which rooms do Scott and his flatmates share?',                               modelAnswer: 'The living room, the kitchen, and the bathroom.' },
        { number: 7, question: 'Why do young people in London tend to share flats?',                          modelAnswer: 'Because the rent in London is quite expensive.' },
      ],
    },

    {
      id: '2b',
      kind: 'gapFill',
      sectionLabel: '2. Listening Comprehension',
      part: 'B  Gap-Fill',
      audioFile: 'unit11/178.mp3',
      audioLabel: 'Track 178',
      instruction:
        'Scott talks some more about flat-sharing. Before you listen, try to predict which words, or which types of words (nouns, adjectives, parts of verbs, etc.) will fit in the gaps. Then listen and check your answers.',
      questions: [
        { number: 1, text: 'Scott says he\'s quite ___ because he and his flatmates ___ on well.',            answers: ['lucky', 'get'] },
        { number: 2, text: 'They live like a ___.',                                                           answers: ['family'] },
        { number: 3, text: 'They ___ the cooking.',                                                           answers: ['share'] },
        { number: 4, text: 'When Scott first ___ to London he wanted to live somewhere a bit ___.',           answers: ['got', 'cheaper'] },
        { number: 5, text: 'At one time he was ___ with up to ___ people.',                                   answers: ['sharing', 'ten'] },
      ],
    },

    {
      id: '2c',
      kind: 'qa',
      sectionLabel: '2. Listening Comprehension',
      part: 'C  Questions',
      audioFile: 'unit11/179.mp3',
      audioLabel: 'Track 179',
      instruction:
        'Scott talks about his previous accommodation. Listen and answer the questions.',
      questions: [
        { number: 1, question: 'Which countries did Scott\'s flatmates in his first flat come from?', modelAnswer: 'Australia, New Zealand, and Germany (Aussies, Kiwis, and Germans).' },
        { number: 2, question: 'In which part of London was Scott\'s first flatshare?',              modelAnswer: 'Shepherd\'s Bush.' },
      ],
    },

    {
      id: '2d',
      kind: 'gapFill',
      sectionLabel: '2. Listening Comprehension',
      part: 'D  Gap-Fill',
      audioFile: 'unit11/180.mp3',
      audioLabel: 'Track 180',
      instruction:
        'Scott talks about how happy he is living in Maida Vale. As with Exercise B, try to predict which words, or which types of words (nouns, adjectives, prepositions, parts of verbs, etc.) will fit in the gaps. Then listen and check your answers.',
      questions: [
        { number: 1, text: 'Scott says it was great ___ sharing with lots of people, but it got a bit much after a ___.',    answers: ['fun', 'while'] },
        { number: 2, text: 'Scott says where he lives now is ___ ___ to his first flatshare.',                              answers: ['luxury', 'compared'] },
        { number: 3, text: 'He isn\'t ___ to move any time ___.',                                                           answers: ['planning', 'soon'] },
        { number: 4, text: 'Scott says he certainly ___ ___ to buy a house in Maida Vale.',                                 answers: ['couldn\'t', 'afford'] },
        { number: 5, text: 'Another word for rich is \'___\'.',                                                             answers: ['affluent'] },
        { number: 6, text: 'Maida Vale is quite near St. ___ ___, which is ___ distance to Lords cricket ground.',         answers: ['John\'s', 'Wood', 'walking'] },
        { number: 7, text: 'Scott is a cricket ___.',                                                                       answers: ['fan'] },
      ],
    },

    {
      id: '2e',
      kind: 'qa',
      sectionLabel: '2. Listening Comprehension',
      part: 'E  Questions',
      audioFile: 'unit11/181.mp3',
      audioLabel: 'Track 181',
      instruction:
        'Scott talks about making the most of where you live. Listen and answer the questions.',
      questions: [
        { number: 1, question: 'Which other area is Maida Vale close to?',                                      modelAnswer: 'St John\'s Wood and Little Venice.' },
        { number: 2, question: 'What does London have a lot of?',                                               modelAnswer: 'Canals.' },
        { number: 3, question: 'When does Scott like walking from Maida Vale to Regent\'s Park and Camden Town?', modelAnswer: 'In summer.' },
        { number: 4, question: 'Where did Scott move to Maida Vale from?',                                      modelAnswer: 'Hammersmith.' },
        { number: 5, question: 'Which water sport did Scott take up when he lived there?',                      modelAnswer: 'Rowing.' },
        { number: 6, question: 'Where did he use to go running?',                                               modelAnswer: 'Along the River Thames.' },
      ],
    },

    {
      id: '2f',
      kind: 'gapFill',
      sectionLabel: '2. Listening Comprehension',
      part: 'F  Gap-Fill',
      audioFile: 'unit11/182.mp3',
      audioLabel: 'Track 182',
      instruction:
        'Scott talks about exercise. As with Exercises B and D, try to predict which words, or which types of words, will fit in the gaps. Then listen and check your answers.',
      questions: [
        { number: 1, text: 'The interviewer asks if Scott is ___ down as he gets ___.',                         answers: ['slowing', 'older'] },
        { number: 2, text: 'She points out that before moving to Maida Vale, Scott used to go ___ along the ___.',  answers: ['jogging', 'river'] },
        { number: 3, text: 'Now he spends his free time ___ along the canal bank and ___ cricket.',             answers: ['walking', 'watching'] },
        { number: 4, text: 'Scott admits he is doing less ___ than he was two years ago.',                      answers: ['exercise'] },
      ],
    },

    // ─── 3. INTERESTING LANGUAGE POINTS ─────────────────────────────────────
    {
      id: '3a',
      kind: 'info',
      sectionLabel: '3. Interesting Language Points',
      part: 'A  Using the present simple and the present continuous',
      instruction: 'Read the grammar notes below.',
      body: [
        'We generally use the <strong>present simple</strong> to talk about facts and things that happen regularly. Look at how Scott uses the present simple in the following excerpts from the interview:',
      ],
      excerpts: [
        'At the moment I <u>live</u> in Maida Vale.',
        'Everyone <u>lives</u> in mansionettes, so you <u>walk</u> down the street and every house <u>looks</u> exactly the same.',
      ],
    },

    {
      id: '3a2',
      kind: 'info',
      sectionLabel: '3. Interesting Language Points',
      part: 'A  Using the present simple and the present continuous (continued)',
      instruction: 'Read the grammar notes below.',
      body: [
        'We generally use the <strong>present continuous</strong> when we are talking about things that are happening at the moment, as in these excerpts:',
      ],
      excerpts: [
        'I\'m not <u>planning</u> to move any time soon.',
        'Do you think you\'re <u>slowing</u> down as you\'re <u>getting</u> older?',
        'Now you\'re <u>walking</u> along canal banks...',
        'I\'m certainly <u>doing</u> less exercise than I was two years ago...',
      ],
    },

    {
      id: '3b',
      kind: 'info',
      sectionLabel: '3. Interesting Language Points',
      part: 'B  Using the simple past and the past continuous',
      instruction: 'Read the grammar notes below.',
      body: [
        'We use the <strong>simple past</strong> to talk about completed actions in the past. We often use the simple past with a time expression, as in this excerpt:',
      ],
      excerpts: [
        'I <u>moved</u> there about a year... a bit over a year ago.',
      ],
    },

    {
      id: '3b2',
      kind: 'info',
      sectionLabel: '3. Interesting Language Points',
      part: 'B  Using the simple past and the past continuous (continued)',
      instruction: 'Read the grammar notes below.',
      body: [
        'We use the <strong>past continuous</strong> when we are talking about an action which continued for some time in the past:',
      ],
      excerpts: [
        '\'This time last year I <u>was living</u> in Tokyo.\'',
        '\'I <u>was having</u> a bath when you <u>called</u>, that\'s why it went to voicemail.\'',
        '\'We <u>were walking</u> home last night when suddenly it <u>started</u> to snow.\'',
        'When I first <u>got</u> to London, obviously I <u>was looking</u> for something a bit cheaper.',
        'Well, first you <u>were jogging</u> and things on the river. Now you\'re walking along canal banks...',
      ],
    },

    {
      id: '3c',
      kind: 'noticeListen',
      sectionLabel: '3. Interesting Language Points',
      part: 'C  The Australian accent and the letter i',
      audioFile: 'unit11/183.mp3',
      audioLabel: 'Track 183',
      instruction: 'Listen to how Scott pronounces the letter i in the following excerpts.',
      intro:
        'Australian native speakers tend to pronounce the letter <em>i</em> with more rounded lips and a more curled tongue than British native speakers so that it almost sounds like the letter <em>o</em> is followed by the letter <em>i</em>, as in the word <em>toy</em>.',
      items: [
        { number: 1, text: 'very... um, w<strong>i</strong>de streets' },
        { number: 2, text: 'It\'s certa<strong>i</strong>nly a term <strong>I</strong> wasn\'t fam<strong>i</strong>l<strong>i</strong>ar w<strong>i</strong>th unt<strong>i</strong>l <strong>I</strong> came to London.' },
        { number: 3, text: 'I\'m certa<strong>i</strong>nly do<strong>i</strong>ng less exerc<strong>i</strong>se than <strong>I</strong> was two years ago.' },
      ],
    },

    {
      id: '3d',
      kind: 'noticeListen',
      sectionLabel: '3. Interesting Language Points',
      part: 'D  The Australian accent and rising intonation',
      audioFile: 'unit11/184.mp3',
      audioLabel: 'Track 184',
      instruction: 'Listen to how Scott pronounces these excerpts from the interview.',
      intro:
        'Australian native speakers often use <strong>rising intonation</strong> for statements when British native speakers would use falling intonation, although nowadays many young British native speakers also use rising intonation for statements.',
      items: [
        { number: 1, text: 'at the moment I live in Maida Vale↗' },
        { number: 2, text: 'there\'s particularly a lot of rich, rich houses there↗' },
        { number: 3, text: 'it\'s also close to an area called Little Venice↗' },
      ],
    },

    // ─── 4. FURTHER LISTENING PRACTICE ──────────────────────────────────────
    {
      id: '4a',
      kind: 'noticeListen',
      sectionLabel: '4. Further Listening Practice',
      part: 'A  Recognising sentence stress',
      audioFile: 'unit11/185.mp3',
      audioLabel: 'Track 185',
      instruction:
        'Stressed words are the most important in spoken English because they carry the most meaning. Which words do you think Scott stresses in the following extracts? Underline them. Then listen to check your answers.',
      intro:
        'Try to underline the stressed words in each sentence before listening. Then check against the answers below.',
      revealLabel: 'Show stressed words',
      revealContent: `1. It's certainly a term I wasn't <u>familiar</u> with until I came to <u>London</u>
2. so my address is 96 <u>Elgin</u> <u>Mansions</u>
3. Maida Vale is <u>full</u> of three or four-bed... three or <u>two</u>-bedroom <u>apartments</u>, basically.
4. I live in a <u>three</u>-bedroom one.
5. there's a <u>couple</u> in the <u>main</u> room
6. we <u>share</u> the living room and we share <u>kitchen</u> and we share <u>bathroom</u>
7. But er, when I first got to London obviously I was looking for something a bit <u>cheaper</u>, even then.
8. I certainly <u>couldn't afford</u> to buy a house there.
9. So yeah, it is quite a, quite an <u>affluent</u> area.
10. I'm certainly doing <u>less</u> exercise than I was <u>two years ago</u>.`,
      items: [
        { number: 1,  text: 'It\'s certainly a term I wasn\'t familiar with until I came to London' },
        { number: 2,  text: 'so my address is 96 Elgin Mansions' },
        { number: 3,  text: 'Maida Vale is full of three or four-bed... three or two-bedroom apartments, basically.' },
        { number: 4,  text: 'I live in a three-bedroom one.' },
        { number: 5,  text: 'there\'s a couple in the main room' },
        { number: 6,  text: 'we share the living room and we share kitchen and we share bathroom' },
        { number: 7,  text: 'But er, when I first got to London obviously I was looking for something a bit cheaper, even then.' },
        { number: 8,  text: 'I certainly couldn\'t afford to buy a house there.' },
        { number: 9,  text: 'So yeah, it is quite a, quite an affluent area.' },
        { number: 10, text: 'I\'m certainly doing less exercise than I was two years ago.' },
      ],
    },

    {
      id: '4b',
      kind: 'noticeListen',
      sectionLabel: '4. Further Listening Practice',
      part: 'B  Linking',
      audioFile: 'unit11/186.mp3',
      audioLabel: 'Track 186',
      instruction:
        'Linking occurs when the end of one word runs into the start of the next word. It is very common in informal spoken English, but less so in more formal English, such as speeches or lectures.',
      intro:
        'The most common linking occurs between the letter <em>-s</em> at the end of a word when the next word begins with a vowel, as in these excerpts from the interview:',
      items: [
        { number: 1, text: 'Everyone lives_in mansionettes.' },
        { number: 2, text: 'every house looks_exactly the same' },
        { number: 3, text: 'there\'s_a couple in the main room' },
      ],
    },

    {
      id: '4b2',
      kind: 'noticeListen',
      sectionLabel: '4. Further Listening Practice',
      part: 'B  Linking (continued)',
      audioFile: 'unit11/187.mp3',
      audioLabel: 'Track 187',
      instruction:
        'However, linking also occurs with other sounds. Mark where linking occurs in these excerpts, then listen to check your answers.',
      intro:
        'Mark where linking occurs in the sentences below, then listen to check.',
      revealLabel: 'Show linking marks',
      revealContent: `1. I live_in Maida Vale, which is_not far from here_at Regent's Park and the_Academy...
2. It's basically_a block_of um, apartments – two_or three-bedroom apartments – stacked_on top_of each_other.
3. And they're_often referred to_as 'mansions'.
4. So your_address is 96 Elgin Mansions...
5. And it's_also close_to_an_area called Little Venice`,
      items: [
        { number: 1, text: 'I live in Maida Vale, which is not far from here at Regent\'s Park and the Academy...' },
        { number: 2, text: 'It\'s basically a block of um, apartments – two or three-bedroom apartments – stacked on top of each other.' },
        { number: 3, text: 'And they\'re often referred to as \'mansions\'.' },
        { number: 4, text: 'So your address is 96 Elgin Mansions...' },
        { number: 5, text: 'And it\'s also close to an area called Little Venice' },
      ],
    },

    {
      id: '4c',
      kind: 'gapFill',
      sectionLabel: '4. Further Listening Practice',
      part: 'C  Features of spoken English: elision and the glottal stop',
      audioFile: 'unit11/188.mp3',
      audioLabel: 'Track 188',
      instruction:
        'This gap-fill exercise focuses on words which you probably know already, but whose pronunciation has changed because of elision or Scott\'s use of the glottal stop. Try to fill in the gaps before you listen to the excerpts, and discuss your predictions with your teacher. Then listen and fill in the gaps.',
      questions: [
        { number: 1,  text: 'I ___ there about a year... a ___ over a year ago.',                                    answers: ['moved', 'bit'] },
        { number: 2,  text: 'it\'s actually a really nice ___ of London',                                            answers: ['part'] },
        { number: 3,  text: 'And they\'re often ___ to as \'mansions\'.',                                            answers: ['referred'] },
        { number: 4,  text: 'so I ___ know exactly what the definition of a mansionette is',                         answers: ['don\'t'] },
        { number: 5,  text: '___ people renting in London – certainly people of my age – if they\'re renting ___ to be sharing with someone', answers: ['Most', 'tend'] },
        { number: 6,  text: '___ because the, the, the rent in London is quite expensive',                            answers: ['Just'] },
        { number: 7,  text: 'we ___ on well',                                                                        answers: ['get'] },
        { number: 8,  text: 'I was looking for something a ___ cheaper even then',                                   answers: ['bit'] },
        { number: 9,  text: 'which was ___ fun',                                                                     answers: ['great'] },
        { number: 10, text: 'so I think what I\'ve ___ now is luxury ___ to that',                                   answers: ['got', 'compared'] },
        { number: 11, text: 'by sharing a house with a few others we can ___ to rent there',                         answers: ['afford'] },
        { number: 12, text: 'it\'s also close to an area ___ Little Venice',                                         answers: ['called'] },
        { number: 13, text: 'so I ___ to make the most of the river by taking up rowing and going for runs along the river', answers: ['tried'] },
        { number: 14, text: 'Regent\'s Park and Lords are the ___ of highlights of that area.',                      answers: ['sort'] },
        { number: 15, text: 'I\'ll probably ___ back into running er, when the weather picks up a ___',              answers: ['get', 'bit'] },
      ],
    },

    // ─── 5. FURTHER LANGUAGE DEVELOPMENT ────────────────────────────────────
    {
      id: '5a',
      kind: 'wordBank',
      sectionLabel: '5. Further Language Development',
      part: 'A  Extension exercise',
      instruction:
        'Fill in the blanks in these new sentences with words you heard during Scott\'s interview. The words are listed in the box to help you.',
      bank: ['crammed', 'distance', 'door', 'for', 'get', 'keen', 'most', 'part', 'rent', 'share', 'single', 'term'],
      questions: [
        { number: 1,  text: 'I specifically asked for a ___ room, not a double.',                                              answer: 'single' },
        { number: 2,  text: 'I know you\'re not very happy being away from your family, but you\'ve got to try to make the ___ of your time here.', answer: 'most' },
        { number: 3,  text: 'Do you ___ on well with your mother? I always argue with mine.',                                  answer: 'get' },
        { number: 4,  text: 'I won\'t have any cake, thanks. I\'m not very ___ on sweet things.',                             answer: 'keen' },
        { number: 5,  text: 'It was a wonderful flat, but the ___ was too much for me on my own.',                            answer: 'rent' },
        { number: 6,  text: 'Do you know the meaning of the Latin ___ tempus fugit?',                                         answer: 'term' },
        { number: 7,  text: 'It\'s a beautiful day. Would you like to go ___ a walk?',                                        answer: 'for' },
        { number: 8,  text: 'You can ___ my umbrella if you like. It\'s big enough for two.',                                  answer: 'share' },
        { number: 9,  text: 'In which ___ of Paris do you live? Perhaps I know it.',                                          answer: 'part' },
        { number: 10, text: 'When we go away we always get the people next ___ to feed our cat.',                              answer: 'door' },
        { number: 11, text: 'At my last job there were nearly 20 of us ___ into one small office the size of my living room.', answer: 'crammed' },
        { number: 12, text: 'Our flat is walking ___ from the tube, so we hardly use the car during the week.',                answer: 'distance' },
      ],
    },

    {
      id: '5b',
      kind: 'wordBank',
      sectionLabel: '5. Further Language Development',
      part: 'B  Phrasal verbs',
      instruction:
        'Scott uses a number of phrasal verbs in his interview. A phrasal verb is a verb followed by a preposition or adverb or both which changes the meaning of the main verb, as in this example: \'When are you going to give up smoking?\' Insert the missing preposition in each sentence. The phrasal verbs are taken from Scott\'s interview.',
      bank: ['for', 'into', 'on', 'up', 'up'],
      questions: [
        { number: 1, text: 'My parents took ___ golf when they retired.',                                      answer: 'up' },
        { number: 2, text: 'Do you get ___ well with your brother?',                                           answer: 'on' },
        { number: 3, text: 'I didn\'t open a book all summer, so it\'s going to be hard to get back ___ studying again.', answer: 'into' },
        { number: 4, text: 'As soon as the weather picks ___ I\'m going to start cycling to work.',            answer: 'up' },
        { number: 5, text: 'At last! I\'ve been looking ___ that sock for ages.',                              answer: 'for' },
      ],
    },

    {
      id: '5c',
      kind: 'wordBank',
      sectionLabel: '5. Further Language Development',
      part: 'C  Colloquial English',
      instruction:
        'Scott uses lots of colloquial English words and phrases in his interview. Colloquial English is found in informal spoken and written English, for example, when friends chat or write emails. Try to fit the words in the box into the sentences below. Two of the words are used twice.',
      bank: ['afford', 'age', 'at', 'bit', 'fun', 'lucky', 'most', 'much', 'same', 'stage', 'while'],
      questions: [
        { number: 1,  text: 'I can\'t really ___ that much. Have you got anything a ___ cheaper?',                            answer: 'afford / bit' },
        { number: 2,  text: 'We\'re very ___ because our flat is walking distance from where we work.',                       answer: 'lucky' },
        { number: 3,  text: 'You look exactly the ___ as when we were students! You haven\'t changed a bit.',                 answer: 'same' },
        { number: 4,  text: 'I left home a ___ over a year ago, but I still miss my family.',                                 answer: 'bit' },
        { number: 5,  text: 'I don\'t really like living out in the suburbs, but it\'s all I can ___, so I\'m trying to make the ___ of it.', answer: 'afford / most' },
        { number: 6,  text: 'The party was great ___, but I had to leave early to get the last bus home.',                    answer: 'fun' },
        { number: 7,  text: 'The snow looked beautiful at first, but it got a bit ___ after a ___.',                          answer: 'much / while' },
        { number: 8,  text: 'I\'m at bit busy ___ the moment. Can I call you back?',                                          answer: 'at' },
        { number: 9,  text: 'I don\'t see the problem! Most people my ___ stay out late on Friday nights. Why should I be any different?', answer: 'age' },
        { number: 10, text: 'At one ___ I was thinking of giving up university and getting a job, but I\'m glad I didn\'t.',  answer: 'stage' },
      ],
    },
  ],

  // ─── 6. TRANSCRIPT ────────────────────────────────────────────────────────
  transcriptAudioFile: 'unit11/189.mp3',
  transcript: [
    { speaker: 'I', text: 'Can you tell me where you live in London?' },
    { speaker: 'S', text: 'OK, yes. Er, at the moment I live in (1) Maida Vale, which is not far from here at (2) Regent\'s Park and (3) the Academy. Um, I moved there about a year ... (4) a bit over a year ago. So it\'s a ... it\'s actually a really nice part of London. Very quiet, very ... um, wide streets. Everyone lives in (5) mansionettes, so you walk down the street and every house looks exactly the same – or every block of apartments looks exactly the same.' },
    { speaker: 'I', text: 'Did you say \'mansionettes\' or?' },
    { speaker: 'S', text: 'Yeah, mansionettes. Um...' },
    { speaker: 'I', text: 'What do you mean by ...?' },
    { speaker: 'S', text: 'Er, that\'s (6) the term ... It\'s certainly a term I wasn\'t familiar with until I came to London. Er ... I think it\'s ... I think the French um, are particularly (7) keen on mansionettes. It\'s (8) basically a block of um, apartments, two or three-bedroom apartments, (9) stacked on top of each other.' },
    { speaker: 'I', text: 'Mhm, mm.' },
    { speaker: 'S', text: 'And they\'re often referred to as \'mansions\'. So my address is 96 Elgin Mansions, which is a block of apartments. And then next door is another block called Biddulph Mansions, but they\'re all er... So your address is 96 Elgin Mansions, Elgin Avenue, London.' },
    { speaker: 'I', text: 'I see.' },
    { speaker: 'S', text: 'Um, so I don\'t know exactly what the definition of a mansionette is, but um, I use it refer to the (10) red-brick-type housing that we have in Maida Vale which is three or four ... Maida Vale is full of three or four-bed ... three or two-bedroom apartments, basically and I, I live in a three-bedroom one with um, three other people, so there\'s (11) a couple in the main room and then there\'s me and another um, single (12) guy in the other single room.' },
    { speaker: 'I', text: 'So do you share a living room and a kitchen?' },
    { speaker: 'S', text: 'We, we share the living room and we share kitchen and we share bathroom. Um, most people (13) renting in London – certainly people of my age, if they\'re renting – (14) tend to be sharing with someone er, just because the, tbe, the rent in London is quite expensive um, so ... I\'m quite lucky – I\'ve got a lovely place and um, I\'m only sharing with three other people and we, we get on well and we live like a family, really. We share the cooking. But er, when I first got to London (15) obviously I was looking for something a bit cheaper even then and I was sharing with ... up to ten people (16) at one stage – ten (17) Aussies, (18) Kiwis, Germans (19) all crammed into one place in (20) Shepherd\'s Bush. So that was my first experience of... which was (21) great fun, but er, (22) it gets a bit much after a while. It\'s pretty much like living in a, in (23) a hostel.' },
    { speaker: 'I', text: 'Yes.' },
    { speaker: 'S', text: 'Er, so I think what I\'ve got now is luxury compared to that and I\'m very happy with Maida Vale and it\'s close to everything so um ... Yeah, I\'m not planning to move any time soon.' },
    { speaker: 'I', text: 'It\'s quite a rich area, I think.' },
    { speaker: 'S', text: 'Yeah, yeah. (24) I certainly couldn\'t afford to buy a house there. Um, but by sharing a house with a few others we can afford to rent there. So yeah, it is quite a, quite an (25) affluent area. Er, it\'s not far from (26) St John\'s Wood which is ... there\'s particularly a lot of rich, rich houses there.' },
    { speaker: 'I', text: 'Mhm, mm.' },
    { speaker: 'S', text: 'Um, and it\'s walking distance to Lord\'s cricket ground which, for me as a cricket fan, is a good thing. And it\'s also close to an area called Little Venice which is ... er, which I never knew existed in London, but there\'s a lot of um, (27) canals around London with um, with, like, canal boats like um, (28) gondolas, basically, er, similar to Venice, so they call it Little Venice and er, that\'s a nice place to visit, too.' },
    { speaker: 'I', text: 'So have you walked round at all?' },
    { speaker: 'S', text: 'Yeah, yeah. I walk along the canals um, in summer. You can walk all the way along the canals to Regent\'s Park, (29) Camden Town. So it\'s all about making the most of the area that you\'re living in at the time, so (30) prior to this I was in, in (31) Hammersmith which is on (32) the Thames, so I tried to make the most of the river by (33) taking up (34) rowing and going for runs along the river. So now, um, Maida Vale, it\'s the canals and Regent\'s Park and Lords are the sort of highlights of that area.' },
    { speaker: 'I', text: 'Do you think you\'re slowing down as you\'re getting older, \'cos er ...?' },
    { speaker: 'S', text: 'Not planning to!' },
    { speaker: 'I', text: 'Well, first you were (35) jogging and things along the river. Now you\'re walking along the canal bank ...' },
    { speaker: 'S', text: 'I see what you mean, yes!' },
    { speaker: 'I', text: '... and watching cricket.' },
    { speaker: 'S', text: 'Er, um, yeah. I\'ve, I\'m certainly doing less exercise than I was two years ago, but um ... yeah, that\'s just (36) a cyclical thing with me and (37) I\'ll probably get back into running er, (38) when the weather picks up a bit – might start doing a bit more of that.' },
  ],

  // ─── 7. WORDS AND PHRASES ─────────────────────────────────────────────────
  glossary: [
    { number: 1,  term: 'Maida Vale',               definition: 'an area of north London which lies between Paddington, St John\'s Wood and Kilburn' },
    { number: 2,  term: 'Regent\'s Park',            definition: 'the area around the Royal Park in the northern part of central London' },
    { number: 3,  term: 'the Academy',               definition: 'the interview took place at the Royal Academy of Music in London' },
    { number: 4,  term: 'a bit over',                definition: 'slightly over (in this case maybe a year and one or two months)' },
    { number: 5,  term: 'mansionettes',              definition: 'houses which look like mansions from the outside, but which contain separate flats/apartments' },
    { number: 6,  term: 'the term',                  definition: 'the expression' },
    { number: 7,  term: 'keen on',                   definition: 'like something' },
    { number: 8,  term: 'basically',                 definition: 'an adverb used when giving a simple explanation of something' },
    { number: 9,  term: 'stacked on top of each other', definition: 'one flat is on top of the other' },
    { number: 10, term: 'red-brick',                 definition: 'bricks are hard blocks of baked clay used to build houses, walls, etc.' },
    { number: 11, term: 'a couple',                  definition: 'two people who are considered together, usually in a romantic relationship' },
    { number: 12, term: 'guy',                       definition: 'an informal word for a man' },
    { number: 13, term: 'renting',                   definition: 'paying money to live somewhere' },
    { number: 14, term: 'tend to be sharing with someone', definition: 'are often/usually sharing with someone' },
    { number: 15, term: 'obviously',                 definition: 'clearly, evidently' },
    { number: 16, term: 'at one stage',              definition: 'at one time in his life' },
    { number: 17, term: 'Aussies',                   definition: 'an informal word for people from Australia' },
    { number: 18, term: 'Kiwis',                     definition: 'an informal word for people from New Zealand (because a bird called the kiwi is the native bird of New Zealand)' },
    { number: 19, term: 'all crammed into one place', definition: 'the flat was full of people' },
    { number: 20, term: 'Shepherd\'s Bush',          definition: 'a district of west London which borders Hammersmith' },
    { number: 21, term: 'great fun',                 definition: 'a good laugh; I enjoyed myself' },
    { number: 22, term: 'it gets a bit much after a while', definition: 'it becomes a bit difficult over time' },
    { number: 23, term: 'a hostel',                  definition: 'a very cheap type of hotel where each room contains two or more beds' },
    { number: 24, term: 'certainly couldn\'t afford to buy a house there', definition: 'he doesn\'t have enough money to buy a house there' },
    { number: 25, term: 'affluent',                  definition: 'describing an area where people have a lot of money' },
    { number: 26, term: 'St John\'s Wood',           definition: 'a district of northwest London near Regent\'s Park' },
    { number: 27, term: 'canals',                    definition: 'waterways which have been created by digging passages out of the ground' },
    { number: 28, term: 'gondolas',                  definition: 'narrow boats with flat bottoms found in Venice, which Scott thinks are similar to the narrow boats found on London\'s canals' },
    { number: 29, term: 'Camden Town',               definition: 'an area of northwest London close to Regent\'s Park' },
    { number: 30, term: 'prior to this',             definition: '(formal) before this' },
    { number: 31, term: 'Hammersmith',               definition: 'an area in west London on the north bank of the River Thames' },
    { number: 32, term: 'the Thames',                definition: 'the river which flows through London (pronounced \'Temse\')' },
    { number: 33, term: 'taking up',                 definition: 'starting an activity' },
    { number: 34, term: 'rowing',                    definition: 'sitting in a boat and pulling on oars to move it through the water' },
    { number: 35, term: 'jogging',                   definition: 'running slowly and steadily in order to exercise' },
    { number: 36, term: 'a cyclical thing',          definition: 'something which happens in cycles, i.e. something he does every few years' },
    { number: 37, term: 'I\'ll probably get back into running', definition: 'I\'ll probably start running regularly again' },
    { number: 38, term: 'when the weather picks up a bit', definition: 'when the weather improves (The interview took place in winter.)' },
  ],
}

export default unit11
