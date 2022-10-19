import { CameraIcon } from "@heroicons/react/20/solid";
import { useRef, useState, useEffect } from "react";
import AvatarImg from "../assets/avatar.png";

interface ImagePickerProps {
  onAddFile: (fileImg: File) => any;
}

const ImagePicker = ({ onAddFile }: ImagePickerProps) => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
      onAddFile(image);
    }
  }, [image, onAddFile]);

  return (
    <div className="relative w-max mx-auto">
      <img
        className="w-40 h-40 mx-auto align-middle rounded-[50%] bg-white object-cover"
        src={!preview ? AvatarImg : preview}
        alt="avatar stock"
      />
      <div className="bg-gray-600 w-max rounded-[50%] p-2 absolute bottom-2 right-1">
        <CameraIcon
          onClick={() => {
            inputFile.current?.click();
          }}
          className="h-6 w-6 text-white cursor-pointer"
        />
        <input
          type="file"
          id="file"
          ref={inputFile}
          accept="image/png, image/jpg, image/jpeg, image/webp"
          className="hidden"
          onChange={fileInputChangeHandler}
        />
      </div>
    </div>
  );
};

export default ImagePicker;
