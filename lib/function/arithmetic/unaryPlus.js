'use strict';

function factory (type, config, load, typed) {
  var collection = load(require('../../type/matrix/collection'));

  /**
   * Unary plus operation.
   * Boolean values and strings will be converted to a number, numeric values will be returned as is.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.unaryPlus(x)
   *
   * Examples:
   *
   *    math.unaryPlus(3.5);      // returns 3.5
   *    math.unaryPlus(1);     // returns 1
   *
   * See also:
   *
   *    unaryMinus, add, subtract
   *
   * @param  {number | BigNumber | Fraction | string | Complex | Unit | Array | Matrix} x
   *            Input value
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}
   *            Returns the input value when numeric, converts to a number when input is non-numeric.
   */
  var unaryPlus = typed('unaryPlus', {
    'number': function (x) {
      return x;
    },

    'Complex': function (x) {
      return x.clone();
    },

    'BigNumber': function (x) {
      return x; // bignumbers are immutable
    },

    'Fraction': function (x) {
      return x; // fractions are immutable
    },

    'Unit': function (x) {
      return x.clone();
    },

    'Array | Matrix': function (x) {
      // deep map collection, skip zeros since unaryPlus(0) = 0
      return collection.deepMap(x, unaryPlus, true);
    },

    'boolean | string | null': function (x) {
      // convert to a number or bignumber
      return (config.number == 'bignumber') ? new type.BigNumber(+x): +x;
    }
  });

  return unaryPlus;
}

exports.name = 'unaryPlus';
exports.factory = factory;
