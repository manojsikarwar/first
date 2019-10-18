const App = require('../app_api/app_reg');

module.exports.Registration_app = (req, res, next)=>{
	const body = req.body;

	App.Registration_app(body)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}

module.exports.login_app = (req, res, next)=>{
	const email = req.body.email;
	const password = req.body.password

	App.login_app(email,password)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}

module.exports.forget_password = (req, res, next)=>{
	const email = req.body.email;

	App.forget_password(email)
	.then((Data)=>{
		res.json(Data);
	}).catch((err)=>next(err));
}