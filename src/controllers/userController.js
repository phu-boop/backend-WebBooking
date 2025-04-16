import UserServices from '../services/UserServices';
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode: 1 ,
            message: 'Missing inputs parameter'
        });
    }
    let userData = await UserServices.handleUserLogin(email, password);
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
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}