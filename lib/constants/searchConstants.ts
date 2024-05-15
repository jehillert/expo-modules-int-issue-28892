import { SearchOptions } from '@lib/types';

export const initialMarkConfig = {
  acrossElements: true,
  allowPartials: true,
  caseSensitive: false,
  exactPhrase: false,
  ignorePunctuation: false,
  ignoreWhiteSpace: false,
  includeSynonyms: false,
  wholeWordsOnly: false,
};

export const defSearchOptions: Required<SearchOptions> = {
  global: true,
  ignorePunctuation: false,
  ignoreWhiteSpace: false,
  includeSynonyms: false,
  matchCase: false,
  matchPrefix: false,
  matchSuffix: false,
  wholeWordsOnly: false,
};
