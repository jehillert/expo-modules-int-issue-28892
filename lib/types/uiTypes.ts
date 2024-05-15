export enum DrawerIdEnum {
  DIRECTORY_LEFT = 'DirectoryLeft',
  MARKUP_RIGHT = 'MarkupRight',
  MARKUP_LEFT = 'MarkupLeft',
  NOTES_RIGHT = 'NotesRight',
  NOTES_LEFT = 'NotesLeft',
}

export type AnimatedProps = Partial<{
  fontSize?: number;
  opacity?: number;
  color?: string;
  backgroundColor?: string;
}>;

export type DrawerId = `${DrawerIdEnum}`;

export type UiVariant = 'screen' | 'sidebar' | 'modal' | undefined;

export type ContentVariant = 'text' | 'images' | 'combined';
