
import mongoose from "mongoose";

const articalschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    image:{
      secure_url:{type:String,required:true},
      public_id:{type:String,required:true,unique:true}
    },
    folderid:{
        type:String
    }
}
,{timestamps:true})



///hook
articalschema.post("findOneAndDelete",async function() {
    const _id=this.getQuery()._id

    const deletesubartical=await mongoose.models.Subartical.deleteMany({
        articalid:_id
    })

})

export default mongoose.models.Artical || mongoose.model('Artical',articalschema)