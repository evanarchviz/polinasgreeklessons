export const lessons = [
  {
    "id": "hello",
    "icon": "01",
    "title": "Greetings & introductions",
    "greek": "Γεια σου!",
    "subtitle": "Meet someone. Say who you are.",
    "time": "10–15 min",
    "goal": "Introduce yourself and ask someone’s name.",
    "note": "Greek often leaves out “I” and “you”: Είμαι η Πολίνα is enough. Names commonly take an article: η Πολίνα, ο Έβαν. The Greek question mark looks like a semicolon (;).",
    "phrases": [
      [
        "Γεια σου!",
        "Hello! / Bye! (one person, informal)"
      ],
      [
        "Γεια σας!",
        "Hello! (polite or plural)"
      ],
      [
        "Με λένε Πολίνα.",
        "My name is Polina."
      ],
      [
        "Πώς σε λένε;",
        "What’s your name? (informal)"
      ],
      [
        "Είμαι η Πολίνα.",
        "I’m Polina."
      ],
      [
        "Χάρηκα!",
        "Nice to meet you!"
      ]
    ],
    "dialogue": [
      [
        "Έβαν",
        "Γεια σου! Πώς σε λένε;",
        "Hi! What’s your name?"
      ],
      [
        "Πολίνα",
        "Με λένε Πολίνα. Εσένα;",
        "My name is Polina. And yours?"
      ],
      [
        "Έβαν",
        "Με λένε Έβαν. Χάρηκα!",
        "My name is Evan. Nice to meet you!"
      ]
    ],
    "questions": [
      {
        "id": "h1",
        "prompt": "You meet a friend. How do you say “Hello”?",
        "options": [
          "Γεια σου!",
          "Ευχαριστώ!",
          "Νερό!"
        ],
        "answer": "Γεια σου!",
        "explain": "Γεια σου is an informal greeting for one person."
      },
      {
        "id": "h2",
        "prompt": "What does “Πώς σε λένε;” ask?",
        "options": [
          "How are you?",
          "What’s your name?",
          "Where is the café?"
        ],
        "answer": "What’s your name?",
        "explain": "Πώς σε λένε; asks someone’s name. Notice the Greek question mark: ;"
      },
      {
        "id": "h3",
        "type": "build",
        "prompt": "Build: “My name is Polina.”",
        "words": [
          "Πολίνα.",
          "λένε",
          "Με"
        ],
        "answer": "Με λένε Πολίνα.",
        "explain": "Με λένε + name means “My name is …”."
      },
      {
        "id": "h4",
        "prompt": "Choose the polite greeting for someone you do not know.",
        "options": [
          "Γεια σου!",
          "Γεια σας!",
          "Χάρηκα!"
        ],
        "answer": "Γεια σας!",
        "explain": "Γεια σας is polite to one person, and also used for a group."
      },
      {
        "id": "h5",
        "type": "build",
        "prompt": "Build: “I’m Polina.”",
        "words": [
          "Πολίνα.",
          "η",
          "Είμαι"
        ],
        "answer": "Είμαι η Πολίνα.",
        "explain": "Είμαι means “I am”. The article η goes with the feminine name Πολίνα."
      }
    ]
  },
  {
    "id": "day",
    "icon": "02",
    "title": "How are you today?",
    "greek": "Καλημέρα!",
    "subtitle": "A little conversation goes a long way.",
    "time": "10–15 min",
    "goal": "Greet someone at different times and say how you feel.",
    "note": "Τι κάνεις; literally means “What are you doing?”, but in a greeting it means “How are you?”. Καλημέρα is for the morning, καλησπέρα for later in the day. Καληνύχτα is a farewell before sleep or late at night.",
    "phrases": [
      [
        "Καλημέρα!",
        "Good morning!"
      ],
      [
        "Καλησπέρα!",
        "Good evening!"
      ],
      [
        "Καληνύχτα!",
        "Good night!"
      ],
      [
        "Τι κάνεις;",
        "How are you? (informal)"
      ],
      [
        "Είμαι καλά, ευχαριστώ.",
        "I’m well, thank you."
      ],
      [
        "Εσύ;",
        "And you?"
      ],
      [
        "Έτσι κι έτσι.",
        "So-so."
      ]
    ],
    "dialogue": [
      [
        "Έβαν",
        "Καλημέρα! Τι κάνεις;",
        "Good morning! How are you?"
      ],
      [
        "Πολίνα",
        "Είμαι καλά, ευχαριστώ. Εσύ;",
        "I’m well, thank you. And you?"
      ],
      [
        "Έβαν",
        "Πολύ καλά!",
        "Very well!"
      ]
    ],
    "questions": [
      {
        "id": "d1",
        "prompt": "It is morning. Choose a greeting.",
        "options": [
          "Καληνύχτα!",
          "Καλημέρα!",
          "Χάρηκα!"
        ],
        "answer": "Καλημέρα!",
        "explain": "Καλημέρα means “Good morning”."
      },
      {
        "id": "d2",
        "prompt": "Your friend asks “Τι κάνεις;”. Choose “So-so”.",
        "options": [
          "Έτσι κι έτσι.",
          "Γεια σας!",
          "Παρακαλώ."
        ],
        "answer": "Έτσι κι έτσι.",
        "explain": "Έτσι κι έτσι means “So-so”."
      },
      {
        "id": "d3",
        "type": "build",
        "prompt": "Build: “I’m well, thank you.”",
        "words": [
          "ευχαριστώ.",
          "Είμαι",
          "καλά,"
        ],
        "answer": "Είμαι καλά, ευχαριστώ.",
        "explain": "Είμαι καλά says how you are; ευχαριστώ adds “thank you”."
      },
      {
        "id": "d4",
        "prompt": "Which phrase would you say before going to bed?",
        "options": [
          "Καλημέρα!",
          "Καληνύχτα!",
          "Τι κάνεις;"
        ],
        "answer": "Καληνύχτα!",
        "explain": "Καληνύχτα is a good-night farewell."
      },
      {
        "id": "d5",
        "type": "build",
        "prompt": "Build the informal question: “How are you?”",
        "words": [
          "κάνεις;",
          "Τι"
        ],
        "answer": "Τι κάνεις;",
        "explain": "Τι κάνεις; is a common greeting between people who know each other."
      }
    ]
  },
  {
    "id": "identity",
    "title": "Origins & where you live",
    "goal": "Say where you are from, where you live and which languages you speak.",
    "note": "Είμαι means “I am”; είσαι means “you are” (informal). Από introduces origin. Μένω means “I live”: μένω στην Αθήνα, μένω στη Θεσσαλονίκη. Στην and στη combine σε + the feminine article. Learn city phrases as complete units. Δεν goes before a verb to make it negative.",
    "phrases": [
      [
        "Από πού είσαι;",
        "Where are you from?"
      ],
      [
        "Είμαι από την Ελλάδα.",
        "I am from Greece."
      ],
      [
        "Πού μένεις;",
        "Where do you live?"
      ],
      [
        "Μένω στην Αθήνα.",
        "I live in Athens."
      ],
      [
        "Μιλάω ελληνικά.",
        "I speak Greek."
      ],
      [
        "Δεν μιλάω καλά ελληνικά.",
        "I do not speak Greek well."
      ],
      [
        "Μιλάτε αγγλικά;",
        "Do you speak English? (polite/plural)"
      ]
    ],
    "dialogue": [
      [
        "Α",
        "Γεια σου! Από πού είσαι;",
        "Hello! Where are you from?"
      ],
      [
        "Β",
        "Είμαι από την Ελλάδα. Εσύ;",
        "I am from Greece. And you?"
      ],
      [
        "Α",
        "Είμαι από την Αγγλία. Μένω στην Αθήνα.",
        "I am from England. I live in Athens."
      ]
    ],
    "questions": [
      {
        "id": "i1",
        "prompt": "Which question asks where you live?",
        "options": [
          "Πού μένεις;",
          "Πώς σε λένε;",
          "Τι κάνεις;"
        ],
        "answer": "Πού μένεις;",
        "explain": "Πού means “where”; μένεις means “you live”."
      },
      {
        "id": "i2",
        "type": "build",
        "prompt": "Build: “I live in Athens.”",
        "answer": "Μένω στην Αθήνα.",
        "words": [
          "Αθήνα.",
          "στην",
          "Μένω"
        ],
        "explain": "Learn στην Αθήνα as a location phrase."
      },
      {
        "id": "i3",
        "prompt": "What does “Δεν μιλάω καλά ελληνικά.” mean?",
        "options": [
          "I speak Greek well.",
          "I do not speak Greek well.",
          "I live in Greece."
        ],
        "answer": "I do not speak Greek well.",
        "explain": "Δεν negates the verb; καλά means “well”."
      },
      {
        "id": "i4",
        "type": "build",
        "prompt": "Build: “I am from Greece.”",
        "answer": "Είμαι από την Ελλάδα.",
        "words": [
          "Ελλάδα.",
          "την",
          "από",
          "Είμαι"
        ],
        "explain": "Από indicates origin."
      },
      {
        "id": "i5",
        "prompt": "Choose the polite question: “Do you speak English?”",
        "options": [
          "Μιλάτε αγγλικά;",
          "Πού μένεις;",
          "Είμαι καλά."
        ],
        "answer": "Μιλάτε αγγλικά;",
        "explain": "Μιλάτε is polite singular or plural; μιλάς is informal singular."
      }
    ],
    "time": "15–20 min",
    "subtitle": "Say where you are from, where you live and which languages you speak.",
    "icon": "03",
    "greek": "Από πού είσαι;"
  },
  {
    "id": "people",
    "title": "People & possessions",
    "goal": "Identify familiar people and describe what you have.",
    "note": "Learn nouns with their article: ο φίλος (male friend), η φίλη (female friend), το βιβλίο (book). Grammatical gender belongs to the noun. Αυτός / αυτή / αυτό mean “this one” in masculine / feminine / neuter. Μου after a noun means “my”. Έχω means “I have”; δεν έχω means “I do not have”.",
    "phrases": [
      [
        "ο φίλος / η φίλη",
        "male friend / female friend"
      ],
      [
        "το βιβλίο",
        "the book"
      ],
      [
        "Αυτή είναι η φίλη μου.",
        "This is my female friend."
      ],
      [
        "Αυτό είναι το βιβλίο μου.",
        "This is my book."
      ],
      [
        "Έχω ένα βιβλίο.",
        "I have a book."
      ],
      [
        "Δεν έχω αυτοκίνητο.",
        "I do not have a car."
      ]
    ],
    "dialogue": [
      [
        "Α",
        "Ποια είναι αυτή;",
        "Who is she?"
      ],
      [
        "Β",
        "Αυτή είναι η φίλη μου, η Άννα.",
        "This is my friend Anna."
      ],
      [
        "Α",
        "Χάρηκα!",
        "Nice to meet you!"
      ]
    ],
    "questions": [
      {
        "id": "p1",
        "prompt": "Choose the article for βιβλίο.",
        "options": [
          "ο",
          "η",
          "το"
        ],
        "answer": "το",
        "explain": "Βιβλίο is neuter: το βιβλίο."
      },
      {
        "id": "p2",
        "type": "build",
        "prompt": "Build: “This is my book.”",
        "answer": "Αυτό είναι το βιβλίο μου.",
        "words": [
          "μου.",
          "βιβλίο",
          "το",
          "είναι",
          "Αυτό"
        ],
        "explain": "Αυτό matches the neuter noun βιβλίο; μου follows the noun."
      },
      {
        "id": "p3",
        "prompt": "What does “μου” mean in “η φίλη μου”?",
        "options": [
          "my",
          "your",
          "our"
        ],
        "answer": "my",
        "explain": "Μου after a noun expresses “my”."
      },
      {
        "id": "p4",
        "type": "build",
        "prompt": "Build: “I have a book.”",
        "answer": "Έχω ένα βιβλίο.",
        "words": [
          "βιβλίο.",
          "ένα",
          "Έχω"
        ],
        "explain": "Έχω + object expresses possession."
      },
      {
        "id": "p5",
        "prompt": "Choose “I do not have a car.”",
        "options": [
          "Δεν έχω αυτοκίνητο.",
          "Έχω ένα βιβλίο.",
          "Είμαι καλά."
        ],
        "answer": "Δεν έχω αυτοκίνητο.",
        "explain": "Δεν directly precedes έχω."
      }
    ],
    "time": "15–20 min",
    "subtitle": "Identify familiar people and describe what you have.",
    "icon": "04",
    "greek": "ο φίλος / η φίλη"
  },
  {
    "id": "numbers",
    "title": "Numbers & quantities",
    "goal": "Recognize numbers 0–10 and use prices and quantities.",
    "note": "Learn 0–10: μηδέν, ένα, δύο, τρία, τέσσερα, πέντε, έξι, επτά, οκτώ, εννέα, δέκα. Επτά/εφτά and οκτώ/οχτώ are common alternatives. One changes with gender: ένας καφές, μία ώρα, ένα νερό. In an order, use έναν καφέ. With neuter νερό, the plural is νερά. Ευρώ does not change in the plural.",
    "phrases": [
      [
        "ένα · δύο · τρία",
        "one · two · three"
      ],
      [
        "τέσσερα · πέντε · έξι",
        "four · five · six"
      ],
      [
        "επτά · οκτώ · εννέα · δέκα",
        "seven · eight · nine · ten"
      ],
      [
        "μηδέν",
        "zero"
      ],
      [
        "Δύο νερά, παρακαλώ.",
        "Two waters, please."
      ],
      [
        "Πέντε ευρώ.",
        "Five euros."
      ]
    ],
    "dialogue": [
      [
        "Πελάτης",
        "Δύο νερά, παρακαλώ.",
        "Two waters, please."
      ],
      [
        "Υπάλληλος",
        "Βεβαίως. Δύο ευρώ.",
        "Of course. Two euros."
      ],
      [
        "Πελάτης",
        "Ευχαριστώ!",
        "Thank you!"
      ]
    ],
    "questions": [
      {
        "id": "n1",
        "prompt": "Which number is “οκτώ”?",
        "options": [
          "6",
          "8",
          "10"
        ],
        "answer": "8",
        "explain": "Οκτώ (also οχτώ) means eight."
      },
      {
        "id": "n2",
        "prompt": "A price says “πέντε ευρώ”. How much?",
        "options": [
          "€3",
          "€5",
          "€7"
        ],
        "answer": "€5",
        "explain": "Πέντε means five."
      },
      {
        "id": "n3",
        "type": "build",
        "prompt": "Build: “Two waters, please.”",
        "answer": "Δύο νερά, παρακαλώ.",
        "words": [
          "παρακαλώ.",
          "νερά,",
          "Δύο"
        ],
        "explain": "Νερό becomes νερά in the plural."
      },
      {
        "id": "n4",
        "prompt": "Choose the neuter form of “one”.",
        "options": [
          "ένας",
          "μία",
          "ένα"
        ],
        "answer": "ένα",
        "explain": "Use ένα with neuter nouns: ένα νερό."
      },
      {
        "id": "n5",
        "prompt": "Review: which question asks the price?",
        "options": [
          "Πόσο κάνει;",
          "Πού μένεις;",
          "Πώς σε λένε;"
        ],
        "answer": "Πόσο κάνει;",
        "explain": "This useful question introduces the café lesson."
      }
    ],
    "time": "15–20 min",
    "subtitle": "Recognize numbers 0–10 and use prices and quantities.",
    "icon": "05",
    "greek": "ένα · δύο · τρία"
  },
  {
    "id": "cafe",
    "icon": "06",
    "title": "A stop at the café",
    "greek": "Θα ήθελα έναν καφέ.",
    "subtitle": "Order something small. Feel at home.",
    "time": "10–15 min",
    "goal": "Order a coffee or water and ask the price.",
    "note": "Learn these as useful chunks: έναν καφέ (a coffee), ένα νερό (a water). After θέλω, masculine ένας becomes έναν; neuter ένα stays ένα. Θα ήθελα means “I would like” and is a polite ready-to-use phrase.",
    "phrases": [
      [
        "Θα ήθελα έναν καφέ.",
        "I would like a coffee."
      ],
      [
        "Ένα νερό, παρακαλώ.",
        "A water, please."
      ],
      [
        "Ευχαριστώ!",
        "Thank you!"
      ],
      [
        "Παρακαλώ.",
        "Please. / You’re welcome."
      ],
      [
        "Πόσο κάνει;",
        "How much is it?"
      ],
      [
        "Δύο ευρώ.",
        "Two euros."
      ],
      [
        "Ναι. / Όχι.",
        "Yes. / No."
      ]
    ],
    "dialogue": [
      [
        "Πολίνα",
        "Καλημέρα! Έναν καφέ, παρακαλώ.",
        "Good morning! A coffee, please."
      ],
      [
        "Σερβιτόρος",
        "Βεβαίως!",
        "Of course!"
      ],
      [
        "Πολίνα",
        "Πόσο κάνει;",
        "How much is it?"
      ],
      [
        "Σερβιτόρος",
        "Δύο ευρώ.",
        "Two euros."
      ]
    ],
    "questions": [
      {
        "id": "c1",
        "prompt": "How do you add “please” to your order?",
        "options": [
          "Καλημέρα",
          "Παρακαλώ",
          "Όχι"
        ],
        "answer": "Παρακαλώ",
        "explain": "Παρακαλώ means “please” in a request; it can also mean “you’re welcome”."
      },
      {
        "id": "c2",
        "type": "build",
        "prompt": "Build: “A water, please.”",
        "words": [
          "παρακαλώ.",
          "νερό,",
          "Ένα"
        ],
        "answer": "Ένα νερό, παρακαλώ.",
        "explain": "Νερό is neuter, so we use ένα."
      },
      {
        "id": "c3",
        "prompt": "You want to ask the price. Choose the question.",
        "options": [
          "Πώς σε λένε;",
          "Τι κάνεις;",
          "Πόσο κάνει;"
        ],
        "answer": "Πόσο κάνει;",
        "explain": "Πόσο κάνει; means “How much is it?”."
      },
      {
        "id": "c4",
        "type": "build",
        "prompt": "Build: “I would like a coffee.”",
        "words": [
          "καφέ.",
          "έναν",
          "ήθελα",
          "Θα"
        ],
        "answer": "Θα ήθελα έναν καφέ.",
        "explain": "Θα ήθελα is a polite way to order. Use έναν καφέ as a complete chunk."
      },
      {
        "id": "c5",
        "prompt": "The price is “Δύο ευρώ”. How much is it?",
        "options": [
          "One euro",
          "Two euros",
          "Three euros"
        ],
        "answer": "Two euros",
        "explain": "Δύο means two. Ευρώ stays the same in the plural."
      }
    ]
  },
  {
    "id": "places",
    "title": "Places & directions",
    "goal": "Ask where something is and follow basic directions.",
    "note": "Πού είναι …; asks “Where is …?”. Το φαρμακείο is neuter; η τράπεζα is feminine. Είναι means “is” or “are”, depending on context. Δίπλα στο combines δίπλα σε + το. Here, directions use ready-to-use expressions; you do not need a full imperative table yet.",
    "phrases": [
      [
        "Πού είναι το φαρμακείο;",
        "Where is the pharmacy?"
      ],
      [
        "Πού είναι η τράπεζα;",
        "Where is the bank?"
      ],
      [
        "Είναι εδώ.",
        "It is here."
      ],
      [
        "Είναι εκεί.",
        "It is there."
      ],
      [
        "Ευθεία και μετά δεξιά.",
        "Straight ahead and then right."
      ],
      [
        "Αριστερά.",
        "Left."
      ],
      [
        "Είναι δίπλα στο καφέ.",
        "It is next to the café."
      ]
    ],
    "dialogue": [
      [
        "Α",
        "Συγγνώμη, πού είναι το φαρμακείο;",
        "Excuse me, where is the pharmacy?"
      ],
      [
        "Β",
        "Ευθεία και μετά δεξιά. Είναι δίπλα στο καφέ.",
        "Straight ahead and then right. It is next to the café."
      ],
      [
        "Α",
        "Ευχαριστώ πολύ!",
        "Thank you very much!"
      ]
    ],
    "questions": [
      {
        "id": "l1",
        "type": "build",
        "prompt": "Build: “Where is the pharmacy?”",
        "answer": "Πού είναι το φαρμακείο;",
        "words": [
          "φαρμακείο;",
          "το",
          "είναι",
          "Πού"
        ],
        "explain": "Πού είναι + article + place asks its location."
      },
      {
        "id": "l2",
        "prompt": "Which direction is δεξιά?",
        "options": [
          "Left",
          "Right",
          "Straight ahead"
        ],
        "answer": "Right",
        "explain": "Δεξιά = right; αριστερά = left."
      },
      {
        "id": "l3",
        "prompt": "“Είναι δίπλα στο καφέ.” means:",
        "options": [
          "It is next to the café.",
          "It is far from the café.",
          "I would like coffee."
        ],
        "answer": "It is next to the café.",
        "explain": "Δίπλα στο means “next to the” with a neuter noun."
      },
      {
        "id": "l4",
        "type": "build",
        "prompt": "Build: “Straight ahead and then right.”",
        "answer": "Ευθεία και μετά δεξιά.",
        "words": [
          "δεξιά.",
          "μετά",
          "και",
          "Ευθεία"
        ],
        "explain": "Και means “and”; μετά means “then” here."
      },
      {
        "id": "l5",
        "prompt": "Review: choose the polite way to begin asking a stranger for help.",
        "options": [
          "Συγγνώμη.",
          "Καληνύχτα.",
          "Όχι."
        ],
        "answer": "Συγγνώμη.",
        "explain": "Συγγνώμη means “excuse me” or “sorry”."
      }
    ],
    "time": "15–20 min",
    "subtitle": "Ask where something is and follow basic directions.",
    "icon": "07",
    "greek": "Πού είναι το φαρμακείο;"
  },
  {
    "id": "routine",
    "title": "Time & daily routines",
    "goal": "Describe a simple routine and state a meeting time.",
    "note": "Start with present-tense patterns: μένω/μένεις, δουλεύω/δουλεύεις, πίνω/πίνεις. These are “I/you” pairs; learn a few useful verbs before a full conjugation table. Στις introduces clock times: στις οκτώ. Greek uses feminine μία for one o’clock. Μου αρέσει + singular noun means “I like …”.",
    "phrases": [
      [
        "Τι ώρα είναι;",
        "What time is it?"
      ],
      [
        "Είναι μία.",
        "It is one o’clock."
      ],
      [
        "Είναι οκτώ.",
        "It is eight o’clock."
      ],
      [
        "Δουλεύω το πρωί.",
        "I work in the morning."
      ],
      [
        "Πίνω καφέ το πρωί.",
        "I drink coffee in the morning."
      ],
      [
        "Στις οκτώ.",
        "At eight o’clock."
      ],
      [
        "Μου αρέσει ο καφές.",
        "I like coffee."
      ]
    ],
    "dialogue": [
      [
        "Α",
        "Τι ώρα δουλεύεις;",
        "What time do you work?"
      ],
      [
        "Β",
        "Στις οκτώ το πρωί. Εσύ;",
        "At eight in the morning. And you?"
      ],
      [
        "Α",
        "Στις εννέα. Πίνω καφέ το πρωί.",
        "At nine. I drink coffee in the morning."
      ]
    ],
    "questions": [
      {
        "id": "r1",
        "prompt": "Choose “At eight o’clock”.",
        "options": [
          "Στις οκτώ.",
          "Είναι οκτώ.",
          "Οκτώ ευρώ."
        ],
        "answer": "Στις οκτώ.",
        "explain": "Στις introduces the time when an activity happens."
      },
      {
        "id": "r2",
        "type": "build",
        "prompt": "Build: “I work in the morning.”",
        "answer": "Δουλεύω το πρωί.",
        "words": [
          "πρωί.",
          "το",
          "Δουλεύω"
        ],
        "explain": "Δουλεύω is the first-person present form."
      },
      {
        "id": "r3",
        "prompt": "Which verb form means “you drink” (informal)?",
        "options": [
          "πίνω",
          "πίνεις",
          "είμαι"
        ],
        "answer": "πίνεις",
        "explain": "Πίνω = I drink; πίνεις = you drink."
      },
      {
        "id": "r4",
        "type": "build",
        "prompt": "Build: “I drink coffee in the morning.”",
        "answer": "Πίνω καφέ το πρωί.",
        "words": [
          "πρωί.",
          "το",
          "καφέ",
          "Πίνω"
        ],
        "explain": "This combines a present-tense verb, object and time phrase."
      },
      {
        "id": "r5",
        "prompt": "Review: “Μου αρέσει ο καφές.” means:",
        "options": [
          "I like coffee.",
          "I would like a water.",
          "The café is here."
        ],
        "answer": "I like coffee.",
        "explain": "Μου αρέσει expresses a preference; θα ήθελα is a polite request."
      }
    ],
    "time": "15–20 min",
    "subtitle": "Describe a simple routine and state a meeting time.",
    "icon": "08",
    "greek": "Τι ώρα είναι;"
  }
];
export const questions = lessons.flatMap(l => l.questions.map(q => ({...q,lesson_id:l.id})));
