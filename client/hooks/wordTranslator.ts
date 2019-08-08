// @ts-ignore
import { WordResponse, RawData } from "./useWordApi.tsx";

interface ReturnJson {
  status: string;
  message: string;
  data: RawData;
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

export async function translateToWordResponse(response: Response): WordResponse {
  const json: ReturnJson = await response.json();
  console.log(`json: ${JSON.stringify(json)}`);
  const data: RawData = json.data;
  console.log(`data: ${JSON.stringify(data)}`);
  return {
    id: data.id,
    word: data.word,
    meaning: data.meaning,
    wordLanguageID: data.word_lang_id,
    meaningLanguageID: data.meaning_lang_id
  };
}
