import { BlockData } from './block-data';
import { numCols, numRows } from '../scenes/grid-scene';

export const BlockSize = 16;

const dropSpeed = 1000;
const rotateSpeed = 150;
const moveSpeed = 75;

export class Block extends Phaser.GameObjects.Graphics {
  private dropTimer: number = dropSpeed;
  private rotateTimer: number = rotateSpeed;
  private moveTimer: number = moveSpeed;
  private blockData: BlockData;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number, blockData: BlockData) {
    super(scene, { x, y });

    // There are better ways, but ehhh it is a small amount of data and this is the simplest
    this.blockData = JSON.parse(JSON.stringify(blockData));

    this.cursorKeys = scene.input.keyboard.createCursorKeys();

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.drawBlocks();
  }

  private drawBlocks(): void {
    this.clear();

    this.fillStyle(0x00ff00);
    this.lineStyle(1, 0x777777);
    this.blockData.shape.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col !== 0) this.fillRect(x * BlockSize, y * BlockSize, BlockSize, BlockSize);
        else this.strokeRect(x * BlockSize, y * BlockSize, BlockSize, BlockSize);
      });
    });
  }

  private moveHoriz(dir: number): void {
    const newPos = this.x + dir * BlockSize;
    if (newPos >= 0 && newPos + this.blockData.dims * BlockSize <= numCols * BlockSize) this.setX(newPos);
  }

  private rotate(): void {
    // Rotation code from: https://code.likeagirl.io/rotate-an-2d-matrix-90-degree-clockwise-without-create-another-array-49209ea8b6e6
    const matrix = JSON.parse(JSON.stringify(this.blockData.shape));
    const n = matrix.length;
    const x = Math.floor(n / 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
        const k = matrix[i][j];
        matrix[i][j] = matrix[y - j][i];
        matrix[y - j][i] = matrix[y - i][y - j];
        matrix[y - i][y - j] = matrix[j][y - i];
        matrix[j][y - i] = k;
      }
    }

    // TODO: Check intersections w/ grid
    this.blockData.shape = matrix;

    this.drawBlocks();
  }

  // TODO: Check intersections w/ grid
  public preUpdate(time: number, delta: number): void {
    this.moveTimer -= delta;
    if (this.moveTimer <= 0) {
      if (this.cursorKeys.left.isDown) this.moveHoriz(-1);
      if (this.cursorKeys.right.isDown) this.moveHoriz(1);
      this.moveTimer = moveSpeed;
    }

    this.rotateTimer -= delta;
    if (this.rotateTimer <= 0 && this.cursorKeys.up.isDown) {
      this.rotate();
      this.rotateTimer = rotateSpeed;
    }

    this.dropTimer -= delta;
    if (this.dropTimer <= 0 && this.y + this.blockData.dims * BlockSize < numRows * BlockSize) {
      this.setY(this.y + BlockSize);
      this.dropTimer = dropSpeed;
    }
  }
}
