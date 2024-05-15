type Coords = { x: number; y: number };

type Quadrant = 1 | 2 | 3 | 4;

type OffsetUnit = '%' | 'px';

type Position = 'relative' | 'absolute';

type PositioningProps = {
  quadrant: Quadrant;
  position: Position;
  offsetX: number;
  offsetY: number;
  zIndex?: number;
  elevation?: number;
  isElevated?: boolean;
};

export type { Coords, OffsetUnit, Position, PositioningProps, Quadrant };
