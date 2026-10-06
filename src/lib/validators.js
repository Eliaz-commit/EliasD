// Form validation built from small classes.
//
// FieldValidator is the base class. It owns the rules every field shares (the value must be
// non-empty) and delegates the field-specific rules to `check()`, which each subclass overrides.
// ContactFormValidator then treats every field the same way without knowing which kind it is.

/** Base class: "required" is checked here, everything else in the subclass's `check()`. */
export class FieldValidator {
  #label; // encapsulated: only readable through the `label` getter

  constructor(label) {
    if (new.target === FieldValidator) {
      throw new TypeError("FieldValidator is abstract; use a subclass such as EmailValidator.");
    }
    this.#label = label;
  }

  get label() {
    return this.#label;
  }

  /** Returns an error message, or "" when the value is valid. */
  validate(value) {
    const text = String(value ?? "").trim();
    if (!text) return `${this.#label} is required.`;
    return this.check(text);
  }

  /** Field-specific rules. Subclasses override this (polymorphism). */
  check() {
    return "";
  }
}

/** Letters, spaces, hyphens, apostrophes and periods; at least two characters. */
export class NameValidator extends FieldValidator {
  constructor() {
    super("Full name");
  }

  check(text) {
    if (text.length < 2) return "Full name must be at least 2 characters.";
    if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(text)) {
      return "Full name can only contain letters, spaces, hyphens, apostrophes and periods.";
    }
    return "";
  }
}

/** A single address in the shape name@domain.tld. */
export class EmailValidator extends FieldValidator {
  static #pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  constructor() {
    super("Email address");
  }

  check(text) {
    return EmailValidator.#pattern.test(text) ? "" : "Enter a valid email address, like you@example.com.";
  }
}

/** Long enough to say something, short enough to fit in a mailto link. */
export class MessageValidator extends FieldValidator {
  #min;
  #max;

  constructor({ min = 10, max = 1000 } = {}) {
    super("Message");
    this.#min = min;
    this.#max = max;
  }

  check(text) {
    if (text.length < this.#min) return `Message must be at least ${this.#min} characters.`;
    if (text.length > this.#max) return `Message must be ${this.#max} characters or fewer.`;
    return "";
  }
}

/** Runs one validator per form field. */
export class ContactFormValidator {
  #validators = {
    name: new NameValidator(),
    email: new EmailValidator(),
    message: new MessageValidator(),
  };

  /** Error message for one field ("" when valid). */
  validateField(name, value) {
    return this.#validators[name]?.validate(value) ?? "";
  }

  /** Returns `{ errors, isValid }` for the whole form; `errors` only has the invalid fields. */
  validateAll(values) {
    const errors = {};
    for (const name of Object.keys(this.#validators)) {
      const error = this.validateField(name, values[name]);
      if (error) errors[name] = error;
    }
    return { errors, isValid: Object.keys(errors).length === 0 };
  }
}
