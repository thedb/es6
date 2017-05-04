let canvas = document.getElementById('cav');
let ctx = canvas.getContext('2d');
let canvasW = canvas.width;
let canvasH = canvas.height;

// function init(){
//   // let a = loadImageAsync("./dist/images/bg1.jpg",0,0,canvasW,canvasH);
//   // let b = loadImageAsync("./dist/images/bg2.jpg",100,100,100,100);
//   // let c = loadImageAsync("./dist/images/weibo.png",200,200,100,100);
//   loadImageAsync("./dist/images/bg1.jpg",0,0,canvasW,canvasH)
//   .then(() => {
//     loadImageAsync("./dist/images/bg2.jpg",100,100,100,100);
//   })
//   .then(() => {
//     loadImageAsync("./dist/images/weibo.png",200,200,100,100);
//   })
// }
// init()

// function loadImageAsync(url,x,y,width,height) {
//   return new Promise(function(resolve, reject) {
//     let image = new Image();
//     image.src = url;
//     image.onload = function() {
//       resolve(image);
//     };
//     image.onerror = function() {
//       reject(new Error('Could not load image at ' + url));
//     };
//   })
//   .then((image) => {
//     ctx.drawImage(image,x,y,width,height);
//     // resolve();
//   })
//   .catch((e) => {
//     console.log(e);
//     console.log('现在执行出错代码...');
//   })
// }

// throw new Error("Whoops!");
let arr = [
  "./dist/images/bg1.jpg",
  "./dist/images/bg2.jpg",
  "./dist/images/bg2.jpg",
  "./dist/images/bg2.jpg",
  "./dist/images/bg2.jpg",
  "./dist/images/weibo.png"
];

function Preload(imageArr){
  this.arr = imageArr;//图片数组
  this.length = imageArr.length;//数组长度
  this.loaded = 0;//已加载数量
  this.completed = false;//是否已完成
  this._on = false;//是否调用on
  this._complete = false;//on内是否调用complete
  this.progress = Math.floor((this.loaded / this.length)*100);
  this.arr instanceof Array? this.init() : this.error();//判断+初始化
}

Preload.prototype = {
  constructor:Preload,
  init(){
    this.loadImage();
  },
  loadImage(){
    for(let i = 0; i < this.length; i++){
      let image = new Image();
      image.src = this.arr[i];
      image.onload = () => {
        // resolve(image);
        this.loaded++;
        this.progress = Math.floor((this.loaded / this.length)*100);
        if(this._on & this.loaded > 1){this.on(this.choose,this.on_cb)};
      };
      image.onerror = function() {
        // reject(new Error('Could not load image at ' + url));
        console.log('error')
      };
    }
    return this;
  },
  Progress:function(){
    this.on_cb()
    return this;
  },
  on(choose,callback){
    this._on = true;
    this.on_cb = callback || function(){};
    this.choose = undefined || choose;
    if(choose){
      if(typeof(choose) != 'string'){
        console.log(new Error('this obj is not allow'))
      }else if(choose == 'progress'){
        this.Progress();
      }else if(choose == 'complete'){
        if(this.progress === 100){
          this.complete();
        }
        // if(this.progress === 100){
        //   this.complete();
        // }
      }else{
        console.log(new Error('can not find your choose'))
      }
    }else{
      console.log(new Error('please input your choose'))
    }
    
    return this;
  },
  complete(){
    this.complete_cb = this.on_cb || function(){};
    this.complete_cb();
    console.log('all image has loaded')
    // try {
    //   this.cb.apply(this);
    // } catch(e) {
    //   console.log(new Error('this function is not allow'));
    //   console.log(e);
    // }
    return this;
    // typeof(this.cb) === 'function' ? this.cb() : console.log(new Error('this function is not allow'));
  },
  error(){
    alert('Please check image array has passed in');
    return this;
  }
}

let pre = new Preload(arr);
pre.on('progress',function(){
  console.log( this.progress + '%');
})

pre.on('complete',function(){
  console.log('2')
})



