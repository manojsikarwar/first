const Manager = require('../Controller/custumer_manager');


module.exports.costumer_manager_reg = (req, res, next)=>{
	const body = req.body;

	Manager.costumer_manager_reg(body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.manager_profile = (req, res, next)=>{
   const id = req.user.id;
   const role_id = req.user.role_id

	Manager.manager_profile(id,role_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.manager_change_password = (req, res, next)=>{
	const user = req.user;
	const body = req.body;

	Manager.manager_change_password(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.manager_update_profile = (req, res, next)=>{
	const user = req.user;
	const body = req.body;

	Manager.manager_update_profile(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.user_list = (req, res, next)=>{
	const role_id = req.user.role_id;

	Manager.user_list(role_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.manager_delete_user = (req, res, next)=>{
 	const id 		= req.body.id;
 	const role_id 	= req.user.role_id;

	Manager.manager_delete_user(id,role_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}
