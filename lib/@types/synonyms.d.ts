declare module 'synonyms' {
  type SKey = 'v' | 'a' | 'n' | 'r' | 's';
  function synonyms(word: string): Record<SKey, string[]>;
  function synonyms(word: string, type?: SKey): string[];
  export default synonyms;
}
