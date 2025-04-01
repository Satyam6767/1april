
const mongoose = require('mongoose')

// const mongoURL = 'mongodb://localhost:27017/studentteacherdata'
 const mongoURL = process.env.MONGODB_URI


mongoose.connect(mongoURL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)

const db = mongoose.connection ;

db.on('connected', ()=>{
    console.log("mongodb connected")
})

db.on('err', ()=>{
    console.log("Error while connecting", err)
})




