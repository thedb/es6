let ajax1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('这是请求1')
		resolve('这是请求1')
	}, 2000);
})

let ajax2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('这是请求2')
		resolve('这是请求2')
	}, 1500);
})

let ajax3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('这是请求3')
		resolve('这是请求3')
	}, 1000);
})

Promise.all([ajax1,ajax2,ajax3]).then((data) => {
	console.log(data)
}).catch((e) => {
  console.log(e)
});