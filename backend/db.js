const mongoose = require('mongoose')
const connet= ()=>{
    mongoose.connect('mongodb://localhost:27017/akasa',{

    }).then(()=>{console.log('DB connected')
    }).catch((err)=>{console.log(err)})
}

module.exports = connet