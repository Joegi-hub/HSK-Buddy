/**
 * Represents an HSK word with its Hanzi, meaning, and example sentences.
 */
export interface HSKWord {
  /**
   * The Hanzi representation of the word.
   */
  hanzi: string;
  /**
   * The Pinyin representation of the word.
   */
  pinyin: string;
  /**
   * The meaning of the word.
   */
  meaning: string;
  /**
   * Example sentences using the word.
   */
  exampleSentences: string[];
}

/**
 * Asynchronously retrieves the meaning and example sentences of a given HSK word.
 *
 * @param hanzi The Hanzi representation of the word.
 * @returns A promise that resolves to an HSKWord object containing the meaning and example sentences.
 */
export async function getWordDetails(hanzi: string): Promise<HSKWord> {
  // TODO: Implement this by calling an API.

  return {
    hanzi: hanzi,
    pinyin: 'Example Pinyin',
    meaning: 'Example Meaning',
    exampleSentences: ['Example sentence 1', 'Example sentence 2'],
  };
}
