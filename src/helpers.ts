import * as Phaser from 'phaser';
import { BlockSize } from './entities/blocks/block';

export const DEBUG = true;
export const DEBUG_GRAPHICS = true;

export function getGameWidth(scene: Phaser.Scene): number {
  return scene.game.scale.width;
}

export function getGameHeight(scene: Phaser.Scene): number {
  return scene.game.scale.height;
}
