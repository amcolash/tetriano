import * as Phaser from 'phaser';

export const DEBUG = true;
export const DEBUG_GRAPHICS = true;

export function getGameWidth(scene: Phaser.Scene): number {
  return scene.game.scale.width;
}

export function getGameHeight(scene: Phaser.Scene): number {
  return scene.game.scale.height;
}
