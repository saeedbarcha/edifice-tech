import { useUploadImageMutation } from "../slices/uploadImageApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useUploadImage = () => {
  const [uploadImageMutation, { isLoading, isError }] = useUploadImageMutation();

  useEffect(() => {
    if (isError) {
      toast.error(isError?.data?.message || isError.error);
    }
  }, [isError]);

  const uploadImage = async (formData) => {
    try {
      const res = await uploadImageMutation(formData);
      toast.success(res?.message);
      return res.image;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      throw err;
    }
  };

  return { uploadImage, isLoading };
};

export default useUploadImage;
