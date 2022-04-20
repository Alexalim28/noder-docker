const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {

    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 12);

    try {
        const user = await User.create({
            username,
            password: hash
        })
        req.session.user = user;
        res.status(201).json({
            status: "Success",
            data: {
                user
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "Failed"
        })
    }
};

exports.login = async (req, res) => {

    const {username, password} = req.body;
    
    try {
        const user = await User.findOne({ username })

        if(!user) {
           return res.status(404).json({
            status: "Failed",
            msg: "This user doesn't exist!"
        })
        };

        const isValid = await bcrypt.compare(password, user.password)

        if(isValid) {
            req.session.user = user;
            return res.status(202).json({
            status: "Success",
            data: {
                user
            }
        })
        } else {
            return res.status(400).json({
                status: "Failed",
                msg: "Invalid password!"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "Failed"
        })
    }
};