// @ts-ignore
import { WordResponse, RawData } from "./useWordApi.tsx";

interface ReturnJson {
  status: string;
  message: string;
  data: RawData[];
}

interface RawData {
  id: number;
  word: string;
  meaning: string;
  word_lang_id: number;
  meaning_lang_id: number;
  created_by: string;
  last_updated_by: string;
  created_at: string;
  updated_at: string;
}

export async function translateToWordResponse(response: Response): Promise<WordResponse> {
  const json: ReturnJson = await response.json();
  console.log(`json: ${JSON.stringify(json)}`);
  const data: RawData[] = json.data;
  console.log(`data: ${JSON.stringify(data)}`);
  return Promise.resolve({
    id: data[0].id,
    word: data[0].word,
    meaning: data[0].meaning,
    wordLanguageID: data[0].word_lang_id,
    meaningLanguageID: data[0].meaning_lang_id
  });
}

export async function translateToWordsResponse(response: Response): Promise<WordResponse[]> {
  const json: ReturnJson = await response.json();
  console.log(`json: ${JSON.stringify(json)}`);
  const data: RawData[] = json.data;
  console.log(`data: ${JSON.stringify(data)}`);
  let words: WordResponse[] = [];
  for (const e of data) {
    words.push({
      id: e.id,
      word: e.word,
      meaning: e.meaning,
      wordLanguageID: e.word_lang_id,
      meaningLanguageID: e.meaning_lang_id
    });
  }
  return Promise.resolve(words);
}
