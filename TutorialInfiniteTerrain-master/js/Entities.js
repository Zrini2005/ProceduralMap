class Chunk {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.tiles = this.scene.add.group();
    this.isLoaded = false;
  }

  unload() {
    if (this.isLoaded) {
      this.tiles.clear(true, true);
      this.isLoaded = false;
    }
  }

  load() {
    if (!this.isLoaded) {
      const grassTiles = []; // Keep track of grass tile positions
      const waterTiles = [];

      // Step 1: Generate tiles
      for (var x = 0; x < this.scene.chunkSize; x++) {
        for (var y = 0; y < this.scene.chunkSize; y++) {
          var tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
          var tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);

          var perlinValue = noise.perlin2(tileX / 150, tileY / 150);

          var key = "";
          var animationKey = "";

          if (perlinValue < 0.05) {
            key = "sprWater";
            animationKey = "sprWater";
            waterTiles.push({ x: tileX, y: tileY });
          } else if (perlinValue >= 0.05 && perlinValue < 0.2) {
            key = "sprSand";
          } else if (perlinValue >= 0.2) {
            key = "sprGrass";
            grassTiles.push({ x: tileX, y: tileY }); // Add grass tile position
          }

          // Add the main tile sprite
          var tile = new Tile(this.scene, tileX, tileY, key);

          if (animationKey !== "") {
            tile.play(animationKey);
          }

          this.tiles.add(tile);
        }
      }

      // Step 2: Place trees on grass tiles
      grassTiles.forEach(grassTile => {
        var treeNoise = noise.perlin2(grassTile.x / 50, grassTile.y / 50); // Use finer noise for tree placement
        if (treeNoise > 0.2) {
          var treeType;
          if (treeNoise <= 0.3) {
            treeType = "tree1";
          } else if (treeNoise <= 0.4) {
            treeType = "tree2";
          } else {
            treeType = "tree3";
          }

          // Add tree sprite with proper scaling
          const assetWidth = this.scene.textures.get(treeType).getSourceImage().width;
          const assetHeight = this.scene.textures.get(treeType).getSourceImage().height;

          const scaleX = 0.05 + this.scene.tileSize / assetWidth;
          const scaleY = 0.05 + this.scene.tileSize / assetHeight;
          var tree = new Phaser.GameObjects.Sprite(this.scene, grassTile.x + 8, grassTile.y + 8, treeType); // Centered on the tile
          tree.setOrigin(0.5, 1); // Align the tree's bottom to the tile
          tree.setScale(scaleX, scaleY); // Scale down to fit the tile size
          this.tiles.add(tree);
          this.scene.add.existing(tree);
        }
      });

      waterTiles.forEach(waterTile => {
        var assetNoise = noise.perlin2(waterTile.x / 75, waterTile.y / 75); // Use finer noise for asset placement
        if (assetNoise > 0.2) {
          var assetType;
          if (assetNoise <= 0.5) {
            assetType = "icedLake";
          } else if (assetNoise <= 0.6) {
            assetType = "bush";
          } else {
            assetType = "smallHouse";
          }
          const assetWidth = this.scene.textures.get(assetType).getSourceImage().width;
          const assetHeight = this.scene.textures.get(assetType).getSourceImage().height;

          const scaleX = 0.05 + this.scene.tileSize / assetWidth;
          const scaleY = 0.05 + this.scene.tileSize / assetHeight;
 
          var asset = new Phaser.GameObjects.Sprite(this.scene, waterTile.x + 8, waterTile.y + 8, assetType); // Centered on the tile
          asset.setOrigin(0.5, 1);  
          asset.setScale(scaleX, scaleY);  
          this.tiles.add(asset);
          this.scene.add.existing(asset);
        }
        // else{
        //   var assetType="icedLake";

        //   // Add water asset sprite with proper scaling
        //   var asset = new Phaser.GameObjects.Sprite(this.scene, waterTile.x + 8, waterTile.y + 8, assetType); // Centered on the tile
        //   asset.setOrigin(0.5, 1); // Align the asset's bottom to the tile
        //   asset.setScale(0.3); // Scale down to fit the tile size
        //   this.tiles.add(asset);
        //   this.scene.add.existing(asset);
        // }
      });

      this.isLoaded = true;
    }
  }
}



class Tile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0);
  }
}
