import axios from "axios";
import { cloud_server } from "../main";

const cloud_name = "daiwqouix";
const cloud_secret = "jcmy3yul";

export const uploadFiles = async files => {
  let formData = new FormData();
  formData.append("upload_preset", cloud_secret);
  let uploaded = [];
  for (const f of files) {
    const { file } = f;
    formData.append("file", file);
    let res = await uploadToCloudinary(formData);
    uploaded.push(res.secure_url);
  }
  return uploaded;
};
const uploadToCloudinary = async formData => {
  return new Promise(async resolve => {
    return await axios
      .post(`${cloud_server}/${cloud_name}/raw/upload`, formData)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(err => {});
  });
};
