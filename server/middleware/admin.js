let admin = (req, res, next) =>{
    if(req.user.role === 0){
        return res.send('you dont have admin rights')
    }
    next()
}

module.exports= { admin } 