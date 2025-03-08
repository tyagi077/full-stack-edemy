import mongoose  from "mongoose";


const UserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    imageUrl:{type:String ,default:""},
    isEducator:{type:Boolean,default:false},
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ]
    
})

const User = mongoose.model('User',UserSchema);

export default User;