export class StringHelper {
  public static capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public static countChars(str: string) {
    const charCountObj: { [key: string]: number } = {};

    [...str].forEach(char => {
      !charCountObj[char.toLowerCase()]
        ? (charCountObj[char.toLowerCase()] = 1)
        : charCountObj[char.toLowerCase()]++;
    });

    return charCountObj;
  }

  public static areAnagrams(str1: string, str2: string) {
    return [...str1.toLowerCase()].reverse().join("") === str2.toLowerCase();
  }
}
