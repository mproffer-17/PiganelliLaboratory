(() => {
  "use strict";

  const CATEGORIES = [
    {
      production: "Production I",
      name: "Redox Immunology",
      questions: [
        {
          value: 100,
          prompt: "What is fundamentally transferred during an oxidation-reduction (redox) reaction?",
          choices: ["Electrons", "Amino acids", "Phosphate groups only", "Whole proteins"],
          correct: "Electrons",
          explanation: "Redox reactions involve electron transfer. Oxidation is loss of electrons and reduction is gain of electrons, making redox chemistry central to ROS-dependent signaling."
        },
        {
          value: 200,
          prompt: "Which statement best distinguishes physiological ROS signaling from oxidative stress?",
          choices: ["Physiological ROS are controlled and can signal, whereas oxidative stress reflects an imbalance that overwhelms redox control", "Physiological ROS occur only in bacteria, whereas oxidative stress occurs only in mammals", "Physiological ROS always damage DNA, whereas oxidative stress never does", "Physiological ROS are extracellular, whereas oxidative stress is exclusively nuclear"],
          correct: "Physiological ROS are controlled and can signal, whereas oxidative stress reflects an imbalance that overwhelms redox control",
          explanation: "Low or regulated ROS can function as second messengers, while oxidative stress occurs when oxidant production exceeds the capacity of antioxidant and repair systems."
        },
        {
          value: 300,
          prompt: "Why can reversible oxidation of catalytic cysteines in protein tyrosine phosphatases amplify immune-receptor signaling?",
          choices: ["It can transiently inhibit phosphatase activity and prolong phosphorylation", "It permanently activates every phosphatase", "It prevents kinases from using ATP", "It removes peptide-MHC complexes from antigen-presenting cells"],
          correct: "It can transiently inhibit phosphatase activity and prolong phosphorylation",
          explanation: "Many phosphatases contain redox-sensitive catalytic cysteines. Reversible oxidation can temporarily reduce phosphatase activity, allowing kinase-driven phosphorylation signals to persist longer."
        },
        {
          value: 400,
          prompt: "A T cell experiences a moderate ROS increase immediately after receptor stimulation. Which outcome is most consistent with redox-sensitive signaling rather than nonspecific oxidative damage?",
          choices: ["A transient increase in phosphorylation of signaling proteins followed by recovery", "Immediate irreversible oxidation of most cellular proteins", "Complete loss of mitochondrial membrane integrity", "Permanent elimination of intracellular antioxidants"],
          correct: "A transient increase in phosphorylation of signaling proteins followed by recovery",
          explanation: "Redox signaling is typically reversible and spatially controlled. A transient change in phosphorylation that resolves is more consistent with signaling than widespread irreversible oxidative injury."
        },
        {
          value: 500,
          prompt: "In an activated T cell, an oxidant pulse leaves kinase activity unchanged but transiently inhibits a redox-sensitive phosphatase. What is the most likely immediate effect on that phosphatase's signaling targets?",
          choices: ["Their phosphorylated state is prolonged until phosphatase activity recovers", "They become dephosphorylated more rapidly", "Their phosphorylation becomes independent of kinases", "They are converted directly into reactive oxygen species"],
          correct: "Their phosphorylated state is prolonged until phosphatase activity recovers",
          explanation: "If kinase input continues while the opposing phosphatase is transiently inhibited, phosphorylation accumulates or persists. This is a classic mechanism by which redox changes can tune signaling amplitude and duration."
        }
      ]
    },
    {
      production: "Production II",
      name: "T Cell Metabolism & Activation",
      questions: [
        {
          value: 100,
          prompt: "Activated effector T cells commonly increase their use of which pathway to rapidly support growth and biosynthesis?",
          choices: ["Glycolysis", "Ketone-body synthesis", "Urea-cycle flux", "Bile-acid synthesis"],
          correct: "Glycolysis",
          explanation: "Activated T cells frequently increase glycolytic flux to rapidly generate metabolic intermediates and energy needed for proliferation and effector function."
        },
        {
          value: 200,
          prompt: "What is the main role of CD28 during conventional T cell activation?",
          choices: ["Provide a co-stimulatory signal that complements TCR recognition", "Replace the T cell receptor as the antigen-binding receptor", "Directly cleave peptide antigens into epitopes", "Function as the major glucose transporter on T cells"],
          correct: "Provide a co-stimulatory signal that complements TCR recognition",
          explanation: "TCR engagement provides antigen-specific signaling, while CD28 supplies an important co-stimulatory signal that supports survival, proliferation, cytokine production, and metabolic reprogramming."
        },
        {
          value: 300,
          prompt: "Which signaling axis is most directly associated with CD28-driven anabolic metabolism and increased protein synthesis in activated T cells?",
          choices: ["PI3K-AKT-mTORC1", "JAK-STAT1 only", "cGAS-STING only", "SMAD2/3 only"],
          correct: "PI3K-AKT-mTORC1",
          explanation: "CD28 can reinforce PI3K-AKT-mTORC1 signaling, which promotes nutrient uptake, anabolic metabolism, and biosynthetic programs needed for T cell growth and activation."
        },
        {
          value: 400,
          prompt: "PDCD4 restrains translation partly by binding eIF4A. What would PDCD4 degradation be expected to do?",
          choices: ["Release eIF4A and favor translation initiation", "Permanently inhibit ribosome assembly", "Block all TCR phosphorylation", "Prevent glucose from entering the cell"],
          correct: "Release eIF4A and favor translation initiation",
          explanation: "PDCD4 is a translation inhibitor that can bind eIF4A. Its phosphorylation, ubiquitination, and degradation can release eIF4A, supporting increased translation during activation."
        },
        {
          value: 500,
          prompt: "A drug simultaneously suppresses PI3K-AKT-mTORC1 and RAS-ERK-RSK signaling in an activated T cell. If PDCD4 phosphorylation depends on downstream S6K1/RSK activity, which molecular pattern is most likely?",
          choices: ["Reduced PDCD4 phosphorylation, greater PDCD4 persistence, and less eIF4A release", "Increased PDCD4 degradation, more eIF4A release, and higher translation", "Unchanged PDCD4 with complete loss of TCR expression", "Direct conversion of PDCD4 into a glycolytic enzyme"],
          correct: "Reduced PDCD4 phosphorylation, greater PDCD4 persistence, and less eIF4A release",
          explanation: "Reducing S6K1/RSK input should decrease PDCD4 phosphorylation and subsequent degradation, allowing PDCD4 to continue restraining eIF4A-dependent translation."
        }
      ]
    },
    {
      production: "Production III",
      name: "Beta Cell Stress",
      questions: [
        {
          value: 100,
          prompt: "What is a defining feature of endoplasmic reticulum (ER) stress?",
          choices: ["Accumulation of unfolded or misfolded proteins in the ER", "Loss of all nuclear DNA", "Permanent inhibition of glucose uptake", "Absence of mitochondrial proteins"],
          correct: "Accumulation of unfolded or misfolded proteins in the ER",
          explanation: "ER stress occurs when protein-folding demand exceeds ER capacity, leading to accumulation of unfolded or misfolded proteins and activation of the unfolded protein response."
        },
        {
          value: 200,
          prompt: "What is the initial purpose of the unfolded protein response (UPR) during ER stress?",
          choices: ["Restore protein-folding homeostasis and reduce ER burden", "Increase production of misfolded proteins", "Eliminate all antigen presentation", "Convert beta cells into immune cells"],
          correct: "Restore protein-folding homeostasis and reduce ER burden",
          explanation: "The UPR initially acts adaptively by reducing protein-folding load, increasing chaperone capacity, and promoting recovery. Persistent unresolved stress can instead contribute to dysfunction or death."
        },
        {
          value: 300,
          prompt: "How can defective autophagy intensify cellular stress in a beta cell?",
          choices: ["Damaged organelles and proteins can accumulate instead of being efficiently cleared", "Every cytosolic protein is immediately secreted", "MHC molecules are completely removed from the cell", "Insulin is converted directly into DNA"],
          correct: "Damaged organelles and proteins can accumulate instead of being efficiently cleared",
          explanation: "Autophagy helps maintain proteostasis and organelle quality. Impaired clearance can increase oxidative and ER stress and compromise beta cell function."
        },
        {
          value: 400,
          prompt: "Why can post-translational modification of beta cell proteins matter in autoimmunity?",
          choices: ["It can create altered peptide determinants that were not efficiently tolerated as native self", "It guarantees deletion of all autoreactive T cells", "It prevents proteins from ever being processed by antigen-presenting cells", "It makes all beta cell proteins identical to microbial proteins"],
          correct: "It can create altered peptide determinants that were not efficiently tolerated as native self",
          explanation: "Stress-associated modifications can generate neoepitopes or altered self determinants, potentially changing which peptides are processed, presented, and recognized by autoreactive lymphocytes."
        },
        {
          value: 500,
          prompt: "In a stressed islet, investigators observe increased beta cell death, more antigen-bearing material in local antigen-presenting cells, and broader T cell reactivity. Which interpretation is best supported?",
          choices: ["Tissue stress could increase antigen availability and thereby facilitate diversification of the autoimmune response", "Beta cell death proves that every new T cell specificity arose by mutation of the original TCR", "More antigen-bearing material demonstrates that oxidative stress is the only cause of diabetes", "Broader reactivity means beta cell stress has restored immune tolerance"],
          correct: "Tissue stress could increase antigen availability and thereby facilitate diversification of the autoimmune response",
          explanation: "Greater tissue injury can increase the quantity and diversity of self antigens available for presentation. That can support epitope diversification, although the observation alone does not establish the exact receptor-level mechanism."
        }
      ]
    },
    {
      production: "Production IV",
      name: "Early Biomarkers",
      questions: [
        {
          value: 100,
          prompt: "What is the main purpose of an early disease biomarker?",
          choices: ["Detect a biological change before or near the earliest clinically apparent disease stages", "Replace every mechanistic experiment", "Measure only irreversible end-stage damage", "Identify a signal that never changes over time"],
          correct: "Detect a biological change before or near the earliest clinically apparent disease stages",
          explanation: "An early biomarker is most useful when it reveals biology during a window that precedes or accompanies early progression, rather than only after advanced disease is established."
        },
        {
          value: 200,
          prompt: "Soluble LAG-3 can be generated from cell-surface LAG-3 by which type of process?",
          choices: ["Proteolytic ectodomain shedding", "DNA replication", "Mitochondrial fission", "Peptide-MHC tetramerization"],
          correct: "Proteolytic ectodomain shedding",
          explanation: "Cell-surface LAG-3 can be cleaved by metalloproteases such as ADAM10 and ADAM17, releasing soluble LAG-3 into the extracellular space."
        },
        {
          value: 300,
          prompt: "Why is longitudinal sampling especially valuable when evaluating a transient immune-activation biomarker?",
          choices: ["It can reveal when the marker rises and falls within the same disease course", "It eliminates all between-person biological variability", "It guarantees that the marker is disease-specific", "It removes the need for appropriate comparison groups"],
          correct: "It can reveal when the marker rises and falls within the same disease course",
          explanation: "Repeated sampling can identify a time-limited biomarker peak that a single cross-sectional measurement could easily miss."
        },
        {
          value: 400,
          prompt: "A candidate biomarker rises before overt diabetes and later returns toward baseline. Which interpretation is most appropriate?",
          choices: ["It may mark a transient biological window rather than cumulative disease burden", "It cannot be a biomarker because useful biomarkers must increase monotonically", "The early rise proves the marker is specific only to beta cells", "The decline proves the initial measurements were necessarily technical artifacts"],
          correct: "It may mark a transient biological window rather than cumulative disease burden",
          explanation: "A useful biomarker can be dynamic. A rise followed by decline may identify a specific stage of immune activation rather than track total disease severity continuously."
        },
        {
          value: 500,
          prompt: "A soluble activation marker is higher in progressors and in earlier autoantibody-positive stages, but lower in established disease. What is the strongest interpretation?",
          choices: ["The marker may report an early, state-dependent immune activation window rather than simply increasing with disease duration", "The marker is necessarily a direct measure of beta cell mass", "The marker must be uniquely specific to type 1 diabetes", "Established disease should be excluded because biomarker values can never decline biologically"],
          correct: "The marker may report an early, state-dependent immune activation window rather than simply increasing with disease duration",
          explanation: "This pattern is most consistent with a temporally restricted activation signal. It supports stage association, but by itself does not prove disease specificity or direct measurement of beta cell mass."
        }
      ]
    },
    {
      production: "Production V",
      name: "Antigen-Specific T Cells",
      questions: [
        {
          value: 100,
          prompt: "What does a peptide-MHC tetramer allow researchers to identify by flow cytometry?",
          choices: ["T cells whose receptors bind a particular peptide-MHC complex", "All cells that secrete insulin", "Only antigen-presenting cells", "Every T cell regardless of specificity"],
          correct: "T cells whose receptors bind a particular peptide-MHC complex",
          explanation: "Tetramers multimerize a defined peptide-MHC complex, increasing avidity enough to label T cells carrying receptors that recognize that complex."
        },
        {
          value: 200,
          prompt: "What is a hybrid insulin peptide (HIP)?",
          choices: ["A peptide formed by covalently joining fragments from two peptide sources, one of which can be insulin-derived", "An insulin molecule bound to glucose", "A peptide encoded by a viral genome", "A fluorescent antibody used to detect insulin"],
          correct: "A peptide formed by covalently joining fragments from two peptide sources, one of which can be insulin-derived",
          explanation: "HIPs are fusion peptides generated by covalent joining of peptide fragments. Some can create neoepitopes recognized by diabetogenic T cells."
        },
        {
          value: 300,
          prompt: "What does classical epitope spreading describe during an autoimmune response?",
          choices: ["Recruitment or expansion of lymphocytes recognizing determinants distinct from the initiating epitope", "One receptor binding the same epitope with higher affinity", "Loss of all antigen specificity after activation", "Only an increase in the number of antigen-presenting cells"],
          correct: "Recruitment or expansion of lymphocytes recognizing determinants distinct from the initiating epitope",
          explanation: "Epitope spreading is a population-level broadening of immune recognition to additional determinants as disease evolves."
        },
        {
          value: 400,
          prompt: "Why does dual binding to two peptide-MHC tetramers not, by itself, prove epitope spreading?",
          choices: ["A single TCR can sometimes cross-react with more than one peptide-MHC complex", "Tetramers cannot bind T cell receptors", "Epitope spreading occurs only in B cells", "Dual staining always indicates technical failure"],
          correct: "A single TCR can sometimes cross-react with more than one peptide-MHC complex",
          explanation: "Dual tetramer binding can reflect receptor cross-reactivity. Demonstrating classical spreading requires evidence that distinct lymphocyte populations recognizing new determinants are being recruited or expanded."
        },
        {
          value: 500,
          prompt: "A study begins with a defined autoreactive TCR population. Later, some cells stain with both the original tetramer and a second beta cell tetramer. What additional evidence would most strongly support true epitope spreading rather than cross-reactivity?",
          choices: ["Emergence or expansion of distinct clonotypes or mutually exclusive populations specific for the new determinant", "A higher fluorescence intensity for the original tetramer", "More total CD4 T cells in the spleen", "Detection of the original antigen in pancreatic tissue"],
          correct: "Emergence or expansion of distinct clonotypes or mutually exclusive populations specific for the new determinant",
          explanation: "True epitope spreading is best supported by distinct lymphocyte populations directed against a new determinant. Dual binding within the original population can instead be explained by TCR cross-reactivity."
        }
      ]
    },
    {
      production: "Production VI",
      name: "Translational Models",
      questions: [
        {
          value: 100,
          prompt: "Why are NOD mice widely used in type 1 diabetes research?",
          choices: ["They spontaneously develop autoimmune diabetes with key immunological features of the disease", "They lack all lymphocytes from birth", "They cannot develop pancreatic inflammation", "They are genetically identical to humans"],
          correct: "They spontaneously develop autoimmune diabetes with key immunological features of the disease",
          explanation: "NOD mice spontaneously develop autoimmune insulitis and diabetes, making them a useful model for studying disease initiation and progression."
        },
        {
          value: 200,
          prompt: "Why are NOD.scid mice useful as recipients in adoptive-transfer experiments?",
          choices: ["Their severe immunodeficiency reduces competing endogenous adaptive lymphocytes", "They spontaneously generate more endogenous T cells than NOD mice", "They cannot receive transferred lymphocytes", "They are resistant to all forms of beta cell injury"],
          correct: "Their severe immunodeficiency reduces competing endogenous adaptive lymphocytes",
          explanation: "NOD.scid recipients lack functional endogenous T and B cells, allowing transferred lymphocyte populations to be studied in a cleaner immunological background."
        },
        {
          value: 300,
          prompt: "What is a major experimental advantage of transferring a defined autoreactive T cell population into recipient mice?",
          choices: ["It provides a more synchronized starting point for following activation and disease progression", "It recreates every feature of spontaneous human disease", "It removes the need for control groups", "It ensures that no tissue-specific effects can occur"],
          correct: "It provides a more synchronized starting point for following activation and disease progression",
          explanation: "Adoptive transfer lets investigators start with a defined cell population and timing, making longitudinal changes easier to resolve than in fully spontaneous disease."
        },
        {
          value: 400,
          prompt: "Why is an infection model such as CVB3 useful when evaluating a soluble T cell activation marker in autoimmune diabetes research?",
          choices: ["It can test whether the marker also rises during non-autoimmune immune activation", "It proves that any marker increase is beta cell-specific", "It eliminates the need to study autoimmune models", "It directly measures antigen-specific TCR affinity"],
          correct: "It can test whether the marker also rises during non-autoimmune immune activation",
          explanation: "An infection control helps separate a general activation-associated signal from one that is uniquely associated with autoimmune diabetes."
        },
        {
          value: 500,
          prompt: "A candidate marker rises before diabetes in an autoimmune model but also rises transiently after vaccination and viral infection. Which conclusion is most defensible?",
          choices: ["The marker likely reflects immune activation and may still be useful for timing disease-related activation, but it is not inherently disease-specific", "The marker is useless because any response outside diabetes invalidates it", "The marker directly identifies beta cell-specific TCR clonotypes", "The marker proves viral infection causes every case of type 1 diabetes"],
          correct: "The marker likely reflects immune activation and may still be useful for timing disease-related activation, but it is not inherently disease-specific",
          explanation: "A marker can be biologically valuable without being disease-specific. Transient responses in vaccination or infection support an activation-associated interpretation, so disease context and longitudinal patterns become important for translation."
        }
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
        <p class="rq-description">Test your knowledge of the science behind the Piganelli Lab's six research areas. Questions progress from foundational concepts at 100 points to mechanistic and experimental reasoning at 500 points.</p>
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
