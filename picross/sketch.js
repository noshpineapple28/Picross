/**
 * Noah Manoucheri
 * 7/7/2022
 * Picross game that can:
 *    randomize a picross board
 *    make a picross board off of a given image
 */
"use strict"; //catch some common coding errors

/* Global variables */
var picross; //holds all game modes
var canvas; //holds canvas
var blockSize; //global block size

/**
 * setup :
 */
function setup() {
   picross = new InitGame();
   canvas = createCanvas(picross.width, picross.height);
   //sets canvas position
   canvas.position((window.innerWidth - width) / 2, (window.innerHeight - height) / 2)
   //sets global width



   //stops the right click menu
   window.addEventListener("contextmenu", e => e.preventDefault());
}

/**
 * draw :
 */
function draw() {
   picross.display();
}

/**
 * createPicross:
 * 
 * when finished menu selecting, initialize the game
 * TODO: impliment gameMode select
 */
function createPicross(wid, hei, blockW, mode) {
   background(0, 0)
   blockSize = blockW;
   picross = new Picross(wid, hei);
   //set up the new canvas dimensions
   let cnvWid = (picross.width + floor(picross.width / 2)) * blockSize;
   let cnvHei = (picross.height + floor((picross.height / 2))) * blockSize;
   resizeCanvas(cnvWid, cnvHei)
   canvas.position((window.innerWidth - width) / 2, (window.innerHeight - height) / 2)
   /**** FINISH PICROSS SETUP ****/
   picross.createTiles(picross.gameMode);
   picross.createRows(picross.tiles, picross.rows);
   picross.createColumns(picross.tiles, picross.col);
}

/**
 * keyTyped:
 * debug:
 *    esc - finish picross
 */
function keyPressed() {
   if (picross instanceof Picross) {
      if (keyCode === ESCAPE) {
         picross.tiles.forEach(set => {
            set.forEach(tile => {
               if (tile.needsToBePicked) {
                  tile.crossed = false;
                  tile.picked = true;
               } else {
                  tile.crossed = false;
                  tile.picked = false;
               }
            })
         })
      }
   }
}

/**
 * mouseReleased:
 * when released, reset states
 */
function mouseReleased() {
   if (picross instanceof Picross) {
      picross.selecting = false;
      picross.picking = false;
      picross.unpicking = false;
      picross.crossing = false;
      picross.uncrossing = false;
   } else if (picross instanceof InitGame) {
      picross.clicked = false;
   }
}
/**
 * mousePressed:
 * when mouse is pressed, check the 
 */
function mousePressed() {
   if (picross instanceof Picross) {
      picross.selecting = true;
      picross.tiles.forEach((tileSet) => {
         tileSet.forEach((tile) => {
            if (tile.hoveredOver) {
               if (mouseButton === LEFT) {
                  if (!tile.picked) {
                     picross.picking = true;
                  } else if (tile.picked) {
                     picross.unpicking = true;
                  }
               } else if (mouseButton === RIGHT) {
                  if (!tile.crossed) {
                     picross.crossing = true;
                  } else if (tile.crossed) {
                     picross.uncrossing = true;
                  }
               }
            }
         });
      });
   } else if (picross instanceof InitGame) {
      picross.clicked = true;
   }
}

/**
 * windowResized():
 * whenever the window size changes, resize the canvas
 */
function windowResized() {
   if (picross instanceof Picross) {
      //set up the new canvas dimensions
      let cnvWid = (picross.width + floor(picross.width / 2)) * blockSize;
      let cnvHei = (picross.height + floor((picross.height / 2))) * blockSize;
      resizeCanvas(cnvWid, cnvHei);
      //sets canvas position
      canvas.position((window.innerWidth - width) / 2, (window.innerHeight - height) / 2);
   } else if (picross instanceof InitGame) {
      picross.width = window.innerWidth / 2.1;
      picross.height = window.innerWidth / 2.1;
      resizeCanvas(picross.width, picross.height);
      //sets canvas position
      canvas.position((window.innerWidth - width) / 2, (window.innerHeight - height) / 2);
   }
}