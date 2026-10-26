// Original short A1 starter lessons; English support, no alphabet drills.
export const lessons = [
  {id:'hello', icon:'01', title:'Hello, I’m Polina', greek:'Γεια σου!', subtitle:'Meet someone. Say who you are.', time:'10–15 min', goal:'Introduce yourself and ask someone’s name.',
    note:'Greek often leaves out “I” and “you”: Είμαι η Πολίνα is enough. Names commonly take an article: η Πολίνα, ο Έβαν. The Greek question mark looks like a semicolon (;).',
    phrases:[['Γεια σου!','Hello! / Bye! (one person, informal)'],['Γεια σας!','Hello! (polite or plural)'],['Με λένε Πολίνα.','My name is Polina.'],['Πώς σε λένε;','What’s your name? (informal)'],['Είμαι η Πολίνα.','I’m Polina.'],['Χάρηκα!','Nice to meet you!']],
    dialogue:[['Έβαν','Γεια σου! Πώς σε λένε;','Hi! What’s your name?'],['Πολίνα','Με λένε Πολίνα. Εσένα;','My name is Polina. And yours?'],['Έβαν','Με λένε Έβαν. Χάρηκα!','My name is Evan. Nice to meet you!']],
    questions:[
      {id:'h1',prompt:'You meet a friend. How do you say “Hello”?',options:['Γεια σου!','Ευχαριστώ!','Νερό!'],answer:'Γεια σου!',explain:'Γεια σου is an informal greeting for one person.'},
      {id:'h2',prompt:'What does “Πώς σε λένε;” ask?',options:['How are you?','What’s your name?','Where is the café?'],answer:'What’s your name?',explain:'Πώς σε λένε; asks someone’s name. Notice the Greek question mark: ;'},
      {id:'h3',type:'build',prompt:'Build: “My name is Polina.”',words:['Πολίνα.','λένε','Με'],answer:'Με λένε Πολίνα.',explain:'Με λένε + name means “My name is …”.'},
      {id:'h4',prompt:'Choose the polite greeting for someone you do not know.',options:['Γεια σου!','Γεια σας!','Χάρηκα!'],answer:'Γεια σας!',explain:'Γεια σας is polite to one person, and also used for a group.'},
      {id:'h5',type:'build',prompt:'Build: “I’m Polina.”',words:['Πολίνα.','η','Είμαι'],answer:'Είμαι η Πολίνα.',explain:'Είμαι means “I am”. The article η goes with the feminine name Πολίνα.'}
    ]},
  {id:'day',icon:'02',title:'How are you today?',greek:'Τι κάνεις;',subtitle:'A little conversation goes a long way.',time:'10–15 min',goal:'Greet someone at different times and say how you feel.',
    note:'Τι κάνεις; literally means “What are you doing?”, but in a greeting it means “How are you?”. Καλημέρα is for the morning, καλησπέρα for later in the day. Καληνύχτα is a farewell before sleep or late at night.',
    phrases:[['Καλημέρα!','Good morning!'],['Καλησπέρα!','Good evening!'],['Καληνύχτα!','Good night!'],['Τι κάνεις;','How are you? (informal)'],['Είμαι καλά, ευχαριστώ.','I’m well, thank you.'],['Εσύ;','And you?'],['Έτσι κι έτσι.','So-so.']],
    dialogue:[['Έβαν','Καλημέρα! Τι κάνεις;','Good morning! How are you?'],['Πολίνα','Είμαι καλά, ευχαριστώ. Εσύ;','I’m well, thank you. And you?'],['Έβαν','Πολύ καλά!','Very well!']],
    questions:[
      {id:'d1',prompt:'It is morning. Choose a greeting.',options:['Καληνύχτα!','Καλημέρα!','Χάρηκα!'],answer:'Καλημέρα!',explain:'Καλημέρα means “Good morning”.'},
      {id:'d2',prompt:'Your friend asks “Τι κάνεις;”. Choose “So-so”.',options:['Έτσι κι έτσι.','Γεια σας!','Παρακαλώ.'],answer:'Έτσι κι έτσι.',explain:'Έτσι κι έτσι means “So-so”.'},
      {id:'d3',type:'build',prompt:'Build: “I’m well, thank you.”',words:['ευχαριστώ.','Είμαι','καλά,'],answer:'Είμαι καλά, ευχαριστώ.',explain:'Είμαι καλά says how you are; ευχαριστώ adds “thank you”.'},
      {id:'d4',prompt:'Which phrase would you say before going to bed?',options:['Καλημέρα!','Καληνύχτα!','Τι κάνεις;'],answer:'Καληνύχτα!',explain:'Καληνύχτα is a good-night farewell.'},
      {id:'d5',type:'build',prompt:'Build the informal question: “How are you?”',words:['κάνεις;','Τι'],answer:'Τι κάνεις;',explain:'Τι κάνεις; is a common greeting between people who know each other.'}
    ]},
  {id:'cafe',icon:'03',title:'A stop at the café',greek:'Έναν καφέ, παρακαλώ.',subtitle:'Order something small. Feel at home.',time:'10–15 min',goal:'Order a coffee or water and ask the price.',
    note:'Learn these as useful chunks: έναν καφέ (a coffee), ένα νερό (a water). After θέλω, masculine ένας becomes έναν; neuter ένα stays ένα. Θα ήθελα means “I would like” and is a polite ready-to-use phrase.',
    phrases:[['Θα ήθελα έναν καφέ.','I would like a coffee.'],['Ένα νερό, παρακαλώ.','A water, please.'],['Ευχαριστώ!','Thank you!'],['Παρακαλώ.','Please. / You’re welcome.'],['Πόσο κάνει;','How much is it?'],['Δύο ευρώ.','Two euros.'],['Ναι. / Όχι.','Yes. / No.']],
    dialogue:[['Πολίνα','Καλημέρα! Έναν καφέ, παρακαλώ.','Good morning! A coffee, please.'],['Σερβιτόρος','Βεβαίως!','Of course!'],['Πολίνα','Πόσο κάνει;','How much is it?'],['Σερβιτόρος','Δύο ευρώ.','Two euros.']],
    questions:[
      {id:'c1',prompt:'How do you add “please” to your order?',options:['Καλημέρα','Παρακαλώ','Όχι'],answer:'Παρακαλώ',explain:'Παρακαλώ means “please” in a request; it can also mean “you’re welcome”.'},
      {id:'c2',type:'build',prompt:'Build: “A water, please.”',words:['παρακαλώ.','νερό,','Ένα'],answer:'Ένα νερό, παρακαλώ.',explain:'Νερό is neuter, so we use ένα.'},
      {id:'c3',prompt:'You want to ask the price. Choose the question.',options:['Πώς σε λένε;','Τι κάνεις;','Πόσο κάνει;'],answer:'Πόσο κάνει;',explain:'Πόσο κάνει; means “How much is it?”.'},
      {id:'c4',type:'build',prompt:'Build: “I would like a coffee.”',words:['καφέ.','έναν','ήθελα','Θα'],answer:'Θα ήθελα έναν καφέ.',explain:'Θα ήθελα is a polite way to order. Use έναν καφέ as a complete chunk.'},
      {id:'c5',prompt:'The price is “Δύο ευρώ”. How much is it?',options:['One euro','Two euros','Three euros'],answer:'Two euros',explain:'Δύο means two. Ευρώ stays the same in the plural.'}
    ]}
];
export const questions = lessons.flatMap(l => l.questions.map(q => ({...q,lesson_id:l.id})));
