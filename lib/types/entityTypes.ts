import { nanoid } from '@reduxjs/toolkit';

type LowerCaseIdString<Str extends string> = `${Lowercase<Str>}`;

type EntityIdTail = LowerCaseIdString<string>;

export enum EntityEnum {
  COMMENT = 'comment',
  DOCUMENT = 'document',
  GLOBAL_MARK = 'mark-global',
  LOCAL_MARK = 'mark-local',
  SEARCH_MARK = 'mark-search',
  IDEA = 'idea',
  MARK = 'mark',
  NOTE = 'note',
  PROJECT = 'project',
  SHARE = 'share',
  SHARE_IMAGE = 'share-image',
  SHARE_TEXT = 'share-text',
  URL = 'url',
  USER = 'user',
  WEBLINK = 'weblink',
}

export type Entity = `${EntityEnum}`;
export type EntityId = `${EntityEnum}-${EntityIdTail}`;
export type CommentId = `${EntityEnum.COMMENT}-${EntityIdTail}`;
export type DocumentId = `${EntityEnum.DOCUMENT}-${EntityIdTail}`;
export type IdeaId = `${EntityEnum.IDEA}-${EntityIdTail}`;
export type MarkId = `${EntityEnum.MARK}-${EntityIdTail}`;
export type GlobalMarkId = `${EntityEnum.GLOBAL_MARK}-${EntityIdTail}`;
export type LocalMarkId = `${EntityEnum.LOCAL_MARK}-${EntityIdTail}`;
export type NoteId = `${EntityEnum.NOTE}-${EntityIdTail}`;
export type ProjectId = `${EntityEnum.PROJECT}-${EntityIdTail}`;
export type SearchMarkId = `${EntityEnum.SEARCH_MARK}-${EntityIdTail}`;
export type ShareId = `${EntityEnum.SHARE}-${EntityIdTail}`;
export type ShareImageId = `${EntityEnum.SHARE_IMAGE}-${EntityIdTail}`;
export type ShareTextId = `${EntityEnum.SHARE_TEXT}-${EntityIdTail}`;
export type WeblinkId = `${EntityEnum.WEBLINK}-${EntityIdTail}`;
export type UrlId = `${EntityEnum.URL}-${EntityIdTail}`;
export type UserId = `${EntityEnum.USER}-${EntityIdTail}`;
/**
 * mini project
 *
 * ASSUME
 * Project
 *  - entityAId[]
 *  - entityBId[]
 *  - entityCId[]
 * Or any project with a lot of entities that need 2B distinguished from each other
 * and inevitably sorted into different results.
 *
 * try to come up with a type that is
 * `${prefix}-${number date as string}
 *
 * Under the hood, it is used to provide a selector
 * generated wby createEntityAdapter: isMyEntity
 * - they are unique.
 * - entity IDs themselves are type safe from one another
 * - entity ids are the convenient from b/c they are
 * primitives, and can follow the entity-ID-as-sole-prop
 * pattern
 * - they are time sortable
 *
 * Under the hood also a hook, that knows all entities from different slices,
 * and returns memoized ID arrays:
 *
 * type SortAs = 'ascending' | 'descending' | 'unfixed'
 *
 * type SortEntitySchema = {
 *  prefix: EntityPrefixEnum,
 *  sortAs: SortAs
 *  children: SortEntitySchema[]
 * }
 *
 * // If just a schema with no children.
 * type MemoizedSortedIdList
 * type UseSortedEntityIdsReturnType = MemoizedSortedIdList[]
 * useSortedEntityIds(sortEntitySchema: SortEntitySchema)
 *
 * Also it can take an array of nested entities, where sets of entity ids are part of other entities.
 * As a convenience function for nested mapping in a single react component.
 *
 * useSortedEntityIds(prefix: EntityPrefixEnum, sortAs: SortAs, )
 * useSortedEntityIds(['myEntity1', ])
 *
 */
const getEntityId = () => {
  const tail = nanoid().toLowerCase();
  return {
    [EntityEnum.COMMENT]: (prefix: Entity) => `${prefix}-${tail}` as CommentId,
    [EntityEnum.USER]: (prefix: Entity) => `${prefix}-${tail}` as UserId,
    [EntityEnum.DOCUMENT]: (prefix: Entity) =>
      `${prefix}-${tail}` as DocumentId,
    [EntityEnum.IDEA]: (prefix: Entity) => `${prefix}-${tail}` as IdeaId,
    [EntityEnum.MARK]: (prefix: Entity) => `${prefix}-${tail}` as MarkId,
    [EntityEnum.NOTE]: (prefix: Entity) => `${prefix}-${tail}` as NoteId,
    [EntityEnum.PROJECT]: (prefix: Entity) => `${prefix}-${tail}` as ProjectId,
    [EntityEnum.SHARE]: (prefix: Entity) => `${prefix}-${tail}` as ShareId,
    [EntityEnum.SHARE_IMAGE]: (prefix: Entity) =>
      `${prefix}-${tail}` as ShareImageId,
    [EntityEnum.SHARE_TEXT]: (prefix: Entity) =>
      `${prefix}-${tail}` as ShareTextId,
    [EntityEnum.WEBLINK]: (prefix: Entity) => `${prefix}-${tail}` as WeblinkId,
    [EntityEnum.LOCAL_MARK]: (prefix: Entity) =>
      `${prefix}-${tail}` as WeblinkId,
    [EntityEnum.GLOBAL_MARK]: (prefix: Entity) =>
      `${prefix}-${tail}` as WeblinkId,
    [EntityEnum.URL]: (prefix: Entity) => `${prefix}-${tail}` as UrlId,
  };
};

export const getCommentId = getEntityId().comment(EntityEnum.COMMENT);

export type CommentPayload = {
  id: string;
  parentId: string;
  text: string;
};

export type Comment = {
  id: string;
  parentId: string;
  text: string;
  dateCreated?: number;
};

export type Doc = {
  commentIds?: string[];
  dateCreated: number;
  dateUpdated?: number;
  isProcessed: boolean;
  markIds: DocMarkIds;
  projectId: string;
  source?: string | DocPickerNeededResponseTypes;
  sourceType: DocSourceType;
  title: string;
  id: string;
  ui: {
    wrapTitle: boolean;
  };
};

export type DocFileType = 'docx' | 'pdf' | 'txt';

export type DocMarkIds = {
  local: string[];
  global: string[];
};

export type DocPickerNeededResponseTypes = Omit<
  DockPickerResponse,
  'fileCopyUri' | 'size'
>;

export type DockPickerResponse = {
  uri: string;
  name: string | null;
  copyError?: string;
  fileCopyUri: string | null;
  type: string | null;
  size: number | null;
};

export type DocSourceType = 'docx' | 'pdf' | 'txt' | 'weblink';

export type DocWSrcHtml = Doc & {
  sourceHtml?: string;
};

export type Idea = {
  id: string;
  text?: string;
  dateCreated: number;
  commentIds?: string[];
  shareIds?: string[];
};

export type ProcessedDoc = Doc & {
  processed: string;
};

export type SortOrder = 'old-to-new' | 'new-to-old' | 'abc' | 'bca';

export type ShareType = 'weblink' | 'image' | 'text' | 'unknown';
