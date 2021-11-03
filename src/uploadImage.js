import axios from "axios";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "t1v2bl0x");

  try {
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/mitar-spasic/upload",
      formData
    );
    return data.url;
  } catch (error) {
    return error;
  }
};

export default uploadImage;
