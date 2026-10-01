const maturityOrder = ["seed", "sketch", "evolving", "essay"];
const dateFormatter = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" });

const state = {
  thoughts: [],
  maturity: "all",
  tag: "all",
  query: "",
};

const mindMaps = {
  "machine-native-language": {
    zh: {
      label: "思维导图",
      title: "从语言差异到表示的发明",
      caption: "从中英翻译进入搜索空间、machine ontology 与多种智能的共同语言。点击分支，展开完整论证。",
      rootLabel: "核心问题",
      root: "智能只是在解题，还是也在发明让问题变得可解的表示？",
      outcomeLabel: "可能的未来",
      outcome: "能够发明新表示，并在多种 ontology 之间翻译的 meta-intelligence",
      branches: [
        {
          id: "natural-language",
          title: "中文 → 英文",
          points: ["同一经验", "不同显式信息", "翻译是重建"],
          detail: "中文与英文不只是给同一批概念换词。它们要求说话者显式编码不同信息，并以不同结构组织同一个场景。这是 representation change 的日常入口。",
        },
        {
          id: "programming-language",
          title: "表示塑造搜索",
          points: ["不同 neighborhood", "坐标改变路径", "短描述 ≠ 易发现"],
          detail: "Representation 决定候选解之间的邻近关系，以及一次局部修改能到达哪里。相同答案在一个坐标系里可能需要漫长搜索，在另一个坐标系里可能只需一步。",
        },
        {
          id: "capability",
          title: "能力依赖任务分布",
          points: ["R* depends on D", "representation cost", "inductive bias"],
          detail: "不存在脱离任务分布的最佳 basis。一个 abstraction 的价值，在于支付建立成本之后，让一整类反复出现的任务在描述、搜索、执行和验证上共同变短。",
        },
        {
          id: "machine-species",
          title: "分化 ↔ 收敛",
          points: ["私有 latent language", "共享现实 invariant", "多层 cognitive ecology"],
          detail: "Objective、body 与工具推动不同 AI 形成专业 ontology，共享现实又迫使它们在某些 invariant 上相遇。未来更可能是分层语言生态，而不是一种 universal language。",
        },
        {
          id: "translator",
          title: "翻译要保持结构",
          points: ["prediction · intervention", "bridge concepts", "明确 translation loss"],
          detail: "Translator 不能只生成相似的自然语言标签。它必须说明预测、干预、行动和价值中哪些关系被保留，并通过 bridge concepts 帮助人类获得可操作的 bilingualism。",
        },
      ],
    },
    en: {
      label: "Mind map",
      title: "From linguistic difference to invented representation",
      caption: "Move from Chinese-English translation into search spaces, machine ontologies, and a shared language among multiple intelligences.",
      rootLabel: "Central question",
      root: "Does intelligence only solve problems, or also invent representations that make them solvable?",
      outcomeLabel: "Possible future",
      outcome: "Meta-intelligence that invents representations and translates among multiple ontologies",
      branches: [
        {
          id: "natural-language",
          title: "Chinese → English",
          points: ["The same experience", "Different explicit information", "Translation reconstructs"],
          detail: "Chinese and English do more than rename one set of concepts. They require different information to become explicit and organize the same scene differently. This is an everyday entry into representation change.",
        },
        {
          id: "programming-language",
          title: "Representation shapes search",
          points: ["Different neighborhoods", "Coordinates change paths", "Short does not mean discoverable"],
          detail: "A representation determines which candidates are neighbors and where a local modification can move. The same answer may require a long search in one coordinate system and a single step in another.",
        },
        {
          id: "capability",
          title: "Capability follows task distributions",
          points: ["R* depends on D", "Representation cost", "Inductive bias"],
          detail: "There is no best basis apart from a task distribution. An abstraction earns its value by paying a construction cost once, then shortening description, search, execution, and verification across a recurring family of tasks.",
        },
        {
          id: "machine-species",
          title: "Divergence ↔ convergence",
          points: ["Private latent languages", "Shared-world invariants", "Layered cognitive ecology"],
          detail: "Objectives, bodies, and tools push AIs toward specialized ontologies, while a shared reality forces contact at some invariants. The future may be a layered linguistic ecology rather than one universal language.",
        },
        {
          id: "translator",
          title: "Translation must preserve structure",
          points: ["Prediction · intervention", "Bridge concepts", "Explicit translation loss"],
          detail: "A translator cannot stop at a similar natural-language label. It must state which relations in prediction, intervention, action, and value survive, then use bridge concepts to give humans an operational bilingualism.",
        },
      ],
    },
  },
};

const elements = {
  stream: document.querySelector("#stream"),
  count: document.querySelector("#result-count"),
  search: document.querySelector("#search-input"),
  maturityOptions: document.querySelector("#maturity-options"),
  tagOptions: document.querySelector("#tag-options"),
  clear: document.querySelector("#clear-filters"),
  random: document.querySelector("#random-thought"),
  cardTemplate: document.querySelector("#thought-card-template"),
  thoughtView: document.querySelector("#thought-view"),
  article: document.querySelector("#thought-article"),
  related: document.querySelector("#related-list"),
  backlinks: document.querySelector("#backlinks-list"),
  back: document.querySelector("#back-to-stream"),
};

function formatDate(date) {
  return dateFormatter.format(new Date(`${date}T12:00:00`));
}

function thoughtVersions(thought) {
  const baseLanguage = thought.language || "en";
  return {
    [baseLanguage]: {
      language: baseLanguage,
      title: thought.title,
      excerpt: thought.excerpt,
      html: thought.html,
      text: thought.text,
    },
    ...(thought.translations || {}),
  };
}

function preferredLanguage(thought) {
  const versions = thoughtVersions(thought);
  let remembered;
  try {
    remembered = localStorage.getItem(`thought-language:${thought.slug}`);
  } catch {
    remembered = null;
  }
  if (remembered && versions[remembered]) return remembered;
  if (thought.defaultLanguage && versions[thought.defaultLanguage]) return thought.defaultLanguage;
  return thought.language || "en";
}

function thoughtVersion(thought, language = preferredLanguage(thought)) {
  const versions = thoughtVersions(thought);
  return versions[language] || versions[thought.language || "en"] || Object.values(versions)[0];
}

function rememberLanguage(thought, language) {
  try {
    localStorage.setItem(`thought-language:${thought.slug}`, language);
  } catch {
    // The toggle still works when storage is unavailable.
  }
}

function languageLabel(language) {
  return ({ en: "English", zh: "中文" })[language] || language.toUpperCase();
}

function mindMapVersion(mapId, language) {
  const versions = mindMaps[mapId];
  if (!versions) return null;
  return versions[language] || versions.en || Object.values(versions)[0];
}

function mindMapMarkup(mapId, language) {
  const map = mindMapVersion(mapId, language);
  if (!map) return "";
  const titleId = `mind-map-title-${mapId}`;
  const branches = map.branches.map((branch) => `
    <button class="mind-map-node" type="button" data-mind-map-branch="${escapeHtml(branch.id)}" aria-pressed="false">
      <strong>${escapeHtml(branch.title)}</strong>
      <span>${branch.points.map((point) => escapeHtml(point)).join("<br>")}</span>
    </button>
  `).join("");

  return `
    <section class="thought-mind-map" aria-labelledby="${escapeHtml(titleId)}">
      <p class="micro-label">${escapeHtml(map.label)}</p>
      <h2 id="${escapeHtml(titleId)}">${escapeHtml(map.title)}</h2>
      <p class="mind-map-caption">${escapeHtml(map.caption)}</p>
      <div class="mind-map-canvas">
        <div class="mind-map-root">
          <small>${escapeHtml(map.rootLabel)}</small>
          <strong>${escapeHtml(map.root)}</strong>
        </div>
        <div class="mind-map-branches">${branches}</div>
        <div class="mind-map-outcome">
          <small>${escapeHtml(map.outcomeLabel)}</small>
          <strong>${escapeHtml(map.outcome)}</strong>
        </div>
      </div>
      <p class="mind-map-detail" aria-live="polite">
        <strong class="mind-map-detail-title"></strong>
        <span class="mind-map-detail-copy"></span>
      </p>
    </section>
  `;
}

function activateMindMap(mapId, language) {
  const map = mindMapVersion(mapId, language);
  const container = elements.article.querySelector(".thought-mind-map");
  if (!map || !container) return;
  const buttons = [...container.querySelectorAll("[data-mind-map-branch]")];
  const detailTitle = container.querySelector(".mind-map-detail-title");
  const detailCopy = container.querySelector(".mind-map-detail-copy");

  function selectBranch(id) {
    const branch = map.branches.find((item) => item.id === id);
    if (!branch) return;
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mindMapBranch === id)));
    detailTitle.textContent = branch.title;
    detailCopy.textContent = branch.detail;
  }

  buttons.forEach((button) => button.addEventListener("click", () => selectBranch(button.dataset.mindMapBranch)));
  selectBranch(map.branches[0].id);
}

function makeButton(label, value, type, count) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = type === "maturity" ? "filter-button" : "tag-button";
  button.dataset.value = value;
  button.setAttribute("aria-pressed", String(state[type] === value));
  button.innerHTML = type === "tag" && typeof count === "number"
    ? `<span class="tag-name"></span><span>${count}</span>`
    : label;
  if (type === "tag") button.querySelector(".tag-name").textContent = label;
  button.addEventListener("click", () => {
    state[type] = value;
    renderFilters();
    renderStream();
  });
  return button;
}

function renderFilters() {
  elements.maturityOptions.replaceChildren();
  elements.maturityOptions.append(makeButton("all", "all", "maturity"));
  maturityOrder.forEach((maturity) => elements.maturityOptions.append(makeButton(maturity, maturity, "maturity")));

  const counts = state.thoughts.reduce((result, thought) => {
    thought.tags.forEach((tag) => { result[tag] = (result[tag] || 0) + 1; });
    return result;
  }, {});
  elements.tagOptions.replaceChildren();
  elements.tagOptions.append(makeButton("all topics", "all", "tag", state.thoughts.length));
  Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([tag, count]) => elements.tagOptions.append(makeButton(tag, tag, "tag", count)));

  const isFiltered = state.maturity !== "all" || state.tag !== "all" || state.query;
  elements.clear.hidden = !isFiltered;
}

function filteredThoughts() {
  const query = state.query.toLowerCase().trim();
  return state.thoughts.filter((thought) => {
    const matchesMaturity = state.maturity === "all" || thought.maturity === state.maturity;
    const matchesTag = state.tag === "all" || thought.tags.includes(state.tag);
    const versions = Object.values(thoughtVersions(thought));
    const multilingualText = versions.map((version) => `${version.title} ${version.excerpt} ${version.text}`).join(" ");
    const haystack = `${multilingualText} ${thought.tags.join(" ")}`.toLowerCase();
    return matchesMaturity && matchesTag && (!query || haystack.includes(query));
  });
}

function openThought(slug, options = {}) {
  const thought = state.thoughts.find((item) => item.slug === slug);
  if (!thought) return;
  if (options.updateHash !== false) history.pushState({ slug }, "", `#thought/${slug}`);

  const versions = thoughtVersions(thought);
  const activeLanguage = options.language && versions[options.language] ? options.language : preferredLanguage(thought);
  const version = thoughtVersion(thought, activeLanguage);

  document.body.classList.add("detail-open");
  elements.thoughtView.hidden = false;
  elements.article.lang = activeLanguage;
  document.documentElement.lang = activeLanguage;
  document.title = `${version.title} | Thoughts, in Passing`;

  const tags = thought.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");
  const languageOptions = Object.keys(versions);
  const languageSwitcher = languageOptions.length > 1
    ? `<div class="article-language-switch" role="group" aria-label="Article language">${languageOptions
      .sort((a, b) => (a === "zh" ? -1 : b === "zh" ? 1 : a.localeCompare(b)))
      .map((language) => `<button type="button" data-article-language="${escapeHtml(language)}" aria-pressed="${language === activeLanguage}" lang="${escapeHtml(language)}">${escapeHtml(languageLabel(language))}</button>`)
      .join("")}</div>`
    : "";
  const mindMap = thought.mindMap ? mindMapMarkup(thought.mindMap, activeLanguage) : "";
  elements.article.innerHTML = `
    <header>
      <div class="article-meta">
        <time datetime="${thought.date}">${formatDate(thought.date)}</time>
        <span class="maturity-badge">${escapeHtml(thought.maturity)}</span>
        ${thought.placeholder ? '<span class="placeholder-badge">placeholder</span>' : ""}
      </div>
      ${languageSwitcher}
      <h1>${escapeHtml(version.title)}</h1>
      <p class="article-excerpt">${escapeHtml(version.excerpt)}</p>
      <ul class="article-tags" aria-label="Tags">${tags}</ul>
    </header>
    ${thought.placeholder ? '<div class="placeholder-callout"><strong>Placeholder:</strong> this sample note demonstrates the content model and should be replaced with real writing.</div>' : ""}
    ${mindMap}
    <div class="article-body">${version.html}</div>
  `;
  elements.article.querySelectorAll("[data-article-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.articleLanguage;
      if (language === activeLanguage) return;
      rememberLanguage(thought, language);
      openThought(slug, { updateHash: false, language, preserveScroll: true });
    });
  });
  if (thought.mindMap) activateMindMap(thought.mindMap, activeLanguage);
  renderConnections(thought);
  if (!options.preserveScroll) window.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
}

function closeThought(options = {}) {
  document.body.classList.remove("detail-open");
  elements.thoughtView.hidden = true;
  elements.article.removeAttribute("lang");
  document.documentElement.lang = "en";
  document.title = "Thoughts, in Passing | Kaijing Ma";
  if (options.updateHash !== false) history.pushState({}, "", `${location.pathname}${location.search}#stream`);
  if (!options.instant) document.querySelector("#stream").scrollIntoView({ behavior: "smooth", block: "start" });
}

function connectionMarkup(slugs, emptyMessage) {
  if (!slugs.length) return `<p class="connection-empty">${escapeHtml(emptyMessage)}</p>`;
  return slugs.map((slug) => {
    const thought = state.thoughts.find((item) => item.slug === slug);
    if (!thought) return "";
    const version = thoughtVersion(thought, thought.defaultLanguage || thought.language || "en");
    return `<a class="connection-link" href="#thought/${encodeURIComponent(slug)}"><span>${escapeHtml(version.title)}</span><small>${escapeHtml(thought.maturity)} →</small></a>`;
  }).join("");
}

function renderConnections(thought) {
  const backlinks = state.thoughts
    .filter((candidate) => candidate.related.includes(thought.slug))
    .map((candidate) => candidate.slug);
  elements.related.innerHTML = connectionMarkup(thought.related, "No related thoughts yet.");
  elements.backlinks.innerHTML = connectionMarkup(backlinks, "No thoughts point back here yet.");
}

function renderStream() {
  const thoughts = filteredThoughts();
  elements.stream.replaceChildren();
  elements.count.textContent = `${thoughts.length} ${thoughts.length === 1 ? "thought" : "thoughts"}`;
  elements.stream.setAttribute("aria-busy", "false");

  if (!thoughts.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = "<h2>Nothing growing here yet.</h2><p>Try another topic, maturity level, or phrase.</p>";
    elements.stream.append(empty);
    return;
  }

  thoughts.forEach((thought) => {
    const version = thoughtVersion(thought, thought.defaultLanguage || thought.language || "en");
    const card = elements.cardTemplate.content.firstElementChild.cloneNode(true);
    card.dataset.maturity = thought.maturity;
    const time = card.querySelector("time");
    time.dateTime = thought.date;
    time.textContent = formatDate(thought.date);
    card.querySelector(".maturity-badge").textContent = thought.maturity;
    card.querySelector(".placeholder-badge").hidden = !thought.placeholder;
    const titleButton = card.querySelector(".thought-link");
    titleButton.textContent = version.title;
    titleButton.addEventListener("click", () => openThought(thought.slug));
    card.querySelector(".excerpt").textContent = version.excerpt;
    const tags = card.querySelector(".card-tags");
    thought.tags.forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      tags.append(item);
    });
    card.querySelector(".read-link").addEventListener("click", () => openThought(thought.slug));
    elements.stream.append(card);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function syncRoute(options = {}) {
  const match = location.hash.match(/^#thought\/(.+)$/);
  if (match) openThought(decodeURIComponent(match[1]), { updateHash: false, instant: options.instant });
  else closeThought({ updateHash: false, instant: options.instant });
}

elements.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderFilters();
  renderStream();
});

elements.clear.addEventListener("click", () => {
  state.maturity = "all";
  state.tag = "all";
  state.query = "";
  elements.search.value = "";
  renderFilters();
  renderStream();
});

elements.random.addEventListener("click", () => {
  const thoughts = filteredThoughts();
  if (!thoughts.length) return;
  openThought(thoughts[Math.floor(Math.random() * thoughts.length)].slug);
});

elements.back.addEventListener("click", () => closeThought());
window.addEventListener("popstate", () => syncRoute({ instant: true }));
window.addEventListener("hashchange", () => syncRoute({ instant: true }));
document.addEventListener("click", (event) => {
  const connection = event.target.closest("a[href^='#thought/']");
  if (!connection) return;
  event.preventDefault();
  openThought(decodeURIComponent(connection.hash.replace("#thought/", "")));
});

fetch("data/thoughts.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(`Could not load thoughts (${response.status})`);
    return response.json();
  })
  .then((thoughts) => {
    state.thoughts = thoughts.sort((a, b) => b.date.localeCompare(a.date));
    renderFilters();
    renderStream();
    syncRoute({ instant: true });
  })
  .catch((error) => {
    elements.stream.setAttribute("aria-busy", "false");
    elements.stream.innerHTML = `<div class="empty-state"><h2>The garden could not load.</h2><p>${escapeHtml(error.message)}</p></div>`;
    elements.count.textContent = "Unavailable";
  });
