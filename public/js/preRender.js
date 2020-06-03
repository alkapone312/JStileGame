// var wallCanvas = document.createElement('canvas');
// var wallCtx = wallCanvas.getContext('2d');
// var wall = document.createElement('img');
// var thumbImg = document.createElement('img');

// wallCanvas.width = 100;
// wallCanvas.height= 100;

// wall.onload = function() {
// wallCtx.drawImage('img/gwn.jpg', 0, 0);
// };

// wall.src = 'img/wall.bmp';

function prerender(pathToImg) {
const tmpcanvas = document.createElement('canvas');
var tmpImg = document.createElement('img');
tmpcanvas.width = 100;
tmpcanvas.height = 100;
const tmpctx = tmpcanvas.getContext('2d');
 
tmpImg.onload = function() {
tmpctx.drawImage(tmpImg, 0, 0);
};
tmpImg.src = pathToImg;


return tmpcanvas;
}