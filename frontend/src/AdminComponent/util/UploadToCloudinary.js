const upload_preset = 'Kitchen';
const cloud_name = 'dqgnw07il';
const cloud_api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async(file)=>{
  const data  = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);

  const res = await fetch(cloud_api_url,{
    method:'post',
    body:data,
  }).catch(error=>{
    {
      console.log("uplaodImage: ",error);
    }
  })

  const fileData = await res.json();
  console.log(fileData);
  return fileData.url;
}