const userModel = require("../Models/user");
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');


const register = async (req, res) =>{

        try{
                const { firstName, lastName, email, password, confirmPassword } = req.body;

                const user = await userModel.findOne({ email });
                if(user){
                    return res.status(409)

                        .json({ message : "user already exists", success : false});
                }

                const newUserModel = new userModel({ firstName, lastName, email, password, confirmPassword });
                newUserModel.password = await bcrypt.hash(password, 10);
                newUserModel.confirmPassword = await bcrypt.hash(password, 10);
                await newUserModel.save();
                 res.status(201)
                .json({ message : "user registered successfully", success : true});

        } catch (err) {
                res.status(500)
                .json({ message : "internal server error",
                     success : false});
        }


}


const login = async (req, res) =>{

        try{
                const { email, password } = req.body;
                        

                const user = await userModel.findOne({ email });
                if(!user){
                    console.log("reached here");
                    return res.status(403)
                    
                    .json({ message : "auth failed email or password is wrong", 
                        success : false});
                    

                }


                const isPassEqual = await bcrypt.compare(password, user.password);
                        

                if(!isPassEqual){

                    return res.status(403)  
                    .json({ message : "auth failed email or password is wrong", success : false});
               

                }

                const jwtToken = jwt.sign({
                    email : user.email,
                    _id: user._id

                },
                process.env.JWT_SECRET,
                { expiresIn : '24h'},
            );
            
            res.status(200)
            .json({ message : "login successful", 
                    success : true,
                    jwtToken,
                    email,
                    name : user.firstName
                });


                
             

        } catch (err) {
            console.log(err);
                res.status(500)
                .json({ message : "internal server error FUCK IT",
                     success : false});

                    
        }


}


module.exports = {
    register,
    login   
}