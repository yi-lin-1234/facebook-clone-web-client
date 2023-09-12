import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { updatePostById, getPostById } from "../service/post";
import {
  PhotoIcon,
  ArrowUpOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      if (!id) {
        console.log("No ID provided");
        return;
      }
      setIsLoading(true);
      try {
        const data = await getPostById(id);
        setContent(data.content);
        setImagePreview(data.image);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [id]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files && files.length !== 0) {
      setImage(() => files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
  }

  async function handleImageUpload() {
    try {
      const data = new FormData();
      if (image) {
        data.append("file", image);
        data.append("upload_preset", "purchaseApp");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/yilin1234/image/upload",
          data
        );
        return response.data.secure_url;
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image.");
    }
  }

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();

    if (!id) {
      console.log("No ID provided");
      return;
    }
    let url = imagePreview;
    if (image) url = await handleImageUpload();

    const body = {
      content: content,
      image: url,
    };

    try {
      await updatePostById(id, body);
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating the post. Please try again.");
    }
  }

  function handleRemoveImage() {
    setImage(null); // Clear the image state
    setImagePreview(""); // Clear the image preview
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="isolate bg-white p-10">
      <ToastContainer position="bottom-right" />
      <form className="mx-auto max-w-xl" onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="content"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              content
            </label>
            <div className="mt-2.5">
              <textarea
                id="content"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              post picture
            </label>
            <div className="mt-3 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="profileImage"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                upload an image{" "}
                <ArrowUpOnSquareIcon
                  className="-mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                <input
                  className="sr-only"
                  id="profileImage"
                  type="file"
                  name="profileImage"
                  onChange={handleImageChange}
                />
              </label>
              {imagePreview && (
                <button
                  onClick={handleRemoveImage}
                  className="ml-3 inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <TrashIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                  Remove Image
                </button>
              )}
            </div>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" width="300" />
                ) : (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 mt-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
