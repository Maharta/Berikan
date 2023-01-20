// @ts-ignore
// eslint-disable-next-line import/extensions
import Resizer from "./react-image-resizer.js";
// quick hack since the library has a bug with vite on production.

const resizeFileMaker = (maxWidth: number, maxHeight: number) => (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      100,
      0,
      (uri: unknown) => {
        resolve(uri);
      },
      "file"
    );
  });

export const resizeImage320 = resizeFileMaker(320, 320);
export const resizeImage720 = resizeFileMaker(720, 720);
