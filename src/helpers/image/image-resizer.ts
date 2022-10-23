import Resizer from "react-image-file-resizer";

const resizeFileMaker = (maxWidth: number, maxHeight: number) => {
  return (file: File) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  };
};

export const resizeImage320 = resizeFileMaker(320, 320);
