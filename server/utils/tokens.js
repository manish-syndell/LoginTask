const jwt = require('jsonwebtoken');

 
 const getJWTToken = (user) => {
    return jwt.sign({ email: user.email }, '4f1feeca525de4cdb064656007da3edac7895a87ff0ea865693300fb8b6e8f9c', {
        expiresIn: '5d'
    })
}


// sending token
 const  sendToken = (user, statusCode, res) => {
    const token = getJWTToken(user);
    console.log(token)
    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    // res.status(statusCode).cookie("token",token, options).json({
    //     success: true,
    //     user,
    //     token,
    // });
    res.cookie('token',token, options);
    res.status(statusCode).json({
        user,
        success: true,
        token
    })
    console.log('end')
};

module.exports = sendToken;