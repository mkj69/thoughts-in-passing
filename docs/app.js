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
      title: "语言、表示与多种智能",
      caption: "从中文到英文，再到程序语言和机器 ontology。点击分支，查看 representation 如何改变 capability。",
      rootLabel: "核心问题",
      root: "什么表示能让一种计算变得短、自然、可发现？",
      outcomeLabel: "可能的未来",
      outcome: "由共同 interlingua 连接的多种智能生态",
      branches: [
        {
          id: "natural-language",
          title: "中文 → 英文",
          points: ["topic ↔ subject", "语境 ↔ 显式 grammar", "翻译是重建"],
          detail: "中文母语者学习英文时，真正的变化不只是词汇。两种语言要求说话者显式编码不同的信息，流利意味着能够在不同表示中重建同一个场景。",
        },
        {
          id: "programming-language",
          title: "程序语言",
          points: ["Python · SQL · Lean", "相同可计算性", "不同 primitive"],
          detail: "程序语言可能理论上完成相同计算，却让不同任务的表达长度与搜索难度相差巨大。Abstraction 不只是描述能力，也在制造实际 capability。",
        },
        {
          id: "capability",
          title: "能力需要表示",
          points: ["R* depends on task", "没有唯一最佳 basis", "搜索 · 执行 · 验证"],
          detail: "形式证明、分子设计、社会推理和身体控制可能各自需要不同 primitive。知识可以共享底座，但不同能力未必能共享同一种最优表示。",
        },
        {
          id: "machine-species",
          title: "不同的 AI",
          points: ["不同 data 与 objective", "不同 memory 与 embodiment", "新的 cognitive species"],
          detail: "数学 AI、生物 AI 和 embodied AI 也许不仅知识不同，还会形成不同的 latent language。它们可能是新的认知物种，而不是同一个模型的大小版本。",
        },
        {
          id: "translator",
          title: "共同翻译层",
          points: ["human ↔ AI ↔ AI", "双向 conceptual compiler", "明确 translation loss"],
          detail: "未来的 translator 需要把问题、概念、证据和因果关系在多种 ontology 之间转换。它不仅解释机器，还可能创造一种人类与多种 AI 共同使用的 interlingua。",
        },
      ],
    },
    en: {
      label: "Mind map",
      title: "Language, representation, and plural intelligence",
      caption: "Move from Chinese and English to programming languages and machine ontologies. Select a branch to see how representation changes capability.",
      rootLabel: "Central question",
      root: "Which representation makes a computation short, natural, and discoverable?",
      outcomeLabel: "Possible future",
      outcome: "A plural ecology of intelligences connected by a shared interlingua",
      branches: [
        {
          id: "natural-language",
          title: "Chinese → English",
          points: ["Topic ↔ subject", "Context ↔ explicit grammar", "Translation reconstructs"],
          detail: "For a native Chinese speaker learning English, the real shift extends beyond vocabulary. The languages require different information to become explicit, so fluency means reconstructing the same scene inside another representation.",
        },
        {
          id: "programming-language",
          title: "Programming languages",
          points: ["Python · SQL · Lean", "Same computability", "Different primitives"],
          detail: "Programming languages may support the same computations in theory while making task description and search differ enormously. Abstraction does not only describe capability. It helps create practical capability.",
        },
        {
          id: "capability",
          title: "Capability needs representation",
          points: ["R* depends on the task", "No single best basis", "Search · execution · verification"],
          detail: "Formal proof, molecular design, social reasoning, and bodily control may require different primitives. Knowledge can share a foundation without every capability sharing one optimal representation.",
        },
        {
          id: "machine-species",
          title: "Different AIs",
          points: ["Different data and objectives", "Different memory and embodiment", "New cognitive species"],
          detail: "Mathematical, biological, and embodied AIs may develop distinct latent languages, not merely different knowledge. They could become new cognitive species rather than differently sized versions of one model.",
        },
        {
          id: "translator",
          title: "A shared translation layer",
          points: ["Human ↔ AI ↔ AI", "Bidirectional conceptual compiler", "Explicit translation loss"],
          detail: "A future translator would move questions, concepts, evidence, and causal relations among several ontologies. It may do more than explain machines. It may create an interlingua shared by humans and multiple AIs.",
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
