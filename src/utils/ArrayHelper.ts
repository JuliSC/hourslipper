export class ArrayHelper {
  public static getTotal(arr: number[]) {
    return arr.reduce((cur, next) => (cur += next));
  }
}
