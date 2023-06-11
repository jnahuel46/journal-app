export const fileupload = async (file) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/jere46/upload";
  const formData = new FormData();
  formData.append("upload_preset","react-course");
  formData.append("file", file);
  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    console.log( resp );
    if ( !resp.ok )  throw new Error(' Cannot upload images');
    const cloudResp = await resp.json();
    return cloudResp.secure_url;

  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
