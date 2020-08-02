export interface BlockData {
  shape: number[][];
  dims: number;
  color: number;
  id: string;
}

export const L: BlockData = {
  shape: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  dims: 3,
  color: 0xef8201,
  id: 'L',
};

export const J: BlockData = {
  shape: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  dims: 3,
  color: 0x0100f1,
  id: 'J',
};

export const O: BlockData = {
  shape: [
    [1, 1],
    [1, 1],
  ],
  dims: 2,
  color: 0xf8e608,
  id: 'O',
};

export const T: BlockData = {
  shape: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  dims: 3,
  color: 0xa001f1,
  id: 'T',
};

export const S: BlockData = {
  shape: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  dims: 3,
  color: 0x02f102,
  id: 'S',
};

export const Z: BlockData = {
  shape: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  dims: 3,
  color: 0xf00001,
  id: 'Z',
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
  id: 'I',
};

export const Blocks: BlockData[] = [L, J, O, T, S, Z, I];
