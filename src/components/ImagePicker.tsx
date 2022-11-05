import { CameraIcon } from "@heroicons/react/20/solid";
import { cva, VariantProps } from "cva";
import { useRef, useState, useEffect, memo } from "react";
import AvatarImg from "../assets/avatar.png";
import UploadImg from "../assets/upload.png";

interface ImagePickerProps {
  onAddFile?: (fileImg: File) => any;
}

const pickerContainerStyles = cva("relative mx-auto", {
  variants: {
    type: {
      upload: "w-20 h-20",
      avatar: "w-max",
    },
  },
  defaultVariants: {
    type: "avatar",
  },
});

const portraitStyles = cva("mx-auto bg-white object-cover align-middle", {
  variants: {
    type: {
      upload: "w-20 h-20 cursor-pointer hover:scale-105 duration-100",
      avatar: "w-40 h-40 rounded-[50%]",
    },
  },
  defaultVariants: {
    type: "avatar",
  },
});

interface Props
  extends ImagePickerProps,
    VariantProps<typeof pickerContainerStyles>,
    VariantProps<typeof portraitStyles> {}

const ImagePicker = ({ onAddFile, type }: Props) => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>("");

  const placeholderImg = type === "avatar" ? AvatarImg : UploadImg;

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
      if (onAddFile) {
        onAddFile(image);
      }
    }
  }, [image, onAddFile]);

  return (
    <div className={pickerContainerStyles({ type })}>
      <img
        className={portraitStyles({ type })}
        src={!preview ? placeholderImg : preview}
        alt="avatar stock"
        onClick={() => {
          if (type === "upload") inputFile.current?.click();
        }}
      />
      {type === "avatar" && (
        <div
          className={`absolute bottom-2 right-1 w-max rounded-[50%] bg-gray-600 p-2`}>
          <CameraIcon
            onClick={() => {
              inputFile.current?.click();
            }}
            className="h-6 w-6 cursor-pointer text-white"
          />
        </div>
      )}
      <input
        type="file"
        id="file"
        ref={inputFile}
        accept="image/png, image/jpg, image/jpeg, image/webp"
        className="hidden"
        onChange={fileInputChangeHandler}
      />
    </div>
  );
};

export default memo(ImagePicker);
