import { WordContent } from "../domain/wordContent";

describe("wordContent domain test", () => {
  it("has 2 argument", () => {
    const signifier = "I";
    const language = "English";
    let word = new WordContent(signifier, language);
    expect(word.means()).toEqual(signifier);
  });
});
