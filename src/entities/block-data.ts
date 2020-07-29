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
  color: 0xef8201,
};

export const J: BlockData = {
  shape: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  dims: 3,
  color: 0x0100f1,
};

export const O: BlockData = {
  shape: [
    [1, 1],
    [1, 1],
  ],
  dims: 2,
  color: 0xf8e608,
};

export const T: BlockData = {
  shape: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  dims: 3,
  color: 0xa001f1,
};

export const S: BlockData = {
  shape: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  dims: 3,
  color: 0x02f102,
};

export const Z: BlockData = {
  shape: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  dims: 3,
  color: 0xf00001,
};

export const I: BlockData = {
  shape: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  dims: 4,
  color: 0x01f1f2,
};

export const Blocks: BlockData[] = [L, J, O, T, S, Z, I];
