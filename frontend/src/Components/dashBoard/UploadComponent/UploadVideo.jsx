import React, { useState } from "react";
import FormInput from "../../CoreComponents/FormInput";
import FormLabel from "../../CoreComponents/FormLabel";
import videos from "../../../backendUtility/videos.utility";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Loading/LoadingSpinner";

const UploadIcon = () => (
  <i class="fa-solid fa-cloud-arrow-up"></i>
);

function UploadVideo({ setIsUploadClicked }) {
  const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    videoFile: null,
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDragEvents = (e, isEnter = true) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEnter);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      setFormData((prev) => ({ ...prev, videoFile: e.dataTransfer.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.videoFile) {
    alert("Please select a video file");
    return;
  }

  if (!formData.title) {
    alert("Title cannot be empty");
    return;
  }

  if (!formData.thumbnail) {
    alert("Thumbnail cannot be empty");
    return;
  }

  setLoading(true);

  try {
    const response = await videos.publishVideo(formData);

    if (response?.success) {
      toast.success("Video uploaded successfully");
    } else {
      const errorMsg = response?.error || "Upload failed. Please try again.";
      console.log("Response error in uploading video:", errorMsg);
      toast.error(errorMsg);
    }

    setIsUploadClicked(false);
    
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Something went wrong during upload");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="relative bg-gray-900 rounded-2xl w-full max-w-3xl text-white max-h-[95vh] overflow-y-auto p-6 sm:p-10 uploadVideoClass">
        {
          loading?
          (
            <div className="flex flex-col justify-center items-center gap-2">
              <LoadingSpinner size={40} />
              Uploading  Video ...
            </div>

          ):(<form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Upload Video</h1>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg"
            >
              Save
            </button>
          </div>

          {/* Drag and Drop */}
          <div
            onDragEnter={(e) => handleDragEvents(e, true)}
            onDragOver={(e) => handleDragEvents(e, true)}
            onDragLeave={(e) => handleDragEvents(e, false)}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full p-6 sm:p-10 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
              isDragging
                ? "border-purple-500 bg-gray-800/50"
                : "border-gray-600 hover:bg-gray-800/50"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4 bg-purple-900/50 rounded-full flex items-center justify-center">
                <UploadIcon />
              </div>
              <p className="text-lg font-semibold">
                {formData.videoFile
                  ? `Selected: ${formData.videoFile.name}`
                  : "Drag and drop video file"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Videos remain private until published.
              </p>
              <label
                htmlFor="video-file-input"
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg cursor-pointer"
              >
                Select File
              </label>
              <FormInput
                id="video-file-input"
                type="file"
                name="videoFile"
                customClass="hidden"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <FormLabel
              forLabel="thumbnail"
              customClass="text-sm font-medium text-white mb-2 block"
            >
              Thumbnail<span className="text-purple-400">*</span>
            </FormLabel>
            <FormInput
              id="thumbnail"
              type="file"
              name="thumbnail"
              isRequired={true}
              customClass="w-full text-sm border border-gray-600 rounded-lg bg-gray-800 text-gray-400 p-2.5"
              onChange={handleInputChange}
            />
          </div>

          {/* Title */}
          <div>
            <FormLabel
              forLabel="title"
              customClass="text-sm font-medium text-white mb-2 block"
            >
              Title<span className="text-purple-400">*</span>
            </FormLabel>
            <FormInput
              id="title"
              type="text"
              name="title"
              value={formData.title}
              isRequired={true}
              customClass="w-full text-sm border border-gray-600 rounded-lg bg-gray-800 text-white p-2.5"
              onChange={handleInputChange}
            />
          </div>

          {/* Description */}
          <div>
            <FormLabel
              forLabel="description"
              customClass="text-sm font-medium text-white mb-2 block"
            >
              Description<span className="text-purple-400">*</span>
            </FormLabel>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              rows="4"
              required
              className="w-full text-sm border border-gray-600 rounded-lg bg-gray-800 text-white p-2.5"
              onChange={handleInputChange}
            />
          </div>

          {/* Close Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setIsUploadClicked(false)}
              className="w-40 py-2 text-lg font-semibold rounded-xl bg-red-600 hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </form>)
        }
      </div>
    </div>
  );
}

export default UploadVideo;
