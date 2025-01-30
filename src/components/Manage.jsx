import React, { useContext, useState } from "react";
import { Context, server } from "../main";
import Input from "./Input";
import toast from "react-hot-toast";
import { uploadFiles } from "../utilities/upload";
import axios from "axios";
import { Navigate } from "react-router";

const Manage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [company, setCompany] = useState("");
  const [Dealer, setDealer] = useState("");
  const [files, setFiles] = useState([]);
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, user } =
    useContext(Context);

  const filesHandler = e => {
    if (!e.target.files) {
      toast.error("No files Selected");
      return [];
    }
    let images = Array.from(e.target.files);
    let newImages = [];
    images.forEach(file => {
      if (
        file.type !== "image/heic" &&
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "image/webm"
      ) {
        images = images.filter(item => item.name !== file.name);
      } else if (file.size > 1024 * 1024 * 15) {
        images = images.filter(item => item.name !== file.name);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          newImages.push({
            file: file,
            fileData: e.target.result,
          });
        };
      }
    });
    setFiles(newImages);
  };
  const submitHandler = async e => {
    e.preventDefault();
    try {
      // upload files
      const uploaded_files = await uploadFiles(files);
      console.log(user?.email, company);
      const { data } = await axios.post(
        `${server}/api/v1/cars/add`,
        {
          email: user?.email,
          title,
          description,
          tags,
          images: uploaded_files,
          brand: company,
          Dealer,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Uploaded");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setFiles("");
    setDescription("");
    setDealer("");
    setCompany("");
    setTags("");
    setTitle("");
  };
  //   if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <section className="bg-gray-50 dark:bg-gray-900 my-20">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          VroomVault
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Add your Car
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <Input name={"Title"} field={title} setField={setTitle}></Input>
              <Input
                name={"Company"}
                field={company}
                setField={setCompany}
              ></Input>
              <Input name={"tags"} field={tags} setField={setTags}></Input>
              <Input
                name={"Description"}
                field={description}
                setField={setDescription}
              ></Input>
              <Input
                name={"Dealer"}
                field={Dealer}
                setField={setDealer}
              ></Input>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="user_avatar"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
                onChange={filesHandler}
                required
                multiple
                accept="image/*"
              />

              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ring-3 border-gray-600 cursor-pointer"
              >
                Add car
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manage;
