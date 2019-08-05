import { WordItem } from "../domain/wordItem";
import { WordContent } from "../domain/wordContent";

describe("wordItem test", () => {
  it("returns specified meaning", () => {
    const id = 10;
    const wordInEnglish = new WordContent("I", "English");
    const wordInTumbuka = new WordContent("Ni", "Tumbuka");
    let wordItem = new WordItem(id, [wordInEnglish, wordInTumbuka]);
    expect(wordItem).toBeDefined();
    // TODO
    // check mark
    // set mark
    // check mark
    // test meansIn
  });
});
