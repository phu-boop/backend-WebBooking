import CRUDServices from '../services/CRUDServices';
let getHomepage = (req, res) => {
    return res.render('homepage.ejs');
}
let getCRUD = (req, res) => {
    return res.render('getCRUD.ejs');
}
let postCRUD = async (req, res) => {
    try {
        const user = await CRUDServices.createNewUser(req.body); // Gọi hàm từ CRUDServices
        console.log(user); // In dữ liệu từ form (để debug)
        return res.send('ok'); // Trả về user đã tạo
    } catch (error) {
        return res.end('error'); // Trả về lỗi nếu có
    }
};
let DisplayCRUD = async (req, res) => {
    let user = await CRUDServices.getAllUser();
    console.log(user); 
    return res.render('displayCRUD.ejs', {
        dataUser: user,
    });
}
module.exports = {
    DisplayCRUD: DisplayCRUD,
    getCRUD: getCRUD,
    getHomepage: getHomepage,
    postCRUD: postCRUD,
}