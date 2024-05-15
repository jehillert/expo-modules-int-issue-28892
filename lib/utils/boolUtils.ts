import {
  ContentVariant,
  DrawerId,
  Entity,
  EntityEnum,
  Markup,
  MarkupTool,
  MarkupType,
  MarkupTypeEnum,
  MarkupUtility,
  ShareType,
  SortOrder,
  UiVariant,
  WebSource,
  WebViewVariant,
} from '@lib/types';
import { ViewStyle } from 'react-native';
import { DrawerPosition } from 'react-native-gesture-handler';

type MTInputType = Markup | MarkupType | MarkupTypeEnum | undefined | null;

const getMarkType = (mark: MTInputType) => {
  if (mark === null || mark === undefined) {
    return false;
  }
  return typeof mark === 'object' && 'markupType' in mark
    ? mark.markupType
    : mark;
};

export const isLocal = (mark: MTInputType) => getMarkType(mark) === 'local';

export const isGlobal = (mark: MTInputType) => getMarkType(mark) === 'global';

export const isSearch = (mark: MTInputType) => getMarkType(mark) === 'search';

export const getDrawerRad = {
  obj: (position: 'left' | 'right'): ViewStyle =>
    position === 'left'
      ? {
          borderTopRightRadius: position === 'left' ? 16 : 0,
          borderBottomRightRadius: position === 'left' ? 16 : 0,
        }
      : {},

  css: (position: 'left' | 'right') =>
    position === 'left'
      ? `
        border-top-right-radius: ${position === 'left' ? `16px` : `0px`};
        border-bottom-right-radius: ${position === 'left' ? `16px` : `0px`};
      `
      : ``,
};

const getSortOrderBools = (sortOrder: SortOrder) => ({
  isAbc: sortOrder === 'abc',
  isBca: sortOrder === 'bca',
  isNewToOld: sortOrder === 'new-to-old',
  isOldToNew: sortOrder === 'old-to-new',
});

const getContentVariantBools = (
  contentVariant: ContentVariant | undefined,
) => ({
  isText: contentVariant === 'text',
  isImages: contentVariant === 'images',
  isCombined: contentVariant === 'combined',
});

const getDrawerIdBools = (drawerId: DrawerId) => ({
  isDirectoryLeft: drawerId === 'DirectoryLeft',
  isMarkupLeft: drawerId === 'MarkupLeft',
  isMarkupRight: drawerId === 'MarkupRight',
  isNotesLeft: drawerId === 'NotesLeft',
  isNotesRight: drawerId === 'NotesRight',
});

const getDrawerPositionBools = (drawerPosition: DrawerPosition) => ({
  isRight: drawerPosition === 'right',
  isLeft: drawerPosition === 'left',
});

const getMarkupTypeBools = (mark: MTInputType) => ({
  isLocal: isLocal(mark),
  isGlobal: isGlobal(mark),
  isSearch: isSearch(mark),
});

const getMarkupToolBools = (enabledTools: MarkupTool[]) => ({
  clearMarkupsEnabled: enabledTools.includes(MarkupTool.CLEAR_MARKUPS),
  copySelectionEnabled: enabledTools.includes(MarkupTool.COPY_SELECTION),
  fullScreenEnabled: enabledTools.includes(MarkupTool.FULL_SCREEN),
  markupsToggleEnabled: enabledTools.includes(MarkupTool.MARKUP_TOGGLE),
  reloadWebviewEnabled: enabledTools.includes(MarkupTool.RELOAD_WEBVIEW),
});

const getMarkupUtilityBools = (enabledUtilities: MarkupUtility[]) => ({
  globalEnabled: enabledUtilities.includes(MarkupUtility.GLOBAL_HIGHLIGHTING),
  localEnabled: enabledUtilities.includes(MarkupUtility.LOCAL_HIGHLIGHTING),
});

const getShareTypeBools = (shareType: ShareType | undefined) => ({
  isWeblink: shareType === 'weblink',
  isImage: shareType === 'image',
  isText: shareType === 'text',
  isUnknown: shareType === 'unknown',
});

const getWebSource = (webSource: WebSource) => ({
  isAsset: webSource === 'Asset',
  isLocalhost: webSource === 'Localhost',
  isRemote: webSource === 'Remote',
  isHighlighter: webSource === 'Highlighter',
});

const getWebViewBools = (variant: WebViewVariant) => {
  return {
    isProcessing: variant === 'Processing',
    isScreen: variant === 'Screen',
    isSearch: variant === 'Search',
  };
};

const getUiVariantBools = (uiVariant: UiVariant) => ({
  isModal: uiVariant === 'modal',
  isScreen: uiVariant === 'screen',
  isSidebar: uiVariant === 'sidebar',
});

export const idBools = (id: string | Entity = '') => ({
  isComment: id?.startsWith(EntityEnum.COMMENT),
  isDoc: id?.startsWith(EntityEnum.DOCUMENT),
  isGlobal: id?.startsWith(EntityEnum.GLOBAL_MARK),
  isLocalMark: id?.startsWith(EntityEnum.LOCAL_MARK),
  isIdea: id?.startsWith(EntityEnum.IDEA),
  isMark: id?.startsWith(EntityEnum.MARK),
  isNote: id?.startsWith(EntityEnum.NOTE),
  isProject: id?.startsWith(EntityEnum.PROJECT),
  isShare: id?.startsWith(EntityEnum.SHARE),
  isImageShare: id?.startsWith(EntityEnum.SHARE_IMAGE),
  isTextShare: id?.startsWith(EntityEnum.SHARE_TEXT),
  isUrl: id?.startsWith(EntityEnum.URL),
  isUser: id?.startsWith(EntityEnum.USER),
  isWeblink: id?.startsWith(EntityEnum.WEBLINK),
});

export const bools = {
  id: (value?: string) => idBools(value),
  contentVariant: (value: ContentVariant | undefined) =>
    getContentVariantBools(value),
  drawerId: (value: DrawerId) => getDrawerIdBools(value),
  drawerPosition: (value: DrawerPosition) => getDrawerPositionBools(value),
  markupTool: (value: MarkupTool[]) => getMarkupToolBools(value),
  markupType: (value: MTInputType) => getMarkupTypeBools(value),
  markupUtility: (value: MarkupUtility[]) => getMarkupUtilityBools(value),
  shareType: (value: ShareType | undefined) => getShareTypeBools(value),
  sortOrder: (value: SortOrder) => getSortOrderBools(value),
  uiVariant: (value: UiVariant) => getUiVariantBools(value),
  webSource: (value: WebSource) => getWebSource(value),
  webView: (value: WebViewVariant) => getWebViewBools(value),
};
