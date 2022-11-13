import { TextareaHTMLAttributes } from "react";

interface DescriptionAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid: boolean;
}

const DescriptionArea = ({
  isInvalid,
  ...textAreaProps
}: DescriptionAreaProps) => {
  return (
    <div className={`mx-auto w-[90%] max-w-lg ${textAreaProps.className}`}>
      <label htmlFor="description" className="mb-1 block text-sm">
        DESKRIPSI
      </label>
      <textarea
        id="description"
        className="mx-auto block w-full border border-black p-2"
        rows={3}
        {...textAreaProps}
      />
      <div className="h-6">
        {isInvalid && (
          <label className="text-red-600" htmlFor="description">
            <strong>Deskripsi minimal memiliki 2 Kata!</strong>
          </label>
        )}
      </div>
    </div>
  );
};

export default DescriptionArea;
