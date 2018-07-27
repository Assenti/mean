// setTimeout(()=> {
// 	console.log('Hello world!');
// }, 1000);

// console.log('Hello world II');

const addString = (previuous, current)=> {
	return new Promise((resolve, reject)=> {
		setTimeout(()=> {
			resolve(previuous + ' ' + current)
		}, 1000);
	})
}

// const printResult = ()=> {
// 	addString('', 'A')
// 	.then(result => {
// 		return addString(result, 'B')
// 	})
// 	.then(result => {
// 		return addString(result, 'C')
// 	})
// 	.then(result => {
// 		console.log(result)
// 	})
// }


const printResult = async()=> {
	let result = ''
	result = await addString(result, 'A')
	result = await addString(result, 'B')
	result = await addString(result, 'C')
	console.log(result)
}


printResult()



// const otherFunc = async () => {
// 	setTimeout(()=> {
// 		return 'Hello from otherFunc()'
// 	}, 2000)
// }

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

// getRes()

// otherFunc()
// 	.then((res)=> {
// 		console.log(res)
// 		console.log('Msg after')
// 	})
// 	.catch((err)=> {
// 		console.log(err)
// 	})
