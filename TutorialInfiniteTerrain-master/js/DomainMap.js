import "./voronoi-helper/polygons.js"
import { map, points } from "./voronoi-helper/polygons.js";

export class DomainMap extends Phaser.Scene {
  constructor() {
    super({ key: "DomainMap" });
  }

  preload() {
    this.load.spritesheet('adventurer', 'TutorialInfiniteTerrain-master/content/adventurer.webp', {
      frameWidth: 256, // Width of a single frame
      frameHeight: 256, // Height of a single frame
    });
    this.load.image("sprSand", "TutorialInfiniteTerrain-master/content/sprSand.png");
  }

  create() {
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('adventurer', { start: 0, end: 15, first: 0 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('adventurer', { start: 16, end: 31 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('adventurer', { start: 32, end: 47 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('adventurer', { start: 64, end: 79 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('adventurer', { start: 48, end: 63 }),
      frameRate: 20,
      repeat: -1,
    });

    this.cameraSpeed = 10;
    this.mapSize = 3000;
    this.cameras.main.setZoom(2);
    this.followPoint = new Phaser.Math.Vector2(
      this.mapSize / 2,
      this.mapSize / 2
    );

    // this.chunks = [];

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    const middleChunkX = Math.floor(this.mapSize / 2);
    const middleChunkY = Math.floor(this.mapSize / 2);

    // this.player = this.add.sprite(middleChunkX, middleChunkY, 'adventurer');
    this.player = this.add.sprite(400, 300, 'adventurer');
    // this.player.setPosition(1, 1);

    this.player.setDepth(10);
    this.player.setScale(0.3); // Adjust player size to fit screen

    // Use a Phaser.Graphics object to draw the Delaunay triangles
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0x00ff00, 1); // Set line style (green color for triangles)

    // Assuming you have the `delaunay` object and `points` array
    for (let i = 0; i < map.triangles.length; i += 3) {
      const p0 = points[map.triangles[i]];
      console.log(p0);
      const p1 = points[map.triangles[i + 1]];
      const p2 = points[map.triangles[i + 2]];

      // Extract x, y coordinates
      const [x0, y0] = [p0[0], p0[1]];
      const [x1, y1] = [p1[0], p1[1]];
      const [x2, y2] = [p2[0], p2[1]];

      // Draw the triangle
      graphics.beginPath();
      graphics.moveTo(x0, y0);
      graphics.lineTo(x1, y1);
      graphics.lineTo(x2, y2);
      graphics.closePath();
      graphics.strokePath();

      // Calculate centroid of the triangle to place the sprite
      const cx = (x0 + x1 + x2) / 3;
      const cy = (y0 + y1 + y2) / 3;

      // Place a sprite at the centroid of the triangle
      this.add.sprite(cx * 100, cy * 100, 'sprSand');
    }
  }

  update() {
    
    if (this.keyW.isDown) {
      this.followPoint.y -= this.cameraSpeed;
      this.player.play('walk-up', true);
    } else if (this.keyS.isDown) {
      this.followPoint.y += this.cameraSpeed;
      this.player.play('walk-down', true);
    } else if (this.keyA.isDown) {
      this.followPoint.x -= this.cameraSpeed;
      this.player.play('walk-left', true);
    } else if (this.keyD.isDown) {
      this.followPoint.x += this.cameraSpeed;
      this.player.play('walk-right', true);
    } else {
      this.player.play('idle', true);
    }


    this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
    this.player.x = this.followPoint.x;
    this.player.y = this.followPoint.y;
  }
}