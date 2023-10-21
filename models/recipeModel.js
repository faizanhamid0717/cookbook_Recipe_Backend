const mongoose =require("mongoose")

const recipeSchema = mongoose.Schema({
    image:{type:String,required:true},
    title:{type:String,required:true},
    authorID:{type:String,required:true},
    id:{type:Number}
},{
    versionKey:false
})

const RecipeModel=mongoose.model("recipe",recipeSchema)

module.exports=RecipeModel