const Company = require('../Controller/company_admin');



module.exports.company_create_module = (req, res, next)=>{
 	const user 		= req.user;
 	const body 		= req.body;
	Company.company_create_module(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.company_list = (req, res, next)=>{
 	const user 		= req.user;

	Company.company_list(user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}
 					
module.exports.company_manager_list = (req, res, next)=>{
 	const user 		= req.user;
 	const company_id= req.params.company_id;

	Company.company_manager_list(user,company_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.company_admin_list = (req, res, next)=>{
 	const user 		= req.user;
 	const company_id= req.params.company_id;

	Company.company_admin_list(user,company_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.company_user_list = (req, res, next)=>{
 	const user 		= req.user;
 	const company_id= req.params.company_id;

	Company.company_user_list(user,company_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.company_delete = (req, res, next)=>{
 	const role_id	= req.user.role_id;
 	const id 		= req.body.company_id;

	Company.company_delete(role_id,id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.company_edit = (req, res, next)=>{
 	const user = req.user;
 	const body = req.body;

	Company.company_edit(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.dhashbord = (req, res, next)=>{
 	const role_id	= req.user.role_id;

	Company.dhashbord(role_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}


module.exports.company_admin_delete_module = (req, res, next)=>{
 	const user   = req.user;
 	const body	 = req.body;

	Company.company_admin_delete_module(body,user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}

module.exports.company_admin_profile = (req, res, next)=>{
 	const user= req.user;

	Company.company_admin_profile(user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.company_admin_updatepro = (req, res, next)=>{
 	const user   = req.user;
 	const body	 = req.body;

	Company.company_admin_updatepro(body,user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}


module.exports.company_admin_dashboard = (req, res, next)=>{
 	const user   = req.user;

	Company.company_admin_dashboard(user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}


module.exports.company_add_user = (req, res, next)=>{
 	const body	 = req.body;
 	const user   = req.user;

	Company.company_add_user(body,user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}

module.exports.company_profile = (req, res, next)=>{
 	const user= req.user;

	Company.company_profile(user)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}