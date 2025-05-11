import UserServices from '../services/UserServices';
let handleLogin = async (req, res) => {
    let email = req.body.email;
    if(!email){
        return res.status(500).json({
            errCode: 1 ,
            message: 'Missing inputs parameter'
        });
    }
    let userData = await UserServices.handleUserLogin(email);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    });
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    
    if (!id){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
            users: [],
        });
    }
    let users = await UserServices.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users,
    });
}
let handleCreateNewUser = async (req, res) => {
    let message = await UserServices.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
            user: {},
        });
    }
    let user = await UserServices.getUserById(userId);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        user,
    });
}
let handlePutUser = async (req, res) => {
    let data = req.body;
    let message = await UserServices.updateUserData(data);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    let userId = req.query.id;
    if (!userId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter',
        });
    }
    let message = await UserServices.deleteUserById(userId);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handlePutUser: handlePutUser,
    handleDeleteUser: handleDeleteUser,
}