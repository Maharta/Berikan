import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import ImagePicker from "./ImagePicker";

interface ImagesPickerProps extends HTMLAttributes<HTMLDivElement> {
  numberOfImages: number;
  onImagesChanged: (imageArrays: File[]) => void;
}

function ImagesPicker({
  numberOfImages,
  onImagesChanged,
  ...props
}: ImagesPickerProps) {
  const [imageArrays, setImageArrays] = useState<File[]>([]);

  const onAddImageHandler = useCallback(
    (img: File, index?: number) => {
      const newArray = [...imageArrays];
      newArray[index!] = img;
      setImageArrays(newArray);
    },
    [imageArrays]
  );

  useEffect(() => {
    onImagesChanged(imageArrays);
  }, [imageArrays, onImagesChanged]);

  return (
    <div className={props.className}>
      {Array.from(Array(numberOfImages), (_, index) => (
        <ImagePicker
          type="upload"
          index={index}
          onAddFile={onAddImageHandler}
          key={index}
        />
      ))}
    </div>
  );
}

export default ImagesPicker;
