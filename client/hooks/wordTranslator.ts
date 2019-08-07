// @ts-ignore
import { WordResponse, RawData } from "./useWordApi.tsx";
export function translateToWordResponse(rawData: RawData): WordResponse {
  return {
    id: rawData.id,
    word: rawData.word,
    meaning: rawData.meaning,
    wordLanguageID: rawData.word_lang_id,
    meaningLanguageID: rawData.meaning_lang_id
  };
}
