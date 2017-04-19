import 'fetch-detector';//中文乱码
import 'fetch-ie8';//兼容IE
require('es6-promise').polyfill();//promise库

window.addEventListener ('DOMContentLoaded',init())

function init(){
	let input = document.getElementById('city');
	let btn = document.getElementById('btn');
	let listContainer = document.getElementsByClassName('listcontainer')[0];
	let list = document.getElementsByTagName('li');
	window.addEventListener('click',function(e){
		if(e.target != input){
			listContainer.style.display = 'none';
		}
	})
	// input.addEventListener('blur',function(){
	// 	// console.log('失去焦点')
		// listContainer.style.display = 'none';
	// })
	input.addEventListener('focus',function(){
		// console.log('焦点')
		listContainer.style.display = 'block';
	})
	input.addEventListener('input',function(e){
		let city = document.getElementById('city').value;
		let listArr = [];

		if(city != ''){
			fetch('https://wind.waqi.info/nsearch/full/'+ city).then((res) => {
				return res.json()
			}).then((data)=>{
				listContainer.innerHTML = "" ;
				for(let i = 0;i < data.results.length;i++){
					let li = document.createElement('li');
					li.innerHTML = data.results[i].n[0];
					listContainer.appendChild(li);
					list[i].addEventListener('click',function(e){
						input.value = this.innerHTML;
					})
				}
			}).catch((e) => {
				console.log("出错，错误为 ", e);
			});
		}
	})

	


	btn.addEventListener('click',function(){
		let city = document.getElementById('city').value;
		// (async function(){
		// 	try {
		// 	  	let response = await fetch('https://wind.waqi.info/nsearch/full/'+city);
		// 	  	let data = await response.json()
		// 	  	console.log(data);
		// 		alert(city + '今日的污染指数为' + data.results[0].s.a)
		// 	}catch(e) {
		// 		console.log("出错，错误为 ", e);
		// 	}
		// })()
		fetch('https://wind.waqi.info/nsearch/full/'+ city)//{credentials: 'include'}支持接收cookie
		.then((res) => {
			return res.json()
		})
		.then((data)=>{
			console.log(data)
			alert(city + '今日的污染指数为' + data.results[0].s.a)
		})
		.catch((e) => {
			console.log("出错，错误为 ", e);
		});
	})
}