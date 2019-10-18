const User 	= require('../Controller/costumer_user');


module.exports.costumer_user_reg = (req, res, next)=>{
	const body = req.body;
	const user = req.user

	User.costumer_user_reg(body,user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.user_change_password = (req, res, next)=>{
	const user = req.user;
	const body = req.body;

	User.user_change_password(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.user_profile = (req, res, next)=>{
	const id 		= req.user.id;
	const role_id 	= req.user.role_id;

	User.user_profile(id,role_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.user_update_profile = (req, res, next)=>{
	const user = req.user;
	const body = req.body;

	User.user_update_profile(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.user_company_list	 = (req, res, next)=>{
	const role_id = req.user.role_id;

	User.user_company_list(role_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

