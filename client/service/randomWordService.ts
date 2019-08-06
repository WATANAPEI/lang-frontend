// @ts-ignore
import useWordApi from "../hooks/useWordApi.tsx";
import { WordItem } from "../domain/wordItem";

export interface RandomWordService {
  next: () => WordItem;
  prev: () => WordItem;
  prepareNextWord: () => void;
}
