export class NumberHelper {
  public static ensureMinMax(value: number, min: number, max: number) {
    if (min <= value && value <= max) {
      return value;
    } else if (max < value) {
      return max;
    } else {
      return min;
    }
  }

  public static round(value: number, step: number) {
    step || (step = 1.0);
    const inv: number = 1.0 / step;
    return Math.round(value * inv) / inv;
  }
}
