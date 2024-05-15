import { FontFamily, FontFamilyEnum } from '../constants';
import {
  DOMPurifyAllowedTag,
  TextAlign,
  TextAlignEnum,
} from '../constants/webConstants';
import { ColorSetName, RawColorSetItem } from './colorTypes';
import { Quadrant } from './positionTypes';
import { OrNull, OrUndefined } from './utilityTypes';

type DocBlock = {
  index: number;
  classList: string[];
  css: Record<string, string> | undefined;
  tagName: DOMPurifyAllowedTag;
  text: string;
};

type BlockIdSet = {
  start: string;
  end: string;
};

type BridgeAction<P> = {
  type: string;
  payload?: P;
};

type MarkRange = [{ start: number; length: number }];

type CommonHighlighterProps = {
  id: string;
  colorIndex: number;
  commentIds?: string[];
  tag?: string;
  text: string;
  blockIds?: BlockIdSet[];
};

type GlobalMark = {
  markupType: MarkupTypeEnum.GLOBAL | MarkupType;
  markupConfig?: MarkupConfig;
  text: string;
} & CommonHighlighterProps;

type LocalMark = {
  markupType: MarkupTypeEnum.LOCAL | MarkupType;
  range: MarkRange;
  text: string;
  dateCreated?: number;
} & CommonHighlighterProps;

type SearchMark = {
  markupType: MarkupTypeEnum.SEARCH | MarkupType;
  markupConfig?: MarkupConfig;
  text: string;
} & CommonHighlighterProps;

type Markup = LocalMark | GlobalMark | SearchMark;

type DecoratedMarkup = Markup & { markupStyles: RawColorSetItem };

type MarkupClass = {
  colorId: string;
  id: string;
  markupType: string;
};

type MarkupConfig = {
  acrossElements: boolean;
  allowPartials: boolean;
  caseSensitive: boolean;
  exactPhrase: boolean;
  ignorePunctuation: boolean;
  ignoreWhiteSpace: boolean;
  includeSynonyms: boolean;
  wholeWordsOnly: boolean;
};

type Palette = {
  id: string;
  colorSetIndex: number;
  colorSetName: ColorSetName;
  colorIndexes: number[];
  position: PalettePosition;
};

type PalettePosition = {
  orientation: 'row' | 'column';
  quadrant: Quadrant;
};

type ReadingOptions = {
  webViewBgColor: OrUndefined<string>;
  webViewFgColor: OrUndefined<string>;
  fontSize: OrNull<number>;
  fontFamily: FontFamily | FontFamilyEnum;
  mrkOpacity: number;
  textAlign: TextAlign | TextAlignEnum;
};

type ReadingOptionsSS = {
  ssFontFamily: FontFamily | FontFamilyEnum;
  ssFontSize: OrNull<number>;
  ssTextAlign: TextAlign | TextAlignEnum;
};

type ToolBarPosition = {
  invertedHorizontally: boolean;
  invertedVertically: boolean;
};

type SyncMarksPayload = {
  local: LocalMark[];
  global: GlobalMark[];
  search: SearchMark[];
};

type SearchQuery = {
  searchPhrase: string;
  searchConfig: MarkupConfig;
};

type WebViewStatus = 'notLoaded' | 'didLoad' | 'didMount';

enum MarkupConfigProp {
  acrossElements = 'Search across elements',
  allowPartials = 'Allow partials',
  caseSensitive = 'Case Sensitive',
  exactPhrase = 'Exact phrase',
  ignorePunctuation = 'Ignore punctuation',
  ignoreWhiteSpace = 'Ignore white space',
  includeSynonyms = 'Include synonyms',
  wholeWordsOnly = 'Whole words only',
}

enum MarkupUtility {
  GLOBAL_HIGHLIGHTING = 'Global Highlighter',
  LOCAL_HIGHLIGHTING = 'Local Highlighter',
}

enum MarkupTool {
  CLEAR_MARKUPS = 'Clear Markups',
  COPY_SELECTION = 'Copy Selection',
  FULL_SCREEN = 'Toggle Fullscreen',
  MARKUP_TOGGLE = 'Toggle Highlighting',
  RELOAD_WEBVIEW = 'Reload Webview',
}

enum MarkupTypeEnum {
  SEARCH = 'search',
  GLOBAL = 'global',
  LOCAL = 'local',
}

type MarkupType = `${MarkupTypeEnum}`;

export { MarkupConfigProp, MarkupTool, MarkupTypeEnum, MarkupUtility };

export type {
  BlockIdSet,
  BridgeAction,
  DecoratedMarkup,
  DocBlock,
  GlobalMark,
  LocalMark,
  MarkRange,
  Markup,
  MarkupClass,
  MarkupConfig,
  MarkupType,
  Palette,
  PalettePosition,
  ReadingOptions,
  ReadingOptionsSS,
  SearchQuery,
  SyncMarksPayload,
  ToolBarPosition,
  WebViewStatus,
};
