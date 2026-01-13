//get instance of file
const cloudinary = require('cloudinary').v2;

//write handler uploa image to cloudinary
//1.add file,option,height,quality, and folder
const uploadImageToCloudinary=async(file,folder,height,quality)=>{
    const options = {
    folder,
    resource_type: "auto",
  };
if(height){
    options.height=height;
}    
if(quality){
    options.quality=quality
}


//noiw upload
return await cloudinary.uploader.upload(file.tempFilePath,options)

}

module.exports={uploadImageToCloudinary}