export interface BlockData {
  shape: number[][];
  dims: number;
  color: number;
}

export const L: BlockData = {
  shape: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  dims: 3,
  color: 0x00ff00,
};

export const J: BlockData = {
  shape: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  dims: 3,
  color: 0x00ff00,
};

export const O: BlockData = {
  shape: [
    [1, 1],
    [1, 1],
  ],
  dims: 2,
  color: 0x00ff00,
};

export const T: BlockData = {
  shape: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  dims: 3,
  color: 0x00ff00,
};

export const S: BlockData = {
  shape: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  dims: 3,
  color: 0x00ff00,
};

export const Z: BlockData = {
  shape: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  dims: 3,
  color: 0x00ff00,
};

export const I: BlockData = {
  shape: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  dims: 4,
  color: 0x00ff00,
};
