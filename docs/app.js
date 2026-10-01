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
      title: "学习一种没有双语词典的语言",
      caption: "从中心假设向外展开。点击任一分支，查看它在整篇论证中的作用。",
      rootLabel: "中心假设",
      root: "模型正在用另一种语言抽象世界",
      outcomeLabel: "可能的结果",
      outcome: "人类与机器共同创造新的抽象语言",
      branches: [
        {
          id: "analogy",
          title: "语言学习类比",
          points: ["不是逐词替换", "先找语法", "意义来自使用"],
          detail: "从英语学习中文时，真正的流利不是扩大翻译表，而是进入另一套语序、语境与意义边界。理解模型也可能需要相同的转换。",
        },
        {
          id: "human",
          title: "人类 ontology",
          points: ["变量 · 对象 · 因果", "数学作为可读压缩", "偏好 English label"],
          detail: "人类已经拥有一套经过数学与科学长期塑造的概念坐标。我们天然会用这套坐标解释模型，也因此可能把自己的结构投射进去。",
        },
        {
          id: "machine",
          title: "机器 ontology",
          points: ["distributed features", "loss-shaped primitives", "latent geometry"],
          detail: "模型只被要求降低 loss，没有义务使用人类概念。它的 primitive 可能把语法、语义、因果和不确定性组合成我们尚未命名的对象。",
        },
        {
          id: "translation",
          title: "如何学习它",
          points: ["minimal pairs", "causal intervention", "关系先于命名"],
          detail: "研究过程更像 field linguistics：比较最小差异，主动干预内部结构，观察行为变化，先恢复组合规则，再编写人类可读的词典。",
        },
        {
          id: "tests",
          title: "什么算理解",
          points: ["稳定与因果", "组合与压缩", "迁移与翻译损失"],
          detail: "漂亮的标签还不够。候选 ontology 必须跨语境稳定，支持可预测干预，形成可组合规律，压缩行为，并迁移到没有参与发现的新任务。",
        },
      ],
    },
    en: {
      label: "Mind map",
      title: "Learning a language with no bilingual dictionary",
      caption: "Follow the central hypothesis outward. Select a branch to see its role in the argument.",
      rootLabel: "Central hypothesis",
      root: "The model abstracts the world in another language",
      outcomeLabel: "Possible result",
      outcome: "A new abstraction language created jointly by humans and machines",
      branches: [
        {
          id: "analogy",
          title: "Language-learning analogy",
          points: ["Not word substitution", "Grammar before labels", "Meaning through use"],
          detail: "Fluency in Chinese does not come from enlarging an English translation table. It comes from entering another system of word order, context, and semantic boundaries. Model understanding may require the same shift.",
        },
        {
          id: "human",
          title: "Human ontology",
          points: ["Variables · objects · causes", "Math as readable compression", "Preference for English labels"],
          detail: "Humans inherit conceptual coordinates shaped by mathematics and science. We naturally interpret models through those coordinates, which means we may also project our preferred structure onto them.",
        },
        {
          id: "machine",
          title: "Machine ontology",
          points: ["Distributed features", "Loss-shaped primitives", "Latent geometry"],
          detail: "A model is trained to reduce loss, not to preserve human concepts. Its primitives may combine syntax, semantics, causality, and uncertainty into objects for which we have no name.",
        },
        {
          id: "translation",
          title: "How to learn it",
          points: ["Minimal pairs", "Causal intervention", "Relations before names"],
          detail: "The method resembles field linguistics. Compare minimal differences, intervene on internal structure, observe behavioral changes, recover rules of combination, and only then begin writing a human-readable dictionary.",
        },
        {
          id: "tests",
          title: "What counts as understanding",
          points: ["Stability and causality", "Composition and compression", "Transfer and translation loss"],
          detail: "An attractive label is not enough. A candidate ontology should remain stable across contexts, support predictable interventions, compose into rules, compress behavior, and transfer to tasks that did not help discover it.",
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
