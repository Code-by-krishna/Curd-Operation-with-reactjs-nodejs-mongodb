const Users = require('../Model/users.model');

class authentication {

    static async registration(req, res, next) {

        try {
            const { Fullname, Email, Password, Pnumber } = req.body;
            console.log(Fullname, Email, Password, Pnumber);

            if (!Fullname || !Email || !Password || !Pnumber) {
                return res.status(400).json({ msg: 'Every field is required!' });
            }
            else {
                const isAlreadyExist = await Users.findOne({ Email });
                console.log(isAlreadyExist);
                if (isAlreadyExist) {
                    return res.status(400).json({ msg: 'User is already exist' });
                }
                else {
                    console.log('here');

                    const newUser = new Users({ Fullname, Email, Password, Pnumber });
                    await newUser.save();
                    return res.status(200).json({ msg: 'user is successfully registered!' });
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

    static async login(req,res,next) {
        try {
            const {Email, Password} = req.body;
            console.log(req.body);
            if(!Email || !Password) {
                return res.status(400).json({msg: 'Every field is required!'})
            }
            else {
                const isRegistered = await Users.findOne({ Email });
                // console.log(isRegistered)
                if(!isRegistered) {
                    return res.status(400).json({
                        msg: 'User are not registered!',
                    })
                }else {
                    if(Password === isRegistered.Password){
                        await Users.updateOne({
                           Email 
                        },{$set : { isActive: true}});
                        return res.status(200).json({msg: 'User login successfully!'})
                    }else {
                        return res.status(400).json({msg: 'Password is incorrect!'})
                    }
                }
            }
            
            
        } catch (error) {
            console.log(error);
        }
    }

    static async activeUsers(req,res,next) {
        try {
            const activeUsers = await Users.find(
                { isActive: true }, 
                { Fullname: 1, Email: 1, Pnumber: 1, _id: 1 } 
            );
            console.log('activeUsers>>',activeUsers.length);
            
            if (activeUsers.length > 0) {
                res.status(200).json({
                    success: true,
                    msg: 'Active users retrieved successfully',
                    data: activeUsers,
                });
            } else {
                res.status(404).json({
                    success: false,
                    msg: 'No active users found',
                });
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    static async deleteUser(req,res,next) {
        try {
            const Id = req.params.id;
            if(!Id) {
                return res.status(400).json({msg: 'User id is required!'})
            }else {
                await Users.updateOne({
                    _id: Id 
                },{$set : { isActive: false}});
                return res.status(200).json({msg: 'User is deleted!'});
            }

        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = authentication;