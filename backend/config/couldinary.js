import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  // Log the values to see if they're loaded correctly.
  console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
  console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export default connectCloudinary;
