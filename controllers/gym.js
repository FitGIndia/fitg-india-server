const Gym = require("../models/gym");


exports.getGymById = (req, res, next, id) =>{
    Gym.findById(id).exec((err, gym)=> {
        if(err || !gym){
            return res.status(400).json({
                err: "Gym not found in DB"
            })
        }
        req.gym = Gym;
        next();
    });
};

exports.addGym = (req, res) =>{
  const gym = new Gym(req.body);
     gym.save((err, gym)=>{
        if(err){
            return res.status(400).json({
                err: "Failed to register gym"
            });
        }
        res.json({
         msg: `Gym registered successfully`,
         gymid: gym._id,
         name: gym.name
        });
    })
 
}