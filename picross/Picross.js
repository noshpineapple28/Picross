class Picross {
    constructor(width, height, difficulty, mode, imageSeed) {
        this.width = width;
        this.height = height;

        this.tiles = []; //tiles in game
        this.rows = []; //rows counter
        this.col = []; //columns counter
        this.tileCounters = [this.rows, this.col]; //holds rows/col
        /***** GAMEPLAY MODES *****/
        /**gameMode:
         * 0 - randomized
         * 1 - image based
         */
        this.gameMode = mode;
        this.imageSeed = imageSeed;
        //difficulty
        /**
         * 9 - very easy
         * 8 - easy
         * 7 - normal
         * 5 - hard
         * 4 - very hard
         * 2 - extreme
         */
        this.difficulty = difficulty;

        /***** MOUSE *****/
        this.selecting = false;
        this.picking = false; //sets the state to picking squares
        this.unpicking = false; //sets the state to unpicking
        this.crossing = false; //sets to cross out
        this.uncrossing = false; //sets to uncross out
    }

    createTiles(mode) {
        for (let y = 0; y < this.height; y++) {
            this.tiles.push([]);
            for (let x = 0; x < this.width; x++) {
                this.tiles[y].push(new Tile(x, y));
                //for randomizing tiles
                //TODO: edit randomization
                if (mode === 0 && (random(10) < this.difficulty)) {
                    this.tiles[y][x].needsToBePicked = true;
                } else {
                    this.tiles[y][x].needsToBePicked = false;
                }
            }
        }
        this.loading++; //ends loading
    }

    createRows(tiles, arr) {
        for (let y = 0; y < tiles.length; y++) {
            arr.push(new TileCounter(y, 0));
            let keepCount = false;
            for (let x = 0; x < tiles[y].length; x++) {
                arr[y].tiles.push(tiles[y][x]); //adds tile to the row's tiles
                //if the tile needs to be picked, count it
                if (tiles[y][x].needsToBePicked) {
                    //if we are already keeping count, increase count
                    if (keepCount) {
                        arr[y].tileCount[arr[y].tileCount.length - 1]++;
                    } else {
                        keepCount = true;
                        arr[y].tileCount.push(1);
                    }
                } else {
                    keepCount = false;
                }
            }
        }
        this.loading++;
    }

    createColumns(tiles, arr) {
        for (let x = 0; x < tiles[0].length; x++) {
            arr.push(new TileCounter(x, 1));
            let keepCount = false;
            for (let y = 0; y < tiles.length; y++) {
                arr[x].tiles.push(tiles[y][x]); //adds the tile to array of tiles
                //if the tile needs to be picked, count it
                if (tiles[y][x].needsToBePicked) {
                    //if we are already keeping count, increase count
                    if (keepCount) {
                        arr[x].tileCount[arr[x].tileCount.length - 1]++;
                    } else {
                        keepCount = true;
                        arr[x].tileCount.push(1);
                    }
                } else {
                    keepCount = false;
                }
            }
        }
        this.loading++;
    }

    display() {
        textAlign(CENTER, CENTER);
        textSize(blockSize);
        this.tiles.forEach(tileSet => {
            tileSet.forEach(tile => tile.display())
        });
        textAlign(CENTER, CENTER);
        textSize(blockSize * (2/3));
        this.tileCounters.forEach(axis => {
            axis.forEach(counter => {
                counter.display();
            })
        })
    }
}