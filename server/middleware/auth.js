const jwt = require("jsonwebtoken");
const connection = require("../db");

exports.isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies;
    console.log(token)
    if (!token) {
        // return next(new Error('Please Login to access this resource'));
        return res.json({
            message: 'Please Login to access this resource'
        })
    }
    try {
        const decodedData = jwt.verify(token, '4f1feeca525de4cdb064656007da3edac7895a87ff0ea865693300fb8b6e8f9c');
        // console.log("decodedData: " + decodedData.email)
        connection.query('SELECT * FROM login WHERE email = ?', [decodedData.email], (err, result) => {
            if (err) {
                return next(err);
            }

            if (result.length === 0) {
                return next(new Error('User not found'));
            }

            const user = result[0];
            
            console.log(user);
            // console.log(req.cookies)
            req.user = result[0]
            next();
            // const user = result[0]
            // res.status(200).json({
            //     user
            // })
            // console.log( req.user = result[0])
        });
    } catch (error) {
        return next(error);
    }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            // console.log(...roles)
            // console.log(req.user.role)
            return next(
                res.status(403).json({
                    message: 'You are not allowed to access this resource'
                })
            );
        }

        next();
    };
};