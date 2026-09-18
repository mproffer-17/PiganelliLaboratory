(() => {
  "use strict";

  const CATEGORIES = [
    {
      production: "Production I",
      name: "Redox Immunology",
      questions: [
        { value: 100, prompt: "In immunology, what does ROS stand for?", choices: ["Reactive oxygen species", "Regulatory oxidative signaling", "Redox-organized suppressors", "Reactive osmotic sensors"], correct: "Reactive oxygen species", explanation: "Reactive oxygen species are oxygen-containing molecules involved in redox signaling. The lab studies how ROS and redox-sensitive pathways affect immune activation and beta cell biology." },
        { value: 200, prompt: "Which process is a major focus of the lab's Redox Immunology research?", choices: ["How redox cues influence inflammatory signaling and immune activation", "How skeletal muscle produces force", "How neurons generate action potentials", "How kidney filtration changes after exercise"], correct: "How redox cues influence inflammatory signaling and immune activation", explanation: "Production I examines how redox cues shape inflammatory signaling, T cell activation, immune tolerance, and beta cell vulnerability." },
        { value: 300, prompt: "Which laboratory approach most directly measures or manipulates redox-sensitive pathways?", choices: ["Redox biology", "Tetramer analysis", "Human pedigree analysis", "Histological photography alone"], correct: "Redox biology", explanation: "The Redox Biology approach is used to investigate how reactive oxygen species and redox-sensitive pathways influence immune activation and beta cell health." },
        { value: 400, prompt: "Why can oxidative stress matter in type 1 diabetes research?", choices: ["It can alter beta cell function and immune vulnerability", "It permanently prevents all T cell activation", "It is only relevant to skeletal muscle", "It eliminates antigen presentation"], correct: "It can alter beta cell function and immune vulnerability", explanation: "Oxidative stress can affect both immune signaling and beta cell biology, making it relevant to autoimmune inflammation." },
        { value: 500, prompt: "Which combination best captures Production I in the Piganelli Lab?", choices: ["Redox signaling plus innate and adaptive immune activation", "Bone development plus calcium metabolism", "Cardiac electrophysiology plus blood pressure", "Neural development plus synaptic plasticity"], correct: "Redox signaling plus innate and adaptive immune activation", explanation: "The lab studies how redox-sensitive signaling shapes innate and adaptive immune responses in type 1 diabetes." }
      ]
    },
    {
      production: "Production II",
      name: "T Cell Metabolism",
      questions: [
        { value: 100, prompt: "Which metabolic pathway is specifically highlighted in the lab's T cell metabolism research?", choices: ["Glycolysis", "Keratin synthesis", "Bile production", "Bone mineralization"], correct: "Glycolysis", explanation: "The lab studies glycolysis and related pathways as potential points for restraining pathogenic T cell responses." },
        { value: 200, prompt: "Metabolic reprogramming can help support which T cell functions?", choices: ["Activation, persistence, and effector function", "Only DNA repair", "Only cell adhesion", "Only antibody secretion"], correct: "Activation, persistence, and effector function", explanation: "Production II focuses on how nutrient use and metabolic reprogramming support autoreactive T cell activation, persistence, and effector function." },
        { value: 300, prompt: "Which organelle is especially important when studying cellular energy metabolism?", choices: ["Mitochondrion", "Nucleolus only", "Centromere", "Primary cilium only"], correct: "Mitochondrion", explanation: "The lab's immunometabolism approaches include mitochondrial activity together with glycolysis and nutrient availability." },
        { value: 400, prompt: "Why might researchers target glycolysis in autoreactive T cells?", choices: ["To selectively restrain pathogenic T cell responses", "To increase every immune response equally", "To stop antigen presentation by all cells", "To convert T cells into beta cells"], correct: "To selectively restrain pathogenic T cell responses", explanation: "A goal of the lab's metabolism research is to identify metabolic vulnerabilities that can restrain pathogenic autoreactive T cell activity." },
        { value: 500, prompt: "Which group of measurements best fits a T cell immunometabolism experiment?", choices: ["Glycolysis, mitochondrial activity, and nutrient availability", "Hair color, height, and body temperature", "Bone density, heart rate, and lung volume", "Retinal thickness, hearing range, and skin hydration"], correct: "Glycolysis, mitochondrial activity, and nutrient availability", explanation: "Those are core metabolic features highlighted in the lab's T Cell Immunometabolism approach." }
      ]
    },
    {
      production: "Production III",
      name: "Beta Cell Stress",
      questions: [
        { value: 100, prompt: "What does ER stand for in the phrase 'ER stress'?", choices: ["Endoplasmic reticulum", "Endocrine receptor", "Energy reserve", "Enzymatic response"], correct: "Endoplasmic reticulum", explanation: "Endoplasmic reticulum stress is one of the cellular stress pathways studied in beta cell biology." },
        { value: 200, prompt: "Which process is listed among factors that can contribute to beta cell stress?", choices: ["Autophagy defects", "Increased bone remodeling", "Reduced skin pigmentation", "Enhanced visual acuity"], correct: "Autophagy defects", explanation: "The lab studies ER stress, oxidative stress, autophagy defects, and inflammatory signaling as contributors to altered beta cell function and immune visibility." },
        { value: 300, prompt: "A stressed beta cell may become more visible to the immune system partly by doing what?", choices: ["Generating or exposing altered antigens", "Removing every surface protein", "Stopping all protein synthesis permanently", "Becoming an antibody-producing cell"], correct: "Generating or exposing altered antigens", explanation: "A major theme is how stressed beta cells may generate or expose altered antigens that intensify autoimmune recognition." },
        { value: 400, prompt: "Which group of measurements fits the lab's Beta Cell Stress & Tissue Analysis approach?", choices: ["Islet inflammation, antigen presentation, survival, and immune infiltration", "Bone growth, cartilage thickness, and muscle mass", "Vision, hearing, and taste thresholds", "Hair growth, nail growth, and skin moisture"], correct: "Islet inflammation, antigen presentation, survival, and immune infiltration", explanation: "This approach connects beta cell stress with islet inflammation, antigen presentation, cell survival, and immune infiltration." },
        { value: 500, prompt: "Why is beta cell stress important to the lab's model of autoimmune diabetes?", choices: ["Stress may change beta cell function and increase immune recognition", "Stress prevents immune cells from entering pancreatic tissue", "Stress eliminates every beta cell antigen", "Stress makes beta cells permanently invisible to T cells"], correct: "Stress may change beta cell function and increase immune recognition", explanation: "The lab studies beta cell stress as a process that can alter both function and the signals encountered by the immune system." }
      ]
    },
    {
      production: "Production IV",
      name: "Early Biomarkers",
      questions: [
        { value: 100, prompt: "Which soluble immune molecule is highlighted on the lab website as an early T cell activation biomarker?", choices: ["Soluble LAG-3", "Hemoglobin", "Albumin", "Collagen"], correct: "Soluble LAG-3", explanation: "Current Piganelli Lab research includes soluble LAG-3 as a potential readout of early T cell activation." },
        { value: 200, prompt: "What is one major goal of the lab's early biomarker research?", choices: ["Detect immune activation before overt type 1 diabetes", "Measure only late-stage complications", "Replace all clinical diagnostic testing", "Predict eye color from blood samples"], correct: "Detect immune activation before overt type 1 diabetes", explanation: "Production IV focuses on identifying signals that may reveal immune activation during earlier windows of disease progression." },
        { value: 300, prompt: "Which laboratory method is commonly used to measure soluble proteins such as immune biomarkers?", choices: ["ELISA", "Tetramer staining alone", "Gram staining", "Karyotyping"], correct: "ELISA", explanation: "The lab's Soluble Biomarker & Molecular Assays approach includes ELISA and related molecular measurements." },
        { value: 400, prompt: "Why are longitudinal human samples useful for biomarker research?", choices: ["They allow researchers to examine how immune signals change over time", "They guarantee every participant develops diabetes", "They eliminate biological variation", "They provide only a single time point"], correct: "They allow researchers to examine how immune signals change over time", explanation: "Longitudinal sampling helps identify dynamic changes associated with autoantibody status, progression, and evolving immune states." },
        { value: 500, prompt: "What does a 'dynamic early activation window' imply for a biomarker?", choices: ["Its level may rise and fall as immune activation changes over time", "Its concentration is identical in every person", "It can only be measured after clinical diabetes", "It is unrelated to immune activation"], correct: "Its level may rise and fall as immune activation changes over time", explanation: "A dynamic biomarker can be useful because it identifies a particular period of immune activity rather than remaining permanently elevated." }
      ]
    },
    {
      production: "Production V",
      name: "Antigen-Specific T Cells",
      questions: [
        { value: 100, prompt: "Which tool does the lab use to identify T cells that recognize specific peptide-MHC complexes?", choices: ["Peptide-MHC tetramers", "A blood pressure cuff", "A spectrophotometer alone", "A Gram stain"], correct: "Peptide-MHC tetramers", explanation: "Tetramer analysis allows researchers to identify and track antigen-reactive T cell populations." },
        { value: 200, prompt: "In Autoimmune Arcade, which beta cell antigen is represented by the yellow dots?", choices: ["IAPP-HIP", "ChgA-HIP", "InsB:9-23", "LAG-3"], correct: "IAPP-HIP", explanation: "The arcade uses yellow for IAPP-HIP, pink for ChgA-HIP, and blue for InsB:9-23." },
        { value: 300, prompt: "What is the purpose of an adoptive-transfer model in the lab's research?", choices: ["Transfer defined diabetogenic T cell populations into recipient mice for longitudinal study", "Transfer beta cells between culture dishes only", "Replace every immune cell in a mouse", "Measure human blood pressure"], correct: "Transfer defined diabetogenic T cell populations into recipient mice for longitudinal study", explanation: "Adoptive transfer lets the lab follow timing, phenotype, antigen reactivity, and tissue localization of defined autoreactive T cell populations." },
        { value: 400, prompt: "Which set of features can longitudinal tetramer analysis help researchers follow?", choices: ["Specificity, co-reactivity, expansion, and diversification", "Height, weight, vision, and hearing", "Heart rhythm, blood pressure, and lung volume", "Bone density, skin color, and hair growth"], correct: "Specificity, co-reactivity, expansion, and diversification", explanation: "The lab uses tetramers over time and across tissues to investigate how antigen-reactive T cell populations change during autoimmune progression." },
        { value: 500, prompt: "Why does tissue localization matter when studying autoreactive T cells?", choices: ["T cell activation and enrichment can differ between blood, lymphoid tissue, and pancreas", "Every tissue contains identical immune populations at all times", "Only blood can contain T cells", "Tissue location has no relationship to autoimmune disease"], correct: "T cell activation and enrichment can differ between blood, lymphoid tissue, and pancreas", explanation: "Autoreactive T cell abundance and phenotype can differ across anatomical compartments, so tissue context matters." }
      ]
    },
    {
      production: "Production VI",
      name: "Translational Models",
      questions: [
        { value: 100, prompt: "Which combination best describes the lab's translational strategy?", choices: ["Preclinical systems plus human samples", "Only computer simulations", "Only human questionnaires", "Only purified proteins"], correct: "Preclinical systems plus human samples", explanation: "The lab combines mechanistic preclinical models with human samples to connect basic findings with disease-relevant questions." },
        { value: 200, prompt: "Human translational studies on the Research page include which groups or disease features?", choices: ["First-degree relatives, autoantibody status, and disease progression", "Only healthy athletes", "Only newborn screening data", "Only transplant recipients"], correct: "First-degree relatives, autoantibody status, and disease progression", explanation: "The lab uses human plasma and longitudinal samples to relate mechanistic findings to autoantibody status, first-degree relatives, and progression." },
        { value: 300, prompt: "What is the purpose of preclinical therapeutic studies?", choices: ["Test candidate interventions in mechanistic and disease models", "Replace every laboratory experiment with a survey", "Measure only gene sequence length", "Determine the color of immune cells"], correct: "Test candidate interventions in mechanistic and disease models", explanation: "Candidate interventions are tested to determine whether they can alter pathogenic immunity or preserve beta cell function." },
        { value: 400, prompt: "Which outcome fits the lab's therapeutic goals?", choices: ["Protect beta cells or redirect pathogenic immunity", "Increase autoimmune damage", "Eliminate every immune cell", "Prevent all cellular metabolism"], correct: "Protect beta cells or redirect pathogenic immunity", explanation: "The translational goal is to preserve beta cell function or alter pathogenic immune responses rather than broadly destroying immunity." },
        { value: 500, prompt: "What does 'translational' mean in the context of the lab's research portfolio?", choices: ["Connecting mechanistic discoveries with clinically relevant questions and models", "Translating papers into another language", "Moving samples between refrigerators", "Studying only human genetics"], correct: "Connecting mechanistic discoveries with clinically relevant questions and models", explanation: "Production VI bridges mechanistic immunology and beta cell biology with preclinical interventions and human disease relevance." }
      ]
    }
  ];

  const section = document.createElement("section");
  section.className = "rq-section";
  section.setAttribute("aria-labelledby", "rq-title");
  section.innerHTML = `
    <div class="rq-hero">
      <div class="rq-hero-copy">
        <span class="rq-kicker">Game 02 • Research Trivia</span>
        <h2 id="rq-title">Piganelli Research Challenge</h2>
        <p class="rq-subtitle">Jeopardy-style lab science</p>
        <p class="rq-description">Test what you know about the six major research productions of the Piganelli Lab. Choose a research category and point value, answer the question, and learn more about the science behind each topic.</p>
      </div>
      <aside class="rq-hero-note">
        <strong>How to Play</strong>
        <span>Correct answers add the clue value to your score. Incorrect answers subtract the clue value. Complete all 30 clues to finish the research round.</span>
      </aside>
    </div>

    <div class="rq-shell">
      <div class="rq-status" aria-label="Research challenge status">
        <div class="rq-stat"><span class="rq-stat-label">Score</span><strong id="rq-score">0</strong></div>
        <div class="rq-stat"><span class="rq-stat-label">Best Score</span><strong id="rq-best">0</strong></div>
        <div class="rq-stat"><span class="rq-stat-label">Answered</span><strong id="rq-answered">0/30</strong></div>
        <div class="rq-stat"><span class="rq-stat-label">Current Streak</span><strong id="rq-streak">0</strong></div>
      </div>

      <div class="rq-progress-wrap">
        <div class="rq-progress-meta"><span>Research Round Progress</span><span id="rq-progress-text">0 of 30 clues completed</span></div>
        <div class="rq-progress" aria-hidden="true"><span id="rq-progress-bar"></span></div>
      </div>

      <div class="rq-board-scroll"><div id="rq-board" class="rq-board" aria-label="Piganelli Research Challenge board"></div></div>

      <div class="rq-actions">
        <button id="rq-restart" class="rq-button" type="button">New Research Round</button>
        <a class="rq-button rq-button-secondary" href="${window.location.pathname.replace(/arcade\.html$/, "research.html")}">Explore the Research</a>
      </div>

      <div class="rq-topic-key">
        <a href="${window.location.pathname.replace(/arcade\.html$/, "publications.html#production-1")}">I • Redox</a>
        <a href="${window.location.pathname.replace(/arcade\.html$/, "publications.html#production-2")}">II • Metabolism</a>
        <a href="${window.location.pathname.replace(/arcade\.html$/, "publications.html#production-3")}">III • Beta Cell Stress</a>
        <a href="${window.location.pathname.replace(/arcade\.html$/, "publications.html#production-4")}">IV • Biomarkers</a>
        <a href="${window.location.pathname.replace(/arcade\.html$/, "publications.html#production-5")}">V • Antigen-Specific T Cells</a>
        <a href="${window.location.pathname.replace(/arcade\.html$/, "publications.html#production-6")}">VI • Translation</a>
      </div>

      <section id="rq-finish" class="rq-finish" hidden aria-live="polite">
        <span class="rq-finish-kicker">Research Round Complete</span>
        <h3 id="rq-finish-title">Research Round Complete</h3>
        <p id="rq-finish-text"></p>
        <button id="rq-finish-restart" class="rq-button" type="button">Play Again</button>
      </section>
    </div>

    <div id="rq-modal" class="rq-modal is-hidden" aria-hidden="true">
      <div class="rq-modal-card" role="dialog" aria-modal="true" aria-labelledby="rq-question">
        <button id="rq-modal-close" class="rq-modal-close" type="button" aria-label="Close question">×</button>
        <p id="rq-question-meta" class="rq-question-meta"></p>
        <h3 id="rq-question" class="rq-question">Research question</h3>
        <div id="rq-answer-grid" class="rq-answer-grid"></div>
        <div id="rq-feedback" class="rq-feedback" hidden aria-live="polite">
          <strong id="rq-feedback-result" class="rq-feedback-result"></strong>
          <p id="rq-feedback-text"></p>
        </div>
        <div id="rq-continue" class="rq-continue" hidden>
          <button id="rq-continue-button" class="rq-button" type="button">Return to Board</button>
        </div>
      </div>
    </div>
  `;

  const host = document.querySelector(".aa-page");
  if (!host) return;
  host.appendChild(section);

  const cssHref = `${window.location.pathname.replace(/arcade\.html$/, "assets/game/research-jeopardy.css")}`;
  if (!document.querySelector('link[data-rq-style]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssHref;
    link.dataset.rqStyle = "true";
    document.head.appendChild(link);
  }

  const board = document.getElementById("rq-board");
  const scoreEl = document.getElementById("rq-score");
  const bestEl = document.getElementById("rq-best");
  const answeredEl = document.getElementById("rq-answered");
  const streakEl = document.getElementById("rq-streak");
  const progressText = document.getElementById("rq-progress-text");
  const progressBar = document.getElementById("rq-progress-bar");
  const restartButton = document.getElementById("rq-restart");
  const modal = document.getElementById("rq-modal");
  const modalClose = document.getElementById("rq-modal-close");
  const questionMeta = document.getElementById("rq-question-meta");
  const questionText = document.getElementById("rq-question");
  const answerGrid = document.getElementById("rq-answer-grid");
  const feedback = document.getElementById("rq-feedback");
  const feedbackResult = document.getElementById("rq-feedback-result");
  const feedbackText = document.getElementById("rq-feedback-text");
  const continueWrap = document.getElementById("rq-continue");
  const continueButton = document.getElementById("rq-continue-button");
  const finishPanel = document.getElementById("rq-finish");
  const finishTitle = document.getElementById("rq-finish-title");
  const finishText = document.getElementById("rq-finish-text");
  const finishRestart = document.getElementById("rq-finish-restart");

  const TOTAL_QUESTIONS = CATEGORIES.reduce((sum, category) => sum + category.questions.length, 0);
  let score = 0;
  let answered = 0;
  let correctCount = 0;
  let streak = 0;
  let currentQuestion = null;
  let currentCell = null;
  let questionResolved = false;
  let usedQuestions = new Set();
  let bestScore = readBestScore();

  function readBestScore() {
    try {
      const stored = Number(localStorage.getItem("piganelliResearchChallengeBest") || 0);
      return Number.isFinite(stored) ? stored : 0;
    } catch (_) {
      return 0;
    }
  }

  function saveBestScore() {
    try {
      localStorage.setItem("piganelliResearchChallengeBest", String(bestScore));
    } catch (_) {}
  }

  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function questionKey(categoryIndex, questionIndex) {
    return `${categoryIndex}-${questionIndex}`;
  }

  function formatScore(value) {
    return `${value < 0 ? "−" : ""}${Math.abs(value).toLocaleString()}`;
  }

  function renderBoard() {
    board.replaceChildren();
    CATEGORIES.forEach((category, categoryIndex) => {
      const categoryBox = document.createElement("div");
      categoryBox.className = "rq-category";
      categoryBox.style.gridColumn = String(categoryIndex + 1);
      categoryBox.style.gridRow = "1";
      const production = document.createElement("span");
      production.className = "rq-category-production";
      production.textContent = category.production;
      const title = document.createElement("strong");
      title.textContent = category.name;
      categoryBox.append(production, title);
      board.appendChild(categoryBox);

      category.questions.forEach((question, questionIndex) => {
        const key = questionKey(categoryIndex, questionIndex);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "rq-clue";
        button.style.gridColumn = String(categoryIndex + 1);
        button.style.gridRow = String(questionIndex + 2);
        button.setAttribute("aria-label", `${category.name} for ${question.value} points`);
        if (usedQuestions.has(key)) {
          button.classList.add("is-used");
          button.disabled = true;
          button.textContent = "✓";
        } else {
          button.textContent = String(question.value);
          button.addEventListener("click", () => openQuestion(categoryIndex, questionIndex, button));
        }
        board.appendChild(button);
      });
    });
  }

  function openQuestion(categoryIndex, questionIndex, cell) {
    const category = CATEGORIES[categoryIndex];
    const question = category.questions[questionIndex];
    currentQuestion = { categoryIndex, questionIndex, category, question };
    currentCell = cell;
    questionResolved = false;
    questionMeta.innerHTML = `${category.production} • ${category.name} • <span class="rq-question-value">${question.value} points</span>`;
    questionText.textContent = question.prompt;
    answerGrid.replaceChildren();
    feedback.hidden = true;
    continueWrap.hidden = true;

    shuffle(question.choices).forEach((choice, index) => {
      const answerButton = document.createElement("button");
      answerButton.type = "button";
      answerButton.className = "rq-answer";
      answerButton.textContent = `${String.fromCharCode(65 + index)}. ${choice}`;
      answerButton.dataset.answer = choice;
      answerButton.addEventListener("click", () => answerQuestion(answerButton, choice));
      answerGrid.appendChild(answerButton);
    });

    modal.classList.remove("is-hidden");
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => answerGrid.querySelector(".rq-answer")?.focus(), 30);
  }

  function answerQuestion(selectedButton, selectedChoice) {
    if (questionResolved || !currentQuestion) return;
    questionResolved = true;
    const { categoryIndex, questionIndex, question } = currentQuestion;
    usedQuestions.add(questionKey(categoryIndex, questionIndex));
    answered++;
    const correct = selectedChoice === question.correct;

    if (correct) {
      score += question.value;
      correctCount++;
      streak++;
      feedbackResult.textContent = `Correct! +${question.value}`;
      feedbackResult.className = "rq-feedback-result is-correct";
    } else {
      score -= question.value;
      streak = 0;
      feedbackResult.textContent = `Not quite. −${question.value}`;
      feedbackResult.className = "rq-feedback-result is-wrong";
    }

    feedbackText.textContent = question.explanation;
    feedback.hidden = false;
    answerGrid.querySelectorAll(".rq-answer").forEach(button => {
      button.disabled = true;
      if (button.dataset.answer === question.correct) button.classList.add("is-correct");
    });
    if (!correct) selectedButton.classList.add("is-wrong");
    if (currentCell) {
      currentCell.classList.add("is-used");
      currentCell.disabled = true;
      currentCell.textContent = correct ? "✓" : "×";
    }
    continueWrap.hidden = false;
    updateStatus();
  }

  function closeQuestion() {
    modal.classList.add("is-hidden");
    modal.setAttribute("aria-hidden", "true");
    if (questionResolved && answered >= TOTAL_QUESTIONS) finishGame();
    currentQuestion = null;
    currentCell = null;
    questionResolved = false;
  }

  function updateStatus() {
    scoreEl.textContent = formatScore(score);
    bestEl.textContent = formatScore(bestScore);
    answeredEl.textContent = `${answered}/${TOTAL_QUESTIONS}`;
    streakEl.textContent = String(streak);
    progressText.textContent = `${answered} of ${TOTAL_QUESTIONS} clues completed`;
    progressBar.style.width = `${TOTAL_QUESTIONS ? (answered / TOTAL_QUESTIONS) * 100 : 0}%`;
  }

  function finishGame() {
    if (score > bestScore) {
      bestScore = score;
      saveBestScore();
    }
    const accuracy = TOTAL_QUESTIONS ? Math.round((correctCount / TOTAL_QUESTIONS) * 100) : 0;
    let title = "Research Round Complete";
    if (accuracy >= 90) title = "Piganelli Lab Expert";
    else if (accuracy >= 75) title = "Research Specialist";
    else if (accuracy >= 55) title = "Strong Lab Knowledge";
    else title = "Keep Exploring the Science";
    finishTitle.textContent = title;
    finishText.textContent = `Final score: ${formatScore(score)} points • ${correctCount} of ${TOTAL_QUESTIONS} correct • ${accuracy}% accuracy.`;
    finishPanel.hidden = false;
    updateStatus();
    finishPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function resetGame() {
    score = 0;
    answered = 0;
    correctCount = 0;
    streak = 0;
    currentQuestion = null;
    currentCell = null;
    questionResolved = false;
    usedQuestions = new Set();
    finishPanel.hidden = true;
    modal.classList.add("is-hidden");
    modal.setAttribute("aria-hidden", "true");
    renderBoard();
    updateStatus();
  }

  restartButton.addEventListener("click", resetGame);
  finishRestart.addEventListener("click", () => {
    resetGame();
    board.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  continueButton.addEventListener("click", closeQuestion);
  modalClose.addEventListener("click", closeQuestion);
  modal.addEventListener("click", event => {
    if (event.target === modal) closeQuestion();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.classList.contains("is-hidden")) closeQuestion();
  });

  renderBoard();
  updateStatus();
})();
