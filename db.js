const {Client} 	= require('pg');

// const client = new Client({ 
// 	user	:'lfadishizfcciy',
// 	password:'4e48dfd806d165e2fb83312aa60956145970e4d253d4b602c4dae607a037dee1',
// 	host	:'ec2-54-235-180-123.compute-1.amazonaws.com',
// 	port 	: 5432,
// 	database:'d9steocb8jsfic',
// 	ssl	: true
// })
const client = new Client({ 	
    user	:'zbwtlytsfrmjch',
	password:'06d9ee2a6868882133598969816c4111c5a7e1ad72ee9ff54a4cb6b9c93fa6b3',
	host	:'ec2-174-129-254-231.compute-1.amazonaws.com',
	port : 5432,
	database:'do77fsvc97d0o',
	ssl	: true
})

client.connect().then(()=>{		
		console.log('Connection Successfully');
})
module.exports=client;