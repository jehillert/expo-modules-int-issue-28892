export type RequestStatus = 'idle' | 'pending' | 'succeeded' | 'failed';

export type WebSource = 'Highlighter' | 'Asset' | 'Localhost' | 'Remote';

export type ApiHost = 'Localhost' | 'Heroku';

export type ReadabilityResponse = {
  /** article title */
  title: string;

  /** HTML string of processed article content */
  content: string;

  /** text content of the article, with all the HTML tags removed */
  textContent: string;

  /** length of an article, in characters */
  length: number;

  /** article description, or short excerpt from the content */
  excerpt: string;

  /** author metadata */
  byline: string;

  /** content direction */
  dir: string;

  /** name of the site */
  siteName: string;

  /** content language */
  lang: string;
};
