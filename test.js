// setTimeout(()=> {
// 	console.log('Hello world!');
// }, 1000);

// console.log('Hello world II');

const myFunc = ()=> {
	return new Promise((resolve, reject)=> {
		setTimeout(()=> {
			resolve('Hello world 1')
		}, 3000);
	})
}

const otherFunc = async () => {
	setTimeout(()=> {
		return 'Hello from otherFunc()'
	}, 2000)
}

// Async functions

// myFunc()
// 	.then((result)=> {
// 		console.log(result)
// 		console.log('Hello world 2')
// 	})
// 	.catch((err)=> {
// 		console.log(err)
// 	})

const getRes = async()=> {
	let result = await myFunc()
	console.log(result)
	console.log('After msg')
}

getRes()

// otherFunc()
// 	.then((res)=> {
// 		console.log(res)
// 		console.log('Msg after')
// 	})
// 	.catch((err)=> {
// 		console.log(err)
// 	})
