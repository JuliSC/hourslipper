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
}
