/**
 * app.js - SK하이닉스 반도체 웨이퍼 제조 공정 메인 애플리케이션 컨트롤러
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currentStep: 1,
    isPlaying: false,
    playbackSpeed: 1.0, // 1x, 1.5x, 2x
    playInterval: null,
    activeProcessFilter: 'ALL',
    searchQuery: '',
    isDarkTheme: true,
    quizScore: 0,
    currentQuizIndex: 0,
    answeredQuestions: {}
  };

  // Instantiate Sub-Systems
  const svgRenderer = new SvgWaferRenderer('svg-container');
  const mosfetSim = new MosfetSimulator('mosfet-canvas', 'mosfet-component-detail');

  // DOM Elements
  const stepSlider = document.getElementById('step-slider');
  const prevBtn = document.getElementById('prev-step-btn');
  const nextBtn = document.getElementById('next-step-btn');
  const playBtn = document.getElementById('play-btn');
  const speedBtn = document.getElementById('speed-btn');
  const stepNumberBadge = document.getElementById('step-number-badge');
  const partBadge = document.getElementById('part-badge');
  const stepTitleKo = document.getElementById('step-title-ko');
  const stepTitleEn = document.getElementById('step-title-en');
  const processBadge = document.getElementById('process-badge');
  const stepPurpose = document.getElementById('step-purpose');
  const stepMechanism = document.getElementById('step-mechanism');
  const stepTip = document.getElementById('step-tip');
  const stepParamsContainer = document.getElementById('step-params-container');
  const matrixTableBody = document.getElementById('matrix-table-body');
  const matrixSearchInput = document.getElementById('matrix-search-input');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const toggleLabelsBtn = document.getElementById('toggle-labels-btn');

  // 1. Initial Render
  initApp();

  function initApp() {
    renderCoreProcessCycle();
    renderPartTabs();
    renderMatrixTable();
    renderRoadmapCards();
    initQuiz();
    goToStep(1);
    setupEventListeners();
  }

  // 2. Step Navigation
  function goToStep(stepNum) {
    if (stepNum < 1) stepNum = 1;
    if (stepNum > 32) stepNum = 32;

    state.currentStep = stepNum;
    const stepData = FAB_STEPS[stepNum - 1];

    // Update Slider
    if (stepSlider) stepSlider.value = stepNum;

    // Render SVG Cross-section
    svgRenderer.render(stepNum);

    // Update Step Details Card
    updateStepDetailCard(stepData);

    // Update Part Tabs active state
    updatePartTabs(stepData.part);

    // Highlight row in Matrix Table
    highlightMatrixRow(stepNum);

    // Enable/disable navigation buttons
    if (prevBtn) prevBtn.disabled = stepNum === 1;
    if (nextBtn) nextBtn.disabled = stepNum === 32;
  }

  function updateStepDetailCard(data) {
    if (stepNumberBadge) stepNumberBadge.textContent = `STEP ${data.stepStr} / 32`;
    if (partBadge) partBadge.textContent = `PART ${data.part}`;
    if (stepTitleKo) stepTitleKo.textContent = data.titleKo;
    if (stepTitleEn) stepTitleEn.textContent = data.titleEn;

    if (processBadge) {
      const procInfo = CORE_PROCESSES[data.category] || {};
      processBadge.textContent = `${data.categoryKo} (${data.category})`;
      processBadge.style.backgroundColor = procInfo.badgeBg || 'rgba(56, 189, 248, 0.15)';
      processBadge.style.color = procInfo.color || '#38bdf8';
      processBadge.style.borderColor = procInfo.badgeBorder || '#38bdf8';
    }

    if (stepPurpose) stepPurpose.textContent = data.purpose;
    if (stepMechanism) stepMechanism.textContent = data.mechanism;
    if (stepTip) stepTip.textContent = data.engineeringTip;

    // Render Parameters Key-Values
    if (stepParamsContainer && data.parameters) {
      let paramsHtml = '';
      for (const [key, val] of Object.entries(data.parameters)) {
        paramsHtml += `
          <div class="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col">
            <span class="text-[11px] font-mono text-slate-400 capitalize">${key}</span>
            <span class="text-xs font-semibold text-sky-300 truncate" title="${val}">${val}</span>
          </div>
        `;
      }
      stepParamsContainer.innerHTML = paramsHtml;
    }
  }

  // 3. Playback Controller
  function togglePlay() {
    if (state.isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }

  function startPlayback() {
    state.isPlaying = true;
    updatePlayBtnUI();
    const intervalMs = Math.round(1800 / state.playbackSpeed);

    if (state.currentStep >= 32) {
      goToStep(1);
    }

    state.playInterval = setInterval(() => {
      if (state.currentStep < 32) {
        goToStep(state.currentStep + 1);
      } else {
        pausePlayback();
      }
    }, intervalMs);
  }

  function pausePlayback() {
    state.isPlaying = false;
    updatePlayBtnUI();
    if (state.playInterval) {
      clearInterval(state.playInterval);
      state.playInterval = null;
    }
  }

  function updatePlayBtnUI() {
    if (!playBtn) return;
    if (state.isPlaying) {
      playBtn.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        <span>일시정지</span>
      `;
      playBtn.className = 'flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all shadow-lg shadow-amber-500/20';
    } else {
      playBtn.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        <span>자동 재생</span>
      `;
      playBtn.className = 'flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg shadow-red-600/30';
    }
  }

  function cycleSpeed() {
    if (state.playbackSpeed === 1.0) state.playbackSpeed = 1.5;
    else if (state.playbackSpeed === 1.5) state.playbackSpeed = 2.0;
    else state.playbackSpeed = 1.0;

    if (speedBtn) speedBtn.textContent = `${state.playbackSpeed}x`;

    if (state.isPlaying) {
      pausePlayback();
      startPlayback();
    }
  }

  // 4. Core Process Cycle Bar
  function renderCoreProcessCycle() {
    const cycleContainer = document.getElementById('core-process-cycle');
    if (!cycleContainer) return;

    let html = `
      <div class="flex items-center gap-1.5 flex-wrap justify-center md:justify-between w-full">
    `;

    const keys = Object.keys(CORE_PROCESSES);
    keys.forEach((key, idx) => {
      const proc = CORE_PROCESSES[key];
      // Count steps in this category
      const stepCount = FAB_STEPS.filter(s => s.category === key).length;

      html += `
        <button class="process-cycle-card flex-1 min-w-[130px] p-2.5 rounded-xl glass-panel transition-all hover:-translate-y-0.5 hover:border-sky-400 group text-left cursor-pointer"
                data-proc-filter="${key}">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold font-mono" style="color: ${proc.color}">0${idx + 1}. ${key}</span>
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              ${stepCount}회
            </span>
          </div>
          <div class="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
            ${proc.nameKo}
          </div>
        </button>
      `;

      if (idx < keys.length - 1) {
        html += `<span class="hidden lg:inline text-slate-600 font-bold">➔</span>`;
      }
    });

    html += `</div>`;
    cycleContainer.innerHTML = html;

    // Attach click events
    cycleContainer.querySelectorAll('[data-proc-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-proc-filter');
        filterMatrixByCategory(cat);
      });
    });
  }

  // 5. Part Navigation Tabs
  function renderPartTabs() {
    const partContainer = document.getElementById('part-tabs-container');
    if (!partContainer) return;

    let html = '';
    PARTS_DATA.forEach(part => {
      html += `
        <button class="part-tab-btn flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800"
                data-part-num="${part.part}" data-start-step="${part.range[0]}">
          <span class="text-red-500 mr-1">Part ${part.part}</span>
          <span class="hidden sm:inline">${part.titleEn.split('&')[0]}</span>
          <span class="text-[10px] text-slate-500 ml-1">(${String(part.range[0]).padStart(2, '0')}~${String(part.range[1]).padStart(2, '0')})</span>
        </button>
      `;
    });
    partContainer.innerHTML = html;

    partContainer.querySelectorAll('[data-part-num]').forEach(btn => {
      btn.addEventListener('click', () => {
        const startStep = parseInt(btn.getAttribute('data-start-step'));
        goToStep(startStep);
      });
    });
  }

  function updatePartTabs(activePart) {
    const partContainer = document.getElementById('part-tabs-container');
    if (!partContainer) return;

    partContainer.querySelectorAll('[data-part-num]').forEach(btn => {
      const partNum = parseInt(btn.getAttribute('data-part-num'));
      if (partNum === activePart) {
        btn.className = 'part-tab-btn flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all border border-red-500 bg-red-500/15 text-white shadow-md shadow-red-500/10';
      } else {
        btn.className = 'part-tab-btn flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800';
      }
    });
  }

  // 6. Engineering Mapping Matrix Table
  function renderMatrixTable() {
    if (!matrixTableBody) return;

    const filtered = FAB_STEPS.filter(step => {
      const matchesCategory = state.activeProcessFilter === 'ALL' || step.category === state.activeProcessFilter;
      const query = state.searchQuery.toLowerCase();
      const matchesSearch = !query || 
        step.titleKo.toLowerCase().includes(query) ||
        step.titleEn.toLowerCase().includes(query) ||
        step.purpose.toLowerCase().includes(query) ||
        step.engineeringTip.toLowerCase().includes(query) ||
        step.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      matrixTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="py-8 text-center text-slate-400">
            검색 결과가 없습니다. 다른 검색어나 필터를 선택해 주세요.
          </td>
        </tr>
      `;
      return;
    }

    let rowsHtml = '';
    filtered.forEach(item => {
      const proc = CORE_PROCESSES[item.category] || {};
      const isActive = item.step === state.currentStep;

      rowsHtml += `
        <tr class="matrix-row border-b border-slate-800/80 hover:bg-slate-800/40 cursor-pointer transition-colors ${isActive ? 'matrix-row-active' : ''}"
            data-matrix-step="${item.step}">
          <td class="py-3 px-4 font-mono font-bold text-sky-400 text-center">
            ${item.stepStr}
          </td>
          <td class="py-3 px-4">
            <div class="font-bold text-white text-sm">${item.titleKo}</div>
            <div class="text-xs text-slate-400">${item.titleEn}</div>
          </td>
          <td class="py-3 px-4">
            <span class="inline-block px-2.5 py-1 rounded-full text-xs font-bold border"
                  style="background-color: ${proc.badgeBg || '#1e293b'}; color: ${proc.color || '#fff'}; border-color: ${proc.badgeBorder || '#334155'}">
              ${item.categoryKo}
            </span>
          </td>
          <td class="py-3 px-4 text-xs text-slate-300 leading-relaxed max-w-md">
            <p class="font-medium text-slate-200 mb-1">${item.purpose}</p>
            <p class="text-slate-400 text-[11px]">${item.mechanism.substring(0, 85)}...</p>
          </td>
          <td class="py-3 px-4 text-xs text-amber-300 font-medium">
            <div class="p-1.5 rounded bg-amber-950/30 border border-amber-900/40 text-[11px] leading-tight">
              ${item.engineeringTip.substring(0, 75)}...
            </div>
          </td>
        </tr>
      `;
    });

    matrixTableBody.innerHTML = rowsHtml;

    // Attach row click listeners
    matrixTableBody.querySelectorAll('[data-matrix-step]').forEach(row => {
      row.addEventListener('click', () => {
        const step = parseInt(row.getAttribute('data-matrix-step'));
        goToStep(step);
        // Smooth scroll up to simulator
        const simSection = document.getElementById('simulator-section');
        if (simSection) {
          simSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  function highlightMatrixRow(stepNum) {
    if (!matrixTableBody) return;
    matrixTableBody.querySelectorAll('[data-matrix-step]').forEach(row => {
      const step = parseInt(row.getAttribute('data-matrix-step'));
      if (step === stepNum) {
        row.classList.add('matrix-row-active');
      } else {
        row.classList.remove('matrix-row-active');
      }
    });
  }

  function filterMatrixByCategory(category) {
    state.activeProcessFilter = category;

    // Update filter pills UI
    const filterPills = document.querySelectorAll('[data-filter-pill]');
    filterPills.forEach(pill => {
      if (pill.getAttribute('data-filter-pill') === category) {
        pill.className = 'filter-pill px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white shadow-md shadow-red-600/30 transition-all';
      } else {
        pill.className = 'filter-pill px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all';
      }
    });

    renderMatrixTable();

    // Scroll to matrix table
    const tableSection = document.getElementById('matrix-section');
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // 7. Modern Technology Roadmap Cards
  function renderRoadmapCards() {
    const container = document.getElementById('roadmap-cards-container');
    if (!container) return;

    let html = '';
    TECH_ROADMAP.forEach(item => {
      html += `
        <div class="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-slate-500 transition-all hover:-translate-y-1 group">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style="background: rgba(255,255,255,0.08); color: ${item.badgeColor}; border: 1px solid ${item.badgeColor}">
                ${item.badge}
              </span>
              <span class="text-xs font-mono text-slate-400">${item.era}</span>
            </div>
            <h4 class="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
              ${item.title}
            </h4>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">
              ${item.desc}
            </p>
          </div>
          <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span>6대 공정 기반 진화</span>
            <span class="text-emerald-400 font-mono">Applied</span>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // 8. Quiz Modal & Self-Test
  function initQuiz() {
    const quizModal = document.getElementById('quiz-modal');
    const openQuizBtn = document.getElementById('open-quiz-btn');
    const closeQuizBtn = document.getElementById('close-quiz-btn');
    const prevQuizBtn = document.getElementById('quiz-prev-btn');
    const nextQuizBtn = document.getElementById('quiz-next-btn');

    if (openQuizBtn && quizModal) {
      openQuizBtn.addEventListener('click', () => {
        quizModal.classList.remove('hidden');
        renderQuizQuestion(state.currentQuizIndex);
      });
    }

    if (closeQuizBtn && quizModal) {
      closeQuizBtn.addEventListener('click', () => {
        quizModal.classList.add('hidden');
      });
    }

    if (prevQuizBtn) {
      prevQuizBtn.addEventListener('click', () => {
        if (state.currentQuizIndex > 0) {
          state.currentQuizIndex--;
          renderQuizQuestion(state.currentQuizIndex);
        }
      });
    }

    if (nextQuizBtn) {
      nextQuizBtn.addEventListener('click', () => {
        if (state.currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
          state.currentQuizIndex++;
          renderQuizQuestion(state.currentQuizIndex);
        }
      });
    }
  }

  function renderQuizQuestion(index) {
    const q = QUIZ_QUESTIONS[index];
    if (!q) return;

    const qNumEl = document.getElementById('quiz-q-num');
    const qTextEl = document.getElementById('quiz-q-text');
    const optionsContainer = document.getElementById('quiz-options-container');
    const explanationEl = document.getElementById('quiz-explanation');
    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (qNumEl) qNumEl.textContent = `Question ${index + 1} of ${QUIZ_QUESTIONS.length}`;
    if (qTextEl) qTextEl.textContent = q.question;
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === QUIZ_QUESTIONS.length - 1;

    const userAnswer = state.answeredQuestions[q.id];

    let optionsHtml = '';
    q.options.forEach((opt, optIdx) => {
      let btnClass = 'w-full text-left p-3.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-sm text-slate-200 transition-all flex items-start gap-3 cursor-pointer';

      if (userAnswer !== undefined) {
        if (optIdx === q.answer) {
          btnClass = 'w-full text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-950/60 text-emerald-200 text-sm font-semibold flex items-start gap-3';
        } else if (userAnswer === optIdx && userAnswer !== q.answer) {
          btnClass = 'w-full text-left p-3.5 rounded-xl border-2 border-rose-500 bg-rose-950/60 text-rose-200 text-sm font-semibold flex items-start gap-3';
        } else {
          btnClass = 'w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-500 text-sm opacity-50 flex items-start gap-3';
        }
      }

      optionsHtml += `
        <button class="${btnClass}" data-quiz-opt="${optIdx}">
          <span class="w-6 h-6 rounded-full bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
            ${String.fromCharCode(65 + optIdx)}
          </span>
          <span class="pt-0.5">${opt}</span>
        </button>
      `;
    });

    if (optionsContainer) {
      optionsContainer.innerHTML = optionsHtml;

      // Attach option click
      if (userAnswer === undefined) {
        optionsContainer.querySelectorAll('[data-quiz-opt]').forEach(btn => {
          btn.addEventListener('click', () => {
            const chosen = parseInt(btn.getAttribute('data-quiz-opt'));
            state.answeredQuestions[q.id] = chosen;
            if (chosen === q.answer) state.quizScore++;
            renderQuizQuestion(index);
          });
        });
      }
    }

    if (explanationEl) {
      if (userAnswer !== undefined) {
        const isCorrect = userAnswer === q.answer;
        explanationEl.classList.remove('hidden');
        explanationEl.innerHTML = `
          <div class="p-4 rounded-xl ${isCorrect ? 'bg-emerald-950/60 border border-emerald-500/50' : 'bg-rose-950/60 border border-rose-500/50'}">
            <div class="font-bold text-sm ${isCorrect ? 'text-emerald-300' : 'text-rose-300'} mb-1">
              ${isCorrect ? '✔ 정답입니다!' : '✘ 오답입니다!'}
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${q.explanation}</p>
          </div>
        `;
      } else {
        explanationEl.classList.add('hidden');
      }
    }
  }

  // 9. Event Listeners Setup
  function setupEventListeners() {
    // Slider Drag / Change
    if (stepSlider) {
      stepSlider.addEventListener('input', (e) => {
        pausePlayback();
        goToStep(parseInt(e.target.value));
      });
    }

    // Prev / Next Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        pausePlayback();
        goToStep(state.currentStep - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        pausePlayback();
        goToStep(state.currentStep + 1);
      });
    }

    // Play / Pause Button
    if (playBtn) playBtn.addEventListener('click', togglePlay);

    // Speed Button
    if (speedBtn) speedBtn.addEventListener('click', cycleSpeed);

    // Toggle Labels on SVG
    if (toggleLabelsBtn) {
      toggleLabelsBtn.addEventListener('click', () => {
        svgRenderer.toggleLabels();
      });
    }

    // Matrix Search Input
    if (matrixSearchInput) {
      matrixSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderMatrixTable();
      });
    }

    // Matrix Filter Pills
    document.querySelectorAll('[data-filter-pill]').forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-filter-pill');
        filterMatrixByCategory(cat);
      });
    });

    // MOSFET Simulator Controls
    const gateToggleBtn = document.getElementById('gate-toggle-btn');
    const gateSlider = document.getElementById('gate-v-slider');

    if (gateToggleBtn) {
      gateToggleBtn.addEventListener('click', () => {
        mosfetSim.setGateState(!mosfetSim.isGateOn);
      });
    }

    if (gateSlider) {
      gateSlider.addEventListener('input', (e) => {
        mosfetSim.setGateVoltage(e.target.value);
      });
    }

    // MOSFET Component Inspector Buttons
    document.querySelectorAll('[data-comp-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const comp = btn.getAttribute('data-comp-btn');
        mosfetSim.selectComponent(comp);
      });
    });

    // Theme Toggle
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        state.isDarkTheme = !state.isDarkTheme;
        document.body.classList.toggle('light-theme', !state.isDarkTheme);
        themeToggleBtn.innerHTML = state.isDarkTheme 
          ? `<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>`
          : `<svg class="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>`;
      });
    }

    // Keyboard Shortcuts (Arrow Left/Right, Spacebar)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'ArrowLeft') {
        pausePlayback();
        goToStep(state.currentStep - 1);
      } else if (e.code === 'ArrowRight') {
        pausePlayback();
        goToStep(state.currentStep + 1);
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    });
  }
});
