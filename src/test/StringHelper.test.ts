import { StringHelper } from "./../utils/StringHelper";

describe("Char counter", () => {
  it("cat should return {c: 1, a: 1, t: 1}", () => {
    // Arrange
    const str = "cat";

    // Act
    const charCounter = StringHelper.countChars(str);

    // Assert
    expect(charCounter).toEqual({ c: 1, a: 1, t: 1 });
  });

  // What about other words?
  it("dog should return {d: 1, o: 1, g: 1}", () => {
    // Arrange
    const str = "dog";

    // Act
    const charCounter = StringHelper.countChars(str);

    // Assert
    expect(charCounter).toEqual({ d: 1, o: 1, g: 1 });
  });

  // What about upper and lower case?
  it("DoG should return {d: 1, o: 1, g: 1}", () => {
    // Arrange
    const str = "DoG";

    // Act
    const charCounter = StringHelper.countChars(str);

    // Assert
    expect(charCounter).toEqual({ d: 1, o: 1, g: 1 });
  });

  // What about words of a different length?
  it("Horse should return {h: 1, o: 1, r: 1, s: 1, e: 1}", () => {
    // Arrange
    const str = "Horse";

    // Act
    const charCounter = StringHelper.countChars(str);

    // Assert
    expect(charCounter).toEqual({ h: 1, o: 1, r: 1, s: 1, e: 1 });
  });

  // What about words with recurring chars?
  it("Bunny should return {b: 1, u: 1, n: 2, y: 1}", () => {
    // Arrange
    const str = "Bunny";

    // Act
    const charCounter = StringHelper.countChars(str);

    // Assert
    expect(charCounter).toEqual({ b: 1, u: 1, n: 2, y: 1 });
  });

  // But does it actually work?
  it("Supercalifragilisticexpialidocious should return {s: 3, u: 2, p: 2, e: 2, r: 2, c: 3, a: 3, l: 3, i: 7, f: 1, g: 1, t: 1, x: 1, d: 1, o: 2}", () => {
    // Arrange
    const str = "Supercalifragilisticexpialidocious";

    // Act
    const charCounter = StringHelper.countChars(str);

    // Assert
    expect(charCounter).toEqual({
      s: 3,
      u: 2,
      p: 2,
      e: 2,
      r: 2,
      c: 3,
      a: 3,
      l: 3,
      i: 7,
      f: 1,
      g: 1,
      t: 1,
      x: 1,
      d: 1,
      o: 2,
    });
  });
});

describe("Are anagrams", () => {
  it("dog and god should return true", () => {
    // Arrange
    const str1 = "dog";
    const str2 = "god";
    // Act
    const areAnagrams = StringHelper.areAnagrams(str1, str2);

    // Assert
    expect(areAnagrams).toEqual(true);
  });

  // What if it isn't true?
  it("dog and boat should not return true", () => {
    // Arrange
    const str1 = "dog";
    const str2 = "boat";
    // Act
    const areAnagrams = StringHelper.areAnagrams(str1, str2);

    // Assert
    expect(areAnagrams).toEqual(false);
  });

  // What about capital letters?
  it("DoG and gOd should return true", () => {
    // Arrange
    const str1 = "DoG";
    const str2 = "gOd";
    // Act
    const areAnagrams = StringHelper.areAnagrams(str1, str2);

    // Assert
    expect(areAnagrams).toEqual(true);
  });

  // What about other words that are anagrams?
  it("DoG and gOd should return true", () => {
    // Arrange
    const str1 = "pool";
    const str2 = "loop";
    // Act
    const areAnagrams = StringHelper.areAnagrams(str1, str2);

    // Assert
    expect(areAnagrams).toEqual(true);
  });
});
