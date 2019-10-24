const Ques = require('../Controller/questions1');


module.exports.example = (req, res, next)=>{
	Ques.example()
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.insert = (req, res, next)=>{
	const body = req.body;
	const user = req.user;
	Ques.insert(body,user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.submit_answer = (req, res, next)=>{
	const body = req.body;
	Ques.submit_answer(body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.total_survey = (req, res, next)=>{
	const user = req.user;

	Ques.total_survey(user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

/*module.exports.complete_survey = (req, res, next)=>{
	const body = req.body

	Ques.complete_survey(body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}*/

module.exports.survey_details = (req, res, next)=>{
     const id = req.params.id;   
	Ques.survey_details(id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.survey_submited_list = (req, res, next)=>{
    const survey_id = req.params.survey_id;   
	Ques.survey_submited_list(survey_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.surveyuser_ans_list = (req, res, next)=>{
	const user = req.user;
	const body = req.body;
	Ques.surveyuser_ans_list(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}