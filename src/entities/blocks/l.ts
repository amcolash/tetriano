import { BlockSize, Block } from './block';

export class L extends Block {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.addBlock(scene, this, x, y);
    this.addBlock(scene, this, x, y + 1 * BlockSize);
    this.addBlock(scene, this, x, y + 2 * BlockSize);
    this.addBlock(scene, this, x + 1 * BlockSize, y + 2 * BlockSize);
  }
}
