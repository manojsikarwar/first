const client 		= require('../db');
const bcrypt 		= require('bcrypt');
const nodemailer	= require('nodemailer');
const generator 	= require('generate-password');
const jwt			= require('jsonwebtoken');
const moment 		= require('moment');
const date   		= new Date();
const myDate 		= moment(date).format('lll');

// =========================  costumer_user_reg =================
//post
module.exports.costumer_user_reg = (body,user) => {
	return new Promise((resolve,reject)=>{
	const company_name 		= 'none';
	const company_id 		= 0;
	const first_name 	 	= body.first_name;
	const email 			= body.email;
	const password			= body.password;
	const super_id 			= '1';
	const role_id 			= '4';
	const role_type 		= 'user';
	const create_by 		= 'user';
	const last_name 	 	= body.last_name;
	const confirm_password 	= 'none';
	const status 			= 0;
		if(first_name != '' && email != '' && password != '' && role_id != '' && role_type != '' && create_by != '' && last_name != '' && confirm_password != ''){
			bcrypt.hash(password,10,function(err,hash){
				if(role_id == 4){
					const sql1 = `insert into registration(first_name,email,password,
					role_id,role_type,super_id,create_by,last_name,confirm_password,
					company_name,company_id,status)
					values(
					'${first_name}','${email}','${hash}','${role_id}','${role_type}',
					'${super_id}','${create_by}','${last_name}','${confirm_password}',
					'${company_name}','${company_id}','${status}'
					)`;
					console.log(sql1)
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
				}else{
					const Data = {
						"success":false,
						"message":"You Hame no Permission For Registration"
					}
					resolve(Data)
				}
			})
		}else{
			const Data = {
				"success":false,
				"message":"Please fill All Field"
			}
			resolve(Data)
		}
	})
}

//=======================  user_profile  =========================
//get
module.exports.user_profile = (id,role_id) => {
	return new Promise((resolve,reject)=>{
	   if(role_id == 4){
		   	const sql = `select * from registration where id = '${id}' `;
			client.query(sql,(err,ress)=>{
				if(err){
					res.json({"Message":"Something Went Wrong"})
				}else{
					const data = [];
					for(let key of ress.rows){
						var alldata = {
							id 			:key.id,
							first_name 	:key.first_name,
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
		   		'message':'This is not A User'
		   	}
		   	resolve(Data)
	   	}
	})
}

//======================  user_change_password  ================
//Post
module.exports.user_change_password = (user,body) => {
	return new Promise((resolve,reject)=>{
	    const id  		  = user.id;
	    const role_id 	  = user.role_id;
	    const oldpassword = body.oldpassword;
	    const newpassword = body.newpassword;
	   if(oldpassword != '' && newpassword != ''){
		    if(role_id == 4){
			    bcrypt.hash(newpassword,10,function(err,hash){
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

//=========================  user_update_profile  ============================
//Put
module.exports.user_update_profile = (user,body) => {
	return new Promise((resolve,reject)=>{
	    const id 		= user.id;
	    const role_id 	= user.role_id;
	    const first_name= body.first_name;
	    const last_name	= body.last_name;
	    const email 	= body.email;
	    if(first_name != '' && last_name != '' && email != ''){
		    if(role_id == 4){
		   		const sql = `update registration set 
		   		first_name = '${first_name}',
		   		last_name = '${last_name}',
		   		email = '${email}'
		   		 where id ='${id}' `;
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
		}else{
	    	const Data = {
	    		"success":false,
	    		"message":"all Field Fill Compalsary"
	    	}
	    	resolve(Data)
		}
	})
}

//=========================   user_company_list  =================================
//get
module.exports.user_company_list = (role_id) => {
	return new Promise((resolve,reject)=>{
		if(role_id == 4){
			const sql = `select * from create_company`;
			client.query(sql,(err,result)=>{
				if(err){
					const Data = {
						"success":false,
						'message':'something went wrong'
					}
					resolve(Data)
				}else{
					const data = [];
					for(let key of result.rows){
						const alldata = {
							company_id    	: key.company_id,
							company_name  	: key.company_name,
							company_address : key.company_address,
							company_phone  	: key.company_phone
						}
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
				"message":"you Have no Permission to See Company List"
			}
			resolve(Data)
		}
	})
}
