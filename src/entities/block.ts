import { BlockData } from './block-data';
import { blockSize } from '../helpers';
import { GridScene } from '../scenes/grid-scene';

const dropSpeed = 1000;
const rotateSpeed = 150;
const moveSpeed = 125;

export class Block extends Phaser.GameObjects.Graphics {
  private dropTimer: number = dropSpeed;
  private rotateTimer: number = rotateSpeed;
  private moveTimer: number = moveSpeed;

  private blockData: BlockData;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private gridScene: GridScene;

  constructor(scene: Phaser.Scene, x: number, y: number, blockData: BlockData) {
    super(scene, { x, y });
    this.gridScene = this.scene as GridScene;

    // There are better ways, but ehhh it is a small amount of data and this is the simplest
    this.blockData = JSON.parse(JSON.stringify(blockData));

    if (this.positionBlocked(this.x / blockSize, this.y / blockSize)) {
      this.destroyBlock(true);
      this.gridScene.gameOver();
    }

    this.cursorKeys = this.gridScene.cursorKeys;
    this.cursorKeys.space.once('down', () => this.dropBlock());

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.drawBlocks();
  }

  private drawBlocks(): void {
    this.clear();

    this.fillStyle(this.blockData.color);
    this.lineStyle(1, 0x777777);
    this.blockData.shape.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col !== 0) this.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        else this.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
      });
    });
  }

  private positionBlocked(x: number, y: number, shape: number[][] = this.blockData.shape): boolean {
    const blocks = this.gridScene.blocks;

    let blocked = false;
    shape.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        // If we are out of bounds, we are blocked
        const inBounds = blocks[y + rowIndex] !== undefined && blocks[y + rowIndex][x + colIndex] !== undefined;

        // Ignore empty blocks even if they are outside the array bounds
        if (!inBounds && col === 0) return;

        // If the current block is filled and the grid at the place is filled, this spot is blocked
        if (!inBounds || (col !== 0 && blocks[y + rowIndex][x + colIndex] !== 0)) blocked = true;
      });
    });

    return blocked;
  }

  private destroyBlock(gameOver?: boolean): void {
    if (!gameOver) {
      const blocks = this.gridScene.blocks;

      const x = this.x / blockSize;
      const y = this.y / blockSize;
      const color = this.blockData.color;

      this.blockData.shape.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          if (col !== 0) blocks[y + rowIndex][x + colIndex] = color;
        });
      });

      this.gridScene.updateBlocks();
      this.gridScene.spawnBlock();
    }

    this.destroy();
  }

  private dropBlock(): void {
    // if (this.moveTimer > 0) return;

    while (!this.positionBlocked(this.x / blockSize, this.y / blockSize + 1)) {
      this.setY(this.y + blockSize);
    }

    this.destroyBlock();
  }

  private moveHoriz(dir: number): void {
    const newPos = this.x + dir * blockSize;

    if (!this.positionBlocked(newPos / blockSize, this.y / blockSize)) this.setX(newPos);
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

    if (!this.positionBlocked(this.x / blockSize, this.y / blockSize, matrix)) {
      this.blockData.shape = matrix;
      this.drawBlocks();
    }
  }

  public preUpdate(time: number, delta: number): void {
    this.moveTimer -= delta;
    if (this.moveTimer <= 0) {
      this.moveTimer = moveSpeed;
      if (this.cursorKeys.left.isDown) this.moveHoriz(-1);
      if (this.cursorKeys.right.isDown) this.moveHoriz(1);
    }

    this.rotateTimer -= delta;
    if (this.rotateTimer <= 0 && this.cursorKeys.up.isDown) {
      this.rotate();
      this.rotateTimer = rotateSpeed;
    }

    this.dropTimer -= delta;
    if (this.cursorKeys.down.isDown) this.dropTimer -= delta * 8;

    if (this.dropTimer <= 0) {
      if (this.positionBlocked(this.x / blockSize, this.y / blockSize + 1)) {
        this.destroyBlock();
      } else {
        this.setY(this.y + blockSize);
      }
      this.dropTimer = dropSpeed;
    }
  }
}
