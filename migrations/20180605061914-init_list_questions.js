'use strict';

module.exports = {

  up(db, next) {
    var quizzesData = [
      {
        question: "What was the <b>historical</b> motivation for introducing blockchain?",
        answer: 3,
        options: [
          "To make it easier for banks to transfer money with low fees.",
          "To make a globally centralized system for money transfers with low fees.",
          "To make a system that enables a new model of record keeping.",
          "To make a system for money transfers with low fees and without trusted third parties.",
        ]
      },
      {
        question: "What is <b>blockchain</b>?",
        answer: 1,
        options: [
          "It's a system to work with big data by separating it into independent blocks of data.",
          "It's a system consisting of blocks of data connected together by some function, for example a hashing function.",
          "It's a system of connected blocks which must implement a cryptocurrency.",
          "It's a system that writes data in blocks.",
        ]
      },
      {
        question: "Why do blockchains use a <b>hash</b> algorithm?",
        answer: 2,
        options: [
          "To make the data encrypted inside blocks. ",
          "To make it processor heavy to mine data. ",
          "To connect blocks together so the history is hard to change.",
          "To make data shared and decentralized.",
        ]
      },
      {
        question: "What’s the difference between <b>public</b> and <b>private</b> (secret) <b>key</b>? What encryption algorithm is used to create them?",
        answer: 2,
        options: [
          "The public key is used for signing transactions that are verified using the private key. Ecliptic encryption is used.",
          "The public key is used for verifying transactions that were signed using the private key. Hashing encryption is used.",
          "The public key is used for verifying transactions that were signed using the private key. Bitcoin usually uses ecliptic encryption.",
          "The public key and private key need to be shared on-line in order to do on-line transactions. Ecliptic encryption is often used.",
        ]
      },
      {
        question: "What is <b>cryptocurrency</b>?",
        answer: 1,
        options: [
          "Cryptocurrency is a system of transferring currency using a blockchain that must be decentralized and enables the cheap transfer of money.",
          "Cryptocurrency is a system of transferring currency using a blockchain that can be both centralized or decentralized.",
          "Cryptocurrency is a system used to speed up transactions of money in banks.",
          "Cryptocurrency is a system to make money safe and stable on-line so its users don't take risks putting money in a bank.",
        ]
      },
      {
        question: "Why do blockchains use a <b>distributed</b> system and <b>P2P</b> networking (hint: analyze PoW, PoS, and PoA)?",
        answer: 1,
        options: [
          "So the system is decentralized in its decision making and to make it hard to change (or get hacked) and all changes can be seen.",
          "So the system has a decentralized data base that is hard to change (or get hacked) and all changes can be seen.",
          "So we can use somebody else’s hardware to store data. ",
          "So we can connect and torrent all kinds of data.",
        ]
      },
      {
        question: "How is a <b>Merkle Tree</b> used?",
        answer: 1,
        options: [
          "It’s a cryptographic method to make checking transactions easier.",
          "It’s a method of summarizing data so any change in the data can be seen.",
          "It’s a method for saving private and public keys.",
          "It’s a method used for encrypting and protecting data.",
        ]
      },
      {
        question: "Which consensus mechanism <b>(PoW, PoS, or PoA)</b> is the best?",
        answer: 3,
        options: [
          "PoW is the best because it’s decentralized in its core.",
          "PoS is the best because it works with stake, which gives power to the holder.",
          "PoA is the best because it’s centralized and will always give the rights to designated entities.",
          "We should use one or more mechanisms depending on the specific needs of the users and applications. Each mechanism has pros and cons.",
        ]
      },
      {
        question: "What is the difference between <b>Private</b> and <b>Public</b> blockchain?",
        answer: 1,
        options: [
          "Private and public blockchain are the same in all aspects except private is under copyright by some company.",
          "Private and public blockchain are different only by the rights to access and store. Both are decentralized in their database.",
          "Private blockchain is based on a centralized database while public blockchain is decentralized.",
          "Private blockchain must allow users to change history while the public blockchain keeps data safe.",
        ]
      },
      {
        question: "What are some benefits and limitations of <b>blockchain</b>?",
        answer: 1,
        options: [
          "Blockchains are a good way to keep data but they can’t be scaled.",
          "Blockchains connect data and make it hard to change history, but it’s hard to scale.",
          "Blockchains have good and scalable ways to encrypt data.",
          "Blockchains can keep only a small amount of data but the data is strongly encrypted.",
        ]
      }
    ];
    var courses = db.collection('courses');    
    var currentTime = new Date();

    courses.update({}, {$set: {
      questions: quizzesData
    }})
    
    next();
  },

  down(db, next) {
    // TODO write the statements to rollback your migration (if possible)
    next();
  }

};