import { CameraIcon } from "@heroicons/react/20/solid";
import { cva, VariantProps } from "cva";
import { useRef, useState, memo } from "react";
import AvatarImg from "../assets/avatar.png";
import UploadImg from "../assets/upload.png";

interface ImagePickerProps {
  onAddFile: (fileImg: File, index?: number) => void;
  index?: number;
  initialImage?: string;
}

const pickerContainerStyles = cva("relative mx-auto", {
  variants: {
    type: {
      upload: "w-14 h-14",
      avatar: "w-max",
    },
  },
  defaultVariants: {
    type: "avatar",
  },
});

const portraitStyles = cva("mx-auto bg-white object-cover object-center", {
  variants: {
    type: {
      upload:
        "w-14 h-14 cursor-pointer hover:scale-105 focus:scale-105 duration-100",
      avatar: "w-40 h-40 rounded-[50%]",
    },
  },
  defaultVariants: {
    type: "avatar",
  },
});

interface StyleProps
  extends Required<VariantProps<typeof pickerContainerStyles>>,
    Required<VariantProps<typeof portraitStyles>> {}

interface Props extends ImagePickerProps, StyleProps {}

const ImagePicker = ({ onAddFile, index, type, initialImage }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>("");

  let placeholderImg = type === "avatar" ? AvatarImg : UploadImg;

  if (initialImage) {
    placeholderImg = initialImage;
  }

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    // if there is an index, this means the imagepicker is used as a bunch of imagepicker together (arrays).
    onAddFile(file, index);
  };

  return (
    <div id="imagePicker" className={pickerContainerStyles({ type })}>
      <img
        className={portraitStyles({ type })}
        src={!preview ? placeholderImg : preview}
        alt="avatar stock"
        onClick={() => {
          if (type === "upload") fileInputRef.current?.click();
        }}
      />
      {type === "avatar" && (
        <div
          className={`absolute bottom-2 right-1 w-max rounded-[50%] bg-gray-600 p-2`}>
          <CameraIcon
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="h-6 w-6 cursor-pointer text-white"
          />
        </div>
      )}
      <input
        type="file"
        id="file"
        ref={fileInputRef}
        accept="image/png, image/jpg, image/jpeg, image/webp"
        className="hidden"
        onChange={fileInputChangeHandler}
      />
    </div>
  );
};

export default memo(ImagePicker);
