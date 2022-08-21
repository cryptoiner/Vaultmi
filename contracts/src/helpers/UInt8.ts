import { Bool, Circuit, CircuitValue, Field, prop } from "snarkyjs";

function argToField(name: string, x: { value: Field } | number): Field {
  if (typeof x === 'number') {
    if (!Number.isInteger(x)) {
      throw new Error(`${name} expected integer argument. Got ${x}`);
    }
    return new Field(x);
  } else {
    return x.value;
  }
}

function numberToBits(n: number): Array<boolean> {
  const bits = [];
  for (let i = 7; i >= 0; i--) {
    bits.push(((n >> i) & 1) === 1);
  }
  return bits;
}

function bitsToNumber(bits: Bool[] | boolean[]): number {
  const xbits = bits.map(x => Number(Boolean(x)));
  const n = xbits.reduce((accumulator: number, currentValue: number) => accumulator << 1 | currentValue);
  return n;
}

export class UInt8 extends CircuitValue {
  @prop value: Field;

  static get zero(): UInt8 {
    return new UInt8(Field.zero);
  }

  constructor(value: Field) {
    super();
    this.value = value;
  }

  toString(): string {
    return this.value.toString();
  }

  toNumber(): number {
    return Number(this.value.toString());
  }

  toChar(): string {
    return String.fromCharCode(Number(this.value.toString()));
  }

  toBits(): boolean[] {
    const n = this.toNumber();
    return numberToBits(n);
  }

  static check(x: UInt8) {
    let actual = x.value.rangeCheckHelper(8);
    actual.assertEquals(x.value);
  }

  static MAXINT(): UInt8 {
    return new UInt8(Field.fromJSON(((1n << 8n) - 1n).toString()) as Field);
  }

  static fromNumber(x: number): UInt8 {
    return new UInt8(argToField('UInt8.fromNumber', x));
  }

  static fromBits(bits: Bool[] | boolean[]): UInt8 {
    return this.fromNumber(bitsToNumber(bits));
  }

  static NUM_BITS = 8;

  divMod(y: UInt8 | number): [UInt8, UInt8] {
    let x = this.value;
    let y_ = argToField('UInt8.div', y);

    if (this.value.isConstant() && y_.isConstant()) {
      let xn = BigInt(x.toString());
      let yn = BigInt(y_.toString());
      let q = xn / yn;
      let r = xn - q * yn;
      return [
        new UInt8(new Field(q.toString())),
        new UInt8(new Field(r.toString())),
      ];
    }

    y_ = y_.seal();

    let q = Circuit.witness(
      Field,
      () => new Field((BigInt(x.toString()) / BigInt(y_.toString())).toString())
    );

    q.rangeCheckHelper(UInt8.NUM_BITS).assertEquals(q);

    // TODO: Could be a bit more efficient
    let r = x.sub(q.mul(y_)).seal();
    r.rangeCheckHelper(UInt8.NUM_BITS).assertEquals(r);

    let r_ = new UInt8(r);
    let q_ = new UInt8(q);

    r_.assertLt(new UInt8(y_));

    return [q_, r_];
  }

  /** 
   * Integer division.
   *
   * `x.div(y)` returns the floor of `x / y`, that is, the greatest
   * `z` such that `x * y <= x`.
   *
   */
  div(y: UInt8 | number): UInt8 {
    return this.divMod(y)[0];
  }

  /**
   * Integer remainder.
   *
   * `x.mod(y)` returns the value `z` such that `0 <= z < y` and
   * `x - z` is divisble by `y`.
   */
  mod(y: UInt8 | number): UInt8 {
    return this.divMod(y)[1];
  }

  /**
   * Multiplication with overflow checking.
   */
  mul(y: UInt8 | number): UInt8 {
    let z = this.value.mul(argToField('UInt8.mul', y));
    z.rangeCheckHelper(UInt8.NUM_BITS).assertEquals(z);
    return new UInt8(z);
  }

  /**
   * Addition with overflow checking.
   */
  add(y: UInt8 | number): UInt8 {
    let z = this.value.add(argToField('UInt8.add', y));
    z.rangeCheckHelper(UInt8.NUM_BITS).assertEquals(z);
    return new UInt8(z);
  }

  /**
   * Subtraction with underflow checking.
   */
  sub(y: UInt8 | number): UInt8 {
    let z = this.value.sub(argToField('UInt8.sub', y));
    z.rangeCheckHelper(UInt8.NUM_BITS).assertEquals(z);
    return new UInt8(z);
  }

  lte(y: UInt8): Bool {
    let xMinusY = this.value.sub(argToField('UInt8.lte', y)).seal();
    let xMinusYFits = xMinusY.rangeCheckHelper(UInt8.NUM_BITS).equals(xMinusY);
    let yMinusXFits = xMinusY
      .rangeCheckHelper(UInt8.NUM_BITS)
      .equals(xMinusY.neg());
    xMinusYFits.or(yMinusXFits).assertEquals(true);
    // x <= y if y - x fits in 64 bits
    return yMinusXFits;
  }

  assertLte(y: UInt8) {
    let yMinusX = argToField('UInt8.lt', y).sub(this.value).seal();
    yMinusX.rangeCheckHelper(UInt8.NUM_BITS).assertEquals(yMinusX);
  }

  lt(y: UInt8): Bool {
    return this.lte(y).and(this.value.equals(y.value).not());
  }

  assertLt(y: UInt8) {
    this.lt(y).assertEquals(true);
  }

  gt(y: UInt8): Bool {
    return y.lt(this);
  }

  assertGt(y: UInt8) {
    y.assertLt(this);
  }
}