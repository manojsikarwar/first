const client 		= require('../db');
const bcrypt 		= require('bcrypt');
const nodemailer	= require('nodemailer');
const generator 	= require('generate-password');
const moment 		= require('moment');
const date   		= new Date();
const myDate 		= moment(date).format('lll');
const jwt			= require('jsonwebtoken');


// ================= login =========================
//post

module.exports.login=(email,password)=>{
	return new Promise((resolve,reject)=>{
		if(email != '' && password != ''){
			const sql = `select * from registration where email ='${email}'`;
			client.query(sql,(err,result)=>{
				if(result.rows == ''){
					const Data = {
						"success" : false,
						"message":'Invalid Email Id'
					}
					resolve(Data)
				}else{
					if(result.rows[0].status == 0){
						for(let key of result.rows){
							const role_id = key.role_id;
							if(role_id == 1){
								if(key){
									bcrypt.compare(password,key.password,(err,isMatch)=>{
							    		if(isMatch == true){
							    			var token =jwt.sign({
							  						id 		: key.id,	
							                    	email 	: key.email,
							                    	role_id : key.role_id,
							                    	role_type:key.role_type,
							                    	company_name:key.company_name,
						                    		company_id:key.company_id
												},'secret',{ expiresIn: "365 days" });

							                    //res.json(token)
							                	const Data = {
							                    'success': true,
							                    'message': "Login Successfuly of Super Admin",
							                    'token': token,
							                    'data': key
							               	 }
							               	 resolve(Data)
							    		}else{
							    				const Data = {
							                    'success': false,
							                    'message': "Password incorrect"
							               	 }
							               	 resolve(Data)
							    		}
							    	});
								}else{
									const Data = {
										 'success': false,
							             'message': 'Couldnt find your Account'
									}
									resolve(Data)
								}
							}
							if(role_id == 2){
								if(key){
									bcrypt.compare(password,key.password,(err,isMatch)=>{
							    		if(isMatch == true)
							    		{
							    			var token =jwt.sign({
							  						id 		: key.id,	
							                    	email 	: key.email,
							                    	role_id : key.role_id,
							                    	role_type:key.role_type,
							                    	company_name:key.company_name,
						                    		company_id:key.company_id
												},'secret',{ expiresIn: "365 days" });

							                    //res.json(token)
							                	const Data = {
							                    'success': true,
							                    'message': "Login Successfuly of Admin",
							                    'token': token,
							                    'data': key
							               	 }
							               	 resolve(Data)
							    		}else{
							    				const Data = {
							                    'success': false,
							                    'message': "Password incorrect"
							               	 }
							               	 resolve(Data)
							    		}
						    		});
								}else{
									const Data = {
										 'success': false,
							             'message': 'Couldnt find your Account'
									}
									resolve(Data)
								}
							}
							if(role_id == 3){
								if(key){
									bcrypt.compare(password,key.password,(err,isMatch)=>{
							    		if(isMatch == true)
							    		{
							    			var token =jwt.sign({
							  						id 		: key.id,	
							                    	email 	: key.email,
							                    	role_id : key.role_id,
							                    	role_type:key.role_type,
							                    	company_name:key.company_name,
						                    		company_id:key.company_id
												},'secret',{ expiresIn: "365 days" });

							                	const Data = {
							                    'success': true,
							                    'message': "Login Successfuly of Manager",
							                    'token': token,
							                    'data': key
							               	 	}
							               	 	resolve(Data)
							    		}else{
							    				const Data = {
							                    'success': false,
							                    'message': "Password incorrect"
							               	 }
							               	 resolve(Data)
							    		}
						    		});
								}else{
									const Data = {
										 'success': false,
							             'message': 'Couldnt find your Account'
									}
								 	resolve(Data)
								}
							}
							if(role_id == 4){
								if(key){
									bcrypt.compare(password,key.password,(err,isMatch)=>{
										//res.json(isMatch)
							    		if(isMatch == true)
							    		{
							    			var token =jwt.sign({
							  						id 		: key.id,	
							                    	email 	: key.email,
							                    	role_id : key.role_id,
							                    	role_type:key.role_type,
							                    	company_name:key.company_name,
						                    		company_id:key.company_id
												},'secret',{ expiresIn: "365 days" });

							                    //res.json(token)
							                	const Data = {
							                    'success': true,
							                    'message': "Login Successfuly of User",
							                    'token': token,
							                    'data': key
							               	 }
							               	 resolve(Data)
							    		}else{
							    				const Data = {
							                    'success': false,
							                    'message': "Password incorrect"
							               	 }
							               	  resolve(Data)
							    		}
						    		});
								}else{
									const Data = {
										 'success': false,
							             'message': 'Not find your Account'
									}
									 resolve(Data)
								}
							}

						}
					}else{
						const Data = {
							'success':false,
							'message':'This company Deleted by super admin'
						}
						resolve(Data)
					}
				}
			})
		}else{
			const Data = {
			    'success': false,
			    'message': "Fill All Field"
		    }
		     resolve(Data)
		}	
	})
	
}			

// ====================== create_company ==================
//post

module.exports.create_company = (super1,body) => {
	return new Promise((resolve,reject)=>{
		const password 	 = body.password;
		bcrypt.hash(password,10,function(err,hash){
			const company_name 		= body.company_name;
			const company_address 	= body.company_address;
			const company_phone 	= body.company_phone;
			const country			= body.country;
			const business_types	= body.business_types;
			const role 				= body.role;
			const job_level 		= body.job_level;
			const survey 			= body.survey;
			const create_by			= 'super admin';
			const email 			= body.email;
			const pass 	 			= hash;
			const role_id 			= '2'

			const role_type 		= 'admin';
			const last_name 	 	= 'none';
			const super_id 			= '1';
			const first_name		= 'none';
			const confirm_password  = 'none';
			const status 			= 0;

			if(super1 == 1){
				if(company_name != '' && company_name != '' && company_address != '' 
				    && company_phone != '' && country != '' && business_types != '' 
				    && role != '' && job_level != '' && survey != '' && create_by != '' 
				    && email != '' && password != '' && role_id != ''){
		 	
					const sql1 = `select * from create_company where comp_email = '${email}'`;
					client.query(sql1,(err,ress1)=>{
						if(ress1.rows != ''){
							const Data = {
								"success" : false,
								"message":"This Company Email Already Exists"
							}
							resolve(Data);
						}else{
							const sql = `insert into create_company(company_name,company_address,
							company_phone,country,business_types,role,job_level,survey,create_by,
							comp_email,password,role_id,status) 
							values(
							'${company_name}','${company_address}','${company_phone}','${country}',
							'${business_types}','${role}','${job_level}','${survey}','${create_by}',
							'${email}','${pass}','${role_id}','${status}')RETURNING company_id`;
							client.query(sql,(err,ress)=>{
								if(err){
									const Data = {
										"success" : false,
										'messege':'something went wrong in create company'
									}
									resolve(Data);
								}else{
									const company_id = ress.rows[0].company_id;
									const sql2 = `insert into registration(first_name,email,password,
									role_id,role_type,super_id,create_by,last_name,confirm_password,
									company_name,company_id,status)
										values(
										'${first_name}','${email}','${hash}','${role_id}','${role_type}',
										'${super_id}','${create_by}','${last_name}','${confirm_password}',
										'${company_name}','${company_id}','${status}'
										) `;
										console.log(sql2)
									client.query(sql2,(err,ress2)=>{
										if(err){
											const Data = {
												'success':false,
												'message':'something went wrong'
											}
											resolve(Data);
										}else{
											const Data = {
												'success':true,
												'message':'Company Create Successfully'
											}
											resolve(Data);
										}
									})
								}
							})
						}
					})
				}else{
					const Data = {
						"success" : false,
						'messege':'Fill All Field'
					}
					resolve(Data);
				}
			}else{
				const Data = {
					'success':false,
					'message':'you have not Right to create company'
				}
				resolve(Data);
			}
		})
	})
}


//=======================  super_admin_profile  =========================
//get

module.exports.super_view_profile = (id,role_id) => {
	return new Promise((resolve,reject)=>{
		 if(role_id == 1){
			const sql = `select * from registration where id = '${id}' `;
			client.query(sql,(err,ress)=>{
				if(err){
					const Data = {
						"success" : false,
						"message":"Something Went Wrong"
					}
					 resolve(Data);
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
						data.push(alldata);
					}
				resolve(data);
				}
		 	})
		}else{
			const Data = {
				"success" : false,
				'message':'This is Not A Super Admin'
			}
			resolve(Data);
		}	
	})
}



//=========================  super_forget_password  =======================
//post
var sendEmailToCustomer = (email, password) => {
	nodemailer.createTestAccount((err, account) => {
		let transporter = nodemailer.createTransport({
			host: 'smtp.googlemail.com', // Gmail Host
			port: 465, // Port
			secure: true, // this is true as port is 465
			auth: {
				user: 'pinkpanther.emaster@gmail.com', //Gmail username
				pass: 'Pink@123#' // Gmail password
			}
		});
	
		let mailOptions = {
			from:'"Pink Panther" <test@engineermaster.in>',
			to: email,
			subject: 'Pink Panther Survey',
			// text: 'Click here to submit survey https://pink-panther.netlify.com/survey-submit/'+invite_id
			text:  'That is the New Password! =   ' + password
		};
	
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			}
			resolve(info);
		});
	});
}

module.exports.super_forget_password = (email) => {
	return new Promise((resolve,reject)=>{
		if(email != ''){
			const sql = `select * from registration where email = '${email}'`;
			client.query(sql,(err,result)=>{
			for(let key of result.rows){
				if(key)
				{
					var password = generator.generate({
		                length: 10,
		                numbers: true
		            });
		            const pass = password;
					bcrypt.genSalt(10, function(err,salt){
			          	if(err){
			               const Data = {
			               	"success" : false,
			               	'message':'password not generate'
			               }
			               resolve(Data)
			          	}
				            bcrypt.hash(password,salt,function(err,hash){
				                if(err){
				                   const Data = {
				                   	"success" : false,
				                   	'message':'someting went wrong'
				                   }
				                   resolve(Data)
				                }else{
				                	password = hash;
					                const sql2 = `update registration set 
					                password='${password}' 
					                where super_id= ${key.super_id}`;

					                 client.query(sql2,(err,result1)=>{
					                 	if(err)
					                 	{
					                 		const Data = {
					                 			"success" : false,
					                 			'message':'Sorry Try Again'
					                 		}
					                 		resolve(Data)
					                 	}
					                    const Data = {
					                    	"success" : true,
					                    	'message':'password Change Successfully',
					                    	'new password':pass
					                    }
					                    resolve(Data)
				                 	})
				                }
				            });
				            sendEmailToCustomer(email,password)
				        });			
					}else{
						const Data = {
							"success" : false,
							"message":'Email not Found'
						}
						resolve(Data)
					}
				}
			})
		}else{
			const Data = {
				"success":false,
				"message":"Please Give Email"
			}
			resolve(Data)
		}
	})
}

//=========================  super_change_password  ============================
//Post
module.exports.super_change_password = (user,body) => {
	return new Promise((resolve,reject)=>{
		const id  		  = user.id;
	    const role_id 	  = user.role_id;
	    const oldpassword = body.oldpassword;
	    const newpassword = body.newpassword;
	   	if(oldpassword != '' && newpassword != ''){
		    if(role_id == 1){ 	
			    bcrypt.hash(newpassword,10,function(err,hash){
			    	const sql1 = `select * from registration where id = '${id}'`;
			    	client.query(sql1,(err,ress1)=>{
			    		const cpass = ress1.rows[0].password; 
			    		if(err){
			    			const Data = {
			    				"success" : false,
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
											"success" : false,
											'message':'Something went wrong'
										}
										resolve(Data)
									}else{
										const Data = {
											"success" : true,
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

//=========================  profle_update  ========================
//put

module.exports.profle_update = (user,body) => {
	return new Promise((resolve,reject)=>{
	   	const id 		= user.id;
	    const role_id 	= user.role_id;

	    if(role_id == 1){
	   		const sql = `update registration set 
	   		first_name = '${body.first_name}',
	   		last_name = '${body.last_name}',
	   		email = '${body.email}'
	   		where id ='${id}' `;
			client.query(sql,(err,result)=>{
				if(err){
					const Data = {
						"success" : false,
						'message':'This Email Already exist'
					}
					resolve(Data)
				}else{
					const Data = {
						"success" : true,
						'message':'Successfuly Update Profile'
					}
					resolve(Data)
				}
			})
	    }else{
	    	const Data = {
	    		"success" : false,
	    		"message":"This is Not a Super Admin Profile So you Can't Update"
	    	}
	    	resolve(Data)
	    }
	})
}


// ==================  delete_costumer  ====================
//delete
module.exports.super_delete_costumer = (role_id,id) => {
	return new Promise((resolve,reject)=>{
		if(id != ''){
		 	if(role_id == 1){
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
		 			"message":"You Have No Permission for Delete any costumer"
		 		}
		 		resolve(Data)
		 	}
		}else{
	 		const Data = {
	 			"success" : false,
	 			"message":"Please Give ID"
	 		}
	 		resolve(Data)
		}
	})
}

