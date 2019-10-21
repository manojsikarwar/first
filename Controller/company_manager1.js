const client 		= require('../db');
const bcrypt 		= require('bcrypt');
const nodemailer	= require('nodemailer');
const generator 	= require('generate-password');
const moment 		= require('moment');
const date   		= new Date();
const myDate 		= moment(date).format('L');
const jwt			= require('jsonwebtoken');


//=======================  company_manager_profile  =========================
//get
module.exports.company_manager_profile = (user) => {
    return new Promise((resolve, reject) => {
    	try{
	        const role_id = user.role_id;
	        const company_id = user.company_id;
	        const id = user.id;
	        if (role_id == 3) {
	            const sql = `select * from registration where company_id = '${company_id}' and id = '${id}'`;
	            client.query(sql, (err, ress) => {
	                if (err) {
	                    const Data = {
	                        "success": false,
	                        "message": "Something Went Wrong"
	                    }
	                    resolve(Data)
	                } else {
	                    const data = [];
	                    for (let key of ress.rows) {
	                        if (key.status == 0) {
	                            var alldata = {
	                                id: key.id,
	                                first_name: key.first_name,
	                                last_name: key.last_name,
	                                email: key.email,
	                                role: key.role_type,
	                                company_name: key.company_name

	                            };
	                            data.push(alldata)
	                        } else {
	                            const Data = {
	                                'success': false,
	                                'message': 'this manager was deleted'
	                            }
	                        }
	                    }
	                    const Data = {
	                        "success": true,
	                        "data": data
	                    }
	                    resolve(Data)
	                }
	            })
	        } else {
	            const Data = {
	                "success": false,
	                'message': 'This is not A Manager'
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

// =========================  company_user_reg =================
//post
module.exports.company_user_reg = (body,user) => {
		return new Promise((resolve,reject)=>{
		try{
			const company_name 		= user.company_name;
			const company_id 		= user.company_id;
			const role_id1 			= user.role_id;
			const id 				= user.id
			const first_name 	 	= body.first_name;
			const email 			= body.email;
			const password			= body.password;
			const role_id 			= '4';
			const role_type 		= 'user';
			const create_by 		= user.role_type;
			const last_name 	 	= body.last_name;
			const confirm_password 	= 'none';
			const status 			= 0;
			if(role_id1 == 3 || role_id1 == 2){
				if(first_name != '' && email != '' && password != '' && role_id != '' 
					&& role_type != '' && create_by != '' && last_name != '' 
					&& confirm_password != ''){
					bcrypt.hash(password,10,function(err,hash){
						if(role_id == 4){
							const user = `select email from registration where company_id = '${company_id}' and super_id = '${id}' and email = '${email}' `
							client.query(user,(err,userress)=>{
								if(userress.rows == ''){
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
								
								}else{
										const userData = {
										'success':false,
										'message':'already create this user by this manager'
									}
									resolve(userData)
								}
							})
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
			}else{
				const Data = {
					'success':false,
					'message':'only company manager and admin can create company user'
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


// ==================  company_manager_delete_module  ====================
//delete
module.exports.company_manager_delete_module = (body,user) => {
	return new Promise((resolve,reject)=>{
		try{
			const id = body.id;
			const role_id = user.role_id;
			const company_id = user.company_id;
		 	if(role_id == 3){
		 		const sql1 = `select * from registration where id ='${id}' and company_id = '${company_id}' `;
		 		client.query(sql1,(err,managerdel)=>{
					if(managerdel.rows == ''){
						const Datacheck = {
							"success":false,
							"message":"This Id is Not my Company so Can't deleted"
						}
						resolve(Datacheck)
					}else{
						const role = managerdel.rows[0].role_id;
						if(role == 4){
					 		const sql = `delete from registration where id = '${id}'`;
							client.query(sql,(err,del)=>{
							 	if(err){
							 		const managerdeleteData = {
							 			"success" : false,
							 			"message":"Something Went Wrong"
							 		}
							 		resolve(managerdeleteData)
							 	}else{
							 		const managerdeleteData = {
							 			"success" : true,
							 			"message":"Delete Successfully"
							 		}
							 		resolve(managerdeleteData)
							 	}
							})	
						}else{
							const Data = {
								'success':false,
								'message':'you Have no Permission for delete this Id'
							}
							resolve(Data)
						}
					}
		 		})
		 	}else{
		 		const Data = {
		 			"success" : false,
		 			"message":"Only Manager Can Delete any Module"
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

//=====================  company_manager_updatepro  =========================
//put

module.exports.company_manager_updatepro = (body,user) => {
	return new Promise((resolve,reject)=>{
		try{
		 	const company_id 	= user.company_id;
		 	const role_id 		= user.role_id;
		 	const id 			= user.id;
		 	const first_name 	= body.first_name
		 	const last_name 	= body.last_name
		 	const email 		= body.email
		  	if(role_id == 3){
		  		if(first_name != '' && last_name != '' && email != ''){
		  			const sql = `select * from registration where company_id = '${company_id}' and id = '${id}' `;
		   			client.query(sql, (err,ress)=>{
		   				if(err){
		   					const Data = {
		   						'success':false,
		   						'message':'something wrong'
		   					}
		   					resolve(Data);
		   				}else{
		   					const update = `update registration set
		   						first_name = '${first_name}',
		   						email = '${email}',
		   						last_name = '${last_name}'
		   						where id = '${id}' `;
		   					client.query(update, (err, updateress)=>{
		   						if(err){
		   							const updateData = {
		   								'success':false,
		   								'message':'Email already Exists'
		   							}
		   							resolve(updateData);   				
		   						}else{
		   							const updateData = {
		   								'success':true,
		   								'message':'Update Successfully'
		   							}
		   							resolve(updateData);	 
		   						}
		   					})
		   				}
		   			});
		  		}else{
			  		const Data = {
			  			'success':false,
			  			'message':'Please fill all field'
			  		}
			  		resolve(Data);
		  		}
		  	}else{
		  		const Data = {
		  			'success':false,
		  			'message':'You are Not Login With Manager'
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
	});
}


//====================== manager_user_list  =========================
//get

module.exports.manager_user_list = (user) => {
    return new Promise((resolve, reject) => {
        try {
            const role_id = user.role_id;
            const company_id = user.company_id;
            const id = user.id;
            if (role_id == 3) {
                const sql = `select * from registration where company_id = '${company_id}' and super_id = '${id}' and role_id = '${4}' and status = '${0}'`;
                client.query(sql, (err, userlist) => {
                    if (err) {
                        const Data = {
                            "success": false,
                            "message": "Something Went Wrong"
                        }
                        resolve(Data);
                    } else {
                        if (userlist == '') {
                            const Data = {
                                'success': false,
                                'message': 'Not Found userlist'
                            }
                            resolve(Data);
                        } else {
                            if (userlist.rows == '') {
                                const Data = {
                                    'success': false,
                                    'message': 'user not found'
                                }
                                resolve(Data);
                            } else {
                                const data = [];
                                for (let key of userlist.rows) {
                                    var alldata = {
                                        id: key.id,
                                        first_name: key.first_name,
                                        last_name: key.last_name,
                                        email: key.email,
                                        role: key.role_type,
                                        company_name: key.company_name,
                                        company_id: key.company_id
                                    };
                                    data.push(alldata);
                                }
                                const Data = {
                                    "success": true,
                                    "data": data
                                }
                                resolve(Data);
                            }

                        }
                    }
                });
            } else {
                const Data = {
                    "success": false,
                    'message': 'Only Manager Can show user list'
                }
                resolve(Data);
            }
        } catch (error) {
            const Data = {
                'status': false,
                'message': error
            }
            resolve(Data);
        }
    });
}
//====================== company_user_delete  =========================
//delete
module.exports.company_user_delete = (user, body) => {
    return new Promise((resolve, reject) => {
        try {
            const role_id = user.role_id;
            const company_id = user.company_id;
            const id = body.id;
            if (id != '') {
                if (role_id == 3 || role_id == 2) {
                    const sql = `select * from registration where company_id = '${company_id}' and id = '${id}' `;
                    client.query(sql, (err, userdelete) => {
                        if (userdelete.rows == '') {
                            const Datacheck = {
                                "success": false,
                                "message": "This User Id is Not my Company so Can't deleted"
                            }
                            resolve(Datacheck);
                        } else {
                            const role = userdelete.rows[0].role_id;
                            if (role == 4) {
                                const sql = `delete from registration where id = '${id}'`;
                                client.query(sql, (err, del) => {
                                    if (err) {
                                        const Datacheck = {
                                            "success": false,
                                            "message": "Something Went Wrong"
                                        }
                                        resolve(Datacheck);
                                    } else {
                                        const Datacheck = {
                                            "success": true,
                                            "message": "Delete Successfully"
                                        }
                                        resolve(Datacheck);
                                    }
                                });
                            } else {
                                const Data = {
                                    'success': false,
                                    'message': 'you Have no Permission for delete this Id'
                                }
                                resolve(Data);
                            }
                        }
                    });
                } else {
                    const Data = {
                        "success": false,
                        'message': 'You Have not Permission for delete user list'
                    }
                    resolve(Data);
                }
            } else {
                const Data = {
                    'success': false,
                    'message': 'Please Fill Id'
                }
                resolve(Data);
            }
        } catch (error) {
            const Data = {
                'status': false,
                'message': error
            }
            resolve(Data);
        }
    });
}

//====================== company_manager_survey  =========================
//post
module.exports.company_manager_survey = (user, body) => {
    return new Promise((resolve, reject) => {
        try {
            const role_id = user.role_id;
            const id = body.id;
            const company_id = user.company_id;
            if (id != '') {
                if (role_id == 3 || role_id == 2) {
                    const sql = `select res_id,title,desc1,start_date,final_date from research where id = '${id}' and company_id = '${company_id}'`
                    client.query(sql, async (err, ress) => {
                        if (err) {
                            const Data = {
                                'success': false,
                                'message': 'something went wrong'
                            }
                            resolve(Data);
                        } else {
                            if (ress.rows == '') {
                                const Data = {
                                    'success': false,
                                    'message': 'Survey not create by this id'
                                }
                                resolve(Data)
                            } else {
                                const Data = {
                                    'success': true,
                                    'message': ress.rows
                                }
                                resolve(Data);
                            }
                        }
                    });
                } else {
                    const Data = {
                        'success': false,
                        'message': 'You have not Permission to Show manager suvey list'
                    }
                    resolve(Data);
                }
            } else {
                const Data = {
                    'success': false,
                    'message': 'Please give id'
                }
                resolve(Data);
            }
        } catch (error) {
            const Data = {
                'status': false,
                'message': error
            }
            resolve(Data);
        }
    });
}
// ==================  company_manager_dashboard  ====================
//post
module.exports.company_manager_dashboard = (user) => {
    return new Promise((resolve, reject) => {
        try {
            const role_id = user.role_id;
            const company_id = user.company_id;
            const id = user.id;
            if (role_id == 3) {
                const user = `select count(status) from registration where company_id = '${company_id}' and super_id = '${id}' and role_id = '${4}' and status = '${0}'`;
                client.query(user, (err, usercount) => {
                    if (err) {
                        const CountData = {
                            'success': false,
                            'message': 'Something went wrong reg'
                        }
                        resolve(CountData);
                    } else {
                        const compeleteSurvey = `select count(start_date) from research where id = '${id}' and final_date <= '${myDate}' `
                        client.query(compeleteSurvey, (err, surveycount) => {
                            if (err) {
                                const reshData = {
                                    'success': false,
                                    'message': 'something went wrong research'
                                }
                                resolve(reshData);
                            } else {
                                const runningSurvey = `select count(final_date) from research where id = '${id}' and final_date >= '${myDate}' `
                                client.query(runningSurvey, (err, surveycount1) => {
                                    if (err) {
                                        const reshData = {
                                            'success': false,
                                            'message': 'something went wrong res'
                                        }
                                        resolve(reshData);
                                    } else {
                                        const allData = {
                                            "success": true,
                                            'message': {
                                                'totalUser': usercount.rows,
                                                'compeleteSurvey': surveycount.rows,
                                                'runningSurvey': surveycount1.rows
                                            }
                                        }
                                        resolve(allData);
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                const Data = {
                    'success': false,
                    'message': 'only Company Admin can access'
                }
                resolve(Data);
            }
        } catch (error) {
            const Data = {
                'status': false,
                'message': error
            }
            resolve(Data);
        }
    });
}