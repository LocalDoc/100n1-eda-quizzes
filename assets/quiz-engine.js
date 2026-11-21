(function () {
  const registeredTopics = [];

  // Called by each file inside ./topics/*.js
  window.registerTopic = function (topic) {
    registeredTopics.push(topic);
  };

  function typeset(el) {
    if (typeof window.renderMathInElement === "function" && el) {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  }

  function setMathText(el, text) {
    el.textContent = text;
    typeset(el);
  }

  window.initQuizApp = function (config) {
    const subjectId = config.id || "default-subject";
    const storageKey = "quiz_progress_" + subjectId;

    // Flatten all questions with stable IDs
    const allQuestions = [];
    registeredTopics.forEach((topic, tIdx) => {
      (topic.questions || []).forEach((q, qIdx) => {
        allQuestions.push({
          uid: `${topic.id}__${qIdx}`,
          globalNum: allQuestions.length + 1,
          topicId: topic.id,
          topicTitle: topic.title,
          topicOrder: tIdx,
          type: q.type === "practice" ? "practice" : "theory",
          question: q.question,
          options: q.options,
          correct: q.correct,
          explanation: q.explanation || ""
        });
      });
    });

    // State
    let answers = {};
    let topicFilter = "all";
    let typeFilter = "all"; // "all" | "theory" | "practice"
    let mode = "study";     // "study" | "timed" | "retry"
    let modePool = null;    // array of uids when in timed or retry mode
    let currentIndex = 0;
    let timerId = null;
    let secondsLeft = 0;

    // Load saved study progress
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      if (saved.answers) answers = saved.answers;
    } catch {}

    function saveProgress() {
      if (mode !== "study") return;
      try {
        localStorage.setItem(storageKey, JSON.stringify({ answers }));
      } catch {}
    }

    // Build page shell dynamically so subject index.html stays tiny
    document.title = config.title + " — Квиз";
    document.body.innerHTML = `
      <header class="topbar">
        <div class="topbar-inner">
          <div class="brand-group">
            <a class="back-link" href="../index.html">← Все предметы</a>
            <div>
              <div class="subject-title" id="subjTitle"></div>
              <div class="subject-sub" id="subjSub"></div>
            </div>
          </div>
          <div class="top-actions">
            <span class="timer-badge" id="timerBadge">⏱ 15:00</span>
            <button class="btn btn-timer" id="timedBtn">Мини-квиз (15 мин)</button>
            <button class="btn" id="statsBtn">Аналитика</button>
            <button class="btn btn-danger" id="resetBtn">Сброс</button>
          </div>
        </div>
      </header>

      <section class="filters-bar" id="filtersBar">
        <div class="filter-row" id="typeFilters"></div>
        <div class="filter-row" id="topicFilters"></div>
      </section>

      <main class="layout">
        <aside class="sidebar">
          <div class="sidebar-legend">
            <span><i class="dot dot-theory"></i>Теория</span>
            <span><i class="dot dot-practice"></i>Практика</span>
          </div>
          <div id="navContainer"></div>
        </aside>

        <section class="card" id="questionCard">
          <div class="card-meta">
            <div class="badges">
              <span class="badge" id="typeBadge"></span>
              <span class="badge badge-topic" id="topicBadge"></span>
            </div>
            <span class="q-counter" id="qCounter"></span>
          </div>

          <div class="question-text" id="questionText"></div>
          <div class="options" id="optionsContainer"></div>

          <div class="explanation" id="explanationBox">
            <div class="explanation-title" id="explanationTitle"></div>
            <div id="explanationText"></div>
          </div>

          <div class="card-nav">
            <button class="btn" id="prevBtn">← Назад</button>
            <span class="kbd-hint">Клавиши: 1–4 для ответа · ← / → навигация</span>
            <button class="btn btn-primary" id="nextBtn">Далее →</button>
          </div>
        </section>
      </main>

      <div class="modal-backdrop" id="statsModal">
        <div class="modal">
          <div class="modal-header">
            <h2 id="modalTitle">Результаты и аналитика</h2>
            <button class="btn" id="closeModalBtn">✕</button>
          </div>
          <div class="stats-row" id="statsSummary"></div>
          <div id="statsBreakdown"></div>
          <div class="modal-footer">
            <button class="btn" id="retryErrorsBtn">Повторить ошибки</button>
            <button class="btn btn-primary" id="modalOkBtn">Продолжить</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("subjTitle").textContent = config.title;
    document.getElementById("subjSub").textContent = config.subtitle || "";

    const elFiltersBar = document.getElementById("filtersBar");
    const elTypeFilters = document.getElementById("typeFilters");
    const elTopicFilters = document.getElementById("topicFilters");
    const elNavContainer = document.getElementById("navContainer");
    const elCard = document.getElementById("questionCard");
    const elTypeBadge = document.getElementById("typeBadge");
    const elTopicBadge = document.getElementById("topicBadge");
    const elCounter = document.getElementById("qCounter");
    const elQText = document.getElementById("questionText");
    const elOptions = document.getElementById("optionsContainer");
    const elExpBox = document.getElementById("explanationBox");
    const elExpTitle = document.getElementById("explanationTitle");
    const elExpText = document.getElementById("explanationText");
    const elPrev = document.getElementById("prevBtn");
    const elNext = document.getElementById("nextBtn");
    const elTimerBadge = document.getElementById("timerBadge");
    const elTimedBtn = document.getElementById("timedBtn");
    const elModal = document.getElementById("statsModal");

    function getActiveList() {
      if (modePool) {
        return modePool.map((uid) => allQuestions.find((q) => q.uid === uid)).filter(Boolean);
      }
      return allQuestions.filter((q) => {
        const okTopic = topicFilter === "all" || q.topicId === topicFilter;
        const okType = typeFilter === "all" || q.type === typeFilter;
        return okTopic && okType;
      });
    }

    function renderFilters() {
      elFiltersBar.style.display = mode === "study" ? "flex" : "none";

      const theoryCount = allQuestions.filter((q) => q.type === "theory").length;
      const practiceCount = allQuestions.filter((q) => q.type === "practice").length;

      elTypeFilters.innerHTML = '<span class="filter-label">Тип:</span>';
      [
        { key: "all", label: `Все (${allQuestions.length})`, cls: "" },
        { key: "theory", label: `Теория (${theoryCount})`, cls: "pill-theory" },
        { key: "practice", label: `Практика (${practiceCount})`, cls: "pill-practice" }
      ].forEach((item) => {
        const b = document.createElement("button");
        b.className = `pill ${item.cls} ${typeFilter === item.key ? "active" : ""}`;
        b.textContent = item.label;
        b.onclick = () => {
          typeFilter = item.key;
          currentIndex = 0;
          renderAll();
        };
        elTypeFilters.appendChild(b);
      });

      elTopicFilters.innerHTML = '<span class="filter-label">Темы:</span>';
      const allBtn = document.createElement("button");
      allBtn.className = `pill ${topicFilter === "all" ? "active" : ""}`;
      allBtn.textContent = "Все темы";
      allBtn.onclick = () => {
        topicFilter = "all";
        currentIndex = 0;
        renderAll();
      };
      elTopicFilters.appendChild(allBtn);

      registeredTopics.forEach((t) => {
        const count = (t.questions || []).length;
        const b = document.createElement("button");
        b.className = `pill ${topicFilter === t.id ? "active" : ""}`;
        b.textContent = `${t.title} (${count})`;
        b.onclick = () => {
          topicFilter = t.id;
          currentIndex = 0;
          renderAll();
        };
        elTopicFilters.appendChild(b);
      });
    }

    function renderSidebar(list) {
      elNavContainer.innerHTML = "";
      const groups = new Map();
      list.forEach((q, idx) => {
        if (!groups.has(q.topicTitle)) groups.set(q.topicTitle, []);
        groups.get(q.topicTitle).push({ q, idx });
      });

      groups.forEach((items, title) => {
        const groupEl = document.createElement("div");
        groupEl.className = "nav-topic-group";

        const heading = document.createElement("div");
        heading.className = "nav-topic-title";
        heading.textContent = title;
        groupEl.appendChild(heading);

        const grid = document.createElement("div");
        grid.className = "nav-grid";

        items.forEach(({ q, idx }) => {
          const btn = document.createElement("button");
          const ans = answers[q.uid];
          btn.className = `nav-item type-${q.type}` +
            (idx === currentIndex ? " active" : "") +
            (ans ? (ans.isCorrect ? " correct" : " incorrect") : "");
          btn.textContent = idx + 1;
          btn.title = `${q.type === "practice" ? "Практика" : "Теория"} · Вопрос ${idx + 1}`;
          btn.onclick = () => {
            currentIndex = idx;
            renderAll();
          };
          grid.appendChild(btn);
        });

        groupEl.appendChild(grid);
        elNavContainer.appendChild(groupEl);
      });
    }

    function renderQuestion(list) {
      if (!list.length) {
        elQText.textContent = "Нет вопросов для выбранного фильтра.";
        elOptions.innerHTML = "";
        elExpBox.classList.remove("visible");
        elCounter.textContent = "0 / 0";
        return;
      }

      if (currentIndex >= list.length) currentIndex = 0;
      const q = list[currentIndex];
      const ans = answers[q.uid];

      elCard.className = `card type-${q.type}`;
      elTypeBadge.className = `badge badge-${q.type}`;
      elTypeBadge.textContent = q.type === "practice" ? "Практика · Расчёт" : "Теория";
      elTopicBadge.textContent = q.topicTitle;
      elCounter.textContent = `Вопрос ${currentIndex + 1} из ${list.length}`;

      setMathText(elQText, q.question);

      elOptions.innerHTML = "";
      q.options.forEach((optText, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        if (ans) {
          btn.disabled = true;
          if (i === q.correct) btn.classList.add("correct");
          else if (i === ans.selected) btn.classList.add("incorrect");
        }

        const keySpan = document.createElement("span");
        keySpan.className = "opt-key";
        keySpan.textContent = i + 1;

        const textSpan = document.createElement("span");
        btn.appendChild(keySpan);
        btn.appendChild(textSpan);
        setMathText(textSpan, optText);

        btn.onclick = () => selectOption(q, i);
        elOptions.appendChild(btn);
      });

      if (ans) {
        elExpBox.classList.add("visible");
        elExpTitle.className = "explanation-title " + (ans.isCorrect ? "ok" : "err");
        elExpTitle.textContent = ans.isCorrect ? "Верно!" : "Неверно — разбор решения:";
        setMathText(elExpText, q.explanation);
      } else {
        elExpBox.classList.remove("visible");
      }

      elPrev.disabled = currentIndex === 0;
      elNext.textContent = currentIndex === list.length - 1 ? "Итоги →" : "Далее →";
    }

    function selectOption(q, optIdx) {
      if (answers[q.uid]) return;
      answers[q.uid] = { selected: optIdx, isCorrect: optIdx === q.correct };
      saveProgress();
      renderAll();
    }

    function renderAll() {
      const list = getActiveList();
      renderFilters();
      renderSidebar(list);
      renderQuestion(list);
    }

    // Timed Mini-Quiz Mode (10 questions / 15 minutes)
    function stopTimer() {
      if (timerId) clearInterval(timerId);
      timerId = null;
      elTimerBadge.classList.remove("visible");
    }

    function startTimedMode() {
      if (mode === "timed") {
        stopTimer();
        mode = "study";
        modePool = null;
        elTimedBtn.textContent = "Мини-квиз (15 мин)";
        try {
          const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
          answers = saved.answers || {};
        } catch { answers = {}; }
        currentIndex = 0;
        renderAll();
        return;
      }

      const targetCount = Math.min(config.timedCount || 10, allQuestions.length);
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      mode = "timed";
      modePool = shuffled.slice(0, targetCount).map((q) => q.uid);
      answers = {};
      currentIndex = 0;
      secondsLeft = (config.timedMinutes || 15) * 60;

      elTimedBtn.textContent = "Выйти из мини-квиза";
      elTimerBadge.classList.add("visible");
      updateTimerLabel();
      timerId = setInterval(() => {
        secondsLeft--;
        updateTimerLabel();
        if (secondsLeft <= 0) {
          stopTimer();
          openAnalytics("Время мини-квиза истекло");
        }
      }, 1000);
      renderAll();
    }

    function updateTimerLabel() {
      const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
      const s = String(secondsLeft % 60).padStart(2, "0");
      elTimerBadge.textContent = `⏱ ${m}:${s}`;
    }

    // Analytics Modal
    function openAnalytics(titleText) {
      const list = modePool ? getActiveList() : allQuestions;
      const answered = list.filter((q) => answers[q.uid]);
      const correct = answered.filter((q) => answers[q.uid].isCorrect);
      const acc = answered.length ? Math.round((correct.length / answered.length) * 100) : 0;

      const thList = list.filter((q) => q.type === "theory");
      const thOk = thList.filter((q) => answers[q.uid]?.isCorrect).length;
      const prList = list.filter((q) => q.type === "practice");
      const prOk = prList.filter((q) => answers[q.uid]?.isCorrect).length;

      document.getElementById("modalTitle").textContent = titleText || "Результаты и аналитика";
      document.getElementById("statsSummary").innerHTML = `
        <div class="stat-box"><div class="stat-val">${acc}%</div><div class="stat-lbl">Точность (${correct.length}/${answered.length})</div></div>
        <div class="stat-box"><div class="stat-val" style="color:var(--theory-main)">${thOk}/${thList.length}</div><div class="stat-lbl">Теория верно</div></div>
        <div class="stat-box"><div class="stat-val" style="color:var(--practice-main)">${prOk}/${prList.length}</div><div class="stat-lbl">Практика верно</div></div>
      `;

      const breakdown = document.getElementById("statsBreakdown");
      breakdown.innerHTML = "";
      registeredTopics.forEach((t) => {
        const qs = list.filter((q) => q.topicId === t.id);
        if (!qs.length) return;
        const ok = qs.filter((q) => answers[q.uid]?.isCorrect).length;
        const pct = Math.round((ok / qs.length) * 100);
        breakdown.innerHTML += `
          <div class="bar-row">
            <div class="bar-head"><span>${t.title}</span><span>${ok} / ${qs.length} (${pct}%)</span></div>
            <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
          </div>
        `;
      });

      const wrongIds = list.filter((q) => answers[q.uid] && !answers[q.uid].isCorrect).map((q) => q.uid);
      const retryBtn = document.getElementById("retryErrorsBtn");
      retryBtn.disabled = wrongIds.length === 0;
      retryBtn.textContent = `Повторить ошибки (${wrongIds.length})`;
      retryBtn.onclick = () => {
        stopTimer();
        mode = "retry";
        modePool = wrongIds;
        wrongIds.forEach((uid) => delete answers[uid]);
        currentIndex = 0;
        elModal.classList.remove("open");
        renderAll();
      };

      elModal.classList.add("open");
    }

    // Events
    elPrev.onclick = () => {
      if (currentIndex > 0) { currentIndex--; renderAll(); }
    };
    elNext.onclick = () => {
      const list = getActiveList();
      if (currentIndex < list.length - 1) { currentIndex++; renderAll(); }
      else openAnalytics();
    };
    elTimedBtn.onclick = startTimedMode;
    document.getElementById("statsBtn").onclick = () => openAnalytics();
    document.getElementById("closeModalBtn").onclick = () => elModal.classList.remove("open");
    document.getElementById("modalOkBtn").onclick = () => elModal.classList.remove("open");
    document.getElementById("resetBtn").onclick = () => {
      if (!confirm("Сбросить все ответы по этому предмету?")) return;
      stopTimer();
      mode = "study";
      modePool = null;
      answers = {};
      localStorage.removeItem(storageKey);
      elTimedBtn.textContent = "Мини-квиз (15 мин)";
      currentIndex = 0;
      renderAll();
    };

    document.addEventListener("keydown", (e) => {
      if (elModal.classList.contains("open")) return;
      const list = getActiveList();
      const q = list[currentIndex];
      if (!q) return;
      if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = Number(e.key) - 1;
        if (idx < q.options.length) selectOption(q, idx);
      } else if (e.key === "ArrowRight") {
        elNext.click();
      } else if (e.key === "ArrowLeft") {
        elPrev.click();
      }
    });

    renderAll();

    // Re-render math if KaTeX auto-render loads slightly after DOMContentLoaded
    window.addEventListener("load", () => typeset(elCard));
  };
})();