const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

/* User Registration */
// module.exports.regUser = (req, res) => {
//     User.findOne({email: req.body.email})
//         .then(existUser => {
//             if(existUser){
//                 return res.send("Email is already in use.")
//             }
//         });
//     let newUser = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         userId: req.body.userId,
//         password: bcrypt.hashSync(req.body.password, 12)
//     })
//     return newUser
//     .save()
//     .then((user, err) => {
//         if(err){
//             return res.send("Registration failed!")
//         }else{
//             return res.send("User registered!")
//         }
//     })
//     .catch(err => res.send(err))
// }
module.exports.regUser = async (req, res) => {
    try {
        const existUser = await User.findOne({email: req.body.email});
        if(existUser){
            return res.send("Email is already in use.")
        }
        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userId,
            password: bcrypt.hashSync(req.body.password, 12)
        })

        await newUser.save()
        return res.send("User registered successfully!")
                
    }catch(err){
        console.error(err)
        return res.send(false)
    }
}


/* List of Users */
module.exports.allUsers = (req, res) => {
    return User.find({}).then(userList => {
        if(userList.length === 0){
            return res.send("No Registered Users Yet!")
        }else{
            return res.send(userList)
        }
    })
}

/* List Single User */
module.exports.sgUser = (req, res) => {
    return User.findOne({email: req.body.email}).then(userEmail => {
        if(userEmail === null){
            return res.send("No Registered Users!")
        }else{
            return res.send(userEmail)
        }
    })
}

/* User Login */
module.exports.logUser = (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    if(!userName || !password){
        return res.send("Username and Password are both required to login.")
    }
    return User.findOne({userName: userName}).then(logdUsers => {
        if(!logdUsers){
            return res.send("User not found!")
        }else{
            const isPwdCt = bcrypt.compareSync(
                req.body.password, logdUsers.password
            )
            if(isPwdCt){
                return res.send({access: auth.createAccessToken(logdUsers)})
            }else{
                return res.send("Password Incorrect!")
            }
        }
    })
}

/* Update User to Admin */
module.exports.userAdmin = (req, res) => {
    let upd = {
        isAdmin: true
    }
    return User.findByIdAndUpdate(req.params.id, upd).then(updUser => {
        if(updUser){
            return res.send("Role changed to Admin!")
        }else{
            return res.send("Update Failed!")
        }
    })
    .catch(err => {
        res.send(err)
    })
}

/* Change Admin to User */
module.exports.userRole = (req, res) => {
    let upd = {
        isAdmin: false
    }
    return User.findByIdAndUpdate(req.params.id, upd).then(updUser => {
        if(updUser){
            return res.send("Role changed to User!")
        }else{
            return res.send("Update Failed!")
        }
    })
    .catch(err => {
        res.send(err)
    })
}

/* Update User Details */
module.exports.updUser = (req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.send("Please specify user details for updating.")
    }
    return User.findByIdAndUpdate(req.params.id, req.body).then((userId, err) => {
        if(!userId){
            return res.send("User does not exist");
        }else{
            let response = {
                message: "User Details Successfully Updated!",
                updates: userId
            }
            return res.send(response);
        }
        
    })
}

/* Reset Password for Users */
module.exports.userReset = async (req, res) => {
	try{
		const newPassword = req.body.newPassword;
		const userId = req.user.id;

		// Hashing the new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Update and save the user with the new hashed password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}