// Project records as classes.
//
// Project keeps its data in private fields and exposes it through read-only getters, so the
// components can't change a project by accident. FeaturedProject extends it with the case-study
// notes (role and outcome) and overrides `caseNotes`, so the details dialog can ask any project
// for its notes without checking which kind it is.

// Placeholder links such as "YOUR_GITHUB_URL" count as "no link".
const isRealUrl = (url) => Boolean(url) && !url.startsWith("YOUR_");

export class Project {
  #id;
  #name;
  #category;
  #description;
  #longDescription;
  #features;
  #technologies;
  #image;
  #githubUrl;
  #liveUrl;
  #year;

  constructor({
    id,
    name,
    category,
    description,
    longDescription = null,
    features = [],
    technologies = [],
    image = null,
    githubUrl = null,
    liveUrl = null,
    year,
  }) {
    this.#id = id;
    this.#name = name;
    this.#category = category;
    this.#description = description;
    this.#longDescription = longDescription;
    this.#features = Object.freeze([...features]);
    this.#technologies = Object.freeze([...technologies]);
    this.#image = image;
    this.#githubUrl = githubUrl;
    this.#liveUrl = liveUrl;
    this.#year = year;
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get category() { return this.#category; }
  get description() { return this.#description; }
  get features() { return this.#features; }
  get technologies() { return this.#technologies; }
  get image() { return this.#image; }
  get githubUrl() { return this.#githubUrl; }
  get liveUrl() { return this.#liveUrl; }
  get year() { return this.#year; }

  /** The longer write-up for the details dialog, falling back to the card text. */
  get longDescription() { return this.#longDescription || this.#description; }

  /** "Food & Dining / Full-Stack Web App" -> "Food & Dining", for the compact card label. */
  get primaryCategory() { return this.#category.split(" / ")[0]; }

  /** Short monogram for cards without a screenshot, e.g. "Academic Management System" -> "AM". */
  get monogram() {
    return this.#name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
  }

  get hasCode() { return isRealUrl(this.#githubUrl); }
  get hasLiveDemo() { return isRealUrl(this.#liveUrl); }

  /** Labelled notes shown under "What it does". A plain project has none. */
  get caseNotes() { return []; }
}

/** A project with a full case study: what I built and what came of it. */
export class FeaturedProject extends Project {
  #role;
  #outcome;

  constructor({ role = null, outcome = null, ...details }) {
    super(details);
    this.#role = role;
    this.#outcome = outcome;
  }

  /** Overrides Project.caseNotes; a note stays hidden until its text is filled in. */
  get caseNotes() {
    return [
      { label: "My role", text: this.#role },
      { label: "Outcome", text: this.#outcome },
    ].filter((note) => note.text);
  }
}
