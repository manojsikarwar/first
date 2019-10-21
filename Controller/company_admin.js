const client 		= require('../db');
const bcrypt 		= require('bcrypt');
const nodemailer	= require('nodemailer');
const generator 	= require('generate-password');
const moment 		= require('moment');
const date   		= new Date();
const myDate 		= moment().format('L');
const jwt			= require('jsonwebtoken');


// ================== company_create_manager ==============
//post
module.exports.company_create_module = (user,body) => {
	return new Promise((resolve,reject)=>{
		try{
			const password			= body.password;
			bcrypt.hash(password,10,function(err,hash){
			const id 				= user.role_id;
			const company_name 		= user.company_name;
			const company_id 		= user.company_id
			const first_name 	 	= body.first_name;
			const email 			= body.email;
			const pass 				= hash;
			const role_type 		= body.role_type;
			const super_id 			= '2';
			const create_by 		= 'company_admin';
			const last_name 	 	= body.last_name;
			const confirm_password 	= 'none';
			const status 			= 0;
			if(id == 2){
				if(first_name != '' && email != '' && password != '' && role_type != ''&& super_id != '' && create_by != '' && last_name != ''&& company_id != ''){
					if(role_type == 'manager' || role_type == 'admin' || role_type == 'user' ){
					const sql = `select * from registration where company_id = '${company_id}' and email = '${email}'`;
					client.query(sql,(err,ress)=>{
						if(ress.rows != ''){
							const Data = {
								"success":false,
								"message":'Sorry This Email Already Created by This Company'
							}
							resolve(Data)
						}else{
							if(role_type == 'manager'){
								const sql1 = `insert into registration(first_name,email,password,role_id,role_type,super_id,create_by,last_name,confirm_password,company_name,company_id,status)
								values('${first_name}','${email}','${hash}','${3}','${role_type}','${super_id}','${create_by}','${last_name}','${hash}','${company_name}','${company_id}','${status}')`;
								client.query(sql1,(err1,ress1)=>{
						 			if(err){
										const Data = {
											'success':false,
											'message':'Something went wrong'
										}
						 			}else{
										const Data = {
											'success':true,
											'message':'create account Successfully'
										}
										resolve(Data)
						 			}
								})
							}
							if(role_type == 'admin'){
								const sql1 = `insert into registration(first_name,email,password,role_id,role_type,super_id,create_by,last_name,confirm_password,company_name,company_id,status)
								values('${first_name}','${email}','${hash}','${2}','${role_type}','${super_id}','${create_by}','${last_name}','${hash}','${company_name}','${company_id}','${status}')`;
								client.query(sql1,(err1,ress1)=>{
						 			if(err){
										const Data = {
											'success':false,
											'message':'Something went wrong'
										}
						 			}else{
										const Data = {
											'success':true,
											'message':'create account Successfully'
										}
										resolve(Data)
						 			}
								})
							}
							if(role_type == 'user'){
								const sql1 = `insert into registration(first_name,email,password,role_id,role_type,super_id,create_by,last_name,confirm_password,company_name,company_id,status)
								values('${first_name}','${email}','${hash}','${4}','${role_type}','${super_id}','${create_by}','${last_name}','${hash}','${company_name}','${company_id}','${status}')`;
								client.query(sql1,(err1,ress1)=>{
						 			if(err){
										const Data = {
											'success':false,
											'message':'Something went wrong'
										}
						 			}else{
										const Data = {
											'success':true,
											'message':'create account Successfully'
										}
										resolve(Data)
						 			}
								})
							}
						}
					})
			
					}else{
						const Data = {
							'success':false,
							'message':'you can create Only admin, manager and user'
						}
						resolve(Data)
					}
				}else{
					const Data = {
						'success':false,
						'message':'some field are missing'
					}
					resolve(Data)
				}	
			}else{
				const Data = {
					'success':false,
					'message':'You have not permission to create company'
				}
				resolve(Data)
			}
			})
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data)		
		}
	})
}


// ==================  company_list  ====================
//get
module.exports.company_list = (user) => {
	return new Promise((resolve,reject)=>{
		try{
			const Array = [];
			const role_id	= user.role_id;
			if(role_id == 1){
		 		const sql1 = `select * from create_company where status = '${0}'`;
		 		client.query(sql1,(err,ress)=>{
		 			if(err){
						const Data = {
							'success':false,
							'message':'Something went wrong'
						}
						resolve(Data)
		 			}else{
		 				if(ress.rows == ''){
		 					const Data ={
		 						'success':false,
		 						'message':'company not found'
		 					}
		 					resolve(Data)
		 				}else{
			 				for(let key of ress.rows){
				 				Array.push({
				 						'company_id' 	: key.company_id,
				 						'company_name'	: key.company_name,
				 						'comp_email'	: key.comp_email,
				 						'create_by' 	: key.create_by
				 				})			
				 				response={
				 					'success':true,
			                         'message':"Successfully show data",
			                         'data':Array   
				 				}
				 				
				 				 resolve(response)
					 		}
		 				}
		 			}
				})
			}else{
				const Data = {
					'success':false,
					'message':'Only superadmin can Show company list'
				}
				resolve(Data);
			}
		}catch(error){
			resolve(error);
		}
	})
}

// ==================  company_manager_list  ====================
//get
module.exports.company_manager_list = (user,company_id) => {
	return new Promise((resolve,reject)=>{
		const role_id 	= user.role_id
		const Array = []
		if(role_id == 2 || role_id == 1 || role_id == 3){
			if(company_id != ''){
		 		const sql1 = `select id,first_name,last_name,email,role_type,company_id from registration where company_id = '${company_id}' and role_id = '${3}' and status = '${0}' `
		 		client.query(sql1,(err,ress)=>{
		 			if(ress.rows == ''){
		 				const Data = {
		 					'success':false,
		 					'message':'manager not found'
		 				}
		 				resolve(Data)
		 			}else{
			 			if(err){
							const Data = {
								'success':false,
								'message':'Something went wrong'
							}
							resolve(Data)
			 			}else{
			 				for(let key of ress.rows){
			 					if(key.role_type == 'manager'){
			 						Array.push(key)
			 						const Data = {
			 							'success':true,
			 							'message':Array
			 						}
			 						resolve(Data)
			 					}
			 				}
			 			}
		 			}
				})	
		 	}else{
		 		const Data = {
		 			'success':false,
		 			'message':'company id compalsary'
		 		}
		 		resolve(Data)
		 	}
		}else{
		 	const Data = {
		 		'success':false,
		 		'message':'you have no permission to show list'
		 	}
		 	resolve(Data)
		}
	})
}

// ==================  company_admin_list  ====================
//get
module.exports.company_admin_list = (user,company_id) => {
	return new Promise((resolve,reject)=>{
		try{
			const role_id = user.role_id
			const Array = []
			if(role_id == 2 || role_id == 1){
				if(company_id != ''){
			 		const sql1 = `select c.status,c.company_name,r.id,r.first_name,r.last_name,r.email,r.role_type from create_company as c inner join registration as r on c.company_id = r.company_id where c.company_id='${company_id}'`;
			 		client.query(sql1,(err,ress)=>{
			 			if(ress.rows == ''){
			 				const Data = {
			 					'success':false,
			 					'message':'company name not found'
			 				}
			 				resolve(Data)
			 			}else{
				 			if(err){
								const Data = {
									'success':false,
									'message':'Something went wrong'
								}
								resolve(Data)
				 			}else{
				 				for(let key of ress.rows){
				 					if(key.status == 0){
					 					if(key.role_type == 'admin'){
					 						Array.push(key)
					 						const Data = {
					 							'success':true,
					 							'message':Array
					 						}
					 						resolve(Data);
					 					}else{
					 						const Data = {
					 							'success':false,
					 							'message':"admin not found"
					 						}
					 						resolve(Data);
					 					}
				 					}else{
				 						const Data = {
				 							'success':false,
				 							'message':'this admin company was deleted'
				 						}
				 						resolve(Data);
				 					}
				 				}
				 			}
			 			}
					})	
			 	}else{
			 		const Data = {
			 			'success':false,
			 			'message':'company name compalsary'
			 		}
			 		resolve(Data);
			 	}
			}else{
			 	const Data = {
			 		'success':false,
			 		'message':'only company admin can show list'
			 	}
			 	resolve(Data);
			}
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}	

// ==================  company_user_list  ====================
//get
module.exports.company_user_list = (user,company_id) => {
	return new Promise((resolve,reject)=>{
		try{
			const role_id = user.role_id
			const Array = []
			if(role_id == 2 || role_id == 1 || role_id == 3){
				if(company_id != ''){
			 		const sql1 = `select company_id from registration where company_id = '${company_id}' and status = '${0}' `;
			 		client.query(sql1,(err,ress)=>{
			 			// resolve(ress.rows)
			 			if(ress.rows == ''){
			 				const Data = {
			 					'success':false,
			 					'message':'company not found'
			 				}
			 				resolve(Data);
			 			}else{
				 			if(err){
								const Data = {
									'success':false,
									'message':'Something went wrong'
								}
								resolve(Data)
				 			}else{
				 				var id;
				 				for(let key of ress.rows){
				 					id = key.company_id;
				 				}
				 				const user = `select * from registration where company_id = '${id}' and role_id = '${4}' and status = '${0}' `
				 				client.query(user,(err,userress)=>{
				 					if(err){
				 						const userData = {
				 							'success':false,
				 							'message':'something wrong'
				 						}
				 						resolve(userData)
				 					}else{
				 						if(userress.rows == ''){
				 							const Data = {
				 								'success':false,
				 								'message':'user not found'
				 							}
				 							resolve(Data)
				 						}else{
											const data = [];
											for(let key of userress.rows ){
												var alldata = {
													id 			:key.id,
													first_name	:key.first_name,
													last_name 	:key.last_name,
													email 		:key.email,
													role 		:key.role_type,
													company_name:key.company_name,
													company_id  :key.company_id,
													create_by   :key.create_by
												};
												data.push(alldata);
										
											}
											const Data = {
												"success":true,
												"data":data
											}
											resolve(Data);
				 						}
				 					}
				 				})
						
				 			}
			 			}
					})	
			 	}else{
			 		const Data = {
			 			'success':false,
			 			'message':'company name compalsary'
			 		}
			 		resolve(Data);
			 	}
			}else{
			 	const Data = {
			 		'success':false,
			 		'message':'you have no permission for show list'
			 	}
			 	resolve(Data);
			}
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}	


// ==================  company_delete  ====================
//delete
module.exports.company_delete = (role_id,id) => {
	return new Promise((resolve,reject)=>{
		try{
			if(role_id == 1){
				if(id != ''){
			 		const search = `select * from create_company where company_id = '${id}'`;
			 		client.query(search,(err,searchress)=>{
			 			if(searchress.rows == ''){
							const Data = {
								'success':false,
								'message':'company_id not found'
							}
							resolve(Data)
			 			}else{
			 				// const del = `update create_company set status = '${1}'
			 				//  where company_id = '${ress.rows[0].company_id}' `
			 				const del = `delete from create_company where company_id = '${searchress.rows[0].company_id}' `
			 				client.query(del,(err,delress)=>{
			 					if(err){
			 						const Data = {
			 							'success':false,
			 							'message':'something wenth wrong'
			 						}
			 						resolve(Data)
			 					}else{
			 						/*const delreg = `update registration set status = '${1}'
			 						 where company_id = '${ress.rows[0].company_id}' `*/
			 						const delreg = `delete from registration where company_id = '${searchress.rows[0].company_id}' `
					 				client.query(delreg,(err,delregress)=>{
					 					if(err){
					 						const Data = {
					 							'success':false,
					 							'message':'something wenth wrong in registration table'
					 						}
					 						resolve(Data)
					 					}else{
					 						const Data = {
					 							'success':true,
					 							'message':'Company Delete Successfully'
					 						}
					 						resolve(Data)
					 					}
					 				})
					 			}
			 				})
			 			}
					})	
			 	}else{
			 		const Data = {
			 			'success':false,
			 			'message':'company_id compalsary'
			 		}
			 		resolve(Data)
			 	}
			}else{
			 	const Data = {
			 		'success':false,
			 		'message':'only super admin can delete company'
			 	}
			 	resolve(Data)
			}
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}	

// ==================  company_edit  ====================
//put
module.exports.company_edit = (user,body) => {
	return new Promise((resolve,reject)=>{
		try{
			const company_id		= user.company_id;
			const id 				= user.id;
			const role_id 			= user.role_id;
			const company_name 		= body.company_name;
			const company_address 	= body.company_address;
			const company_phone 	= body.company_phone;
			const comp_email 		= body.comp_email;

			if(id != '' && company_name != '' && company_address != '' && company_phone != '' && comp_email != ''){
				if(role_id == 2){
					if(id != ''){
				 		const sql1 = `select * from create_company where company_id = '${company_id}'`;
				 		client.query(sql1,(err,ress)=>{
				 			if(ress.rows == ''){
								const Data = {
									'success':false,
									'message':'company_id not found'
								}
								resolve(Data)
				 			}else{
				 				const sql1 = `update create_company set company_name = '${company_name}',company_address = '${company_address}',company_phone = '${company_phone}',comp_email = '${comp_email}' where company_id = '${company_id}' `
				 				client.query(sql1,(err,ress1)=>{
				 					if(err){
				 						const Data = {
				 							'success':false,
				 							'message':'something wenth wrong create_company'
				 						}
				 						resolve(Data)
				 					}else{
						 				const sql2 = `update registration set email = '${comp_email}' where id = '${id}' `
						 				client.query(sql2,(err,ress1)=>{
						 					if(err){
						 						const Data = {
						 							'success':false,
						 							'message':'something wenth wrong'
						 						}
						 						resolve(Data)
						 					}else{
						 						const Data = {
						 							'success':true,
						 							'message':'Company Update Successfully'
						 						}
						 						resolve(Data)
						 					}
						 				})
				 					}
				 				})
				 			}
						})	
				 	}else{
				 		const Data = {
				 			'success':false,
				 			'message':'company_id compalsary'
				 		}
				 		resolve(Data)
				 	}
				}else{
				 	const Data = {
				 		'success':false,
				 		'message':'only for company Company Admin'
				 	}
				 	resolve(Data)
				}
			}else{
				const Data = {
					'success':false,
					'message':'some field are missing'
				}
				resolve(Data)
			}
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})

}	

// ==================  dhashbord  ====================
//get
module.exports.dhashbord = (role_id) => {
	return new Promise((resolve,reject)=>{
		try{
			if(role_id == 1){
		 		const sql1 = `select count(status) from create_company where status = '${0}'`;
		 		client.query(sql1,(err,companycount)=>{ 			
		 			if(err){
						const Data = {
							'success':false,
							'message':'Something went wrong'
						}
						resolve(Data)
		 			}else{
						const sql1 = `select count(start_date) from research where final_date <= '${myDate}' `
						client.query(sql1,(err,surveycount)=>{
							if(err){
								const reshData = {
									'success':false,
									'message':'something went wrong'
								}
								resolve(reshData)
							}else{
							const sql2 = `select count(final_date) from research where final_date >= '${myDate}' `
							client.query(sql2,(err,surveycount1)=>{
								if(err){
									const reshData = {
										'success':false,
										'message':'something went wrong'
									}
									resolve(reshData)
									}else{
										const allData = {
											"success":true,
											'message':{
												'totalCompany':companycount.rows,
												'runningSurvey':surveycount1.rows,
												'compeleteSurvey':surveycount.rows
											}
										}
											resolve(allData)
									}
								})
					
							}
						})
					}
				})	
			}else{
			 	const Data = {
			 		'success':false,
			 		'message':'only superadmin can access'
			 	}
			 	resolve(Data)	
			}
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}


// ==================  company_admin_delete_module  ====================
//delete
module.exports.company_admin_delete_module = (body,user) => {
	return new Promise((resolve,reject)=>{
		try{
			const id = body.id;
			const role_id = user.role_id;
			const company_id = user.company_id;
			if(id != ''){
			 	if(role_id == 2){
			 		const sql1 = `select * from registration where id ='${id}' and company_id = '${company_id}' `;
			 		client.query(sql1,(err,admindel)=>{
						if(admindel.rows == ''){
							const Datacheck = {
								"success":false,
								"message":"This Id is Not my Company so Can't deleted"
							}
							resolve(Datacheck)
						}else{
							const role = admindel.rows[0].role_id;
							const id1  = admindel.rows[0].id;
							if(role == 3 || role == 4){
						 		 const sql = `delete from registration where id = '${id1}'`;
								 client.query(sql,(err,del)=>{
								 	if(err){
								 		const admindeleteData = {
								 			"success" : false,
								 			"message":"Something Went Wrong"
								 		}
								 		resolve(admindeleteData)
								 	}else{
								 		const admindeleteData = {
								 			"success" : true,
								 			"message":"Delete Successfully"
								 		}
								 		resolve(admindeleteData)
								 	}
								 })	
							}else{
								const Data = {
									'success':false,
									'message':'you Have no Permission for delete this Id'
								}
								resolve(Data);
							}
						}
			 		})
			 	}else{
			 		const Data = {
			 			"success" : false,
			 			"message":"Only Admin Can Delete any Module"
			 		}
			 		resolve(Data);
			 	}
			}else{
				const Data = {
					'success':false,
					'message':'give id'
				}
			 	resolve(Data);
			}
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}


//=====================  company_admin_profile  =========================
//get

module.exports.company_admin_profile = (user) => {
	return new Promise((resolve,reject)=>{
		try{
			const role_id 		= user.role_id;
		 	const company_id 	= user.company_id;
		 	const id 			= user.id;
		    if(role_id == 2){
			   	const sql = `select * from registration where company_id = '${company_id}' and id = '${id}'`;
				client.query(sql,(err,ress)=>{
					if(err){
						const Data = {
							"success":false,
							"message":"Something Went Wrong"
						}
						resolve(Data)
					}else{
						const data = [];
						for(let key of ress.rows){
							if(key.status == 0){
								var alldata = {
									id 			:key.id,
									first_name	:key.first_name,
									last_name 	:key.last_name,
									email 		:key.email,
									role 		:key.role_type,
									company_name:key.company_name
								};
								data.push(alldata)
							}else{
								const Data = {
									'success':false,
									'message':'this Admin was deleted'
								}
							}					
						}
						const Data = {
							"success":true,
							"data":data
						}
						resolve(Data)
					}
			 	})
		    }else{
			   	const Data = {
			   		"success":false,
			   		'message':'This is not A Admin'
			   	}
			   	resolve(Data)
		    }
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}

//=====================  company_admin_updatepro  =========================
//put

module.exports.company_admin_updatepro = (body,user) => {
	return new Promise((resolve,reject)=>{
		try{
		 	const company_id 	= user.company_id;
		 	const role_id 		= user.role_id;
		 	const id 			= user.id;
		 	const first_name 	= body.first_name
		 	const last_name 	= body.last_name
		 	const email 		= body.email
		  	if(role_id == 2){
		  		if(first_name != '' && last_name != '' && email != ''){
		  			const sql = `select * from registration where company_id = '${company_id}' and id = '${id}'`;
		   			client.query(sql, (err,ress)=>{
		   				if(err){
		   					const Data = {
		   						'success':false,
		   						'message':'something wrong'
		   					}
		   					resolve(Data)
		   				}else{
		   					const update = `update registration set first_name = '${first_name}',email = '${email}',last_name = '${last_name}' where id = '${id}' `;
		   					client.query(update, (err, updateress)=>{
		   						if(err){
		   							const updateData = {
		   								'success':false,
		   								'message':'Email already Exists'
		   							}
		   							resolve(updateData)	   				
		   						}else{
		   							const updateData = {
		   								'success':true,
		   								'message':'Update Successfully'
		   							}
		   							resolve(updateData)	 
		   						}
		   					})
		   				}
		   			})
		  		}else{
			  		const Data = {
			  			'success':false,
			  			'message':'Please fill all field'
			  		}
			  		resolve(Data)
		  		}
		  	}else{
		  		const Data = {
		  			'success':false,
		  			'message':'You are Not Login With Admin'
		  		}
		  		resolve(Data)
		  	}
	  	}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}


// ==================  company_admin_dashboard  ====================
//post
module.exports.company_admin_dashboard = (user) => {
	return new Promise((resolve,reject)=>{
		try{
			const role_id = user.role_id;
			const company_id = user.company_id;
			if(role_id == 2){
		 		const manager = `select count(status) from registration where company_id = '${company_id}' and role_id = '${3}' and status = '${0}'`;
		 		client.query(manager,(err,managercount)=>{ 			
		 			if(err){
						const CountData = {
							'success':false,
							'message':'Something went wrong reg'
						}
						resolve(CountData)
		 			}else{
				 		const user = `select count(status) from registration where company_id = '${company_id}' and role_id = '${4}' and status = '${0}'`;
				 		client.query(user,(err,usercount)=>{ 			
				 			if(err){
								const CountData = {
									'success':false,
									'message':'Something went wrong registration'
								}
								resolve(CountData)
				 			}else{
								const compeleteSurvey = `select count(start_date) from research where company_id = '${company_id}' and final_date <= '${myDate}' `
								client.query(compeleteSurvey,(err,surveycount)=>{
									if(err){
										const reshData = {
											'success':false,
											'message':'something went wrong research'
										}
										resolve(reshData)
									}else{
									const runningSurvey = `select count(final_date) from research where company_id = '${company_id}' and final_date >= '${myDate}' `
									client.query(runningSurvey,(err,surveycount1)=>{
										if(err){
											const reshData = {
												'success':false,
												'message':'something went wrong res'
											}
											resolve(reshData)
											}else{
												const allData = {
													"success":true,
													'message':{
														'totalManager':managercount.rows,
														'totalUser':usercount.rows,
														'compeleteSurvey':surveycount.rows,
														'runningSurvey':surveycount1.rows,
													}
												}
													resolve(allData)
											}
										})
							
									}
								})

				 			}
				 		})
	 				}
				})	
			}else{
			 	const Data = {
			 		'success':false,
			 		'message':'only Company Admin can access'
			 	}
			 	resolve(Data)	
			}
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
 }


//=====================  company_profile  =========================
//get

module.exports.company_profile = (user) => {
	return new Promise((resolve,reject)=>{
		try{
			const role_id 		= user.role_id;
		 	const company_id 	= user.company_id;
		    if(role_id == 2){
			   	const sql = `select * from create_company where company_id = '${company_id}' and status = '${0}' `;
				client.query(sql,(err,ress)=>{
					if(err){
						const Data = {
							"success":false,
							"message":"Something Went Wrong"
						}
						resolve(Data)
					}else{
						if(ress.rows == ''){
							const Data = {
								'success':false,
								'message':'Company Not Found '
							}
							resolve(Data)
						}else{
							const data = [];
							for(let key of ress.rows){
								var alldata = {
									company_name 	: key.company_name,
									company_address : key.company_address,
									company_phone 	: key.company_phone,
									comp_email		: key.comp_email
 
								};
								data.push(alldata)
							}
							const Data = {
								"success":true,
								"data":data
							}
							resolve(Data)
						}
					}
			 	})
		    }else{
			   	const Data = {
			   		"success":false,
			   		'message':'This is not A Admin'
			   	}
			   	resolve(Data)
		    }
	    }catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}
 // ====================  company_add_user1 =================
//post
module.exports.company_add_user = (body,user) => {
	return new Promise((resolve,reject)=>{
		try{
			const company_name 		= user.company_name;
			const company_id 		= user.company_id;
			const role_id1 			= user.role_id;
			const id 				= user.id
			const first_name 	 	= body.first_name;
			const email 			= body.email;
			const role_id 			= '4';
			const role_type 		= 'user';
			const create_by 		= user.role_type;
			const last_name 	 	= body.last_name;
			const confirm_password 	= 'none';
			const status 			= 0;
			if(role_id1 == 2 || role_id1 == 3){
				const user1 = `select * from registration where email = '${email}' and super_id = '${id}'`
				client.query(user1, (err, userress) => {
					if(err){
						const userData = {
							'success':false,
							'message':'something wrong'
						}
						resolve(userData)
					}else{
						if(userress.rows ==''){
							if(first_name != '' && email != '' && create_by != '' && last_name != ''){
								var password = generator.generate({
					                length: 10,
					                numbers: true
					            });
									bcrypt.genSalt(10, function(err,salt){
						          	if(err){
						               const Data = {
						               	"success" : false,
						               	'message':'password not generate'
						               }
						               resolve(Data)
						          	}
									bcrypt.hash(password,10,function(err,hash){
										// if(role_id == 4){
										const sql1 = `insert into registration(first_name,email,password,role_id,role_type,super_id,create_by,last_name,confirm_password,company_name,company_id,status)
										values('${first_name}','${email}','${hash}','${role_id}','${role_type}','${id}','${create_by}','${last_name}','${confirm_password}','${company_name}','${company_id}','${status}')`;
										client.query(sql1,(err,ress1)=>{
											if(err){
												const Data = {
													"success":false,
													"message":'Sorry This Email Already Exists'
												}
												resolve(Data)
											}else{
												const Data = {
													"success":true,
													"message":'Registation Successfully'
												}
												resolve(Data)
											}
										});				
								})
								})
							}else{
								const Data = {
									"success":false,
									"message":"Please fill All Field"
								}
								resolve(Data)
							}
						}else{
							const Data = {
								"success":false,
								"message":"This user email already exist in this manager"
							}
							resolve(Data)
						}
					}
				})
			}else{
				const Data = {
					'success':false,
					'message':'you have no permission to create user'
				}
				resolve(Data)
			}
		}catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}

//=====================  admin_user_chart  =========================
//get

module.exports.admin_user_chart = (user,body) => {
	return new Promise((resolve,reject)=>{
		try{
			const id 	  = body.id;
			const resId   = body.res_id;
			const role_id = user.role_id;
			const id1 	  = user.company_id;
		    if(role_id == 2 || role_id == 3 || role_id == 1){
			   	const sql = `select count(s.user_id) from survey_status as s inner join research as r on s.survey_id = r.res_id where s.survey_id = '${resId}' `;
				client.query(sql,(err,ress)=>{
					if(err){
						const Data = {
							"success":false,
							"message":"Something Went Wrong"
						}
						resolve(Data)
					}else{
						// resolve(ress.rows)
						if(ress.rows[0].count == 0){
							const Data = {
								'success':false,
								'message':'User not found'
							}
							resolve(Data)
						}else{
							// resolve(ress.rows);
							const submitUser = `select count(s.user_id) from survey_status as s inner join research as r on s.survey_id = r.res_id where s.survey_id = '${resId}' and s.status = '${true}' `
			   				client.query(submitUser,(err,subuser)=>{
			   					if(err){
			   						const Data = {
			   							'success':false,
			   							'message':'something wrong in resarch'
			   						}
			   						resolve(Data)
			   					}else{
									if(subuser.rows == ''){
										const Data = {
											'success':false,
											'message':'company manager not found'
										}
										resolve(Data)
									}
									const Data = {
										"success":true,
										"totalInvitedUser":ress.rows,
										"totalSubmitedUser":subuser.rows
									}
									resolve(Data)
			   					}
			   				})
						}
					}
			 	})
		    }else{
			   	const Data = {
			   		"success":false,
			   		'message':'You have no permission'
			   	}
			   	resolve(Data)
		    }
	    }catch(error){
			const Data = {
				'status':false,
				'message':error
			}	
			resolve(Data);		
		}
	})
}