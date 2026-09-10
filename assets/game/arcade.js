(() => {
  "use strict";

  /* =========================================================
     AUTOIMMUNE ARCADE: BETA CELL BREAKDOWN — V5
     Performance build with:
     - fixed step tile movement
     - cached static beta cell board
     - three simultaneous antigen colors
     - eight circular cytokine bonus icons using arcade-inspired color schemes
     - shared sprite functions for game + science guide
     - floating character labels
     ========================================================= */

  const canvas = document.getElementById("betaCellGame");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: false });

  const UI = {
    score: document.getElementById("aa-score"),
    highScore: document.getElementById("aa-high-score"),
    activationLabel: document.getElementById("aa-activation-label"),
    activationBar: document.getElementById("aa-activation-bar"),
    betaLabel: document.getElementById("aa-beta-label"),
    betaBar: document.getElementById("aa-beta-bar"),
    lives: document.getElementById("aa-lives"),
    stageLabel: document.getElementById("aa-stage-label"),
    overlay: document.getElementById("aa-overlay"),
    overlayTitle: document.getElementById("aa-overlay-title"),
    overlayText: document.getElementById("aa-overlay-text"),
    primaryButton: document.getElementById("aa-primary-button"),
    startLegend: document.getElementById("aa-start-legend"),
    stageBanner: document.getElementById("aa-stage-banner"),
    pauseButton: document.getElementById("aa-pause"),
    soundButton: document.getElementById("aa-sound"),
    restartButton: document.getElementById("aa-restart"),
    guideTCell: document.getElementById("aa-guide-tcell-canvas"),
    guideAntigen: document.getElementById("aa-guide-antigen-canvas"),
    guideGhost: document.getElementById("aa-guide-ghost-canvas"),
    guideBoost: document.getElementById("aa-guide-boost-canvas")
  };

  const W = canvas.width;
  const H = canvas.height;
  const COLS = 27;
  const ROWS = 21;
  const TILE = 30;
  const BOARD_W = COLS * TILE;
  const BOARD_H = ROWS * TILE;
  const OFFSET_X = (W - BOARD_W) / 2;
  const OFFSET_Y = (H - BOARD_H) / 2;
  const FIXED_STEP = 1 / 60;
  const MAX_UPDATES_PER_FRAME = 4;
  const RENDER_INTERVAL = 1000 / 60;

  const COLORS = {
    bg: "#03050d",
    membrane: "#6389ff",
    wall: "#2459ff",
    wallDark: "#07123e",
    wallGlow: "rgba(81,126,244,0.60)",
    iapp: "#FFE84A",
    chga: "#FF6AA9",
    insb: "#58E5FF",
    player: "#FFFF00",
    muted: "#8792ac",
    dangerous: "#ff4d67",
    label: "#FFFFFF"
  };

  const DIRECTIONS = {
    left:  { x: -1, y:  0, angle: Math.PI },
    right: { x:  1, y:  0, angle: 0 },
    up:    { x:  0, y: -1, angle: -Math.PI / 2 },
    down:  { x:  0, y:  1, angle: Math.PI / 2 },
    none:  { x:  0, y:  0, angle: 0 }
  };

  const DIR_NAMES = ["left", "right", "up", "down"];

  const ANTIGENS = [
    { name: "IAPP-HIP", color: COLORS.iapp },
    { name: "ChgA-HIP", color: COLORS.chga },
    { name: "InsB:9-23", color: COLORS.insb }
  ];

  /* Point values follow the classic Pac-Man bonus progression requested.
     The booster icons are original circular symbols that keep the arcade
     color schemes while matching the round icon language used elsewhere
     in this game. */

  const BOOSTERS = [
    {
      name: "IL-2",
      arcadeRef: "Cherry",
      bonus: 100,
      effect: "Expansion boost",
      main: "#FE3030"
    },
    {
      name: "IL-12",
      arcadeRef: "Strawberry",
      bonus: 300,
      effect: "Effector boost",
      main: "#FF73B7"
    },
    {
      name: "IFNγ",
      arcadeRef: "Orange",
      bonus: 500,
      effect: "Inflammatory boost",
      main: "#FFA23A"
    },
    {
      name: "IL-21",
      arcadeRef: "Apple",
      bonus: 700,
      effect: "Persistence boost",
      main: "#6BEA63"
    },
    {
      name: "IL-18",
      arcadeRef: "Melon",
      bonus: 1000,
      effect: "Activation boost",
      main: "#67E3B8"
    },
    {
      name: "TNFα",
      arcadeRef: "Galaxian",
      bonus: 2000,
      effect: "Inflammatory boost",
      main: "#4D79FF"
    },
    {
      name: "IL-1β",
      arcadeRef: "Bell",
      bonus: 3000,
      effect: "Danger signal boost",
      main: "#FFE04E"
    },
    {
      name: "Type I IFN",
      arcadeRef: "Key",
      bonus: 5000,
      effect: "Antiviral inflammatory boost",
      main: "#FFFFFF"
    }
  ];

  const STRUCTURES = [
    { x: 5,  y: 3,  w: 4, h: 2, label: "MITOCHONDRIA" },
    { x: 11, y: 2,  w: 5, h: 2, label: "ER" },
    { x: 18, y: 3,  w: 4, h: 2, label: "GRANULES" },
    { x: 3,  y: 7,  w: 4, h: 2, label: "ER" },
    { x: 9,  y: 6,  w: 3, h: 4, label: "MITOCHONDRIA" },
    { x: 15, y: 6,  w: 3, h: 4, label: "GRANULES" },
    { x: 20, y: 7,  w: 4, h: 2, label: "MITOCHONDRIA" },
    { x: 5,  y: 11, w: 4, h: 3, label: "GRANULES" },
    { x: 11, y: 11, w: 5, h: 2, label: "ER" },
    { x: 18, y: 11, w: 4, h: 3, label: "ER" },
    { x: 3,  y: 16, w: 5, h: 2, label: "MITOCHONDRIA" },
    { x: 10, y: 15, w: 3, h: 3, label: "GRANULES" },
    { x: 14, y: 15, w: 3, h: 3, label: "ER" },
    { x: 19, y: 16, w: 5, h: 2, label: "MITOCHONDRIA" }
  ];

  const enemyHome = { col: 13, row: 10 };
  const playerHome = { col: 13, row: 18 };

  let grid = [];
  let pellets = [];
  let pelletGrid = [];
  let antigenTotals = [0, 0, 0];
  let antigenRemaining = [0, 0, 0];
  let totalPellets = 0;
  let remainingPellets = 0;
  let powerUps = [];
  let powerGrid = [];
  let player = null;
  let enemies = [];
  let floatingScores = [];

  let state = "ready";
  let score = 0;
  let highScore = readHighScore();
  let lives = 3;
  let activation = 8;
  let betaFunction = 100;
  let currentAntigen = 0;
  let totalCollected = 0;
  let boostTimer = 0;
  let boostName = "";
  let enemyEatChain = 0;
  let recoveryTimer = 0;
  let bannerTimer = 0;
  let mouthPhase = 0;
  let soundEnabled = true;
  let audioContext = null;

  let lastFrameTime = 0;
  let accumulator = 0;
  let lastRenderTime = 0;
  let forceRender = true;

  const uiCache = {
    score: null,
    highScore: null,
    activationState: null,
    activationRounded: null,
    betaRounded: null,
    lives: null,
    antigen: null
  };

  const staticLayer = document.createElement("canvas");
  staticLayer.width = W;
  staticLayer.height = H;

  const sctx = staticLayer.getContext("2d", {
    alpha: false
  });

  function readHighScore() {
    try {
      const value = Number(
        window.localStorage.getItem("autoimmuneArcadeHighScore") || 0
      );

      return Number.isFinite(value) ? value : 0;
    } catch (_) {
      return 0;
    }
  }

  function persistHighScore() {
    try {
      window.localStorage.setItem(
        "autoimmuneArcadeHighScore",
        String(highScore)
      );
    } catch (_) {
      // Storage may be unavailable in local previews or privacy modes.
    }
  }

  function tileCenterX(col) {
    return OFFSET_X + col * TILE + TILE / 2;
  }

  function tileCenterY(row) {
    return OFFSET_Y + row * TILE + TILE / 2;
  }

  function isOpen(col, row) {
    return (
      row >= 0 &&
      row < ROWS &&
      col >= 0 &&
      col < COLS &&
      grid[row][col] === 0
    );
  }

  function opposite(dir) {
    return {
      left: "right",
      right: "left",
      up: "down",
      down: "up"
    }[dir] || "none";
  }

  function buildGrid() {
    grid = Array.from(
      { length: ROWS },
      () => Array(COLS).fill(-1)
    );

    const cx = (COLS - 1) / 2;
    const cy = (ROWS - 1) / 2;
    const rx = 12.4;
    const ry = 9.5;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const dx = (col - cx) / rx;
        const dy = (row - cy) / ry;

        if (dx * dx + dy * dy <= 1) {
          grid[row][col] = 0;
        }
      }
    }

    for (const structure of STRUCTURES) {
      for (
        let row = structure.y;
        row < structure.y + structure.h;
        row++
      ) {
        for (
          let col = structure.x;
          col < structure.x + structure.w;
          col++
        ) {
          if (
            row >= 0 &&
            row < ROWS &&
            col >= 0 &&
            col < COLS &&
            grid[row][col] === 0
          ) {
            grid[row][col] = 1;
          }
        }
      }
    }

    const guaranteedOpen = [
      [13, 4],
      [13, 5],
      [13, 6],
      [13, 7],
      [13, 8],
      [13, 9],
      [13, 10],
      [13, 11],
      [13, 12],
      [13, 13],
      [13, 14],
      [13, 15],
      [13, 16],
      [13, 17],
      [13, 18],
      [12, 10],
      [14, 10],
      [12, 18],
      [14, 18]
    ];

    guaranteedOpen.forEach(([col, row]) => {
      if (grid[row] && grid[row][col] !== -1) {
        grid[row][col] = 0;
      }
    });
  }

  function nearestOpen(preferredCol, preferredRow, used) {
    if (
      isOpen(preferredCol, preferredRow) &&
      !used.has(`${preferredCol},${preferredRow}`)
    ) {
      return {
        col: preferredCol,
        row: preferredRow
      };
    }

    for (let radius = 1; radius < 8; radius++) {
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          if (
            Math.max(
              Math.abs(dc),
              Math.abs(dr)
            ) !== radius
          ) {
            continue;
          }

          const col = preferredCol + dc;
          const row = preferredRow + dr;

          if (
            isOpen(col, row) &&
            !used.has(`${col},${row}`)
          ) {
            return {
              col,
              row
            };
          }
        }
      }
    }

    return null;
  }

  function generatePowerUps() {
    powerUps = [];

    powerGrid = Array.from(
      { length: ROWS },
      () => Array(COLS).fill(null)
    );

    const preferred = [
      [4, 10],
      [22, 10],
      [13, 5],
      [13, 17],
      [7, 15],
      [19, 15],
      [7, 5],
      [19, 5]
    ];

    const used = new Set();

    preferred.forEach(([col, row], type) => {
      const position = nearestOpen(
        col,
        row,
        used
      );

      if (!position) return;

      used.add(
        `${position.col},${position.row}`
      );

      const power = {
        col: position.col,
        row: position.row,
        type,
        eaten: false,
        x: tileCenterX(position.col),
        y: tileCenterY(position.row)
      };

      powerUps.push(power);

      powerGrid[
        power.row
      ][
        power.col
      ] = power;
    });
  }

  function openNeighborCount(col, row) {
    let count = 0;

    for (const name of DIR_NAMES) {
      const d = DIRECTIONS[name];

      if (
        isOpen(
          col + d.x,
          row + d.y
        )
      ) {
        count++;
      }
    }

    return count;
  }

  function generatePellets() {
    pellets = [];

    pelletGrid = Array.from(
      { length: ROWS },
      () => Array(COLS).fill(null)
    );

    antigenTotals = [0, 0, 0];

    const candidates = [];

    for (let row = 1; row < ROWS - 1; row++) {
      for (let col = 1; col < COLS - 1; col++) {
        if (!isOpen(col, row)) continue;
        if (powerGrid[row][col]) continue;

        if (
          Math.abs(col - enemyHome.col) <= 1 &&
          Math.abs(row - enemyHome.row) <= 1
        ) {
          continue;
        }

        if (
          Math.abs(col - playerHome.col) <= 1 &&
          Math.abs(row - playerHome.row) <= 1
        ) {
          continue;
        }

        if (
          (col + row) % 2 !== 0 &&
          openNeighborCount(col, row) < 3
        ) {
          continue;
        }

        candidates.push({
          col,
          row
        });
      }
    }

    candidates.forEach((position, index) => {
      const antigen =
        (index + position.row) %
        ANTIGENS.length;

      const pellet = {
        col: position.col,
        row: position.row,
        antigen,
        eaten: false,
        x: tileCenterX(position.col),
        y: tileCenterY(position.row)
      };

      pellets.push(pellet);

      pelletGrid[
        pellet.row
      ][
        pellet.col
      ] = pellet;

      antigenTotals[
        antigen
      ]++;
    });

    antigenRemaining =
      antigenTotals.slice();

    totalPellets =
      pellets.length;

    remainingPellets =
      totalPellets;
  }

  function makeEntity(col, row, tilesPerSecond) {
    return {
      col,
      row,
      dir: "none",
      queuedDir: "none",
      progress: 0,
      tilesPerSecond,
      x: tileCenterX(col),
      y: tileCenterY(row),
      radius: TILE * 0.38
    };
  }

  function updateEntityPixel(entity) {
    const d =
      DIRECTIONS[entity.dir] ||
      DIRECTIONS.none;

    entity.x =
      tileCenterX(entity.col) +
      d.x *
      TILE *
      entity.progress;

    entity.y =
      tileCenterY(entity.row) +
      d.y *
      TILE *
      entity.progress;
  }

  function canLeaveTile(entity, dir) {
    const d = DIRECTIONS[dir];

    return (
      !!d &&
      dir !== "none" &&
      isOpen(
        entity.col + d.x,
        entity.row + d.y
      )
    );
  }

  function resetEntities() {
    player = makeEntity(
      playerHome.col,
      playerHome.row,
      7.2
    );

    player.dir = "left";
    player.queuedDir = "left";

    updateEntityPixel(player);

    const starts = [
      {
        col: 12,
        row: 10,
        name: "Treg",
        color: "#C55CFF",
        personality: "chase",
        speed: 4.25
      },
      {
        col: 14,
        row: 10,
        name: "Tol DC",
        color: "#4FC3FF",
        personality: "ambush",
        speed: 4.45
      },
      {
        col: 13,
        row: 9,
        name: "PD-L1 APC",
        color: "#FF5D73",
        personality: "patrol",
        speed: 4.15
      },
      {
        col: 13,
        row: 11,
        name: "Reg Mφ",
        color: "#63E1B7",
        personality: "shy",
        speed: 4.05
      }
    ];

    enemies = starts.map((s, i) => {
      const enemy = makeEntity(
        s.col,
        s.row,
        s.speed
      );

      enemy.name =
        s.name;

      enemy.color =
        s.color;

      enemy.personality =
        s.personality;

      enemy.dir =
        i % 2
          ? "right"
          : "left";

      enemy.home = {
        col: s.col,
        row: s.row
      };

      enemy.scatter = {
        col:
          i < 2
            ? (
              i === 0
                ? 3
                : 23
            )
            : (
              i === 2
                ? 4
                : 22
            ),
        row:
          i < 2
            ? 4
            : 17
      };

      if (
        !canLeaveTile(
          enemy,
          enemy.dir
        )
      ) {
        enemy.dir =
          chooseEnemyDirection(enemy);
      }

      updateEntityPixel(enemy);

      return enemy;
    });

    forceRender = true;
  }

  function resetGame(full = true) {
    if (full) {
      score = 0;
      lives = 3;
      activation = 8;
      betaFunction = 100;
      currentAntigen = 0;
      totalCollected = 0;
      boostTimer = 0;
      boostName = "";
      enemyEatChain = 0;
      recoveryTimer = 0;
      bannerTimer = 0;
      floatingScores = [];

      antigenRemaining =
        antigenTotals.slice();

      remainingPellets =
        totalPellets;

      pellets.forEach(p => {
        p.eaten = false;
      });

      powerUps.forEach(p => {
        p.eaten = false;
      });
    }

    resetEntities();
    updateUI(true);
  }

  function activationState() {
    if (activation < 25) {
      return "Naive";
    }

    if (activation < 50) {
      return "Activated";
    }

    if (activation < 75) {
      return "Expanded";
    }

    return "Effector";
  }

  function updateUI(force = false) {
    if (score > highScore) {
      highScore = score;
    }

    const actState =
      activationState();

    const actRounded =
      Math.round(activation);

    const betaRounded =
      Math.round(betaFunction);

    if (
      force ||
      uiCache.score !== score
    ) {
      UI.score.textContent =
        String(score).padStart(
          6,
          "0"
        );

      uiCache.score = score;
    }

    if (
      force ||
      uiCache.highScore !==
        highScore
    ) {
      UI.highScore.textContent =
        String(highScore).padStart(
          6,
          "0"
        );

      uiCache.highScore =
        highScore;
    }

    if (
      force ||
      uiCache.activationState !==
        actState
    ) {
      UI.activationLabel.textContent =
        actState;

      uiCache.activationState =
        actState;
    }

    if (
      force ||
      uiCache.activationRounded !==
        actRounded
    ) {
      UI.activationBar.style.width =
        `${Math.max(
          0,
          Math.min(
            100,
            actRounded
          )
        )}%`;

      uiCache.activationRounded =
        actRounded;
    }

    if (
      force ||
      uiCache.betaRounded !==
        betaRounded
    ) {
      UI.betaLabel.textContent =
        `${Math.max(
          0,
          betaRounded
        )}%`;

      UI.betaBar.style.width =
        `${Math.max(
          0,
          Math.min(
            100,
            betaRounded
          )
        )}%`;

      uiCache.betaRounded =
        betaRounded;
    }

    if (
      force ||
      uiCache.antigen !==
        currentAntigen
    ) {
      UI.stageLabel.textContent =
        ANTIGENS[
          currentAntigen
        ]?.name ||
        "Complete";

      UI.stageLabel.style.color =
        ANTIGENS[
          currentAntigen
        ]?.color ||
        "#ffffff";

      uiCache.antigen =
        currentAntigen;
    }

    if (
      force ||
      uiCache.lives !==
        lives
    ) {
      UI.lives.replaceChildren();

      for (
        let i = 0;
        i < lives;
        i++
      ) {
        const dot =
          document.createElement(
            "span"
          );

        dot.className =
          "aa-life-dot";

        UI.lives.appendChild(dot);
      }

      UI.lives.setAttribute(
        "aria-label",
        `${lives} T cell ${
          lives === 1
            ? "life"
            : "lives"
        }`
      );

      uiCache.lives =
        lives;
    }
  }

  function showOverlay(
    title,
    text,
    buttonText,
    showLegend = false
  ) {
    UI.overlayTitle.textContent =
      title;

    UI.overlayText.innerHTML =
      text;

    UI.primaryButton.textContent =
      buttonText;

    UI.startLegend.style.display =
      showLegend
        ? "flex"
        : "none";

    UI.overlay.classList.remove(
      "is-hidden"
    );
  }

  function hideOverlay() {
    UI.overlay.classList.add(
      "is-hidden"
    );

    try {
      canvas.focus({
        preventScroll: true
      });
    } catch (_) {
      canvas.focus();
    }
  }

  function showStageBanner(
    text,
    color,
    seconds = 1.25
  ) {
    UI.stageBanner.textContent =
      text;

    UI.stageBanner.style.color =
      color ||
      "#ffffff";

    UI.stageBanner.classList.add(
      "is-visible"
    );

    bannerTimer =
      seconds;
  }

  function hideStageBanner() {
    UI.stageBanner.classList.remove(
      "is-visible"
    );

    bannerTimer = 0;
  }

  /* =========================================================
     SOUND
     ========================================================= */

  function ensureAudio() {
    if (!soundEnabled) {
      return null;
    }

    try {
      if (!audioContext) {
        const AC =
          window.AudioContext ||
          window.webkitAudioContext;

        if (AC) {
          audioContext =
            new AC();
        }
      }

      if (
        audioContext &&
        audioContext.state ===
          "suspended"
      ) {
        audioContext.resume();
      }

      return audioContext;
    } catch (_) {
      return null;
    }
  }

  function beep(
    freq = 440,
    duration = 0.05,
    type = "square",
    volume = 0.02,
    slide = 0
  ) {
    const ac = ensureAudio();

    if (!ac) return;

    try {
      const osc =
        ac.createOscillator();

      const gain =
        ac.createGain();

      const now =
        ac.currentTime;

      osc.type =
        type;

      osc.frequency.setValueAtTime(
        freq,
        now
      );

      if (slide) {
        osc.frequency.linearRampToValueAtTime(
          freq + slide,
          now + duration
        );
      }

      gain.gain.setValueAtTime(
        volume,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + duration
      );

      osc.connect(gain);
      gain.connect(ac.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (_) {}
  }

  let lastPelletSoundAt = 0;

  function soundCollect() {
    const now =
      performance.now();

    if (
      now -
      lastPelletSoundAt <
      45
    ) {
      return;
    }

    lastPelletSoundAt =
      now;

    beep(
      520 +
      (totalCollected % 5) *
      40,
      0.028,
      "square",
      0.014
    );
  }

  function soundPower() {
    beep(
      360,
      0.07,
      "sawtooth",
      0.022,
      240
    );

    setTimeout(
      () =>
        beep(
          700,
          0.07,
          "square",
          0.017
        ),
      65
    );
  }

  function soundHit() {
    beep(
      180,
      0.22,
      "sawtooth",
      0.032,
      -90
    );
  }

  function soundWin() {
    [
      523,
      659,
      784,
      1047
    ].forEach(
      (f, i) =>
        setTimeout(
          () =>
            beep(
              f,
              0.15,
              "square",
              0.024
            ),
          i * 105
        )
    );
  }

  /* =========================================================
     TILE MOVEMENT
     ========================================================= */

  function choosePlayerDirectionAtCenter() {
    if (
      canLeaveTile(
        player,
        player.queuedDir
      )
    ) {
      player.dir =
        player.queuedDir;
    } else if (
      !canLeaveTile(
        player,
        player.dir
      )
    ) {
      player.dir =
        "none";
    }
  }

  function targetForEnemy(enemy) {
    if (boostTimer > 0) {
      return enemy.scatter;
    }

    const pd =
      DIRECTIONS[
        player.dir
      ] ||
      DIRECTIONS.none;

    const playerCol =
      player.col +
      pd.x *
      (
        player.progress >= 0.5
          ? 1
          : 0
      );

    const playerRow =
      player.row +
      pd.y *
      (
        player.progress >= 0.5
          ? 1
          : 0
      );

    if (
      enemy.personality ===
      "chase"
    ) {
      return {
        col: playerCol,
        row: playerRow
      };
    }

    if (
      enemy.personality ===
      "ambush"
    ) {
      return {
        col:
          playerCol +
          pd.x * 4,
        row:
          playerRow +
          pd.y * 4
      };
    }

    if (
      enemy.personality ===
      "shy"
    ) {
      const dx =
        enemy.col -
        playerCol;

      const dy =
        enemy.row -
        playerRow;

      return (
        dx * dx +
        dy * dy <
        36
      )
        ? enemy.scatter
        : {
          col: playerCol,
          row: playerRow
        };
    }

    const cycle =
      Math.floor(
        performance.now() /
        4200
      ) % 2;

    return (
      cycle === 0
    )
      ? {
        col: playerCol,
        row: playerRow
      }
      : enemy.scatter;
  }

  function legalEnemyDirections(enemy) {
    const available = [];

    const reverse =
      opposite(
        enemy.dir
      );

    for (
      const name
      of DIR_NAMES
    ) {
      if (
        canLeaveTile(
          enemy,
          name
        )
      ) {
        available.push(name);
      }
    }

    const noReverse =
      available.filter(
        name =>
          name !== reverse
      );

    return (
      noReverse.length
    )
      ? noReverse
      : available;
  }

  function chooseEnemyDirection(enemy) {
    const options =
      legalEnemyDirections(enemy);

    if (!options.length) {
      return "none";
    }

    const target =
      targetForEnemy(enemy);

    let best =
      options[0];

    let bestDistance =
      Infinity;

    for (const name of options) {
      const d =
        DIRECTIONS[name];

      const dc =
        enemy.col +
        d.x -
        target.col;

      const dr =
        enemy.row +
        d.y -
        target.row;

      const distanceSq =
        dc * dc +
        dr * dr +
        Math.random() *
        0.15;

      if (
        distanceSq <
        bestDistance
      ) {
        bestDistance =
          distanceSq;

        best =
          name;
      }
    }

    return best;
  }

  function advanceEntity(
    entity,
    dt,
    isPlayer
  ) {
    let travel =
      entity.tilesPerSecond *
      dt;

    if (
      isPlayer &&
      boostTimer > 0
    ) {
      travel *= 1.10;
    }

    if (!isPlayer) {
      const progress =
        totalPellets
          ? totalCollected /
            totalPellets
          : 0;

      travel *=
        (
          1 +
          progress * 0.07
        ) *
        (
          boostTimer > 0
            ? 0.74
            : 1
        );
    }

    let safety = 0;

    while (
      travel > 0.000001 &&
      safety++ < 4
    ) {
      if (
        entity.progress <=
        0.000001
      ) {
        entity.progress = 0;

        if (isPlayer) {
          choosePlayerDirectionAtCenter();
        } else {
          entity.dir =
            chooseEnemyDirection(entity);
        }

        if (
          entity.dir ===
            "none" ||
          !canLeaveTile(
            entity,
            entity.dir
          )
        ) {
          break;
        }
      }

      const remaining =
        1 -
        entity.progress;

      const step =
        Math.min(
          travel,
          remaining
        );

      entity.progress +=
        step;

      travel -=
        step;

      if (
        entity.progress >=
        0.999999
      ) {
        const d =
          DIRECTIONS[
            entity.dir
          ];

        entity.col +=
          d.x;

        entity.row +=
          d.y;

        entity.progress = 0;

        if (isPlayer) {
          collectAtTile(
            entity.col,
            entity.row
          );
        }
      }
    }

    updateEntityPixel(entity);
  }

  function movePlayer(dt) {
    advanceEntity(
      player,
      dt,
      true
    );

    mouthPhase +=
      dt * 12;
  }

  function moveEnemies(dt) {
    for (
      const enemy
      of enemies
    ) {
      advanceEntity(
        enemy,
        dt,
        false
      );
    }
  }

  /* =========================================================
     GAME RULES
     ========================================================= */

  function addFloatingScore(
    x,
    y,
    text,
    color
  ) {
    floatingScores.push({
      x,
      y,
      text,
      color,
      time: 1.1
    });
  }

  function collectAtTile(col, row) {
    let changed = false;

    const pellet =
      pelletGrid[
        row
      ]?.[
        col
      ];

    if (
      pellet &&
      !pellet.eaten
    ) {
      pellet.eaten =
        true;

      remainingPellets--;

      antigenRemaining[
        pellet.antigen
      ]--;

      currentAntigen =
        pellet.antigen;

      totalCollected++;

      score +=
        boostTimer > 0
          ? 20
          : 10;

      activation =
        Math.min(
          100,
          activation + 1.45
        );

      betaFunction =
        Math.max(
          0,
          100 *
          (
            remainingPellets /
            Math.max(
              1,
              totalPellets
            )
          )
        );

      soundCollect();

      changed = true;
    }

    const power =
      powerGrid[
        row
      ]?.[
        col
      ];

    if (
      power &&
      !power.eaten
    ) {
      power.eaten =
        true;

      const booster =
        BOOSTERS[
          power.type
        ];

      boostTimer =
        5.5;

      boostName =
        booster.name;

      enemyEatChain =
        0;

      activation =
        Math.min(
          100,
          activation + 10
        );

      score +=
        booster.bonus;

      addFloatingScore(
        power.x,
        power.y - 8,
        `+${booster.bonus}`,
        booster.main
      );

      showStageBanner(
        `${booster.name}  +${booster.bonus}  •  ${booster.effect}`,
        booster.main,
        1.1
      );

      soundPower();

      changed = true;
    }

    if (changed) {
      updateUI();

      forceRender =
        true;
    }

    if (
      remainingPellets ===
        0 &&
      state === "running"
    ) {
      winGame();
    }
  }

  function collisionDistanceSq(a, b) {
    const dx =
      a.x -
      b.x;

    const dy =
      a.y -
      b.y;

    return (
      dx * dx +
      dy * dy
    );
  }

  function handleEnemyCollisions() {
    const threshold =
      TILE * 0.64;

    const thresholdSq =
      threshold *
      threshold;

    for (
      const enemy
      of enemies
    ) {
      if (
        collisionDistanceSq(
          player,
          enemy
        ) >
        thresholdSq
      ) {
        continue;
      }

      if (boostTimer > 0) {
        enemyEatChain++;

        const bonus =
          200 *
          Math.pow(
            2,
            Math.min(
              enemyEatChain - 1,
              3
            )
          );

        score +=
          bonus;

        activation =
          Math.min(
            100,
            activation + 4
          );

        addFloatingScore(
          enemy.x,
          enemy.y - 10,
          `+${bonus}`,
          "#FFFFFF"
        );

        enemy.col =
          enemy.home.col;

        enemy.row =
          enemy.home.row;

        enemy.progress =
          0;

        enemy.dir =
          "none";

        updateEntityPixel(enemy);

        beep(
          760,
          0.07,
          "square",
          0.024,
          110
        );

        updateUI();
      } else {
        loseLife();
      }

      forceRender =
        true;

      break;
    }
  }

  function loseLife() {
    if (
      state !== "running"
    ) {
      return;
    }

    lives--;

    activation =
      Math.max(
        0,
        activation - 25
      );

    boostTimer = 0;
    boostName = "";
    enemyEatChain = 0;

    soundHit();

    updateUI(true);

    if (lives <= 0) {
      state =
        "lost";

      persistHighScore();

      showOverlay(
        "T cell response suppressed",
        "Immune regulation stopped the autoreactive response before the simulated beta cell was destroyed.<br><strong>Try again and clear the complete antigen field.</strong>",
        "Restart experiment",
        false
      );

      return;
    }

    state =
      "recovering";

    recoveryTimer =
      1.05;

    resetEntities();

    showStageBanner(
      "REGULATORY CONTACT — activation reduced",
      COLORS.dangerous,
      1.05
    );
  }

  function winGame() {
    state =
      "won";

    betaFunction =
      0;

    activation =
      100;

    score +=
      2500;

    updateUI(true);

    persistHighScore();

    soundWin();

    showOverlay(
      "DIABETES ONSET",
      "<strong>Beta cell function ↓ &nbsp; • &nbsp; Insulin production ↓ &nbsp; • &nbsp; Blood glucose ↑</strong><br><br>All beta cell antigen dots were cleared and the simulated beta cell destruction threshold was reached.",
      "Play again",
      false
    );

    forceRender =
      true;
  }

  function startGame() {
    ensureAudio();

    if (
      state === "won" ||
      state === "lost"
    ) {
      resetGame(true);
    }

    state =
      "running";

    accumulator =
      0;

    hideOverlay();
    hideStageBanner();

    UI.pauseButton.textContent =
      "Pause";

    collectAtTile(
      player.col,
      player.row
    );

    forceRender =
      true;
  }

  function togglePause() {
    if (
      state === "running"
    ) {
      state =
        "paused";

      persistHighScore();

      UI.pauseButton.textContent =
        "Resume";

      showOverlay(
        "Experiment paused",
        `Current response: <strong>${activationState()}</strong>${
          boostTimer > 0
            ? ` • ${boostName} boost active`
            : ""
        }`,
        "Resume",
        false
      );
    } else if (
      state === "paused"
    ) {
      state =
        "running";

      accumulator =
        0;

      hideOverlay();

      UI.pauseButton.textContent =
        "Pause";

      forceRender =
        true;
    }
  }

  function restartGame() {
    persistHighScore();

    resetGame(true);

    state =
      "ready";

    showOverlay(
      "Beta Cell Breakdown",
      "Clear the yellow, pink, and blue beta cell antigen dots while avoiding immune regulatory cells. Cytokine bonus items temporarily amplify your T cell response.",
      "Start experiment",
      true
    );

    UI.pauseButton.textContent =
      "Pause";

    forceRender =
      true;

    draw(
      performance.now()
    );
  }

  /* =========================================================
     SHARED SPRITE DRAWING
     ========================================================= */

  function drawFloatingLabel(
    target,
    x,
    y,
    text,
    fontSize = 13
  ) {
    target.save();

    target.font =
      `900 ${fontSize}px "Courier New", monospace`;

    target.textAlign =
      "center";

    target.textBaseline =
      "middle";

    target.lineJoin =
      "round";

    target.strokeStyle =
      "rgba(0,0,0,0.92)";

    target.lineWidth =
      4;

    target.strokeText(
      text,
      x,
      y
    );

    target.fillStyle =
      COLORS.label;

    target.fillText(
      text,
      x,
      y
    );

    target.restore();
  }

  function drawTCellSprite(
    target,
    x,
    y,
    angle,
    mouthOpen,
    radius,
    boosted = false
  ) {
    target.save();

    target.translate(
      x,
      y
    );

    target.rotate(
      angle
    );

    if (boosted) {
      target.strokeStyle =
        "rgba(255,255,255,0.86)";

      target.lineWidth =
        3;

      target.beginPath();

      target.arc(
        0,
        0,
        radius + 4,
        0,
        Math.PI * 2
      );

      target.stroke();
    }

    target.fillStyle =
      COLORS.player;

    target.beginPath();

    target.moveTo(
      0,
      0
    );

    target.arc(
      0,
      0,
      radius,
      mouthOpen,
      Math.PI * 2 -
      mouthOpen
    );

    target.closePath();

    target.fill();

    target.strokeStyle =
      "#FFF6A4";

    target.lineWidth =
      Math.max(
        1.5,
        radius * 0.06
      );

    for (
      let i = -2;
      i <= 2;
      i++
    ) {
      const a =
        Math.PI +
        i * 0.42;

      target.beginPath();

      target.moveTo(
        Math.cos(a) *
        radius *
        0.74,
        Math.sin(a) *
        radius *
        0.74
      );

      target.lineTo(
        Math.cos(a) *
        radius *
        1.03,
        Math.sin(a) *
        radius *
        1.03
      );

      target.stroke();
    }

    target.restore();
  }

  function drawGhostSprite(
    target,
    x,
    y,
    radius,
    bodyColor,
    dirName = "left",
    vulnerable = false,
    flash = false
  ) {
    const r =
      radius * 0.92;

    const body =
      vulnerable
        ? (
          flash
            ? "#F4F7FF"
            : "#0000FE"
        )
        : bodyColor;

    target.save();

    target.translate(
      x,
      y
    );

    target.fillStyle =
      body;

    target.beginPath();

    target.arc(
      0,
      -r * 0.2,
      r,
      Math.PI,
      0
    );

    target.lineTo(
      r,
      r * 0.75
    );

    target.lineTo(
      r * 0.55,
      r * 0.43
    );

    target.lineTo(
      r * 0.18,
      r * 0.75
    );

    target.lineTo(
      -r * 0.18,
      r * 0.43
    );

    target.lineTo(
      -r * 0.55,
      r * 0.75
    );

    target.lineTo(
      -r,
      r * 0.43
    );

    target.closePath();

    target.fill();

    target.fillStyle =
      "#DEDEDE";

    target.beginPath();

    target.ellipse(
      -r * 0.35,
      -r * 0.18,
      r * 0.24,
      r * 0.31,
      0,
      0,
      Math.PI * 2
    );

    target.ellipse(
      r * 0.35,
      -r * 0.18,
      r * 0.24,
      r * 0.31,
      0,
      0,
      Math.PI * 2
    );

    target.fill();

    const d =
      DIRECTIONS[
        dirName
      ] ||
      DIRECTIONS.none;

    target.fillStyle =
      vulnerable
        ? "#13F2FF"
        : "#2121DE";

    target.beginPath();

    target.arc(
      -r * 0.35 +
      d.x * 2,
      -r * 0.18 +
      d.y * 2,
      r * 0.1,
      0,
      Math.PI * 2
    );

    target.arc(
      r * 0.35 +
      d.x * 2,
      -r * 0.18 +
      d.y * 2,
      r * 0.1,
      0,
      Math.PI * 2
    );

    target.fill();

    target.restore();
  }

  function drawAntigenDot(
    target,
    x,
    y,
    color,
    radius = 4
  ) {
    target.save();

    target.fillStyle =
      color;

    target.beginPath();

    target.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2
    );

    target.fill();

    target.strokeStyle =
      color;

    target.globalAlpha =
      0.24;

    target.lineWidth =
      1;

    target.beginPath();

    target.arc(
      x,
      y,
      radius + 2.2,
      0,
      Math.PI * 2
    );

    target.stroke();

    target.restore();
  }

  function drawBonusSprite(
    target,
    x,
    y,
    item,
    scale = 1
  ) {
    const s =
      scale;

    const radius =
      12 * s;

    const ringRadius =
      15.2 * s;

    const glow =
      item.main;

    target.save();

    target.translate(
      x,
      y
    );

    target.shadowColor =
      glow;

    target.shadowBlur =
      12 * s;

    target.fillStyle =
      item.main;

    target.beginPath();

    target.arc(
      0,
      0,
      radius,
      0,
      Math.PI * 2
    );

    target.fill();

    target.shadowBlur =
      0;

    target.strokeStyle =
      item.main;

    target.globalAlpha =
      0.34;

    target.lineWidth =
      2 * s;

    target.beginPath();

    target.arc(
      0,
      0,
      ringRadius,
      0,
      Math.PI * 2
    );

    target.stroke();

    target.globalAlpha =
      0.22;

    target.fillStyle =
      "#FFFFFF";

    target.beginPath();

    target.arc(
      -4.2 * s,
      -4.4 * s,
      3.3 * s,
      0,
      Math.PI * 2
    );

    target.fill();

    target.globalAlpha =
      1;

    target.fillStyle =
      item.main === "#FFFFFF"
        ? "#6AA7FF"
        : "#FFFFFF";

    target.beginPath();

    target.arc(
      0,
      0,
      3.2 * s,
      0,
      Math.PI * 2
    );

    target.fill();

    target.restore();
  }

  /* =========================================================
     STATIC BOARD RENDERING
     ========================================================= */

  function drawStructureStatic(structure) {
    const left =
      tileCenterX(
        structure.x
      ) -
      TILE / 2;

    const top =
      tileCenterY(
        structure.y
      ) -
      TILE / 2;

    const width =
      structure.w *
      TILE;

    const height =
      structure.h *
      TILE;

    sctx.save();

    sctx.fillStyle =
      "rgba(7,18,62,0.33)";

    sctx.fillRect(
      left + 7,
      top + 7,
      width - 14,
      height - 14
    );

    sctx.shadowColor =
      COLORS.wallGlow;

    sctx.shadowBlur =
      6;

    sctx.fillStyle =
      COLORS.wall;

    for (
      let row = structure.y;
      row <
        structure.y +
        structure.h;
      row++
    ) {
      for (
        let col = structure.x;
        col <
          structure.x +
          structure.w;
        col++
      ) {
        const perimeter =
          row === structure.y ||
          row ===
            structure.y +
            structure.h -
            1 ||
          col === structure.x ||
          col ===
            structure.x +
            structure.w -
            1;

        if (
          !perimeter ||
          grid[row]?.[col] !== 1
        ) {
          continue;
        }

        const cx =
          tileCenterX(col);

        const cy =
          tileCenterY(row);

        const size =
          15;

        sctx.fillRect(
          cx - size / 2,
          cy - size / 2,
          size,
          size
        );
      }
    }

    sctx.restore();

    const centerX =
      left +
      width / 2;

    const centerY =
      top +
      height / 2;

    let fontSize =
      15;

    sctx.save();

    sctx.font =
      `900 ${fontSize}px "Courier New", monospace`;

    while (
      fontSize > 10 &&
      sctx.measureText(
        structure.label
      ).width >
      width - 22
    ) {
      fontSize--;

      sctx.font =
        `900 ${fontSize}px "Courier New", monospace`;
    }

    sctx.textAlign =
      "center";

    sctx.textBaseline =
      "middle";

    sctx.lineJoin =
      "round";

    sctx.strokeStyle =
      "rgba(0,0,0,0.95)";

    sctx.lineWidth =
      4;

    sctx.strokeText(
      structure.label,
      centerX,
      centerY
    );

    sctx.fillStyle =
      "#D9E4FF";

    sctx.fillText(
      structure.label,
      centerX,
      centerY
    );

    sctx.restore();
  }

  function renderStaticLayer() {
    sctx.fillStyle =
      COLORS.bg;

    sctx.fillRect(
      0,
      0,
      W,
      H
    );

    const cx =
      W / 2;

    const cy =
      H / 2;

    const rx =
      BOARD_W * 0.49;

    const ry =
      BOARD_H * 0.48;

    sctx.save();

    sctx.shadowColor =
      COLORS.wallGlow;

    sctx.shadowBlur =
      18;

    sctx.strokeStyle =
      COLORS.membrane;

    sctx.lineWidth =
      5;

    sctx.beginPath();

    sctx.ellipse(
      cx,
      cy,
      rx,
      ry,
      0,
      0,
      Math.PI * 2
    );

    sctx.stroke();

    sctx.restore();

    sctx.strokeStyle =
      "rgba(125,160,255,0.34)";

    sctx.lineWidth =
      1.5;

    sctx.beginPath();

    sctx.ellipse(
      cx,
      cy,
      rx - 8,
      ry - 8,
      0,
      0,
      Math.PI * 2
    );

    sctx.stroke();

    sctx.fillStyle =
      "rgba(81,126,244,0.05)";

    sctx.beginPath();

    sctx.ellipse(
      cx,
      cy,
      rx - 5,
      ry - 5,
      0,
      0,
      Math.PI * 2
    );

    sctx.fill();

    for (
      const structure
      of STRUCTURES
    ) {
      drawStructureStatic(structure);
    }

    const nx =
      tileCenterX(13);

    const ny =
      tileCenterY(9.6);

    sctx.save();

    sctx.fillStyle =
      "rgba(255,190,235,0.10)";

    sctx.beginPath();

    sctx.ellipse(
      nx,
      ny,
      TILE * 2.30,
      TILE * 1.42,
      0,
      0,
      Math.PI * 2
    );

    sctx.fill();

    sctx.strokeStyle =
      "rgba(255,125,210,0.72)";

    sctx.lineWidth =
      3;

    sctx.stroke();

    sctx.font =
      '900 15px "Courier New", monospace';

    sctx.textAlign =
      "center";

    sctx.textBaseline =
      "middle";

    sctx.strokeStyle =
      "rgba(0,0,0,0.95)";

    sctx.lineWidth =
      4;

    sctx.strokeText(
      "NUCLEUS",
      nx,
      ny
    );

    sctx.fillStyle =
      "#FFD5F1";

    sctx.fillText(
      "NUCLEUS",
      nx,
      ny
    );

    sctx.restore();
  }

  /* =========================================================
     DYNAMIC RENDERING
     ========================================================= */

  function drawPellets(time) {
    const radius =
      3.7 +
      Math.sin(
        time * 0.004
      ) *
      0.24;

    for (
      let antigen = 0;
      antigen <
        ANTIGENS.length;
      antigen++
    ) {
      const color =
        ANTIGENS[
          antigen
        ].color;

      ctx.fillStyle =
        color;

      ctx.beginPath();

      for (
        const p
        of pellets
      ) {
        if (
          p.eaten ||
          p.antigen !== antigen
        ) {
          continue;
        }

        ctx.moveTo(
          p.x + radius,
          p.y
        );

        ctx.arc(
          p.x,
          p.y,
          radius,
          0,
          Math.PI * 2
        );
      }

      ctx.fill();

      ctx.strokeStyle =
        color;

      ctx.globalAlpha =
        0.22;

      ctx.lineWidth =
        1;

      ctx.beginPath();

      for (
        const p
        of pellets
      ) {
        if (
          p.eaten ||
          p.antigen !== antigen
        ) {
          continue;
        }

        ctx.moveTo(
          p.x +
          radius +
          2.2,
          p.y
        );

        ctx.arc(
          p.x,
          p.y,
          radius + 2.2,
          0,
          Math.PI * 2
        );
      }

      ctx.stroke();

      ctx.globalAlpha =
        1;
    }
  }

  function drawPowerUps(time) {
    for (
      const p
      of powerUps
    ) {
      if (p.eaten) {
        continue;
      }

      const booster =
        BOOSTERS[
          p.type
        ];

      const pulse =
        1 +
        Math.sin(
          time * 0.006 +
          p.type * 0.7
        ) *
        0.06;

      drawBonusSprite(
        ctx,
        p.x,
        p.y,
        booster,
        0.72 * pulse
      );

      drawFloatingLabel(
        ctx,
        p.x,
        p.y - 20,
        booster.name,
        9.5
      );
    }
  }

  function drawTCell() {
    const dir =
      DIRECTIONS[
        player.dir
      ] ||
      DIRECTIONS.right;

    const mouthOpen =
      0.20 +
      (
        Math.sin(
          mouthPhase
        ) +
        1
      ) *
      0.13;

    drawTCellSprite(
      ctx,
      player.x,
      player.y,
      dir.angle,
      mouthOpen,
      player.radius,
      boostTimer > 0
    );

    drawFloatingLabel(
      ctx,
      player.x,
      player.y -
      player.radius -
      11,
      "CD4",
      14
    );
  }

  function drawEnemy(enemy, time) {
    const vulnerable =
      boostTimer > 0;

    const flash =
      vulnerable &&
      boostTimer < 2 &&
      Math.floor(
        time / 160
      ) %
      2 === 0;

    drawGhostSprite(
      ctx,
      enemy.x,
      enemy.y,
      enemy.radius,
      enemy.color,
      enemy.dir,
      vulnerable,
      flash
    );

    drawFloatingLabel(
      ctx,
      enemy.x,
      enemy.y -
      enemy.radius -
      13,
      enemy.name,
      12.5
    );
  }

  function drawFloatingScores() {
    for (
      const item
      of floatingScores
    ) {
      const alpha =
        Math.max(
          0,
          Math.min(
            1,
            item.time / 0.55
          )
        );

      ctx.save();

      ctx.globalAlpha =
        alpha;

      ctx.font =
        '900 14px "Courier New", monospace';

      ctx.textAlign =
        "center";

      ctx.strokeStyle =
        "#000000";

      ctx.lineWidth =
        4;

      const drawY =
        item.y -
        (
          1.1 -
          item.time
        ) *
        18;

      ctx.strokeText(
        item.text,
        item.x,
        drawY
      );

      ctx.fillStyle =
        item.color ||
        "#FFFFFF";

      ctx.fillText(
        item.text,
        item.x,
        drawY
      );

      ctx.restore();
    }
  }

  function drawBoardLabels() {
    ctx.textAlign =
      "left";

    ctx.font =
      '900 11px "Courier New", monospace';

    let x = 28;

    ctx.fillStyle =
      "#DDE7FF";

    ctx.fillText(
      "BETA CELL ANTIGENS",
      x,
      22
    );

    x += 132;

    for (
      const antigen
      of ANTIGENS
    ) {
      ctx.fillStyle =
        antigen.color;

      ctx.beginPath();

      ctx.arc(
        x,
        18,
        4,
        0,
        Math.PI * 2
      );

      ctx.fill();

      x += 9;

      ctx.fillText(
        antigen.name,
        x,
        22
      );

      x +=
        ctx.measureText(
          antigen.name
        ).width +
        16;
    }

    ctx.textAlign =
      "right";

    ctx.fillStyle =
      boostTimer > 0
        ? "#FFFFFF"
        : COLORS.muted;

    const boostText =
      boostTimer > 0
        ? `${boostName} BOOST ${boostTimer.toFixed(1)}s`
        : "CYTOKINE BOOST: INACTIVE";

    ctx.fillText(
      boostText,
      W - 28,
      22
    );

    ctx.textAlign =
      "center";

    ctx.fillStyle =
      "rgba(170,190,255,0.62)";

    ctx.font =
      '700 11px "Courier New", monospace';

    ctx.fillText(
      "PANCREATIC BETA CELL",
      W / 2,
      H - 13
    );
  }

  function drawProgressRing() {
    const x =
      W - 52;

    const y =
      H - 48;

    const r =
      20;

    const frac =
      totalPellets
        ? Math.max(
          0,
          Math.min(
            1,
            totalCollected /
            totalPellets
          )
        )
        : 0;

    ctx.lineWidth =
      4;

    ctx.strokeStyle =
      "#29324d";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      r,
      0,
      Math.PI * 2
    );

    ctx.stroke();

    const grad =
      ctx.createLinearGradient(
        x - r,
        y,
        x + r,
        y
      );

    grad.addColorStop(
      0,
      COLORS.iapp
    );

    grad.addColorStop(
      0.5,
      COLORS.chga
    );

    grad.addColorStop(
      1,
      COLORS.insb
    );

    ctx.strokeStyle =
      grad;

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      r,
      -Math.PI / 2,
      -Math.PI / 2 +
      Math.PI *
      2 *
      frac
    );

    ctx.stroke();

    ctx.fillStyle =
      "#DFE7FF";

    ctx.font =
      '900 8px "Courier New", monospace';

    ctx.textAlign =
      "center";

    ctx.textBaseline =
      "middle";

    ctx.fillText(
      `${Math.round(
        frac * 100
      )}%`,
      x,
      y
    );
  }

  function draw(
    time = performance.now()
  ) {
    ctx.drawImage(
      staticLayer,
      0,
      0
    );

    drawPellets(time);
    drawPowerUps(time);

    for (
      const enemy
      of enemies
    ) {
      drawEnemy(
        enemy,
        time
      );
    }

    drawTCell();
    drawFloatingScores();
    drawBoardLabels();
    drawProgressRing();

    forceRender =
      false;
  }

  /* =========================================================
     GUIDE ART
     ========================================================= */

  function prepGuideCanvas(c) {
    if (!c) {
      return null;
    }

    const g =
      c.getContext("2d");

    g.fillStyle =
      "#070A14";

    g.fillRect(
      0,
      0,
      c.width,
      c.height
    );

    return g;
  }

  function renderGuideIcons() {
    let g =
      prepGuideCanvas(
        UI.guideTCell
      );

    if (g) {
      drawTCellSprite(
        g,
        150,
        69,
        0,
        0.31,
        31,
        false
      );

      drawFloatingLabel(
        g,
        150,
        25,
        "CD4",
        16
      );
    }

    g =
      prepGuideCanvas(
        UI.guideAntigen
      );

    if (g) {
      const xs = [
        55,
        150,
        245
      ];

      ANTIGENS.forEach(
        (antigen, i) => {
          drawAntigenDot(
            g,
            xs[i],
            46,
            antigen.color,
            8
          );

          g.font =
            '900 11px "Courier New", monospace';

          g.textAlign =
            "center";

          g.fillStyle =
            antigen.color;

          g.fillText(
            antigen.name,
            xs[i],
            82
          );
        }
      );
    }

    g =
      prepGuideCanvas(
        UI.guideGhost
      );

    if (g) {
      const guideEnemies = [
        {
          x: 47,
          name: "Treg",
          color: "#C55CFF"
        },
        {
          x: 135,
          name: "Tol DC",
          color: "#4FC3FF"
        },
        {
          x: 229,
          name: "PD-L1 APC",
          color: "#FF5D73"
        },
        {
          x: 321,
          name: "Reg Mφ",
          color: "#63E1B7"
        }
      ];

      guideEnemies.forEach(e => {
        drawGhostSprite(
          g,
          e.x,
          79,
          25,
          e.color,
          "left",
          false,
          false
        );

        drawFloatingLabel(
          g,
          e.x,
          32,
          e.name,
          11.5
        );
      });
    }

    g =
      prepGuideCanvas(
        UI.guideBoost
      );

    if (g) {
      const xs = [
        52,
        156,
        264,
        368
      ];

      const ys = [
        43,
        108
      ];

      BOOSTERS.forEach(
        (item, i) => {
          const x =
            xs[i % 4];

          const y =
            ys[
              Math.floor(
                i / 4
              )
            ];

          drawBonusSprite(
            g,
            x,
            y,
            item,
            0.70
          );

          g.font =
            '900 9px "Courier New", monospace';

          g.textAlign =
            "center";

          g.fillStyle =
            "#FFFFFF";

          g.fillText(
            item.name,
            x,
            y + 25
          );
        }
      );
    }
  }

  /* =========================================================
     MAIN UPDATE LOOP
     ========================================================= */

  function update(dt) {
    if (bannerTimer > 0) {
      bannerTimer -= dt;

      if (
        bannerTimer <= 0
      ) {
        hideStageBanner();
      }
    }

    for (
      const item
      of floatingScores
    ) {
      item.time -= dt;
    }

    if (
      floatingScores.length
    ) {
      floatingScores =
        floatingScores.filter(
          item =>
            item.time > 0
        );

      forceRender =
        true;
    }

    if (
      state ===
      "recovering"
    ) {
      recoveryTimer -=
        dt;

      if (
        recoveryTimer <= 0
      ) {
        state =
          "running";

        recoveryTimer =
          0;

        forceRender =
          true;
      }

      return;
    }

    if (
      state !==
      "running"
    ) {
      return;
    }

    if (
      boostTimer > 0
    ) {
      boostTimer =
        Math.max(
          0,
          boostTimer - dt
        );

      if (
        boostTimer === 0
      ) {
        boostName =
          "";

        enemyEatChain =
          0;
      }
    }

    movePlayer(dt);
    moveEnemies(dt);
    handleEnemyCollisions();
  }

  function gameLoop(time) {
    if (!lastFrameTime) {
      lastFrameTime =
        time;
    }

    let frameSeconds =
      (
        time -
        lastFrameTime
      ) /
      1000;

    lastFrameTime =
      time;

    frameSeconds =
      Math.min(
        frameSeconds,
        0.05
      );

    const active =
      state ===
        "running" ||
      state ===
        "recovering";

    if (active) {
      accumulator +=
        frameSeconds;

      let updates = 0;

      while (
        accumulator >=
          FIXED_STEP &&
        updates <
          MAX_UPDATES_PER_FRAME
      ) {
        update(
          FIXED_STEP
        );

        accumulator -=
          FIXED_STEP;

        updates++;
      }

      if (
        updates ===
        MAX_UPDATES_PER_FRAME
      ) {
        accumulator =
          0;
      }
    } else {
      accumulator =
        0;
    }

    if (
      (
        active &&
        time -
        lastRenderTime >=
        RENDER_INTERVAL -
        1
      ) ||
      forceRender
    ) {
      draw(time);

      lastRenderTime =
        time;
    }

    requestAnimationFrame(
      gameLoop
    );
  }

  /* =========================================================
     CONTROLS
     ========================================================= */

  function setDirection(dir) {
    if (
      !DIRECTIONS[dir] ||
      !player
    ) {
      return;
    }

    player.queuedDir =
      dir;
  }

  window.addEventListener(
    "keydown",
    event => {
      const key =
        event.key.toLowerCase();

      const dirMap = {
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down"
      };

      if (
        dirMap[key]
      ) {
        event.preventDefault();

        setDirection(
          dirMap[key]
        );

        if (
          state ===
          "ready"
        ) {
          startGame();
        }

        return;
      }

      if (
        key === "p"
      ) {
        event.preventDefault();

        togglePause();
      } else if (
        key === "m"
      ) {
        event.preventDefault();

        toggleSound();
      }
    },
    {
      passive: false
    }
  );

  document
    .querySelectorAll(
      ".aa-touch[data-dir]"
    )
    .forEach(button => {
      button.addEventListener(
        "pointerdown",
        event => {
          event.preventDefault();

          setDirection(
            button.dataset.dir
          );

          if (
            state ===
            "ready"
          ) {
            startGame();
          }
        }
      );
    });

  UI.primaryButton.addEventListener(
    "click",
    () => {
      if (
        state ===
        "paused"
      ) {
        togglePause();
      } else {
        startGame();
      }
    }
  );

  UI.pauseButton.addEventListener(
    "click",
    togglePause
  );

  UI.restartButton.addEventListener(
    "click",
    restartGame
  );

  function toggleSound() {
    soundEnabled =
      !soundEnabled;

    UI.soundButton.textContent =
      `Sound: ${
        soundEnabled
          ? "on"
          : "off"
      }`;

    UI.soundButton.setAttribute(
      "aria-pressed",
      String(
        !soundEnabled
      )
    );

    if (soundEnabled) {
      ensureAudio();

      beep(
        660,
        0.05,
        "square",
        0.016
      );
    }
  }

  UI.soundButton.addEventListener(
    "click",
    toggleSound
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        document.hidden
      ) {
        persistHighScore();

        if (
          state ===
          "running"
        ) {
          togglePause();
        }
      }
    }
  );

  window.addEventListener(
    "pagehide",
    persistHighScore
  );

  /* =========================================================
     INITIALIZATION
     ========================================================= */

  buildGrid();
  generatePowerUps();
  generatePellets();
  renderStaticLayer();
  resetGame(true);
  renderGuideIcons();

  showOverlay(
    "Beta Cell Breakdown",
    "Clear the yellow, pink, and blue beta cell antigen dots while avoiding immune regulatory cells. Cytokine bonus items temporarily amplify your T cell response.",
    "Start experiment",
    true
  );

  draw();

  requestAnimationFrame(
    gameLoop
  );
})();
