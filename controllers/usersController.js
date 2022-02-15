const bcrypt= require('bcrypt');

const usersController = ( User,jwt ) => {

   const getUsers = async (req,res) => {
   const { query } = req;
   const response = await User.find(query);   
   res.json(response);
  
  }
    
 const postUsers = async (req,res) => {
   const user = new User(req.body);
   user.password = await bcrypt.hash(user.password, 10);
   await user.save();
   res.json(user);
  }
    
  const getUserById =async (req,res) => {
    const { params } =req;
    const response = await User.findById(params.userId)
    
    res.json(response);
  };
    
  const putUsers =async (req,res) =>{
    const { body } = req;
    const response = await User.updateOne({
       _id: req.params.userId
        }, {
          $set:{
                  firstName:body.firstName ,
                  lastName: body.lastName,
                  userName: body.userName,
                  password: await bcrypt.hash(body.password, 10),
                  email: body.email,
                  address: body.address,
                  phone: body.phone
                }
            })
            
            res.json({message:'The user has been update sucessfully' ,response});
  };
        
  const deleteUserById =async (req,res) =>{
    const id = req.params.userId;
    await User.findByIdAndDelete(id);
          
    res.status(202).json('The user has been delete sucessfully');
  }
        
  const login = async (req, res) => {
    const {body} =req;

    var response =  await User.findOne({
      'userName':body.userName
    });
        
    if(response===null){
           
          res.status(401).json('Invalid Credentials')

        }else if ( await bcrypt.compare(body.password, response.password)){
       
          const savedUSer = response;
          const token = generateToken(savedUSer);
          
            response = {message: 'ok',token};

        }else{
          res.status(401).json('Invalid Credentials')
        }
      
        res.json(response); 
  }

  const generateToken = savedUSer =>{
    const tokenPayload = {
      firstName: savedUSer.firstName,
      lastName: savedUSer.lastName
    }
    
    return jwt.sign(tokenPayload,'secret',{expiresIn:'30s'});
  }

 
  return { getUsers,postUsers, getUserById , putUsers , deleteUserById,login }; 
}
   


module.exports= usersController;