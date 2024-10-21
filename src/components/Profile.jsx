// Profile.js
import { useRef, useState } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";

const Profile = () => {
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState("");

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
    setCroppedImage(imgSrc); // ذخیره عکس کراپ شده
  };

  const handleDownload = () => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.href = croppedImage;
      
      const randomName = `cropped-image-${Date.now()}.png`; // یا می‌توانید از Math.random() استفاده کنید
      link.download = randomName; 
      link.click();
    }
  };
  

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>
      <h2 className="text-white font-bold mt-6">Image Cropper</h2>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
      {croppedImage && (
        <button
          className="mt-4 text-white bg-green-500 px-4 py-2 rounded"
          onClick={handleDownload}
        >
          Download Cropped Image
        </button>
      )}
    </div>
  );
};

export default Profile;
