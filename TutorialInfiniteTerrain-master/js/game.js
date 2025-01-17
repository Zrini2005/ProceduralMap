import { DomainMap } from "./DomainMap.js";

var config = {
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "white",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    // SceneMain
    DomainMap
  ],
  pixelArt: true,
  roundPixels: true
};

var game = new Phaser.Game(config);
