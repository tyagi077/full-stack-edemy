import mongoose from "mongoose";

const lectureSchema=new mongoose.Schema({
    lectureTitle:{type:String,required:true},
    lectureDuration:{type:Number,required:true},
    lectureUrl:{type:String,required:true},
    isPreviewFree :{type:Boolean,required:true} ,
    lectureOrder:{type:Number,required:true}
})


const ChapterSchema=new mongoose.Schema({
    chapterOrder:{type:String,required:true},
    chapterTitle:{type:String,required:true},
    chapterContent:[lectureSchema]
})

const CourseSchema =new  mongoose.Schema({
    courseTitle:{type:String,required:true},
    courseDescription:{type:String,required:true},
    coursePrice:{type:Number,required:true},
    isPublished:{type:Boolean,default:true},
    discount:{type:Number,required:true,min:0,max:100},
    courseThumbnail:{type:String},
    courseContent:[ChapterSchema],
    courseRatings:[{
        userId:{type:String},
        rating:{type:Number,min:1,max:5},
    }],
    educator:{type:String,ref:'User'},
    enrolledStudents:[
        {type:String,ref:'User'}
    ]
},{timestamps:true})

const Course  = mongoose.model('Course',CourseSchema)

export default Course