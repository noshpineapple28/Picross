/**
 * Noah Manoucheri
 * 7/7/2022
 * Picross game that can:
 *    randomize a picross board
 *    make a picross board off of a given image
 */
"use strict"; //catch some common coding errors

/* Global variables */
var picross;
var canvas;
var blockSize = (window.innerWidth * 0.015); //global block size

/**
 * setup :
 */
function setup() {
   picross = new Picross(10, 10);
   //set up the new canvas dimensions
   let cnvWid = (picross.width + floor(picross.width / 2)) * blockSize;
   let cnvHei = (picross.height + floor((picross.height / 2))) * blockSize;
   canvas = createCanvas(cnvWid, cnvHei);
   //sets canvas position
   canvas.position((window.innerWidth - width)/2, (window.innerHeight - height)/2)
   //sets global width

   /**** FINISH PICROSS SETUP ****/
   picross.createTiles(picross.gameMode);
   picross.createRows(picross.tiles, picross.rows);
   picross.createColumns(picross.tiles, picross.col);

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
 * keyTyped:
 * debug:
 *    esc - finish picross
 */
function keyPressed() {
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

/**
 * mouseReleased:
 * when released, reset states
 */
function mouseReleased() {
   picross.selecting = false;
   picross.picking = false;
   picross.unpicking = false;
   picross.crossing = false;
   picross.uncrossing = false;
}
/**
 * mousePressed:
 * when mouse is pressed, check the 
 */
function mousePressed() {
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
}

/**
 * windowResized():
 * whenever the window size changes, resize the canvas
 */
function windowResized() {
   //set up the new canvas dimensions
   let cnvWid = (picross.width + floor(picross.width / 2)) * blockSize;
   let cnvHei = (picross.height + floor((picross.height / 2))) * blockSize;
   resizeCanvas(cnvWid, cnvHei);
   //sets canvas position
   canvas.position((window.innerWidth - width)/2, (window.innerHeight - height)/2)
}