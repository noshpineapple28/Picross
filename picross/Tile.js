class Tile {
    constructor(x, y) {
        //grid x, y positions
        this.x = x;
        this.y = y;
        //width/height vars
        this.width = blockSize;
        this.height = blockSize;
        //canvas/pixel positions
        this.dispX = ((width * .25) + (this.width * this.x));
        this.dispY = ((height * .25) + (this.height * this.y));
        
        /***** GAMEPLAY PROPERTIES *****/
        //holds if cursor is on the same row/col as the tile
        this.cursorRow = false;
        this.cursorCol = false;
        this.hoveredOver = false; //holds whether tile is hovered over
        //holds if the tile was picked
        this.picked = false;
        //holds if tile is blocked
        this.crossed = false;
        //holds if the tile is needed to be picked in order to win
        this.needsToBePicked;
    }

    display() {
        this.isInside(); //check where mouse is
        this.changeState(); //changes state of tiles
        this.changeFill();//change fill color dependent on mouse pos
        //draws the tile
        rect(this.dispX, this.dispY, this.width, this.height, 5);
        if (this.crossed) {
            noStroke();
            fill(200, 120, 120);
            text('x', this.dispX + this.width/2, this.dispY + this.height/2);
        }
    }

    changeFill() {
        let fillColor = 230;
        //however close mouse is change the color
        if (this.cursorCol || this.cursorRow) {
            fillColor -= 50;
        }
        if (this.hoveredOver) {
            fillColor -= 50;
        }
        if (this.picked) {
            fillColor = 50;
        }
        stroke(fillColor / 2);
        fill(fillColor);
    }

    changeState() {
        //checks to change state of tile
        if (this.hoveredOver && picross.selecting) {
            if (picross.picking && !this.crossed) {
                this.picked = true;
            } else if (picross.unpicking && !this.crossed) {
                this.picked = false;
            }
            if (picross.crossing && !this.picked) {
                this.crossed = true;
            } else if (picross.uncrossing && !this.picked) {
                this.crossed = false;
            }
        }
    }

    isInside() {
        //checks mouse position
        if (mouseX > this.dispX && mouseX < this.dispX + this.width) {
            this.cursorRow = true;
        } else {
            this.cursorRow = false;
        }
        if (mouseY > this.dispY && mouseY < this.dispY + this.height) {
            this.cursorCol = true;
        } else {
            this.cursorCol = false;
        }
        if (this.cursorCol && this.cursorRow) {
            this.hoveredOver = true;
        } else {
            this.hoveredOver = false;
        }
    }
}