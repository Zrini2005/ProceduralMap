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


    this.mapSize = 1000;
    this.chunkSize = 16;
    this.tileSize = 16;
    this.cameraSpeed = 50;
    this.vertices = [
      {
        type: "sand",
        vertices: [
          { x: 0, y: 0 },
          { x: 3000, y: 0 }, 
          { x: 0, y: 3000 } 
        ],
      },
      // {
      //   type: "grass",
      //   vertices: [
      //     { x: 4042.478093507959, y: 4298.444218253445 },
      //     { x: 2488.4553597323147, y: 5127.3722514841975 },
      //     { x: 0, y: 4096.61555427585 },
      //     { x: 0, y: 3841.6829266297827 },
      //     { x: 2277.5382607784486, y: 2938.418333249916 },
      //     { x: 4042.478093507959, y: 4298.444218253445 },
      //   ],
      // },
      // {
      //   type: "water",
      //   vertices: [
      //     { x: 0, y: 4096.61555427585 },
      //     { x: 2488.4553597323147, y: 5127.3722514841975 },
      //     { x: 3210.032121527268, y: 6580.234799747971 },
      //     { x: 0, y: 7531.489492950001 },
      //     { x: 0, y: 4096.61555427585 },
      //   ],
      // },
      // {
      //   type: "sand",
      //   vertices: [
      //     { x: 3448.528108230083, y: 8784.363792166345 },
      //     { x: 3073.3481548625327, y: 8930.252702518479 },
      //     { x: 0, y: 8574.447172215752 },
      //     { x: 0, y: 7531.489492950001 },
      //     { x: 3210.032121527268, y: 6580.234799747971 },
      //     { x: 3438.8711430156422, y: 6726.6557391793895 },
      //     { x: 3448.528108230083, y: 8784.363792166345 },
      //   ],
      // },
      // {
      //   type: "grass",
      //   vertices: [
      //     { x: 0, y: 8574.447172215752 },
      //     { x: 3073.3481548625327, y: 8930.252702518479 },
      //     { x: 2565.1295860034297, y: 11235.098874186566 },
      //     { x: 0, y: 11161.045945485452 },
      //     { x: 0, y: 8574.447172215752 },
      //   ],
      // },
      // {
      //   type: "water",
      //   vertices: [
      //     { x: 0, y: 11161.045945485452 },
      //     { x: 2565.1295860034297, y: 11235.098874186566 },
      //     { x: 3033.4160993121563, y: 11620.013641586696 },
      //     { x: 3104.0089613615646, y: 12000 },
      //     { x: 0, y: 12000 },
      //     { x: 0, y: 11161.045945485452 },
      //   ],
      // },
      // {
      //   type: "sand",
      //   vertices: [
      //     { x: 4838.897317535155, y: 3721.1349305970275 },
      //     { x: 3191.2751126712146, y: 2129.3549445847802 },
      //     { x: 3731.0217908046175, y: 0 },
      //     { x: 4212.8590382308885, y: 0 },
      //     { x: 5688.689523245628, y: 3213.7175640036926 },
      //     { x: 4838.897317535155, y: 3721.1349305970275 },
      //   ],
      // },
      // {
      //   type: "grass",
      //   vertices: [
      //     { x: 4042.478093507959, y: 4298.444218253445 },
      //     { x: 2277.5382607784486, y: 2938.418333249916 },
      //     { x: 3191.2751126712146, y: 2129.3549445847802 },
      //     { x: 4838.897317535155, y: 3721.1349305970275 },
      //     { x: 4521.8057593838585, y: 4238.034733788111 },
      //     { x: 4042.478093507959, y: 4298.444218253445 },
      //   ],
      // },
      // {
      //   type: "water",
      //   vertices: [
      //     { x: 4881.542251970956, y: 6153.938653849264 },
      //     { x: 3438.8711430156422, y: 6726.6557391793895 },
      //     { x: 3210.032121527268, y: 6580.234799747971 },
      //     { x: 2488.4553597323147, y: 5127.3722514841975 },
      //     { x: 4042.478093507959, y: 4298.444218253445 },
      //     { x: 4521.8057593838585, y: 4238.034733788111 },
      //     { x: 4971.436881759294, y: 5783.713890531739 },
      //     { x: 4881.542251970956, y: 6153.938653849264 },
      //   ],
      // },
      // {
      //   type: "sand",
      //   vertices: [
      //     { x: 5518.681431946719, y: 6905.156232636045 },
      //     { x: 4031.1962278043634, y: 8989.352185664939 },
      //     { x: 3448.528108230083, y: 8784.363792166345 },
      //     { x: 3438.8711430156422, y: 6726.6557391793895 },
      //     { x: 4881.542251970956, y: 6153.938653849264 },
      //     { x: 5518.681431946719, y: 6905.156232636045 },
      //   ],
      // },
      // {
      //   type: "grass",
      //   vertices: [
      //     { x: 4670.680115215815, y: 9456.595979807087 },
      //     { x: 4323.902975384821, y: 10927.146981618636 },
      //     { x: 3033.4160993121563, y: 11620.013641586696 },
      //     { x: 2565.1295860034297, y: 11235.098874186566 },
      //     { x: 3073.3481548625327, y: 8930.252702518479 },
      //     { x: 3448.528108230083, y: 8784.363792166345 },
      //     { x: 4031.1962278043634, y: 8989.352185664939 },
      //     { x: 4670.680115215815, y: 9456.595979807087 },
      //   ],
      // },
      // {
      //   type: "water",
      //   vertices: [
      //     { x: 5219.892966035925, y: 11843.154400040916 },
      //     { x: 5226.037018727953, y: 12000 },
      //     { x: 3104.0089613615646, y: 12000 },
      //     { x: 3033.4160993121563, y: 11620.013641586696 },
      //     { x: 4323.902975384821, y: 10927.146981618636 },
      //     { x: 5219.892966035925, y: 11843.154400040916 },
      //   ],
      // },
      // {
      //   type: "sand",
      //   vertices: [
      //     { x: 7317.258308301881, y: 0 },
      //     { x: 6965.093071074907, y: 2507.460490293406 },
      //     { x: 6288.709746490591, y: 3220.001296581163 },
      //     { x: 5688.689523245628, y: 3213.7175640036926 },
      //     { x: 4212.8590382308885, y: 0 },
      //     { x: 7317.258308301881, y: 0 },
      //   ],
      // },
      // Add remaining polygons up to 36 using the same format
    ];

    this.cameras.main.setZoom(0.1);
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

    this.player = this.add.sprite(middleChunkX, middleChunkY, 'adventurer');
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
     

    // Check if the chunk is within the boundaries of any biome (centered at each vertex)
    const chunkCenterX = chunkX * this.chunkSize * this.tileSize;
    const chunkCenterY = chunkY * this.chunkSize * this.tileSize;

    // Check if the chunk falls within any square biome boundary
    for (let polygon of this.vertices) {
      if (this.isPointInPolygon({ x: chunkCenterX, y: chunkCenterY }, polygon.vertices)) {
        return { withinBounds: true, biomeType: polygon.type };
      }
    }

    return { withinBounds: false, biomeType: null };
  }
  isPointInPolygon(point, vertices) {
    let inside = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const xi = vertices[i].x, yi = vertices[i].y;
      const xj = vertices[j].x, yj = vertices[j].y;
  
      const intersect = ((yi > point.y) !== (yj > point.y)) &&
                        (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }



  assignBiomes(points) {
    const biomeAssignments = [
      { type: 'biome1', count: 2 },
      { type: 'biome2', count: 3 }
    ];

    let biomes = [];

    biomeAssignments.forEach((assignment, index) => {
      for (let i = 0; i < assignment.count; i++) {
        if (points.length > 0) {
          const vertex = points.shift();
          biomes.push({
            ...vertex,
            biome: assignment.type
          });
        }
      }
    });

    return biomes;
  }


  generateVoronoiPoints(count, min, max, minDistance) {
    const points = [];
    let attempts = 0;
    const biomeTypes = ['biome1', 'biome2']; // Define available biomes

    while (points.length < count && attempts < 1000) {
      attempts++;

      // Generate a random point within the range
      const candidate = {
        x: Phaser.Math.Between(min, max),
        y: Phaser.Math.Between(min, max),
        biome: Phaser.Utils.Array.GetRandom(biomeTypes)
      };

      // Check if the candidate point is valid (not too close to others)
      const isValid = points.every((point) => {
        const distance = Phaser.Math.Distance.Between(
          point.x,
          point.y,
          candidate.x,
          candidate.y
        );
        return distance >= minDistance;
      });

      // Add the candidate if it passes the validation
      if (isValid) {
        points.push(candidate);
        console.log(candidate);
      }
    }

    if (points.length < count) {
      console.warn("Could not generate the required number of points.");
    }

    return points;
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
    console.log("snaapp:",snappedChunkX, snappedChunkY);

    for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        const result = this.isWithinBounds(x, y);
        if (!result.withinBounds) continue;
        var existingChunk = this.getChunk(x, y);

        if (existingChunk == null) {
          if (result.biomeType === 'grass') {
            var newChunk = new Biome1(this, x, y);
          } else {
            var newChunk = new Biome2(this, x, y);
          }
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

    console.log(this.followPoint.x, this.followPoint.y);



    this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
    this.player.x = this.followPoint.x;
    this.player.y = this.followPoint.y;
  }
  getBiomeTypeForChunk(chunkX, chunkY) {
    if (this.vertices.length === 0) {
      console.warn("No vertices available to determine biome type.");
      return 'biome1'; // Provide a default biome type if necessary
    }
    const closestVertex = this.vertices.reduce((prev, curr) => {
      const prevDistance = Phaser.Math.Distance.Between(chunkX * this.chunkSize * this.tileSize, chunkY * this.chunkSize * this.tileSize, prev.x, prev.y);
      const currDistance = Phaser.Math.Distance.Between(chunkX * this.chunkSize * this.tileSize, chunkY * this.chunkSize * this.tileSize, curr.x, curr.y);
      return (currDistance < prevDistance) ? curr : prev;
    });
    console.log(`Biome type found: ${closestVertex.biomeType}`);

    return closestVertex.biomeType;
  }
  createChunk(x, y, biomeType) {
    let chunk;
    switch (biomeType) {
      case 'biome1':
        chunk = new Biome1(this, x, y);
        break;
      case 'biome2':
        chunk = new Biome2(this, x, y);
        break;
      default:
        chunk = new Biome1(this, x, y);
    }
    return chunk;
  }
  chunkExists(chunkX, chunkY, biomeType) {
    // Check if a chunk with the same coordinates and biome type already exists
    return this.chunks.some(chunk => chunk.x === chunkX && chunk.y === chunkY && chunk.biome === biomeType);
  }

}
