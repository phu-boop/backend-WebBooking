import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import emailController from '../controllers/emailController';
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.DisplayCRUD);
    router.get('/edit-crud', homeController.EditCRUD);
    router.post('/put-crud', homeController.PutCRUD);
    router.get('/delete-crud', homeController.DeleteCRUD);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.get('/api/edit-user', userController.handleEditUser);
    router.post('/api/put-user', userController.handlePutUser);
    router.get('/api/delete-user', userController.handleDeleteUser);
    //
    router.post('/api/login', userController.handleLogin);
    router.post('/api/send-email', emailController.handleSendEmail);
    router.post('/api/verify-email', emailController.handleVerifyOTP);
    return app.use('/', router);

}

module.exports = initWebRoutes;