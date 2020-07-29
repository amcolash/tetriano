export const DEBUG = true;
export const DEBUG_GRAPHICS = false;

export const blockSize = 22;

export const numCols = 10;
export const numRows = 40;

export function getGameWidth(scene: Phaser.Scene): number {
  return scene.game.scale.width;
}

export function getGameHeight(scene: Phaser.Scene): number {
  return scene.game.scale.height;
}

export function snapToGrid(value: number): number {
  const closest = Math.floor(value / blockSize);
  return closest * blockSize;
}
