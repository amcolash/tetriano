import { Block } from '../entities/block';
import { getGameWidth, getGameHeight, DEBUG_GRAPHICS, snapToGrid, numCols, numRows, blockSize } from '../helpers';
import { Blocks, L, O } from '../entities/block-data';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Grid',
};

export const width = blockSize * numCols;
export const height = blockSize * numRows;

const gridColor = 0x222222;

export class GridScene extends Phaser.Scene {
  public blocks: number[][];
  private graphics: Phaser.GameObjects.Graphics;

  constructor() {
    super(sceneConfig);

    this.blocks = new Array(numRows).fill(0);
    this.blocks.forEach((row, i) => (this.blocks[i] = new Array(numCols).fill(0)));

    // this.blocks[0][6] = 0xff0000;
    // this.blocks[0][7] = 0xff0000;
    // this.blocks[0][8] = 0xff0000;
    // this.blocks[0][9] = 0xff0000;
  }

  private initCamera(): void {
    // Add a bit of buffer to the camera so that lines are not clipped
    const buffer = 8;

    this.cameras.main.setBounds(-buffer / 2, -buffer / 2, width + buffer, height + buffer);

    const x = getGameWidth(this) / 2 - (buffer + width) / 2;
    const y = getGameHeight(this) / 2 - (buffer + height) / 2;
    this.cameras.main.setViewport(x, y, width + buffer, height + buffer);
  }

  private draw(): void {
    this.graphics.lineStyle(2, gridColor);
    this.graphics.strokeRect(0, 0, width, height);

    this.blocks.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col !== 0) {
          this.graphics.fillStyle(col);
          this.graphics.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        }
      });
    });
  }

  public create(): void {
    this.initCamera();

    if (DEBUG_GRAPHICS) this.add.rectangle(-100, -100, 2000, 2000, 0x0000ff, 0.25);

    this.graphics = this.add.graphics();
    this.add.grid(width / 2, height / 2, width, height, blockSize, blockSize, 0, 0, gridColor);

    this.draw();

    const blockType = Phaser.Math.RND.pick(Blocks);
    new Block(this, snapToGrid(width / 2 - (blockType.dims / 2) * blockSize), 0, blockType);
  }
}
