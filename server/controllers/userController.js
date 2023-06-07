const connection = require("../db");
const sendVerificationEmail = require("../utils/sendEmail");
const sendToken = require("../utils/tokens");

function generateVerificationCode() {
  return Math.floor(Math.random() * 900000) + 100000;
}



// handling registration
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  try {
    const query = "INSERT INTO login (name,email,password) VALUES(?,?,?)";
    connection.query(query, [name, email, password], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(501).json({
          message: "Internal server error",
        });
      }
      return res.status(201).json({
        result,
        message: "Success",
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.verify = (req, res) => {
  const { code } = req.body;

  // Check if verification code matches
  connection.query(
    "SELECT * FROM login WHERE code = ?",
    [code],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error checking verification code");
        return;
      }

      if (result.length === 0) {
        res.send("Invalid verification code");
        return;
      }

      const user = result[0];
      sendToken(user, 200, res);
    }
  );
};

exports.verifyLink = (req,res) => {

    console.log(req.query)
    const {token} = req.query;
    console.log(token)
    // const user = req.user

    try {
        
        console.log(token);
        connection.query('SELECT * FROM login WHERE code = ?',[token],(err,result) => {
            if (err) {
                res.send(err);
            }
            if(result.length === 0) {
                return res.status(401).json({
                    message : 'Invalid User'
                })
            }
            const user = result[0];
            // res.status(200).json({
            //     user
            // })
            console.log(user)
            sendToken(user, 200, res);

        })

    } catch (error) {

        console.log(error)
        
    }

 


};

// login handler

exports.login = (req, res) => {
  const { email, password } = req.body;

  // find user with matching email and password
  connection.query(
    "SELECT * FROM login WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log("Error logging in user:", err);
        return res.status(500).send("Error logging in user");
      } else if (result.length === 0) {
        console.log("Invalid email or password");
        return res.status(400).json({ message: "Invalid email or password" });
      } else {
        const user = result[0];
        const code = generateVerificationCode();
        connection.query("UPDATE login SET code = ? WHERE email = ?", [
          code,
          user.email,
        ]);
        sendVerificationEmail(user.email, code);
        // sendToken(user, 200, res)
        res.json({
          message: "Verification email sent successfully",
        });
      }
    }
  );
};

//logout handler

exports.logout = (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (err) {
    console.log(err);
  }
};

// get user details
exports.getUserDetails = (req, res, next) => {
  const user = req.user;

  try {
    const query = "SELECT * FROM login WHERE email = ?";
    connection.query(query, [user.email], (err, result) => {
      if (err) {
        return next(err);
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = result[0];
      return res.status(200).json({
        success: true,
        user,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
