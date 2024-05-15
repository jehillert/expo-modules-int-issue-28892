import { OrNull } from '@lib/types';
import synonyms from 'synonyms';

const isLetter = (c: string) => c.toLowerCase() !== c.toUpperCase();

const getSynonyms = (term: string) => {
  const synonymSets = synonyms(term);
  const synonymsWithDuplicates =
    typeof synonymSets === 'object'
      ? Object?.values(synonymSets)?.reduce((accum, set) => {
          return [...accum, ...set];
        }, [])
      : [];
  const synonymSet = new Set(synonymsWithDuplicates);
  return Array.from(synonymSet).sort();
};

const countWords = (str: string) => {
  if (str === null || str.length === 0) return 0;
  let wordCount = 0;
  let isWord = false;
  let endOfLine = str.length - 1;
  let ch = str.split('');

  for (let i = 0; i < ch.length; i++) {
    if (isLetter(ch[i]) && i !== endOfLine) isWord = true;
    else if (!isLetter(ch[i]) && isWord) {
      wordCount++;
      isWord = false;
    } else if (isLetter(ch[i]) && i === endOfLine) wordCount++;
  }

  return wordCount;
};

const deQuoteText = (text: OrNull<string>) => {
  if (!text) return text;
  const hasOnlyOutsideQuotes =
    text.match(/\"/g)?.length === 2 &&
    text[0] === '"' &&
    text[text.length - 1] === '"';
  return hasOnlyOutsideQuotes
    ? text.replace(/(?<=^)(\")|(\")(?=$)/g, '')
    : text;
};

const isNotAlphaNum = (str: string) => /[^a-z0-9]/gi.test(str[str.length - 1]);

/**
 * @method toSnakeCase
 * @param {string} inputString Text string to convert to title case.
 * @description Converts to snake case (i.e., 'aA' and 'a_a' ==> 'a_b')
 * @example
 * const string1 = `havnt Seen nothing`;
 * const string2 = `@%^SeenNothi**ng`;
 * const string3 = `aCamel'sCaseIsAHardOneToMake`;
 *
 * example.log(toSnakeCase(string1));
 * example.log(toSnakeCase(string2));
 * example.log(toSnakeCase(string3));
 */
const toSnakeCase = (inputString: string) =>
  inputString
    .trim()
    .replace(/\s/g, '_')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9_ :]/g, '')
    .toLowerCase();

/**
 * @method toSnakeCase
 * @param {string} inputString Text string to convert to title case.
 * @description Converts to snake case (i.e., 'aA' and 'a_a' ==> 'a_b')
 * @example
 * const string1 = `havnt Seen nothing`;
 * const string2 = `@%^SeenNothi**ng`;
 * const string3 = `aCamel'sCaseIsAHardOneToMake`;
 *
 * example.log(toSnakeCase(string1));
 * example.log(toSnakeCase(string2));
 * example.log(toSnakeCase(string3));
 */
const toKebabCase = (inputString: string) =>
  inputString
    .trim()
    .replace(/\s/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9\- :]/g, '')
    .toLowerCase();

/**
 * @method toTitleCase
 * @param {string} inputString Text string to convert to title case.
 * @description Converts camel case, pascal case, snake case, and screaming snake case to title case.
 * @example
 * const string1 = `CatsDogsMoreDogs`;
 * const string2 = `catsDogsMoreDogs`;
 * const string3 = `cats_Dogs_More_Dogs`
 * const string4 = `CATS_DOGS_MORE_DOGS`
 *
 * example.log(toTitleCase(string1)); // --> "Cats Dogs More Dogs"
 * example.log(toTitleCase(string2)); // --> "Cats Dogs More Dogs"
 * example.log(toTitleCase(string3)); // --> "Cats Dogs More Dogs"
 * example.log(toTitleCase(string4)); // --> "Cats Dogs More Dogs"
 */
const toTitleCase = (inputString: string) =>
  inputString
    .trim()
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/\w\S*/g, function (t) {
      return t.charAt(0).toUpperCase() + t.substring(1).toLowerCase();
    });

export {
  countWords,
  deQuoteText,
  getSynonyms,
  isNotAlphaNum,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
};
