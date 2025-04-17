import db from '../models/index';
import bcrypt, { hash } from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if (isExist){
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found!';
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = 'Email is not exist in your system. Please try other email!';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let emailExist = await checkUserEmail(data.email);
            if(emailExist === true) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Email already exists!',
                }); 
            }
            let hashUserPassword = await bcrypt.hashSync(data.password, salt);
            let creteUser = await db.User.create({
                email: data.email,
                password: hashUserPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            });
            if (creteUser) {
                resolve({
                    errCode: 0,
                    message: 'ok',
                });
            }
        }catch (e) {
            reject(e);
        }
    });
}
let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password'],
                },
            });
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    });
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let emailExist = await checkUserEmail(data.email);
            if (emailExist === true) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Email already exists!',
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (!user) {
                return resolve({
                    errCode: 2,
                    errMessage: 'User not found!',
                });
            }
            let putUser = await db.User.update(
                {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                },
                {
                    where: { id: data.id }, // Điều kiện where để xác định bản ghi
                }
            );
            if (putUser) {
                resolve({
                    errCode: 0,
                    message: 'ok',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            });
            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: 'User not found!',
                });
            }
            await db.User.destroy({
                where: { id: userId },
            });
            resolve({
                errCode: 0,
                message: 'ok',
            });
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};