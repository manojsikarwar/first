
//working sheet :- https://docs.google.com/spreadsheets/d/1DqT6ce-yYLoGBKRA67bFIQTY2ixpUT087RivTtQkAb4/edit#gid=1029134095

//website :- https://pinkpanther.netlify.com/

//manoj.sikarwar@engineermaster.in

/*
kkarda77@gmail.com
cakshaychouhan@gmail.com
sodanishubham@gmail.com
diksha.emaster@gmail.com
*/

/*
kkarda77@gmail.com
kapil9981101934
*/
// "test": "echo \"Error: no test specified\" && exit 1",


/*// =================  complete_survey ===========================
//get
module.exports.complete_survey = (body) =>{
	return new Promise((resolve,reject)=>{
		const Array = []
		const sql = `select * from research`
		client.query(sql,(err,ress)=>{
			if(err){
				const Data = {
					'success':false,
					'message':'something went wrong'
				}
				resolve(Data)
			}else{
				for(let key of ress.rows){
					if(key.lasted_at >= myDate){
						const Data = {
							'success':true,
							'message':{
								'COMPLETED':Array.push(key)
							}
						}
						resolve(Array)
					}else{
						const Data = {
							'success':false,
							'message':"not found any survey"
						}
						resolve(Data)
					}
					if(key.lasted_at <= myDate){
						const Data = {
							'success':true,
							'message':{
								'running':Array.push(key)
							}
						}
						resolve(Array)
					}else{
						const Data = {
							'success':false,
							'message':"not found any survey"
						}
						resolve(Data)
					}
				}
			}
		})

	})
}*/

