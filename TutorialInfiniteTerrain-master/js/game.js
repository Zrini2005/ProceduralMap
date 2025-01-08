var config = {
  type: Phaser.WEBGL,
  width: window.innerWidth-20,
  height: window.innerHeight-20,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    SceneMain
  ],
  pixelArt: true,
  roundPixels: true
};

var game = new Phaser.Game(config);
