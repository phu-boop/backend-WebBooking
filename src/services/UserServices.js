import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (!isExist) {
                userData.errCode = 0;
                userData.errMessage = 'Email not Register!';
            }else{
                userData.errCode = 0;
                userData.errMessage = 'Email Registered!';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                attributes: ['email'],
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
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password_hash'],
                    },
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password_hash'],
                    },
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let emailExist = await checkUserEmail(data.email);
            if (emailExist === true) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Email already exists!',
                });
            }
            let hashUserPassword = await bcrypt.hashSync(data.password, salt);
            let createUser = await db.User.create({
                email: data.email,
                password_hash: hashUserPassword,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                address: data.address,
                role: data.role,
                business_name: data.business_name,
                business_license: data.business_license,
            });
            if (createUser) {
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

let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password_hash'],
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
};

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
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone: data.phone,
                    address: data.address,
                    role: data.role,
                    business_name: data.business_name,
                    business_license: data.business_license,
                },
                {
                    where: { id: data.id },
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
            if (!user) {
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
};

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};