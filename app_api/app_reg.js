const client 		= require('../db');
const bcrypt 		= require('bcrypt');
const nodemailer	= require('nodemailer');
const generator 	= require('generate-password');
const moment 		= require('moment');
const date   		= new Date();
const myDate 		= moment(date).format('lll');
const jwt			= require('jsonwebtoken');
const multer 		= require('multer');
var fs = require('fs');

// ===================  Registration_app  ============================
//post

module.exports.Registration_app = (body) => {
		return new Promise((resolve,reject)=>{

		 	const first_name 	 	= "none";
			const email 			= body.email;
			const password			= body.password;
			const role_id			= '4';
			const role_type 		= 'user';
			const super_id 			= '1';
			const create_by 		= 'user';
			const last_name 	 	= "none";
			const confirm_password 	= "none";

			if(first_name != '' && email != '' && password != '' && role_id != '' && role_type != '' && super_id != '' && create_by != '' && last_name != '' && confirm_password != ''){
				bcrypt.hash(password,10,function(err,hash){
					if(role_id == 4){
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
								const sql1 = `insert into registration(first_name,email,password,role_id,role_type,super_id,create_by,last_name,confirm_password)
								values(
								'${first_name}','${email}','${hash}','${role_id}','${role_type}',
								'${super_id}','${create_by}','${last_name}','${confirm_password}'
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
					"message":"Some Field is missing"
				}
				resolve(Data)
			}
		})
	}


//=========================  login  ============================
//Post

module.exports.login_app = (email,password) => {
		return new Promise((resolve,reject) => {
			if(email != '' && password != ''){
			const sql = `select * from registration where email ='${email}'`;
			client.query(sql,(err,result) => {
				if(result.rows == ''){
						const Data = {
		                	'success': false,
		                	'message': "Email Invalid"
		            }
		            resolve(Data)
				}else{
					//res.send('success')
			for(let key of result.rows){
				const role_id = key.role_id;
				if(key){
					bcrypt.compare(password,key.password,(err,isMatch)=>{
						//res.json(isMatch)
		    		if(isMatch == true)
		    		{
		    			var token =jwt.sign({
		  						id 		: key.id,	
		                    	email 	: key.email,
		                    	role_id 	: key.role_id
							},'secret',{ expiresIn: "1h" });

		                    //res.json(token)
		                	const Data = {
		                    'success': true,
		                    'message': "Login successful",
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
		}
		})
			}else{
				const Data = {
			                'success': false,
			                'message': "Please Fill all Box"
			            }
			            resolve(Data)
				}
		})
	}

//=========================  super_forget_password  =======================
//post
var sendEmailToCustomer = (email, password) => {
		console.log(email,password)
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
			text:  'That is the New Password! =   ' + password
		};
	
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			}
			resolve(info)
		});
	});
}

module.exports.forget_password = (email) => {
	return new Promise((resolve,reject)=>{
		if(email != ''){
		const sql = `select * from registration where email = '${email}'`;
		client.query(sql,(err,result)=>{
			if(result.rows != ''){
				for(let key of result.rows){
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
	                    	'message':'password Change Successfully'
	                    }
	                    resolve(Data)
	                 })
	                }
	            });
	            sendEmailToCustomer(email,password)
	        });		
	        }	
			}else{
				const Data = {
					"success" : false,
					"message":'Email not Found'
				}
				resolve(Data)
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
