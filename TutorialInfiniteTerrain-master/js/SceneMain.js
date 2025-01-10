class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.spritesheet("sprWater", "content/sprWater.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprSand", "content/sprSand.png");
    this.load.image("sprGrass", "content/sprGrass.png");
    this.load.image("tree1", "content/tree1.png");
    this.load.image("tree2", "content/tree2.png");
    this.load.image("tree3", "content/tree3.png");
    this.load.image("sprNewTry", "content/sprHighland.png");
    this.load.image("smallHouse", "content/smallHouse.png");
    this.load.image('dungeon', 'content/dungeon.png');
    this.load.image("bush", "content/mountain_landscape.png");
    this.load.image("asset1", "content/asset1.png");
    this.load.image("asset2", "content/asset2.png");
    this.load.image("asset3", "content/asset3.png");
    this.load.image("icedLake", "content/icedLake.png");
    this.load.spritesheet('adventurer', 'content/adventurer.webp', {
      frameWidth: 256, // Width of a single frame
      frameHeight: 256, // Height of a single frame
    });


  }

  create() {
    // Player animations
    // Define animations
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

    this.anims.create({
      key: "sprWater",
      frames: this.anims.generateFrameNumbers("sprWater"),
      frameRate: 5,
      repeat: -1
    });


    this.mapSize = 3000;
    this.chunkSize = 16;
    this.tileSize = 16;
    this.cameraSpeed = 10;

    this.cameras.main.setZoom(2);
    this.followPoint = new Phaser.Math.Vector2(
      this.mapSize / 2,
      this.mapSize / 2
    );

    this.chunks = [];
    const centerX = (this.chunkSize * this.tileSize) / 2;
    const centerY = (this.chunkSize * this.tileSize) / 2;

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    const middleChunkX = Math.floor(this.mapSize / 2);
    const middleChunkY = Math.floor(this.mapSize / 2);

    this.player = this.add.sprite(middleChunkX,middleChunkY, 'adventurer');
    //this.player.setPosition(1, 1);
    
    this.player.setDepth(10);
    this.player.setScale(0.3); // Adjust player size to fit screen

    const dungeonRadius = 20;
    const randomAngle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    const randomDistance = Phaser.Math.FloatBetween(0, dungeonRadius);

    // Convert polar to Cartesian coordinates
    const dungeonX = this.player.x + Math.cos(randomAngle) * randomDistance;
    const dungeonY = this.player.y + Math.sin(randomAngle) * randomDistance;

    // Add the dungeon sprite
    const dungeon = this.add.sprite(dungeonX, dungeonY, "dungeon");
    dungeon.setOrigin(0.5, 0.5);
    dungeon.setScale(0.5);
    dungeon.setDepth(9.5);
  }
  isWithinBounds(chunkX, chunkY) {
    // Check if the chunk is within the map boundary
    const halfChunks = Math.floor(this.mapSize / (this.chunkSize * this.tileSize) / 2);
    return (
      chunkX >= -halfChunks &&
      chunkX <= halfChunks &&
      chunkY >= -halfChunks &&
      chunkY <= halfChunks
    );
  }

  getChunk(x, y) {
    var chunk = null;
    for (var i = 0; i < this.chunks.length; i++) {
      if (this.chunks[i].x == x && this.chunks[i].y == y) {
        chunk = this.chunks[i];
      }
    }
    return chunk;
  }

  update() {

    var snappedChunkX = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
    var snappedChunkY = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

    for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        if (!this.isWithinBounds(x, y)) continue;
        var existingChunk = this.getChunk(x, y);

        if (existingChunk == null) {
          var newChunk = new Chunk(this, x, y);
          this.chunks.push(newChunk);
        }
      }
    }

    for (var i = 0; i < this.chunks.length; i++) {
      var chunk = this.chunks[i];

      if (Phaser.Math.Distance.Between(
        snappedChunkX,
        snappedChunkY,
        chunk.x,
        chunk.y
      ) < 3) {
        if (chunk !== null) {
          chunk.load();
        }
      }
      else {
        if (chunk !== null) {
          chunk.unload();
        }
      }
    }

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
