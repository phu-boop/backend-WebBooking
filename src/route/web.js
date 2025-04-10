import express from 'express';
import homeController from '../controllers/homeController';
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.DisplayCRUD);
    router.get('/edit-crud', homeController.EditCRUD);
    router.post('/put-crud', homeController.PutCRUD);
    router.get('/delete-crud', homeController.DeleteCRUD);
    return app.use('/', router);

}

module.exports = initWebRoutes;