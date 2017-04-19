let canvas = document.getElementById('cav');
let ctx = canvas.getContext('2d');
let canvasW = canvas.width;
let canvasH = canvas.height;

// let image = new Image();
// image.src = "./dist/images/bg.jpg";
// ctx.drawImage(image,0,0)
// let a = loadImageAsync("./dist/images/bg.jpg");//出错
// let a = loadImageAsync("./dist/images/bg1.jpg",0,0,canvasW,canvasH);
// let b = loadImageAsync("./dist/images/bg2.jpg",100,100,100,100);

function init(){
  // let a = loadImageAsync("./dist/images/bg1.jpg",0,0,canvasW,canvasH);
  // let b = loadImageAsync("./dist/images/bg2.jpg",100,100,100,100);
  // let c = loadImageAsync("./dist/images/weibo.png",200,200,100,100);
  loadImageAsync("./dist/images/bg1.jpg",0,0,canvasW,canvasH)
  .then(() => {
    loadImageAsync("./dist/images/bg2.jpg",100,100,100,100);
  })
  .then(() => {
    loadImageAsync("./dist/images/weibo.png",200,200,100,100);
  })
}
init()

function loadImageAsync(url,x,y,width,height) {
  return new Promise(function(resolve, reject) {
    let image = new Image();
    image.src = url;
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
  })
  .then((image) => {
    ctx.drawImage(image,x,y,width,height);
    // resolve();
  })
  .catch((e) => {
    console.log(e);
    console.log('现在执行出错代码...');
  })
}





