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
      title: "机器原生抽象的三种解释",
      caption: "把“模型内部难以理解”拆成三个可竞争的假设，再比较它们的证据与翻译标准。点击分支，展开判据。",
      rootLabel: "核心问题",
      root: "模型内部为什么难以被人类概念解释？",
      outcomeLabel: "研究目标",
      outcome: "让三个故事相互竞争，把“未知语言”变成可证伪的研究计划",
      branches: [
        {
          id: "human-ontology",
          title: "H3 · 人类式抽象未解码",
          points: ["text-trained prior", "nonlinear decoder", "causal completeness"],
          detail: "LLM 的输入输出受到人类语言强约束。如果更好的 decoder、alignment 与 causal test 能恢复一组接近人类概念且足以解释行为的变量，就不需要诉诸异质 ontology。",
        },
        {
          id: "heterogeneous-ontology",
          title: "H1 · 异质但稳定的抽象",
          points: ["跨 seed 稳定", "更好的 machine basis", "bridge concepts"],
          detail: "若稳定的非人类 relation 在压缩、迁移与干预预测上优于人类预设 basis，并能形成可教学的 bridge concept，就支持 machine-native abstraction。",
        },
        {
          id: "no-stable-ontology",
          title: "H2 · 没有稳定抽象",
          points: ["diffuse intervention", "poor transfer", "no invariant factors"],
          detail: "如果 feature 强烈依赖上下文，干预无法局部化，关系也不能跨任务与训练运行复现，那么“机器语言”可能只是我们投射出来的比喻。",
        },
        {
          id: "divergence-conditions",
          title: "何时更可能偏离",
          points: ["self-play · RL", "scientific data", "different embodiment"],
          detail: "人类文本让 LLM 更可能继承人类 ontology。异质性的先验在非语言模态、自博弈、科学数据、长期行动与不同身体条件下更强。",
        },
        {
          id: "translator",
          title: "翻译必须保持干预",
          points: ["causal alignment", "explicit losses", "operational bilingualism"],
          detail: "Translator 不能只生成相似标签。它必须检验干预关系是否交换，说明 prediction、action 与 value 中哪些结构被保留，并让人或另一个模型能真正使用 bridge concept。",
        },
      ],
    },
    en: {
      label: "Mind map",
      title: "Three explanations for machine-native abstraction",
      caption: "Turn model opacity into three competing hypotheses, then compare their evidence and translation criteria.",
      rootLabel: "Central question",
      root: "Why are model internals difficult to explain with human concepts?",
      outcomeLabel: "Research goal",
      outcome: "Make three stories compete and turn an unknown language into a falsifiable research program",
      branches: [
        {
          id: "human-ontology",
          title: "H3 · Human abstractions, not decoded",
          points: ["Text-trained prior", "Nonlinear decoder", "Causal completeness"],
          detail: "Human language strongly constrains an LLM's inputs and outputs. If better decoders, alignment, and causal tests recover human-like variables sufficient to explain behavior, no heterogeneous ontology is needed.",
        },
        {
          id: "heterogeneous-ontology",
          title: "H1 · Heterogeneous, stable abstractions",
          points: ["Stable across seeds", "Better machine basis", "Bridge concepts"],
          detail: "Evidence for machine-native abstraction would be stable nonhuman relations that outperform a human-chosen basis in compression, transfer, and intervention prediction, then support teachable bridge concepts.",
        },
        {
          id: "no-stable-ontology",
          title: "H2 · No stable abstraction",
          points: ["Diffuse intervention", "Poor transfer", "No invariant factors"],
          detail: "If features remain context-bound, interventions resist localization, and relations do not recur across tasks or training runs, a machine language may be a metaphor projected by us.",
        },
        {
          id: "divergence-conditions",
          title: "When divergence is more likely",
          points: ["Self-play · RL", "Scientific data", "Different embodiment"],
          detail: "Human text makes an LLM more likely to inherit a human ontology. The prior for divergence grows with nonlinguistic modalities, self-play, scientific data, long-horizon action, and different bodies.",
        },
        {
          id: "translator",
          title: "Translation must preserve intervention",
          points: ["Causal alignment", "Explicit losses", "Operational bilingualism"],
          detail: "A translator cannot stop at similar labels. It must test whether intervention relations commute, state what survives in prediction, action, and value, and make a bridge concept usable by a person or another model.",
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
