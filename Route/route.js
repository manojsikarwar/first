const express 		= require('express');
const router 		= express.Router();
const Superadmin 	= require('./superadmin1');
const Admin 		= require('./admin');
const Manager 		= require('./manager');
const User 			= require('./user');
const App 			= require('./app');
const Survey 	 	= require('./questions');
const Company 		= require('./company');
const Companymanager= require('./company_manager');
const Controller 	= require('../Controller/file_upload');
const {userAuthenticator} = require('../middlewares/authenticator');

//==================== file_upload =================================

router.post('/file_upload', Controller.file_upload);

// ===================  Super Admin  =================================

router.post('/login',Superadmin.login);
router.post('/create_company',[userAuthenticator],Superadmin.create_company);
router.get('/super_view_profile',[userAuthenticator],Superadmin.super_view_profile);
router.post('/super_forget_password',Superadmin.super_forget_password);
router.post('/super_change_password',[userAuthenticator],Superadmin.super_change_password);
router.put('/profle_update',[userAuthenticator],Superadmin.profle_update);
router.delete('/super_delete_costumer',[userAuthenticator],Superadmin.super_delete_costumer);


// ===================  Admin  =================================

router.post('/costumer_admin_reg',Admin.costumer_admin_reg);
router.post('/admin_change_password',[userAuthenticator],Admin.admin_change_password);
router.get('/admin_view_profle',[userAuthenticator],Admin.admin_view_profle);
router.put('/admin_update_profle',[userAuthenticator],Admin.admin_update_profle);
router.get('/manager_list',[userAuthenticator],Admin.manager_list);
router.delete('/admin_delete_manager',[userAuthenticator],Admin.admin_delete_manager);

// ===================  Manager  =================================

router.post('/costumer_manager_reg',Manager.costumer_manager_reg);
router.get('/manager_profile',[userAuthenticator],Manager.manager_profile);
router.post('/manager_change_password',[userAuthenticator],Manager.manager_change_password);
router.put('/manager_update_profile',[userAuthenticator],Manager.manager_update_profile);
router.get('/user_list',[userAuthenticator],Manager.user_list);
router.delete('/manager_delete_user',[userAuthenticator],Manager.manager_delete_user);


// ===================  User  =================================

router.post('/costumer_user_reg',User.costumer_user_reg);
router.get('/user_profile',[userAuthenticator],User.user_profile);
router.post('/user_change_password',[userAuthenticator],User.user_change_password);
router.put('/user_update_profile',[userAuthenticator],User.user_update_profile);
router.get('/user_company_list',[userAuthenticator],User.user_company_list);


// ===================  App  =================================

router.post('/app/Registration',App.Registration_app);
router.post('/app/login_app',App.login_app);
router.post('/app/forget_password',App.forget_password);


// =================== Company admin ===========================
router.post('/company_create_module',[userAuthenticator],Company.company_create_module);
router.get('/company_manager_list/:company_id',[userAuthenticator],Company.company_manager_list);
router.get('/company_admin_list/:company_id',[userAuthenticator],Company.company_admin_list);
router.get('/company_user_list/:company_id',[userAuthenticator],Company.company_user_list);
router.get('/company_list',[userAuthenticator],Company.company_list);
router.delete('/company_delete',[userAuthenticator],Company.company_delete);
router.put('/company_edit',[userAuthenticator],Company.company_edit);
router.get('/dhashbord',[userAuthenticator],Company.dhashbord);
router.delete('/company_admin_delete_module',[userAuthenticator],Company.company_admin_delete_module)
router.get('/company_admin_profile',[userAuthenticator],Company.company_admin_profile);
router.put('/company_admin_updatepro',[userAuthenticator],Company.company_admin_updatepro);
router.get('/company_admin_dashboard',[userAuthenticator],Company.company_admin_dashboard);
router.post('/company_add_user',[userAuthenticator],Company.company_add_user);
router.get('/company_profile',[userAuthenticator],Company.company_profile);
router.post('/admin_user_chart',[userAuthenticator],Company.admin_user_chart);

// ==================== company managers ====================

router.get('/company_manager_profile',[userAuthenticator],Companymanager.company_manager_profile);
router.post('/company_user_reg',[userAuthenticator],Companymanager.company_user_reg);
router.delete('/company_manager_delete_module',[userAuthenticator],Companymanager.company_manager_delete_module);
router.put('/company_manager_updatepro',[userAuthenticator],Companymanager.company_manager_updatepro);
router.get('/manager_user_list',[userAuthenticator],Companymanager.manager_user_list);
router.delete('/company_user_delete',[userAuthenticator],Companymanager.company_user_delete);
router.post('/company_manager_survey',[userAuthenticator],Companymanager.company_manager_survey);
router.get('/company_manager_dashboard',[userAuthenticator],Companymanager.company_manager_dashboard);

// ===================  Survey ==============================

router.post('/insert',[userAuthenticator],Survey.insert);
router.get('/total_survey',[userAuthenticator],Survey.total_survey);
router.post('/submit_answer',Survey.submit_answer);
router.get('/survey_details/:id',Survey.survey_details);
router.get('/survey_submited_list/:survey_id',Survey.survey_submited_list);
router.get('/surveyuser_ans_list/:user_id',Survey.surveyuser_ans_list);
// router.get('/complete_survey',Survey.complete_survey)
router.get('/example', Survey.example);




module.exports=router;