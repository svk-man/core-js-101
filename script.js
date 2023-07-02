class CssSelectorParts {
  constructor(value, type) {
    if (!Array.isArray(this.parts)) {
      this.parts = [];
    }

    if (type === 'element') {
      this.element(value);
    } else if (type === 'id') {
      if (this.hasId) {
        throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
      }

      this.id(value);
      this.hasId = true;
    } else if (type === 'class') {
      this.class(value);
    } else if (type === 'attr') {
      this.attr(value);
    } else if (type === 'pseudoClass') {
      this.pseudoClass(value);
    } else if (type === 'pseudoElement') {
      if (this.hasPseudoElement) {
        throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
      }

      this.pseudoElement(value);
      this.hasPseudoElement = true;
    }

    console.log(this);

    return this;
  }

  element(value) {
    console.log(this.hasElement);
    if (this.hasElement) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    this.hasElement = true;
    this.parts.push(value);
    return this;
  }

  id(value) {
    this.parts.push(`#${value}`);
    return this;
  }

  class(value) {
    this.parts.push(`.${value}`);
    return this;
  }

  attr(value) {
    this.parts.push(`[${value}]`);
    return this;
  }

  pseudoClass(value) {
    this.parts.push(`:${value}`);
    return this;
  }

  pseudoElement(value) {
    this.parts.push(`::${value}`);
    return this;
  }

  stringify() {
    return this.parts.join('');
  }

  combine(selector1, combinator, selector2) {
    this.parts.push(...selector1.parts, ` ${combinator} `, ...selector2.parts);
    return this;
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CssSelectorParts(value, 'element');
  },

  id(value) {
    return new CssSelectorParts(value, 'id');
  },

  class(value) {
    return new CssSelectorParts(value, 'class');
  },

  attr(value) {
    return new CssSelectorParts(value, 'attr');
  },

  pseudoClass(value) {
    return new CssSelectorParts(value, 'pseudoClass');
  },

  pseudoElement(value) {
    return new CssSelectorParts(value, 'pseudoElement');
  },

  combine(selector1, combinator, selector2) {
    return new CssSelectorParts().combine(selector1, combinator, selector2);
  },
};

const builder = cssSelectorBuilder;
console.log(builder.element('table').element('div'));
