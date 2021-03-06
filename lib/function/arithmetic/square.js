'use strict';

function factory (type, config, load, typed) {
  var collection = load(require('../../type/matrix/collection'));

  /**
   * Compute the square of a value, `x * x`.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.square(x)
   *
   * Examples:
   *
   *    math.square(2);           // returns number 4
   *    math.square(3);           // returns number 9
   *    math.pow(3, 2);           // returns number 9
   *    math.multiply(3, 3);      // returns number 9
   *
   *    math.square([1, 2, 3, 4]);  // returns Array [1, 4, 9, 16]
   *
   * See also:
   *
   *    multiply, cube, sqrt, pow
   *
   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix} x
   *            Number for which to calculate the square
   * @return {number | BigNumber | Fraction | Complex | Array | Matrix}
   *            Squared value
   */
  var square = typed('square', {
    'number': function (x) {
      return x * x;
    },

    'Complex': function (x) {
      return new type.Complex(
          x.re * x.re - x.im * x.im,
          x.re * x.im + x.im * x.re
      );
    },

    'BigNumber': function (x) {
      return x.times(x);
    },

    'Fraction': function (x) {
      return x.clone().mul(x);
    },

    'Array | Matrix': function (x) {
      // deep map collection, skip zeros since square(0) = 0
      return collection.deepMap(x, square, true);
    }
  });

  return square;
}

exports.name = 'square';
exports.factory = factory;
