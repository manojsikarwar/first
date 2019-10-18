const {Client} 	= require('pg');

const client = new Client({ 
	user	:'lfadishizfcciy',
	password:'4e48dfd806d165e2fb83312aa60956145970e4d253d4b602c4dae607a037dee1',
	host	:'ec2-54-235-180-123.compute-1.amazonaws.com',
	port 	: 5432,
	database:'d9steocb8jsfic',
	ssl	: true
})

client.connect().then(()=>{		
		console.log('Connection Successfully');
})
module.exports=client;

