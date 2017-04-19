function a(cb){
	console.log('a');
	this.name = 'callback';
	setTimeout(() => {
		cb.apply(this);
	}, 0);
}
function b(){
	console.log('b');
}
function c(cb){
	console.log('c');
	setTimeout(function(){
		cb()
	}, 0);
}
function d(){
	console.log('d');
}
function e(){
	console.log('e');
}
function f(){
	console.log('f');
}

window.aa = new a(function(){
	console.log(this.name)
	b();
	c(function(){
		d()
	});
	e();
})
f()
// a(function(){
// 	b();
// 	c(function(){
// 		d()
// 	});
// 	e();
// });
// f();

// function cb(){
// 	this.sum = function(a,b,callback){
// 		this.a = Number(a);
// 		this.b = Number(b);
// 		this.c = this.a + this.b;
// 		return (callback && typeof(callback) === "function") ? callback.apply(this) : this.c
// 	}
// }
// var S = new cb;

// var aa = S.sum(1,51,function(){
// 	return this.c/2
// })
// var bb = S.sum(1,51)

// console.log(aa)
// console.log(bb)
