// Display System Versions
if (window.versions) {
  document.getElementById('node-version').innerText = versions.node() || 'N/A';
  document.getElementById('electron-version').innerText = versions.electron() || 'N/A';
}

// Navigation Logic
const navButtons = document.querySelectorAll('.nav-item');
const viewSections = document.querySelectorAll('.view-section');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and sections
    navButtons.forEach(b => b.classList.remove('active'));
    viewSections.forEach(s => s.classList.remove('active'));

    // Add active class to clicked button and target section
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

// Quiz Logic
const quizData = [
  {
    question: "What is the primary purpose of voter registration?",
    options: [
      "To choose a political party",
      "To verify eligibility and assign a polling location",
      "To pay election taxes",
      "To vote online"
    ],
    answer: 1,
    explanation: "Voter registration ensures that a person is eligible to vote in a specific jurisdiction and assigns them to the correct local polling station."
  },
  {
    question: "How are paper ballots usually counted today in major elections?",
    options: [
      "By hand only",
      "By volunteers reading them aloud",
      "Using optical scanners and tabulating machines",
      "They are not counted unless there is a tie"
    ],
    answer: 2,
    explanation: "Most paper ballots are rapidly scanned and tabulated by secure machines, though the paper trails are kept for audits and manual recounts if necessary."
  },
  {
    question: "What happens during the 'Certification' phase of an election?",
    options: [
      "Voters are given a certificate for voting",
      "The candidates declare victory",
      "Election officials review tallies and make the results official",
      "The media announces the winner"
    ],
    answer: 2,
    explanation: "Certification is the formal process where election officials verify the tallies, resolve any discrepancies, and officially declare the results."
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');

function loadQuiz() {
  if (currentQuestion >= quizData.length) {
    showScore();
    return;
  }

  const q = quizData[currentQuestion];
  
  let html = `
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
  `;

  q.options.forEach((opt, index) => {
    html += `<button class="quiz-btn" data-index="${index}">${opt}</button>`;
  });

  html += `
    </div>
    <div class="quiz-feedback" id="quiz-feedback"></div>
    <button class="quiz-next" id="quiz-next">Next Question</button>
  `;

  quizContainer.innerHTML = html;

  const buttons = document.querySelectorAll('.quiz-btn');
  const feedback = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next');

  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Disable all buttons
      buttons.forEach(b => b.disabled = true);
      
      const selectedIdx = parseInt(this.getAttribute('data-index'));
      
      if (selectedIdx === q.answer) {
        this.classList.add('correct');
        feedback.innerHTML = `<span style="color: #22c55e;">Correct!</span> ${q.explanation}`;
        score++;
      } else {
        this.classList.add('wrong');
        buttons[q.answer].classList.add('correct');
        feedback.innerHTML = `<span style="color: #ef4444;">Incorrect.</span> ${q.explanation}`;
      }
      
      nextBtn.style.display = 'inline-block';
    });
  });

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuiz();
  });
}

function showScore() {
  quizContainer.innerHTML = `
    <div class="quiz-score">
      <h2>Quiz Completed!</h2>
      <p>You scored ${score} out of ${quizData.length}</p>
      <button class="quiz-next" style="display: inline-block;" onclick="resetQuiz()">Retake Quiz</button>
    </div>
  `;
}

window.resetQuiz = function() {
  currentQuestion = 0;
  score = 0;
  loadQuiz();
};

// Initialize Quiz
loadQuiz();
