const maturityOrder = ["seed", "sketch", "evolving", "essay"];
const dateFormatter = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" });

const state = {
  thoughts: [],
  maturity: "all",
  tag: "all",
  query: "",
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
    const haystack = `${thought.title} ${thought.excerpt} ${thought.tags.join(" ")} ${thought.text}`.toLowerCase();
    return matchesMaturity && matchesTag && (!query || haystack.includes(query));
  });
}

function openThought(slug, options = {}) {
  const thought = state.thoughts.find((item) => item.slug === slug);
  if (!thought) return;
  if (options.updateHash !== false) history.pushState({ slug }, "", `#thought/${slug}`);

  document.body.classList.add("detail-open");
  elements.thoughtView.hidden = false;
  document.title = `${thought.title} — Thoughts, in Passing`;

  const tags = thought.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");
  elements.article.innerHTML = `
    <header>
      <div class="article-meta">
        <time datetime="${thought.date}">${formatDate(thought.date)}</time>
        <span class="maturity-badge">${escapeHtml(thought.maturity)}</span>
        ${thought.placeholder ? '<span class="placeholder-badge">placeholder</span>' : ""}
      </div>
      <h1>${escapeHtml(thought.title)}</h1>
      <p class="article-excerpt">${escapeHtml(thought.excerpt)}</p>
      <ul class="article-tags" aria-label="Tags">${tags}</ul>
    </header>
    ${thought.placeholder ? '<div class="placeholder-callout"><strong>Placeholder:</strong> this sample note demonstrates the content model and should be replaced with real writing.</div>' : ""}
    <div class="article-body">${thought.html}</div>
  `;
  renderConnections(thought);
  window.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
}

function closeThought(options = {}) {
  document.body.classList.remove("detail-open");
  elements.thoughtView.hidden = true;
  document.title = "Thoughts, in Passing — Kaijing Ma";
  if (options.updateHash !== false) history.pushState({}, "", `${location.pathname}${location.search}#stream`);
  if (!options.instant) document.querySelector("#stream").scrollIntoView({ behavior: "smooth", block: "start" });
}

function connectionMarkup(slugs, emptyMessage) {
  if (!slugs.length) return `<p class="connection-empty">${escapeHtml(emptyMessage)}</p>`;
  return slugs.map((slug) => {
    const thought = state.thoughts.find((item) => item.slug === slug);
    if (!thought) return "";
    return `<a class="connection-link" href="#thought/${encodeURIComponent(slug)}"><span>${escapeHtml(thought.title)}</span><small>${escapeHtml(thought.maturity)} →</small></a>`;
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
    const card = elements.cardTemplate.content.firstElementChild.cloneNode(true);
    card.dataset.maturity = thought.maturity;
    const time = card.querySelector("time");
    time.dateTime = thought.date;
    time.textContent = formatDate(thought.date);
    card.querySelector(".maturity-badge").textContent = thought.maturity;
    card.querySelector(".placeholder-badge").hidden = !thought.placeholder;
    const titleButton = card.querySelector(".thought-link");
    titleButton.textContent = thought.title;
    titleButton.addEventListener("click", () => openThought(thought.slug));
    card.querySelector(".excerpt").textContent = thought.excerpt;
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
