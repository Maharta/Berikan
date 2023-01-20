import { motion } from "framer-motion";
import { InputHTMLAttributes } from "react";

interface ProductInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  title: string;
  isInvalid: boolean;
  invalidMessage: string;
}

function ProductInput({
  id,
  title,
  isInvalid,
  invalidMessage,
  ...inputProps
}: ProductInputProps) {
  return <div className={`mx-auto w-[90%] max-w-lg ${inputProps.className}`}>
    <label className="mb-1 block text-sm" htmlFor={id}>
      {title}
    </label>
    <input
      className="w-full border border-black p-2"
      type="text"
      id={id}
      {...inputProps}
    />
    <div className="h-6">
      {isInvalid && (
        <label className="text-red-600" htmlFor={id}>
          <motion.strong
            initial={{ fontSize: "8px" }}
            animate={{
              fontSize: "16px",
            }}>
            {invalidMessage}
          </motion.strong>
        </label>
      )}
    </div>
  </div>
}

export default ProductInput;
