import { BlockSize, Block } from '../entities/block';
import { getGameWidth } from '../helpers';
import { L } from '../entities/block-data';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Grid',
};

export const numCols = 10;
export const numRows = 40;

const width = BlockSize * numCols;
const height = BlockSize * numRows;

const gridColor = 0x222222;

export class GridScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  private initCamera(): void {
    // this.cameras.main.
    // this.cameras.main.setBounds(0, 0, width, height);
    this.cameras.main.setViewport(getGameWidth(this) / 2, 100, width, height);
  }

  private addGrid(): void {
    this.add.grid(width / 2, height / 2, width, height, BlockSize, BlockSize, 0, 0, gridColor);
    const graphics = this.add.graphics({ lineStyle: { color: gridColor, width: 2 } });
    graphics.strokeRect(0, 0, width, height);
  }

  public create(): void {
    this.initCamera();

    this.add.rectangle(0, 0, 2000, 2000, 0x0000ff, 0.25);
    this.addGrid();

    new Block(this, 0, 0, L);
    new Block(this, BlockSize * 7, BlockSize * 5, L);
  }
}
