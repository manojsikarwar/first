const Company = require('../Controller/company_manager1');


module.exports.company_manager_profile = (req, res, next)=>{
 	const user= req.user;

	Company.company_manager_profile(user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.company_user_reg = (req, res, next)=>{
	const body = req.body;
	const user = req.user;

	Company.company_user_reg(body,user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.company_manager_delete_module = (req, res, next)=>{
 	const user   = req.user;
 	const body	 = req.body;

	Company.company_manager_delete_module(body,user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}

module.exports.company_manager_updatepro = (req, res, next)=>{
 	const user   = req.user;
 	const body	 = req.body;

	Company.company_manager_updatepro(body,user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}

module.exports.manager_user_list = (req, res, next)=>{
 	const user   = req.user;

	Company.manager_user_list(user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}

module.exports.company_user_delete = (req, res, next)=>{
 	const user   = req.user;
 	const body   = req.body;

	Company.company_user_delete(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}

module.exports.company_manager_survey = (req, res, next)=>{
 	const user   = req.user;
 	const body   = req.body;

	Company.company_manager_survey(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}
module.exports.company_manager_dashboard = (req, res, next)=>{
 	const user   = req.user;

	Company.company_manager_dashboard(user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}
// module.exports.company_manager_dashboard = (req, res, next)=>{
// 	const user = req.user;

// 	Company.company_manager_dashboard(user)
// 	.then((Data)=>{
// 		res.json(Data);
// 	}).catch((err)=>res.json({'success':false,'message':'err'}));
// }