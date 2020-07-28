const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.scene.run('Grid');
    this.scene.moveAbove('Game', 'Grid');
  }

  public update(time: number, delta: number): void {}
}
