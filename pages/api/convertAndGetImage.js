import cloudinary from "cloudinary";

export default async function (req, res) {
  let notionImageId = req.body.notionImageId;
  let notionImageUrl = req.body.notionImageUrl;
  console.log(notionImageId);
  console.log(notionImageUrl);
  if (!notionImageId || !notionImageUrl) {
    res.status(400).json({ error: "Missing required parameters" });
    return;
  }
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  //initiase variables here to access outside of trycatch
  let getImage;
  let uploadImage;
  let image;
  // check if image exists in cloudinary
  // if exist use that image
  // else upload the notion image to cloudinary and use the response for the imageurl
  try {
    getImage = await cloudinary.v2.search
      .expression(`public_id:${notionImageId}`)
      .execute();
  } catch (error) {
    console.log(error);
    res.status(503).json(error);
    return;
  }
  // if image exists in cloudinary, assign as image

  if (getImage?.resources[0]?.url) {
    image = getImage.resources[0].url;
    console.log(image);
    res.status(200).json({
      imageUrl: image,
    });
    return;
  }
  // else upload the image to cloudinary and use the response for the imageurl
  else {
    try {
      uploadImage = await cloudinary.v2.uploader.upload(
        notionImageUrl,
        { public_id: notionImageId },
        function (error, result) {
          return result;
        }
      );
      if (uploadImage) {
        image = uploadImage.url;
        console.log(image);
        res.status(200).json(image);
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(503).json(error);
      return;
    }
  }
}
