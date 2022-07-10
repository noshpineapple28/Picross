/**
 * class InitGame:
 * 7/9/2022
 *
 * purpose is to be what appears when game launches
 * includes menus, and mode select for game
 */
class InitGame {
    constructor() {
        this.width = window.innerWidth / 2.1;
        this.height = this.width;

        /***** GAME INIT *****/
        this.picWid = 10;
        this.picHei = 10;
        this.blockWid = window.innerWidth * 0.015;
        this.gameDifficulty = 5;
        /**gameModes:
         * 0 - Randomized = random game generation
         * 1 - Custom - Created from an image
         */
        this.gameMode = 1;
        this.defaultImage = true;
        let image = loadImage("./media/default.jpg");
        this.imageSeed = image; //for if the custom gameMode is picked

        /***** MENU MODES *****/
        /**modes:
         * 0 - main menu
         * 1 - start game
         * 2 - options
         */
        this.mode = 0;
        this.clicked = false; //holds if the mouse was clicked
        //options menu
        //block size
        this.sliderPercent = 0.1;
        this.sliderPos = this.width * 0.75; //holds x and y pos of slider
        //grid size
        this.gridSlidWidPos = width * 0.5 + width * 0.1;
        this.gridSliderWid = 0.5;
        this.gridSliderHei = 0.5;
        this.difficultySlider = 0.5;
        //difficulty
        /**
         * 9 - very easy
         * 8 - easy
         * 7 - normal
         * 5 - hard
         * 4 - very hard
         * 2 - extreme
         */
        this.difficulties = [["Very Easy", false], ["Easy", false], ["Normal", true], ["Hard", false], ["Very Hard", false], ["Extreme", false]];
        this.difficultyLevel = 7; //how difficult the game is
    }

    display() {
        background(120);
        //change the cursor
        cursor(ARROW);
        //pick the menu to show
        switch (this.mode) {
            case 0: {
                //Main Menu
                this.mainMenu();
                break;
            }
            case 1: {
                //Start Game Menu
                this.startGame();
                break;
            }
            case 2: {
                //Options Menu
                this.options();
                break;
            }
        }
    }

    /**
     * mainMenu:
     * runs the main menu display
     * shows title, and info about the game settings
     * shows buttons to navigate menu
     * allows menu navigation
     */
    mainMenu() {
        //menu text
        noStroke();
        fill(0);
        textSize(0.1 * this.width);
        textAlign(CENTER, CENTER);
        text("PICROSS", width / 2, height * 0.2);
        textSize(0.025 * this.width);
        text(
            "Board Size: " + this.picWid + " x " + this.picHei,
            width / 2,
            height * 0.26
        );
        let difficulty;
        this.difficulties.forEach(level => { if (level[1]) { difficulty = level[0] } });
        let gamePlay;
        if (this.gameMode === 0) {
            gamePlay = "Randomized";
        } else {
            gamePlay = "Image Based"
        }
        text("Mode: " + gamePlay, width / 2, height * 0.29);
        text("Difficulty: " + difficulty, width / 2, height * 0.32);

        //Start game button
        //if mouse is inside of the button, highliht it
        if (
            this.isInside(
                this.width * 0.075,
                this.height * 0.525,
                this.width * 0.4,
                this.height * 0.25
            )
        ) {
            //change mode if mouse is clicked
            if (this.clicked) {
                this.mode = 1;
                this.clicked = false;
            }
            //change the cursor
            cursor(HAND);
            stroke(0);
        } else {
            stroke(70);
        }
        noFill();
        rect(
            this.width * 0.075,
            this.height * 0.525,
            this.width * 0.4,
            this.height * 0.25,
            0.01 * this.width
        );
        fill(0);
        textAlign(CENTER, CENTER);
        noStroke();
        textSize(0.04 * this.width);
        text("START GAME", this.width * 0.275, this.height * 0.65);

        //Options button
        //if mouse is inside of the button, highliht it
        if (
            this.isInside(
                this.width * 0.525,
                this.height * 0.525,
                this.width * 0.4,
                this.height * 0.25
            )
        ) {
            //change mode if mouse is clicked
            if (this.clicked) {
                this.mode = 2;
                this.clicked = false;
            }
            //change the cursor
            cursor(HAND);
            stroke(0);
        } else {
            stroke(70);
        }
        noFill();
        noFill();
        rect(
            this.width * 0.525,
            this.height * 0.525,
            this.width * 0.4,
            this.height * 0.25,
            0.01 * this.width
        );
        fill(0);
        textAlign(CENTER, CENTER);
        noStroke();
        textSize(0.04 * this.width);
        text("OPTIONS", this.width * 0.725, this.height * 0.65);
    }

    /**
     * options:
     * has 4 sections:
     * TODO topLeft: mode select
     * topRight: change block size
     * bottomRight: change game board size
     * bottomLeft: Difficulty Bar
     *
     * allows user to leave the options menu
     */
    options() {
        this.optionDividers();

        //four menus rn
        this.changeGameMode(0, 0, this.width / 2, this.height / 2); //top left
        this.changeDifficulty(0, this.height / 2, this.width / 2, this.height / 2); //bottom left
        this.changeBoardSize(this.width / 2, this.height / 2, this.width / 2, this.height / 2); //bottom right
        this.changeBlockSize(this.width / 2, 0, this.width / 2, this.height / 2); //top right
        this.exitButton(); //exits the options menu
    }

    /**
     * changeGameMode:
     * @param {int} x - x pos the section starts at
     * @param {int} y - y pos the section starts at
     * @param {int} wid - wid of section
     * @param {int} hei - hei of section
     * changes the gameMode
     */
    changeGameMode(x, y, wid, hei) {
        this.gameModeMenuOptions(x, y, wid, hei);
        if (this.gameMode === 1) {
            textAlign(CENTER, CENTER);
            textSize(.03 * this.width)
            noStroke();
            fill(0);
            canvas.drop(file => {
                if (file.type === "image") {
                    this.imageSeed = loadImage(file.data);
                    this.defaultImage = false;
                } else {
                    this.imageSeed = "Unsupported File Format, Sorry :("
                }
            });
            //scale image
            //width
            if (this.imageSeed.width >= 1000) {
                this.imageSeed.resize(this.imageSeed.width *= .01, this.imageSeed.height);
            } else if (this.imageSeed.width >= 100) {
                this.imageSeed.resize(this.imageSeed.width *= .1, this.imageSeed.height);
            }
            //height
            if (this.imageSeed.height >= 1000) {
                this.imageSeed.resize(this.imageSeed.width, this.imageSeed.height *= .01);
            } else if (this.imageSeed.height >= 100) {
                this.imageSeed.resize(this.imageSeed.width, this.imageSeed.height *= .1);
            }
            console.log(this.imageSeed.width, this.imageSeed.height)
            //TODO: after beta remove image appearance
            /***** TO REMOVE THE IMAGE APPEARANCE DONT USE CREATEIMG JUST PASS THE FILE DATA TO THIS.IMAGESEED *****/
            if (typeof this.imageSeed === "object" && !this.defaultImage) {
                imageMode(CENTER)
                image(this.imageSeed, x + (wid * .5), y + (hei * .5));
            } else if (typeof this.imageSeed === "string") {
                text(this.imageSeed, x + (wid * .5), y + (hei * .5));
            } else {
                text("Drop an Image file here!\n\nIf No image is given, a \ndefault image willbe used", x + (wid * .5), y + (hei * .5));
            }
        }
    }

    gameModeMenuOptions(x, y, wid, hei) {
        textAlign(CENTER, CENTER);
        textSize(0.03 * this.width);
        noStroke();
        fill(0);
        text("Game Mode", x + (wid * .5), y + (hei * .1));
        //RANDOM
        if (this.gameMode === 0) {
            fill(0);
        } else {
            fill(220);
        }
        if (this.isInside(x + (wid * .1) - (.015 * this.width), y + (hei * .2) - (.015 * this.width), .03 * this.width, .03 * this.width)) {
            stroke(0);
            cursor(HAND);
            if (this.clicked) {
                this.gameMode = 0;
                this.clicked = false;
            }
        } else {
            noStroke();
        }
        ellipse(x + (wid * .1), y + (hei * .2), .03 * this.width);
        textAlign(LEFT, CENTER);
        noStroke();
        fill(0);
        text("Randomized", x + (wid * .134), y + (hei * .205))
        //IMAGE
        if (this.gameMode === 1) {
            fill(0);
        } else {
            fill(220);
        }
        if (this.isInside(x + (wid * .535) - (.015 * this.width), y + (hei * .2) - (.015 * this.width), .03 * this.width, .03 * this.width)) {
            stroke(0);
            cursor(HAND);
            if (this.clicked) {
                this.gameMode = 1;
                this.clicked = false;
            }
        } else {
            noStroke();
        }
        ellipse(x + (wid * .535), y + (hei * .2), .03 * this.width);
        textAlign(LEFT, CENTER);
        noStroke();
        fill(0);
        text("Image Based", x + (wid * .569), y + (hei * .205));
    }

    /**
     * changeDiffiuclty:
     * @param {int} x - x pos the section starts at
     * @param {int} y - y pos the section starts at
     * @param {int} wid - wid of section
     * @param {int} hei - hei of section
     * alters the difficulty of the puzzle
     * shows a display of how difficult the puzzle will be
     */
    changeDifficulty(x, y, wid, hei) {
        textAlign(LEFT, CENTER);
        textSize(0.03 * this.width);
        this.iterateThroughDiff(x, y, wid, hei);
        //demo of difficulty
        textAlign(CENTER, CENTER);
        textSize(0.02 * this.width);
        text("Number of Potential Tiles", x + (wid * .75), y + (hei * .16));
        text("Based on Difficulty", x + (wid * .75), y + (hei * .856));
        let counter = 0; //counter holds how many blocks have been created
        for (let xDisp = 0; xDisp < 5; xDisp++) {
            for (let yDisp = 0; yDisp < 6; yDisp++) {
                if (counter < this.difficultyLevel * 3) {
                    fill(0);
                } else {
                    fill(220);
                }
                stroke(0);
                rect(x + (wid * .5) + ((wid * .096) * xDisp), y + (hei * .21) + ((hei * .096) * yDisp), (wid * .096), (hei * .096), .01 * this.width);
                counter++;
            }
        }
    }

    iterateThroughDiff(x, y, wid, hei) {
        for (let i = 0; i < this.difficulties.length; i++) {
            if (this.difficulties[i][1]) {
                fill(0);
            } else {
                fill(200);
            }
            if (this.isInside(x + (wid * .1) - (wid * .015), y + (.1 * hei) + (hei * i * .145) - (wid * .015), .03 * width, .03 * width)) {
                cursor(HAND)
                stroke(0);
                if (this.clicked) {
                    //TODO add implimentation for selection
                    this.difficultyChange(i);
                }
            } else {
                noStroke();
            }
            ellipse(x + (wid * .1), y + (.13 * hei) + (hei * i * .145), .03 * width);
            noStroke();
            fill(0);
            text(this.difficulties[i][0], x + (wid * .15), y + (.13 * hei) + (hei * i * .147));
        }
    }

    difficultyChange(changed) {
        if (!this.difficulties[changed][1]) {
            //assign new value for difiiculty level, and turn off the old level
            this.difficulties[changed][1] = true;
            this.difficulties.forEach(level => {
                if (level != this.difficulties[changed]) {
                    level[1] = false;
                }
            })
            //change the default num value of the difficulty level
            switch (this.difficulties[changed][0]) {
                case this.difficulties[0][0]: {
                    this.difficultyLevel = 9;
                    break;
                }
                case this.difficulties[1][0]: {
                    this.difficultyLevel = 8;
                    break;
                }
                case this.difficulties[2][0]: {
                    this.difficultyLevel = 7;
                    break;
                }
                case this.difficulties[3][0]: {
                    this.difficultyLevel = 5;
                    break;
                }
                case this.difficulties[4][0]: {
                    this.difficultyLevel = 4;
                    break;
                }
                case this.difficulties[5][0]: {
                    this.difficultyLevel = 2;
                    break;
                }
            }
        }
    }

    /**
     * changeBlockSize:
     * @param {int} x - x pos the section starts at
     * @param {int} y - y pos the section starts at
     * @param {int} wid - wid of section
     * @param {int} hei - hei of section
     * alters the value of the block size
     */
    changeBlockSize(x, y, wid, hei) {
        //assign block wid
        this.blockWid =
            window.innerWidth * (this.sliderPercent * 0.005 * 10 + 0.01);
        //draw block
        fill(230);
        stroke(0);
        rectMode(CENTER);
        rect(
            x + wid * 0.5,
            y + hei * 0.375,
            this.blockWid,
            this.blockWid,
            0.005 * this.width
        );
        rectMode(CORNER);

        //text
        fill(0);
        textAlign(CENTER, CENTER);
        noStroke();
        textSize(0.02 * this.width);
        text("Change Block Size", x + wid * 0.5, y + hei * 0.75);

        //slider
        strokeWeight(3);
        stroke(0);
        line(x + wid * 0.2, y + hei * 0.875, x + wid * 0.8, y + hei * 0.875);
        strokeWeight(1);
        //slider selector
        this.sliderPos = x + wid * (0.6 * this.sliderPercent + 0.2);
        fill(230);
        noStroke();
        if (
            this.isInside(
                x + wid * 0.2,
                y + hei * 0.875 - 0.015 * this.width,
                wid * 0.6,
                0.03 * this.width
            )
        ) {
            if (this.clicked) {
                stroke(0);
                this.sliderPercent = round(
                    dist(mouseX, 0, x + wid * 0.2, 0) / (wid * 0.6),
                    1
                );
            }
        }
        ellipse(this.sliderPos, y + hei * 0.875, 0.03 * this.width);
    }

    /**
     * changeBoardSize:
     * @param {int} x - x pos the section starts at
     * @param {int} y - y pos the section starts at
     * @param {int} wid - wid of section
     * @param {int} hei - hei of section
     * alters the value of the block size
     */
    changeBoardSize(x, y, wid, hei) {
        //draw the board
        this.drawTile(x, y, wid, hei);
        this.drawCol(x, y, wid, hei);
        this.drawRow(x, y, wid, hei);
        //sliders for grid size
        this.changeGridSize(x, y, wid, hei);
        //change grid size fr this time
        this.updateGrid();
        //text
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textSize(0.02 * this.width);
        text(
            "Grid Size: " + this.picWid + " x " + this.picHei,
            x + wid * 0.45,
            y + hei * 0.72
        );
        text("Change Grid Size", x + wid * 0.5, y + hei * 0.05);
        text(
            "BOARD WON'T LOOK THE SAME AS THE EXAMPLE",
            x + wid * 0.5,
            y + hei * 0.9
        );
    }

    /**
     * updateGrid:
     * changes the values of picWid and picHei for gameplay
     * DO NOT OPEN IT IS A LONG ASS SWITCH CASE
     */
    updateGrid() {
        switch (this.gridSliderWid) {
            case 0.0: {
                this.picWid = 3;
                break;
            }
            case 0.1: {
                this.picWid = 4;
                break;
            }
            case 0.2: {
                this.picWid = 5;
                break;
            }
            case 0.3: {
                this.picWid = 6;
                break;
            }
            case 0.4: {
                this.picWid = 8;
                break;
            }
            case 0.5: {
                this.picWid = 10;
                break;
            }
            case 0.6: {
                this.picWid = 12;
                break;
            }
            case 0.7: {
                this.picWid = 15;
                break;
            }
            case 0.8: {
                this.picWid = 18;
                break;
            }
            case 0.9: {
                this.picWid = 20;
                break;
            }
            case 1: {
                this.picWid = 25;
                break;
            }
        }
        switch (this.gridSliderHei) {
            case 0.0: {
                this.picHei = 3;
                break;
            }
            case 0.1: {
                this.picHei = 4;
                break;
            }
            case 0.2: {
                this.picHei = 5;
                break;
            }
            case 0.3: {
                this.picHei = 6;
                break;
            }
            case 0.4: {
                this.picHei = 8;
                break;
            }
            case 0.5: {
                this.picHei = 10;
                break;
            }
            case 0.6: {
                this.picHei = 12;
                break;
            }
            case 0.7: {
                this.picHei = 15;
                break;
            }
            case 0.8: {
                this.picHei = 18;
                break;
            }
            case 0.9: {
                this.picHei = 20;
                break;
            }
            case 1: {
                this.picHei = 25;
                break;
            }
        }
    }

    changeGridSize(x, y, wid, hei) {
        //WIDTH
        strokeWeight(3);
        stroke(0);
        line(x + wid * 0.1, y + hei * 0.8, x + wid * 0.8, y + hei * 0.8);
        strokeWeight(1);
        //slider selector
        this.gridSlidWidPos = x + wid * (0.7 * this.gridSliderWid + 0.1);
        fill(230);
        noStroke();
        if (
            this.isInside(
                x + wid * 0.1,
                y + hei * 0.8 - 0.015 * this.width,
                wid * 0.7,
                0.03 * this.width
            )
        ) {
            stroke(0);
            if (this.clicked) {
                this.gridSliderWid = round(
                    dist(mouseX, 0, x + wid * 0.1, 0) / (wid * 0.7),
                    1
                );
            }
        }
        ellipse(this.gridSlidWidPos, y + hei * 0.8, 0.03 * this.width);

        //HEIGHT
        strokeWeight(3);
        stroke(0);
        line(x + wid * 0.9, y + hei * 0.1, x + wid * 0.9, y + hei * 0.8);
        strokeWeight(1);
        //slider selector
        this.gridSlidHeiPos = y + hei * (0.7 * this.gridSliderHei + 0.1);
        fill(230);
        noStroke();
        if (
            this.isInside(
                x + wid * 0.9 - 0.015 * this.width,
                y + hei * 0.1,
                0.03 * this.width,
                hei * 0.7
            )
        ) {
            stroke(0);
            if (this.clicked) {
                this.gridSliderHei = round(
                    dist(mouseY, 0, y + hei * 0.1, 0) / (hei * 0.7),
                    1
                );
            }
        }
        ellipse(x + wid * 0.9, this.gridSlidHeiPos, 0.03 * this.width);
    }

    drawCol(x, y, wid, hei) {
        let offset = wid * (0.25 * 0.8) + wid * 0.1;
        let longSide = hei * (0.25 * 0.65);
        let shortSide = (wid * 0.8 - offset) / this.picWid;
        for (let i = 0; i < this.picWid; i++) {
            stroke(0);
            fill(207, 185, 151);
            rect(x + offset + i * shortSide, y + hei * 0.1, shortSide, longSide);
            strokeWeight(2);
            if (this.picWid < 10 && this.picWid > 7) {
                if (i % 4 === 0) {
                    line(
                        x + offset + i * shortSide,
                        y + wid * 0.1,
                        x + offset + i * shortSide,
                        y + hei * 0.65
                    );
                }
            } else {
                if (i % 5 === 0) {
                    line(
                        x + offset + i * shortSide,
                        y + wid * 0.1,
                        x + offset + i * shortSide,
                        y + hei * 0.65
                    );
                }
            }
            strokeWeight(1);
        }
    }

    drawRow(x, y, wid, hei) {
        let longSide = wid * (0.25 * 0.8);
        let offset = hei * (0.25 * 0.65) + wid * 0.1;
        let shortSide = (hei * 0.65 - offset) / this.picHei;
        for (let i = 0; i < this.picHei; i++) {
            stroke(0);
            fill(207, 185, 151);
            rect(x + wid * 0.1, y + offset + i * shortSide, longSide, shortSide);
            strokeWeight(2);
            if (this.picWid < 10 && this.picWid > 7) {
                if (i % 4 === 0) {
                    line(
                        x + wid * 0.1,
                        y + offset + i * shortSide,
                        x + hei * 0.8,
                        y + offset + i * shortSide
                    );
                }
            } else {
                if (i % 5 === 0) {
                    line(
                        x + wid * 0.1,
                        y + offset + i * shortSide,
                        x + hei * 0.8,
                        y + offset + i * shortSide
                    );
                }
            }
            strokeWeight(1);
        }
    }

    drawTile(x, y, wid, hei) {
        fill(220);
        let rowOffset = y + hei * (0.25 * 0.65) + hei * 0.1;
        let colOffset = x + wid * (0.25 * 0.8) + wid * 0.1;
        let rowShort = (y + hei * 0.65 - rowOffset) / this.picHei;
        let colShort = (x + wid * 0.8 - colOffset) / this.picWid;
        for (let x = 0; x < this.picWid; x++) {
            for (let y = 0; y < this.picHei; y++) {
                rect(
                    colOffset + x * colShort,
                    rowOffset + y * rowShort,
                    colShort,
                    rowShort
                );
            }
        }
    }

    /**
     * optionDividers:
     * draws line between menu things
     */
    optionDividers() {
        //divides the menu
        stroke(0);
        //MIDTOP TO MID
        line(this.width / 2, 0, this.width / 2, this.height * 0.45);
        //MIDLEFT TO MID
        line(0, this.height / 2, this.width * 0.45, this.height / 2);
        //MIDBOTTOM TO MID
        line(this.width / 2, this.height * 0.55, this.width / 2, this.height);
        //MIDRIGHT TO MID
        line(this.width * 0.55, this.height / 2, this.width, this.height * 0.5);
    }

    exitButton() {
        if (
            this.isInside(
                this.width * 0.45,
                this.height * 0.45,
                this.width * 0.1,
                this.height * 0.1
            )
        ) {
            stroke(0);
            cursor(HAND);
            if (this.clicked) {
                this.clicked = false;
                this.mode = 0;
            }
        } else {
            stroke(80);
        }
        noFill();
        //draw rectangle
        rect(
            this.width * 0.45,
            this.height * 0.45,
            this.width * 0.1,
            this.height * 0.1,
            0.01 * this.width
        );
        //text
        textAlign(CENTER, CENTER);
        textSize();
        fill(0);
        noStroke();
        textSize(0.02 * this.width);
        text("Exit\nOptions", this.width / 2, this.height / 2);
    }

    /**
     * startGame:
     * when clicked, launches the picross game
     */
    startGame() {
        createPicross(this.picWid, this.picHei, this.blockWid, this.difficultyLevel, this.gameMode, this.imageSeed);
    }

    isInside(x, y, wid, hei) {
        if (mouseX > x && mouseX < x + wid && mouseY > y && mouseY < y + hei) {
            return true;
        } else {
            return false;
        }
    }
}
