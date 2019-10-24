const client 		= require('../db');
const bcrypt 		= require('bcrypt');
const nodemailer	= require('nodemailer');
const generator 	= require('generate-password');
const jwt			= require('jsonwebtoken');
const moment 		= require('moment');
const date   		= new Date();
const myDate 		= moment(date).format('lll');
//const multer 		= require('multer');
//var fs = require('fs');

 // ================ costumer_manager_reg =================
//post
module.exports.costumer_manager_reg = (body) => {
	return new Promise((resolve,reject)=>{
	const first_name 	 	= body.first_name;
	const email 			= body.email;
	const password			= body.password;
	const role_id			= body.role_id;
	const role_type 		= body.role_type;
	const super_id 			= '1';
	const create_by 		= 'super admin';
	const last_name 	 	= body.last_name;
	const confirm_password 	= body.confirm_password;
	const company_name 		= 'none';
		if(first_name != '' && email != '' && password != '' && role_id != '' && 
			role_type != '' && super_id != '' && create_by != '' && last_name != '' && 
			confirm_password != ''){
			if(password == confirm_password){
				bcrypt.hash(password,10,function(err,hash){
					if(role_id == 3 || role_id == 4){
						const sql = `select * from registration where email = '${email}'`;
						client.query(sql,(err,ress)=>{

							if(ress.rows != '')
							{
								const Data = {
									"success":false,
									"message":'Sorry This Email Already Exists'
								}
								resolve(Data)
							}else{
								const sql1 = `insert into registration(first_name,email,
								    password,role_id,role_type,super_id,create_by,
								    last_name,confirm_password,company_name)
									values(
									'${first_name}','${email}','${hash}','${role_id}','${role_type}',
									'${super_id}','${create_by}','${last_name}','${hash}','${company_name}'
									)`;
								client.query(sql1,(err1,ress1)=>{
									if(err){
										const Data = {
											"success":false,
											"message":'Something Went wrong'
										}
										resolve(Data)
									}else{
										const Data = {
											"success":true,
											"message":'Registation Successfully'
										}
										resolve(Data)
									}
								})	
							}
						})
					}else{
						const Data = {
							"Condition" : false,
							"Message"	: "Please select Right Role Because You Have no Permission for create this Role"
						}
						resolve(Data)
					}

				})
			}else{
				const Data = {
					"success":false,
					"message":"Password must be same"
				}
				resolve(Data)
			}
		}else{		
			const Data = {
				"success":false,
				"message":"Some Field is missing"
			}
			resolve(Data)
		}
	})
}

 //=======================  manager_profile  =========================
//get

module.exports.manager_profile = (id,role_id) => {
	return new Promise((resolve,reject)=>{
	   if(role_id == 3){
		   	const sql = `select * from registration where id = '${id}' `;
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
						var alldata = {
							id 			:key.id,
							first_name	:key.first_name,
							last_name 	:key.last_name,
							email 		:key.email,
							role 		:key.role_type,
							create_by	:key.create_by

						};
						data.push(alldata)
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
		   		'message':'This is not A Manager'
		   	}
		   	resolve(Data)
	   	}

	})
}

//======================  manager_change_password  ================
//Post

module.exports.manager_change_password = (user,body) => {
	return new Promise((resolve,reject)=>{
	    const id  		  = user.id;
	    const role_id 	  = user.role_id;
	    const oldpassword = body.oldpassword;
	    const newpassword = body.newpassword;
		if(oldpassword != '' && newpassword != ''){
		  	if(role_id == 3){
			    bcrypt.hash(newpassword,10,function(err,hash){
			    	//console.log(hash)
			    	const sql1 = `select * from registration where id = '${id}'`;
			    	client.query(sql1,(err,ress1)=>{
			    		const cpass = ress1.rows[0].password; 
			    		if(err){
			    			const Data = {
			    				"success":false,
			    				"message":"Your id not mathched"
			    			}
			    			resolve(Data)
			    		}else{
			    			if(bcrypt.compareSync(oldpassword, cpass)){
							 	const sql = `update registration set 
							 	password = '${hash}',
							 	confirm_password = '${hash}'
							 	where id ='${id}' `;
								client.query(sql,(err,result)=>{
									if(err){
										const Data = {
											"success":false,
											'message':'Something went wrong'
										}
										resolve(Data)
									}else{
										const Data = {
											"success":true,
											'message':'Successfuly Change Password'
										}
										resolve(Data)
									}
								})
						  	}else{
								const Data = {
									"success":false,
									'message':'Please Enter Correct Password'
								}
								resolve(Data)
						  	}
			    		}
			    	})
				})
			}else{
				const Data = {
					"success":false,
					"message":"You Hame no Permission For Change Password"
				}
				resolve(Data)
			}
		}else{
			const Data = {
				"success":false,
				"message":"Please fill All Field"
			}
			resolve(Data)
		}
	})
}


//=========================  manager_update_profile  ============================
//Put

module.exports.manager_update_profile = (user,body) => {
	return new Promise((resolve,reject)=>{
	    const id 		= user.id;
	    const role_id 	= user.role_id;

	    if(role_id == 3){
	   		const sql = `update registration set 
	   		first_name = '${body.first_name}',
	   		last_name = '${body.last_name}',
	   		email = '${body.email}'
	   		where id ='${id}' `;
	   		//console.log(sql)
			client.query(sql,(err,result)=>{
				if(err){
					const Data = {
						"success":false,
						'message':'This Email Already exist'
					}
					resolve(Data)
				}else{
					const Data = {
						"success":true,
						'message':'Successfuly Update Profile'
					}
					resolve(Data)
				}
			})
	    }else{
	    	const Data = {
	    		"success":false,
	    		"message":"This is Not a Manager Profile So you Can't Update"
	    	}
	    	resolve(Data)
	    }
	})
}



 // ==================  manager_delete_user  ====================
//delete
module.exports.manager_delete_user = (id,role_id) => {
	return new Promise((resolve,reject)=>{
	 	if(role_id == 3){
	 		const sql1 = `select * from registration where id ='${id}'`;
	 		client.query(sql1,(err,ress1)=>{
				if(ress1.rows == ''){
					const Data = {
						"success":false,
						"message":"This id is Not Present"
					}
					resolve(Data)
				}else{
			 		 const sql = `delete from registration where id = '${id}'`;
					 client.query(sql,(err,ress)=>{
					 	if(err){
					 		const Data = {
					 			"success" : false,
					 			"message":"Something Went Wrong"
					 		}
					 		resolve(Data)
					 	}else{
					 		const Data = {
					 			"success" : true,
					 			"message":"Delete Successfully"
					 		}
					 		resolve(Data)
					 	}
					 })	
				}
	 		})

	 	}else{
	 		const Data = {
	 			"success" : false,
	 			"message":"You Have no Permission for Delete any Costumer"
	 		}
	 		resolve(Data)
	 	}
	})
}

