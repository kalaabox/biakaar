let originalSeq = "";
let mutatedSeq = "";
let mutationType = "";
let score = 0;

// All questions combined: DNA, Replication, Bioinformatics
const questions = [
  {
    question: "What happens during DNA replication?",
    options: ["DNA gets shorter", "DNA makes an exact copy of itself", "RNA is formed"],
    answer: "DNA makes an exact copy of itself"
  },
  {
    question: "Which enzyme unzips the DNA during replication?",
    options: ["DNA polymerase", "Helicase", "Ligase"],
    answer: "Helicase"
  },
  {
    question: "In DNA, Adenine pairs with?",
    options: ["Thymine", "Cytosine", "Guanine"],
    answer: "Thymine"
  },
  {
    question: "Substitution mutation means?",
    options: ["A base is added", "A base is replaced by another", "A base is removed"],
    answer: "A base is replaced by another"
  },
  {
    question: "Which base is NOT found in RNA?",
    options: ["Uracil", "Thymine", "Guanine"],
    answer: "Thymine"
  },
  // 📊 Bioinformatics Questions
  {
    question: "What is BLAST used for in bioinformatics?",
    options: ["To find genes in a plant", "To compare sequences and find similarities", "To change DNA bases"],
    answer: "To compare sequences and find similarities"
  },
  {
    question: "What does FASTA format contain?",
    options: ["Images of DNA", "Protein structures", "Sequence data with identifiers"],
    answer: "Sequence data with identifiers"
  },
  {
    question: "Which tool aligns multiple DNA sequences?",
    options: ["FASTA", "Clustal Omega", "BLAST"],
    answer: "Clustal Omega"
  },
  {
    question: "Which one is a DNA sequence format?",
    options: ["JPEG", "TXT", "FASTA"],
    answer: "FASTA"
  },
  {
    question: "Which is a commonly used database for biological sequences?",
    options: ["GenBank", "CodePen", "Google Docs"],
    answer: "GenBank"
  }
];

let currentQuestion = 0;

function randomDNA(length) {
  const bases = ["A", "T", "G", "C"];
  let seq = "";
  for (let i = 0; i < length; i++) {
    seq += bases[Math.floor(Math.random() * 4)];
  }
  return seq;
}

function mutateSequence(seq) {
  const index = Math.floor(Math.random() * seq.length);
  const bases = ["A", "T", "G", "C"];
  let newSeq = "";

  const randomMutation = Math.floor(Math.random() * 3);
  if (randomMutation === 0) {
    let newBase = bases[Math.floor(Math.random() * 4)];
    while (newBase === seq[index]) {
      newBase = bases[Math.floor(Math.random() * 4)];
    }
    newSeq = seq.substring(0, index) + newBase + seq.substring(index + 1);
    mutationType = "Substitution";
  } else if (randomMutation === 1) {
    let newBase = bases[Math.floor(Math.random() * 4)];
    newSeq = seq.substring(0, index) + newBase + seq.substring(index);
    mutationType = "Insertion";
  } else {
    newSeq = seq.substring(0, index) + seq.substring(index + 1);
    mutationType = "Deletion";
  }
  return newSeq;
}

function startGame() {
  originalSeq = randomDNA(10);
  mutatedSeq = mutateSequence(originalSeq);

  document.getElementById("original-seq").innerText = originalSeq;
  document.getElementById("mutated-seq").innerText = mutatedSeq;
  document.getElementById("mutation-result").innerText = "";
}

function checkMutationAnswer() {
  const userGuess = document.getElementById("guess").value;
  const result = document.getElementById("mutation-result");

  if (userGuess === mutationType) {
    result.innerText = "✅ Correct!";
    result.style.color = "green";
    score++;
  } else {
    result.innerText = `❌ Incorrect! It was a ${mutationType}.`;
    result.style.color = "red";
  }
  updateScore();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    document.getElementById("quiz-question").innerText = "🎉 Quiz Completed!";
    document.getElementById("options").innerHTML = "";
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("quiz-question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkQuizAnswer(option);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("quiz-result").innerText = "";
}

function checkQuizAnswer(selectedOption) {
  const correctAnswer = questions[currentQuestion].answer;
  const result = document.getElementById("quiz-result");

  if (selectedOption === correctAnswer) {
    result.innerText = "✅ Correct!";
    result.style.color = "green";
    score++;
  } else {
    result.innerText = `❌ Wrong! Correct: ${correctAnswer}`;
    result.style.color = "red";
  }
  updateScore();
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();
}

function updateScore() {
  document.getElementById("score").innerText = score;
}

// Initial Load
startGame();
showQuestion();
