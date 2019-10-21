const client = require('../db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const moment = require('moment');
const date = new Date();
const myDate = moment().format('L');;
const jwt = require('jsonwebtoken');
const mailer = require('express-mailer');


// ================= research ===============================
//post
var sendEmailToCustomer = (invite_id, email, name) => {
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
            from: '"Pink Panther" <test@engineermaster.in>',
            to: email,
            subject: 'Pink Panther Survey',
            text: 'Click here to submit survey https://clever-agnesi-4b2774.netlify.com/user-survey/' + invite_id
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve(info)
        });
    });
}

module.exports.insert = (body, user) => {
    return new Promise(async(resolve, reject) => {
        try {
            const role_id = user.role_id;
            const company_id = user.company_id;
            const id = user.id;
            var title
            var desc1
            var question_count
            var invited_users_count
            var start_date;
            var end_date;
            var survey_submited = 1;
            const created_at = myDate;
            const updated_at = myDate;

            var question_type
            var question
            var options_count
            var redirection_type
            var redirection_count

            var question_id
            var option_value
            var number_id

            var min
            var max
            var question_index

            const survey_id = body.survey_id
            const invited_at = myDate;
            const is_submit = 0
            const submit_at = myDate
            var body1;
            var res_id;
            var Array = [];

            title = body.title;
            desc1 = body.description;
            start_date = body.startDate;
            end_date = body.endDate;

            question_count = body.questions.length;
            invited_users_count = body.users.length;
            if (role_id == 2 || role_id == 3) {
                const sql = `insert into research(title,desc1,question_count,invited_users_count,start_date,final_date,created_at,survey_submited,id,company_id) 
					 values('${title}','${desc1}','${question_count}','${invited_users_count}','${start_date}','${end_date}','${created_at}','${survey_submited}','${id}','${company_id}') RETURNING res_id`;
                client.query(sql, (err, ress) => {
                    if (err) {
                        const Data = {
                            'success': false,
                            'message': 'something went wrong in research table'
                        }
                        resolve(Data)
                    } else {
                        res_id = ress.rows[0].res_id;
                        for (let invited_user of body.users) {
                            const user_id = invited_user;
                            const sql6 = `insert into invited_user(user_id, survey_id,invited_at, is_submit, submit_at)
							 values('${user_id}','${res_id}','${invited_at}','${is_submit}','${submit_at}') RETURNING id`
                            client.query(sql6, (err, ress6) => {
                                if (err) {
                                    const Data = {
                                        'success': false,
                                        'message': 'something went wrong in invited user'
                                    }
                                    resolve(Data)
                                } else {
                                    let invited_id = ress6.rows[0].id;
                                    const userName = `select first_name,last_name from registration where id = '${user_id}' `
                                    client.query(userName, (err, userNameress) => {
                                        if (err) {
                                            const Data = {
                                                'success': false,
                                                'message': 'wrong in registration file'
                                            }
                                            resolve(Data)
                                        } else {
                                            for (let key1 of userNameress.rows) {
                                                const first_name = key1.first_name;
                                                const last_name = key1.last_name;
                                                let status = 'false';
                                                const status1 = `insert into survey_status(invited_id,user_id,created_at,updated_at,status,survey_id,first_name,last_name)
												values('${invited_id}','${user_id}','${myDate}','${myDate}','${status}','${res_id}','${first_name}','${last_name}') `
                                                console.log(status1)
                                                client.query(status1, (err, statusress) => {
                                                    if (err) {
                                                        const Data = {
                                                            'success': false,
                                                            'message': 'wrong in registration file'
                                                        }
                                                        resolve(Data)
                                                    } else {
                                                        if (statusress) {} else {
                                                            const statusData = {
                                                                'success': true,
                                                                'message': 'something wrong in survey status'
                                                            }
                                                            resolve(statusData)
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                    const sql7 = `select email, first_name from registration where id = '${user_id}'`
                                    client.query(sql7, (err, ress7) => {
                                        if (err) {
                                            const Data = {
                                                'success': false,
                                                'message': 'user email not found'
                                            }
                                            resolve(Data)
                                        } else {
                                            var inv_email = ress7.rows[0].email;
                                            var inv_fname = ress7.rows[0].first_name;
                                            sendEmailToCustomer(invited_id, inv_email, inv_fname);
                                        }
                                    })
                                }
                            })
                        }
                        for (let item1 of body.questions) {
                            question = item1.title.trim();
                            question_type = item1.type.trim();
                            number = item1.number;
                            redirection_type = item1.type.trim();
                            options_count = item1.options.length;
                            redirection_count = item1.redirections.length;
                            const sql1 = `insert into questions(research_id,question_type,question,options_count,redirection_type,created_at,updated_at,redirection_count,number) 
                            values('${res_id}','${question_type}','${question}','${options_count}','${redirection_type}','${created_at}','${updated_at}','${redirection_count}','${number}') RETURNING q_id`;
                            client.query(sql1, (err, ress1) => {
                                if (err) {
                                    const Data = {
                                        'success': false,
                                        'message': 'something went wrong in questions table'
                                    }
                                    resolve(Data)
                                } else {

                                    let question_id = ress1.rows[0].q_id;
                                    for (let opt of item1.options) {
                                        const sql2 = `insert into options(question_id,created_at,updated_at,option_value) 
										values('${question_id}','${created_at}','${updated_at}','${opt.value}')`
                                        client.query(sql2, (err, ress2) => {
                                            if (err) {
                                                const Data = {
                                                    'success': false,
                                                    'message': 'something went wrong in options table'
                                                }
                                                resolve(Data)
                                            }
                                        })
                                    }
                                    for (let redir of item1.redirections) {
                                        min = redir.min_value
                                        max = redir.max_value
                                        question_index = redir.question
                                        const sql5 = `insert into redirection(question_id,question_index,created_at,updated_at,min,max) 
										values('${question_id}','${question_index}','${created_at}','${updated_at}','${min}','${max}')`
                                        client.query(sql5, (err, ress2) => {
                                            if (err) {
                                                const Data = {
                                                    'success': false,
                                                    'message': 'something went wrong in redirection table'
                                                }
                                                resolve(Data)
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        const Data = {
                            'success': true,
                            'message': 'insert successfully'
                        }
                        resolve(Data)
                    }
                })
            } else {
                const Data = {
                    'success': false,
                    'message': 'only Admin and Manager can survey'
                }
                resolve(Data)
            }
        } catch (error) {
            const Data = {
                'status': false,
                'message': error
            }
            resolve(Data);
        }
    })
}

// =================  total_survey ===========================
//get
module.exports.total_survey = (user) => {
    return new Promise((resolve, reject) => {
        try {
            const role_id = user.role_id;
            const company_id = user.company_id;
            if (role_id == 2) {
                const sql = `select res_id,title,desc1,start_date,final_date from research where company_id = '${company_id}' `
                client.query(sql, async(err, ress) => {
                    if (err) {
                        const Data = {
                            'success': false,
                            'message': 'something went wrong'
                        }
                        resolve(Data);
                    } else {
                        const Data = {
                            'success': true,
                            'message': ress.rows
                        }
                        resolve(Data);
                    }
                });
            } else {
                const Data = {
                    'success': false,
                    'message': 'Only Admin Can show Total survey'
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

//==================== example ========================//
module.exports.example = (body) => {
    return new Promise((resolve, reject) => {
        const sql7 = `select email, first_name from registration where id = '234'`
        client.query(sql7, (err, ress7) => {
            if (err) {
                const Data = {
                    'success': false,
                    'message': 'user email not found'
                }
                resolve(Data)
            } else {
                resolve(ress7.rows[0]);
            }
        })
    });
}


//===================== survey_details =====================
//get
module.exports.survey_details = (id) => {
        return new Promise((resolve, reject) => {
            try {
                const sql = `select r.email, r.first_name, i.user_id,i.id, s.res_id,s.title, s.desc1, s.start_date, s.final_date, ss.status from invited_user as i inner join registration as r on i.user_id = r.id inner join research s on i.survey_id=s.res_id inner join survey_status as ss on i.id = ss.invited_id where i.id = '${id}' `
                client.query(sql, async(err, ress) => {
                    if (err) {
                        const Data = {
                            'success': false,
                            'message': 'something went wrong',
                            'err': err
                        }
                        resolve(Data)
                    } else {
                        if (ress.rows.length > 0) {
                            let data = ress.rows[0];
                            let research_id = data.res_id;
                            let questions = [];
                            const sqlFetchQ = `select * from questions where research_id = '${research_id}' `;

                            let questionsData = await client.query(sqlFetchQ);
                            if (questionsData.rows.length > 0) {
                                let question_data = questionsData.rows;
                                for (let que of question_data) {
                                    let q_id = que.q_id;

                                    let optionsArray = [];
                                    let redirectionArray = [];

                                    const sqlFetchOpt = `select option_value from options where question_id = '${q_id}'`;
                                    let resOpt = await client.query(sqlFetchOpt)
                                    optionsArray = resOpt.rows;

                                    const sqlFetchRed = `select min, max, question_index from redirection where question_id = '${q_id}' `
                                    let resRed = await client.query(sqlFetchRed)
                                    redirectionArray = resRed.rows;

                                    questions.push({
                                        'q_id': q_id,
                                        'question': que.question,
                                        'question_type': que.question_type,
                                        'options': optionsArray,
                                        'redirection': redirectionArray
                                    });
                                }
                            }
                            let finalArray = {
                                'result': true,
                                'user': {
                                    'email': data.email,
                                    'name': data.first_name,
                                    'user_id': data.user_id,
                                    'invited_id': data.id,
                                    'status': data.status
                                },
                                'survey': {
                                    'survey_id': data.res_id,
                                    'title': data.title,
                                    'description': data.desc1,
                                    'start_date': data.start_date,
                                    'final_date': data.final_date,
                                    'question': questions

                                }
                            }
                            resolve(finalArray);
                        } else {
                            let finalArray = {
                                'result': false,
                                'message': 'Survey not found'
                            }
                            resolve(finalArray);
                        }
                    }
                })
            } catch (error) {
                const Data = {
                    'status': false,
                    'message': error
                }
                resolve(Data);
            }
        })
    }
    //======================= submit_answer =======================
    //post

module.exports.submit_answer = (body) => {
        return new Promise((resolve, reject) => {
            try {
                const invited_id = body.invited_id;
                const user_id = body.user_id;
                const created_at = myDate;

                for (let ques of body.survey) {
                    const q_id = ques.q_id;
                    const answer = ques.answer;

                    const submit_answer = `insert into answer values('${invited_id}','${user_id}','${q_id}','${answer}','${created_at}') RETURNING invited_id`
                    client.query(submit_answer, (anserr, ressans) => {
                        if (anserr) {
                            const Data = {
                                'success': false,
                                'message': 'something went wrong'
                            }
                            resolve(Data);
                        } else {}
                    })
                }

                const status = `select invited_id,status from survey_status where invited_id = '${invited_id}' `
                client.query(status, (err, statusress) => {
                    if (statusress.rows == '') {
                        const statusData = {
                            'success': false,
                            'message': 'invited id not found'
                        }
                        resolve(statusData);
                    } else {
                        for (let key of statusress.rows) {
                            const str = key.status.trim();
                            if (str == "false") {
                                const statusUpdate = `update survey_status set updated_at = '${myDate}',status = '${true}' where invited_id = '${key.invited_id}' `
                                client.query(statusUpdate, (err, updateress) => {
                                    if (err) {
                                        const updateData = {
                                            'success': false,
                                            'message': 'not Update survey_status'
                                        }
                                        resolve(updateData);
                                    } else {
                                        const updateData = {
                                            'success': true,
                                            'message': 'survey submited'
                                        }
                                        resolve(updateData);
                                    }
                                })

                            } else {
                                const Data = {
                                    'success': false,
                                    'message': 'You have already submit survey'
                                }
                                resolve(Data);
                            }
                        }
                    }
                })
            } catch (error) {
                const Data = {
                    'status': false,
                    'message': error
                }
                resolve(Data);
            }
        })
    }
    //===================== survey_submited_list =====================
    //get
module.exports.survey_submited_list = (survey_id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `select * from survey_status where survey_id = '${survey_id}' `
            client.query(sql, async(err, ress) => {
                if (err) {
                    const Data = {
                        'success': false,
                        'message': 'something went wrong',
                        'err': err
                    }
                    resolve(Data);
                } else {
                    if (ress.rows == '') {
                        const Data = {
                            'success': false,
                            'data': 'Survey id not found'
                        }
                        resolve(Data)
                    } else {
                        var status = ress.rows[0].status.trim();
                        if(status == true){
                            const Data = {
                                'success':false,
                                'data':ress.rows
                            }
                            resolve(Data)
                        }else{
                            const Data = {
                                'success':true,
                                'data':ress.rows
                            }
                            resolve(Data)
                        }
                    }
                }
            })
        } catch (error) {
            const Data = {
                'status': false,
                'message': error
            }
            resolve(Data);
        }
    })
}

//===================== surveyuser_ans_list =====================
//get
module.exports.surveyuser_ans_list = (user,user_id) => {
    return new Promise((resolve, reject) => {
        try {
            const role_id = user.role_id;
            if (role_id == 4 || role_id == 2 || role_id == 3) {
                const sql = `select s.user_id,q.question,a.answer from survey_status as s inner join answer as a on s.user_id = a.user_id inner join questions as q on q.q_id = a.question_id where s.user_id = '${user_id}' `;
                client.query(sql, async(err, ress) => {
                    if (err) {
                        const Data = {
                            'success': false,
                            'message': 'something wrong'
                        }
                        resolve(Data);
                    } else {
                        if (ress.rows == '') {
                            const Data = {
                                'success': false,
                                'message': 'Survey not submited'
                            }
                            resolve(Data);
                        } else {
                            const Data = {
                                'success': true,
                                'data': ress.rows
                            }
                            resolve(Data);
                        }
                    }
                })
            } else {
                const Data = {
                    'success': false,
                    'message': 'You Have No Permission'
                }
                resolve(Data);;
            }
        } catch (err) {
            const Data = {
                'status': false,
                'message': 'error'
            }
            resolve(Data);
        }
    })
}