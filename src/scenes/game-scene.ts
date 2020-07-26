import { Input } from 'phaser';
import { Block } from '../entities/blocks/block';
import { L } from '../entities/blocks/l';
import { getGameWidth } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  private initBlocks(): void {
    // const block = new Block(this, 50, 50);
    const LBlock = new L(this, getGameWidth(this) / 2, 50);
  }

  public create(): void {
    this.initBlocks();
  }

  public update(time: number, delta: number): void {}
}
