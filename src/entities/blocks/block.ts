import { getGameWidth } from '../../helpers';

export const BlockSize = 15;
export const speed = 100;

export class Block extends Phaser.GameObjects.Polygon {
  private moveTimer: number = speed;
  private direction: number = 1;
  private squares: Phaser.GameObjects.Rectangle[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number, color?: number) {
    super(scene, x, y, [0, 0, 0, BlockSize, BlockSize, BlockSize, BlockSize, 0], color || 0xff0000);

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);
  }

  public preUpdate(time: number, delta: number): void {
    this.moveTimer -= delta;
    if (this.moveTimer <= 0) {
      if (this.x < BlockSize * 4 || this.x > getGameWidth(this.scene) - BlockSize * 4) this.direction *= -1;
      this.setX(this.x + BlockSize * this.direction);
      this.squares.forEach((s) => s.setX(s.x + BlockSize * this.direction));
      this.moveTimer = speed;
    }
  }

  protected addBlock(scene: Phaser.Scene, group: Phaser.GameObjects.Shape, x: number, y: number): void {
    const block = scene.add.rectangle(x, y, BlockSize, BlockSize, 0x00ff00);
    this.squares.push(block);
  }
}
