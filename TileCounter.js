class TileCounter {
    constructor(num, mode) {
        /***** SETUP *****/
        this.num = num; //holds col/row num
        //width/height vars
        this.width = blockSize;
        this.height = blockSize;
        //canvas x/y
        this.dispX = (width * 0.25) + (this.width * this.num);
        this.dispY = (height * 0.25) + (this.height * this.num);
        //color to fill
        this.fillColor = color(207, 185, 151);
        /**mode:
         * 0 - row
         * 1 - column
         */
        this.mode = mode;

        /***** TILES *****/
        this.tiles = [];
        this.tileCount = [];
        /**two values [num, bool]
         * num - number of tiles picked
         * bool - whether that num is the right number
         */
        this.tileStates = []; //current state of tiles on the gird
        this.numCorrect = 0;
    }

    display() {
        this.checkCorrect();
        if (this.mode === 0) {
            //rows
            this.displayRows();
        } else if (this.mode === 1) {
            //columns
            this.displayColumns();
        }
    }

    displayRows() {
        stroke(0);
        fill(this.fillColor);
        rect(0, this.dispY, width * 0.25, this.height);
        //for text
        noStroke();
        fill(0);
        for (let x = 0; x < this.tileCount.length; x++) {
            if (typeof this.tileStates[x] === "object") {
                if (this.tileStates[x][1]) {
                    fill(80);
                } else if (this.tileStates[x][0] > this.tileCount[x]) {
                    fill(200, 80, 80);
                } else {
                    fill(0);
                }
            } else {
                fill(0)
            }
            text(this.tileCount[x], (width * .22) - ((.7 * blockSize) * (this.tileCount.length - 1 - x)), this.dispY + (this.height * .55));
        }
        //grid deviders
        stroke(0);
        strokeWeight(3);
        let divideEvery; //how many times to draw a divider
        if (picross.height < 10 && picross.height > 7) {
            divideEvery = floor(picross.height/2);
        } else {
            divideEvery = 5
        }
        if (this.num % divideEvery === 0) {
            line(0, this.dispY, (width * .25) + (blockSize * picross.width), this.dispY);
        }
        strokeWeight(1);
    }

    displayColumns() {
        stroke(0);
        fill(this.fillColor);
        rect(this.dispX, 0, this.width, height * 0.25);
        //for text
        noStroke();
        for (let y = 0; y < this.tileCount.length; y++) {
            if (typeof this.tileStates[y] === "object") {
                if (this.tileStates[y][1]) {
                    fill(80);
                } else if (this.tileStates[y][0] > this.tileCount[y]) {
                    fill(200, 80, 80);
                } else {
                    fill(0);
                }
            } else {
                fill(0);
            }
            text(this.tileCount[y], this.dispX + (this.width * .53), (height * .22) - ((.7 * blockSize) * (this.tileCount.length - 1 - y)));
        }
        //grid dividers
        stroke(0);
        strokeWeight(3);
        let divideEvery; //how many times to draw a divider
        if (picross.width < 10 && picross.width > 7) {
            divideEvery = floor(picross.width/2);
        } else {
            divideEvery = 5
        }
        if (this.num % divideEvery === 0) {
            line(this.dispX, 0, this.dispX, (height * .25) + (blockSize * picross.height));
        }
        strokeWeight(1);
    }

    /**
     * checkProgram:
     * checks if the row/column is right
     * checks if each set of tiles is correct
     * checks if too many sets are picked out
     */
    checkCorrect() {
        this.tileStates = [];
        let keepCount = false;
        for (let i = 0; i < this.tiles.length; i++) {
            if (keepCount) {
                if (this.tiles[i].picked) {
                    this.tileStates[this.tileStates.length - 1][0]++;
                } else {
                    keepCount = false;
                }
            } else if (this.tiles[i].picked) {
                this.tileStates.push([1, false]);
                keepCount = true;
            }
        }
        this.numCorrect = 0; //holds how many tiles are correctly set
        for (let i = 0; i < this.tileCount.length; i++) {
            if (typeof (this.tileStates[i]) === "object") {
                if (this.tileCount[i] === this.tileStates[i][0]) {
                    this.numCorrect++;
                    this.tileStates[i][1] = true;
                } else {
                    this.tileStates[i][1] = false;
                }
            }
        }
        //check if all are correct
        if (this.mode === 3) {
            console.log(this.num, this.tileStates, this.tileCount);
            console.log(this.numCorrect, this.tileCount.length)
        }
        if (this.numCorrect === this.tileCount.length &&
            this.tileCount.length === this.tileStates.length) {
            //if all correct, turn dark
            this.fillColor = color(157, 135, 101);
        } else if (this.tileStates.length > this.tileCount.length) {
            //if too many sets are picked out, turn red
            this.fillColor = color(237, 185, 151);
        } else {
            //if not correct, turn to basic
            this.fillColor = color(207, 185, 151);
        }
    }

    //TODO: impliment hint system if the TileCounter is clicked on
}
