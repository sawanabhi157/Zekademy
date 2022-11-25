import UserModel from "../model/user.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import transporter from "../config/emailConfig.js";
import jwt from "jsonwebtoken";
dotenv.config();

class AuthController {
  static UserRegistration = async (req, res) => {
    const { email, first_name, last_name, password, age, city } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "email already exits" });
    } else {
      if (email && first_name && last_name && password && age && city) {
        try {
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            email,
            first_name,
            last_name,
            password: hashPassword,
            age,
            city,
          });
          await doc.save();
          const saved_user = await UserModel.findOne({ email: email });
          // Genrating JWT Token
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5m" }
          );

          // Successfully Registered Sending Email
          const mailOptions = {
            from: "user",
            to: email,
            subject: "Congratulations! You have Successfully Registered !",
            html: `<h1>Registered Successfully</h1>`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              return res.json({
                message: "Reset password has been sent on your Email address! ",
              });
            }
          });

          res
            .status(201)
            .send({ status: 200, message: "Success", jwt_token: token });
        } catch {
          res.send({ status: "faield", message: "unable to register" });
        }
      } else {
        res.send({ status: "Failed", message: "All Fields are Required" });
      }
    }
  };

  static UserLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {
          // Login Process
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // Genrate JWT Token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );

            res.send({
              status: 200,
              message: "Success",
              jwt_token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is wrong",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a registered User",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Field are Required" });
      }
    } catch (error) {
      res.send("Error", error);
    }
  };
}

export default AuthController;
