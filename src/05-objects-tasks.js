/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = Object.create(proto);

  Object.entries(JSON.parse(json)).forEach(([key, value]) => {
    obj[key] = value;
  });

  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class CssSelectorParts {
  constructor(value, type) {
    if (!Array.isArray(this.parts)) {
      this.parts = [];
    }

    if (type === 'element') {
      this.element(value);
    } else if (type === 'id') {
      this.id(value);
    } else if (type === 'class') {
      this.class(value);
    } else if (type === 'attr') {
      this.attr(value);
    } else if (type === 'pseudoClass') {
      this.pseudoClass(value);
    } else if (type === 'pseudoElement') {
      this.pseudoElement(value);
    }

    return this;
  }

  element(value) {
    if (this.hasElement) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    if (this.hasCorrectOrder(0)) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    this.parts.push(value);
    this.hasElement = true;

    return this;
  }

  id(value) {
    if (this.hasId) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    if (this.hasCorrectOrder(1)) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    this.parts.push(`#${value}`);
    this.hasId = true;

    return this;
  }

  class(value) {
    this.parts.push(`.${value}`);
    this.hasClass = true;

    if (this.hasCorrectOrder(2)) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    return this;
  }

  attr(value) {
    this.parts.push(`[${value}]`);
    this.hasAttr = true;

    if (this.hasCorrectOrder(3)) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    return this;
  }

  pseudoClass(value) {
    this.parts.push(`:${value}`);
    this.hasPseudoClass = true;

    if (this.hasCorrectOrder(4)) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    return this;
  }

  pseudoElement(value) {
    if (this.hasPseudoElement) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }

    if (this.hasCorrectOrder(5)) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }

    this.parts.push(`::${value}`);
    this.hasPseudoElement = true;

    return this;
  }

  stringify() {
    return this.parts.join('');
  }

  combine(selector1, combinator, selector2) {
    this.parts.push(...selector1.parts, ` ${combinator} `, ...selector2.parts);
    return this;
  }

  hasCorrectOrder(order) {
    const currentOrderElements = [this.hasElement, this.hasId, this.hasClass,
      this.hasAttr, this.hasPseudoClass, this.hasPseudoElement]
      .filter((item, index) => index > order);

    return currentOrderElements.some((item) => item);
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


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
