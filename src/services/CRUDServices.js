import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password_hash: hashPasswordFromBcrypt,
                first_name: data.firstName,
                last_name: data.lastName,
                address: data.address,
                phone: data.phonenumber,
                role: data.roleId,
                business_name: data.business_name,
                business_license: data.business_license,
            });
            resolve('Create new user succeed!');
        } catch (e) {
            reject(e);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
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
                raw: true,
            });
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (user) {
                user.email = data.email;
                user.first_name = data.firstName;
                user.last_name = data.lastName;
                user.address = data.address;
                user.phone = data.phonenumber;
                user.role = data.roleId;
                user.business_name = data.business_name;
                user.business_license = data.business_license;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
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
            if (user) {
                await user.destroy();
            }
            resolve('ok');
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};