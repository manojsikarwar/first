const Super = require('../Controller/superadmin');



module.exports.login = (req, res, next)=>{
	const email = req.body.email;
	const password = req.body.password 
      //console.log(email,password)
	Super.login(email,password)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.create_company = (req, res, next)=>{
	const super1 	= req.user.role_id;
	const body 	= req.body;

	Super.create_company(super1,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}


module.exports.super_view_profile = (req, res, next)=>{
   const id = req.user.id;
   const role_id = req.user.role_id;

	Super.super_view_profile(id,role_id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.super_forget_password = (req, res, next)=>{
	const email = req.body.email;

	Super.super_forget_password(email)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.super_change_password = (req, res, next)=>{
	const user = req.user;
	const body = req.body;

	Super.super_change_password(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.profle_update = (req, res, next)=>{
    const user = req.user;
    const body = req.body;

	Super.profle_update(user,body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}

module.exports.super_delete_costumer = (req, res, next)=>{
	const role_id 	= req.user.role_id;
	const id 		= req.body.id;

	Super.super_delete_costumer(role_id,id)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>res.json({'success':false,'message':'err'}));
}
