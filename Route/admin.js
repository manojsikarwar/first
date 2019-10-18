const Admin = require('../Controller/custumer_admin');


module.exports.costumer_admin_reg = (req, res, next)=>{
	const body = req.body;

	Admin.costumer_admin_reg(body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.admin_change_password = (req, res, next)=>{
	const user = req.user;
	const body = req.body;

	Admin.admin_change_password(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.admin_view_profle = (req, res, next)=>{
	const id = req.user.id;

	Admin.admin_view_profle(id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.admin_update_profle = (req, res, next)=>{
	const user = req.user;
	const body = req.body;

	Admin.admin_update_profle(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.manager_list = (req, res, next)=>{
	const role_id = req.user.role_id;

	Admin.manager_list(role_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.admin_delete_manager = (req, res, next)=>{
 	const id 		= req.body.id;
 	const role_id 	= req.user.role_id;

	Admin.admin_delete_manager(id,role_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}
