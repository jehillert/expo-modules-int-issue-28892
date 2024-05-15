export type SearchOptions = {
  global?: boolean;
  ignorePunctuation?: boolean;
  ignoreWhiteSpace?: boolean;
  includeSynonyms?: boolean;
  matchCase?: boolean;
  matchPrefix?: boolean;
  matchSuffix?: boolean;
  wholeWordsOnly?: boolean;
};

export enum SearchOptionsProp {
  acrossElements = 'Search across elements',
  allowPartials = 'Allow partials',
  caseSensitive = 'Case Sensitive',
  exactPhrase = 'Exact phrase',
  ignorePunctuation = 'Ignore punctuation',
  ignoreWhiteSpace = 'Ignore white space',
  includeSynonyms = 'Include synonyms',
  wholeWordsOnly = 'Whole words only',
}
