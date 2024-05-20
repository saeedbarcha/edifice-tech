///////////////////////////////////////////////////////////  uploading image fine  /////////////////////////////////////////////////////////////

import { useState } from "react";
import { Upload, message } from 'antd';
import {Button} from "react-bootstrap";
import ImgCrop from 'antd-img-crop';
import { useUploadImageMutation } from "../../slices/uploadImageApiSlice";
import { useUpdateUserProfileMutation } from "../../slices/usersApiSlice";

const ImageCrop = ({ image , updatefunction , loadingUpdate, size }) => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: `${image}`,
    },
  ]);
  const [proImage, setProImage] = useState(image);
  const [uploadProfileImage, { isLoading: loadingUpload }] = useUploadImageMutation();
  const [isImageReadyForUpload, setIsImageReadyForUpload] = useState(false);
  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
    setIsImageReadyForUpload(newFileList.length > 0);
  };

  const handleImageUpload = async () => {
    if (fileList.length > 0 && fileList[0].originFileObj) {
      const file = fileList[0].originFileObj;

      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await uploadProfileImage(formData).unwrap();
        if (response.message !== "") {
          setIsImageReadyForUpload(false);
          setProImage(response.image);
         
          await updatefunction({ image: response.image });
          message.success('Image uploaded successfully');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        message.error('Failed to upload image');
      }
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" style="max-width: 100%; max-height: 100%;" />`);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <ImgCrop  
        modalWidth={size.width} 
        modalHeight={size.height} 
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          maxCount={1}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      {isImageReadyForUpload && (
        <Button className="btn-sm btnAllScreen py-1 px-3 mt-2 mb-3" onClick={handleImageUpload} disabled={loadingUpload || loadingUpdate}>
          {loadingUpload || loadingUpdate ? 'Uploading...' : 'Upload'}
        </Button>
      )}
    </div>
  );
};

export default ImageCrop;









/////////////////////////////////////////////////////////////  uploading uploadnin image in 216 by 216 but takes time fine  /////////////////////////////////////////////////////////////



// import { useState } from "react";
// import { Upload, message } from 'antd';
// import ImgCrop from 'antd-img-crop';
// import { useUploadImageMutation } from "../../slices/uploadImageApiSlice";

// const ImageCrop = ({ image, updatefunction, loadingUpdate, size }) => {
//   const [fileList, setFileList] = useState([
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: `${image}`,
//     },
//   ]);
//   const [proImage, setProImage] = useState(image);
//   const [uploadProfileImage, { isLoading: loadingUpload }] = useUploadImageMutation();
//   const [isImageReadyForUpload, setIsImageReadyForUpload] = useState(false);

//   const onChange = async ({ fileList: newFileList }) => {
//     if (newFileList.length > 0) {
//       const file = newFileList[0].originFileObj;
//       const processedFile = await processImage(file);
//       setFileList([{ ...newFileList[0], originFileObj: processedFile }]);
//       setIsImageReadyForUpload(true);
//     } else {
//       setFileList([]);
//       setIsImageReadyForUpload(false);
//     }
//   };

//   const processImage = (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const img = new Image();
//         img.src = reader.result;
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');
//           const size = 216;
//           canvas.width = size;
//           canvas.height = size;
//           ctx.fillStyle = 'red';
//           ctx.fillRect(0, 0, size, size);
//           const offsetX = (size - img.width) / 2;
//           const offsetY = (size - img.height) / 2;
//           ctx.drawImage(img, offsetX, offsetY, img.width, img.height);
//           canvas.toBlob((blob) => {
//             resolve(new File([blob], file.name, { type: file.type }));
//           });
//         };
//       };
//     });
//   };

//   const handleImageUpload = async () => {
//     if (fileList.length > 0 && fileList[0].originFileObj) {
//       const file = fileList[0].originFileObj;
//       try {
//         const formData = new FormData();
//         formData.append('image', file);
//         const response = await uploadProfileImage(formData).unwrap();
//         if (response.message !== "") {
//           setIsImageReadyForUpload(false);
//           setProImage(response.image);
//           await updatefunction({ image: response.image });
//           message.success('Image uploaded successfully');
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         message.error('Failed to upload image');
//       }
//     }
//   };

//   const onPreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(`<img src="${src}" style="max-width: 100%; max-height: 100%;" />`);
//   };

//   return (
//     <div className="d-flex justify-content-center">
//       <ImgCrop modalWidth={size.width} modalHeight={size.height}>
//         <Upload
//           listType="picture-card"
//           fileList={fileList}
//           onChange={onChange}
//           onPreview={onPreview}
//           maxCount={1}
//         >
//           {fileList.length < 1 && '+ Upload'}
//         </Upload>
//       </ImgCrop>
//       {isImageReadyForUpload && (
//         <button onClick={handleImageUpload} disabled={loadingUpload || loadingUpdate}>
//           {loadingUpload || loadingUpdate ? 'Uploading...' : 'Upload'}
//         </button>
//       )}
//     </div>
//   );
// };

// export default ImageCrop;


/////////////////////////////////////////////////////////////  better then the previous one /////////////////////////////////////////////////////////////


// import { useState } from "react";
// import { Upload, message } from 'antd';
// import ImgCrop from 'antd-img-crop';
// import { useUploadImageMutation } from "../../slices/uploadImageApiSlice";

// const ImageCrop = ({ image, updatefunction, loadingUpdate, size }) => {
//   const [fileList, setFileList] = useState([
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: `${image}`,
//     },
//   ]);
//   const [proImage, setProImage] = useState(image);
//   const [uploadProfileImage, { isLoading: loadingUpload }] = useUploadImageMutation();
//   const [isImageReadyForUpload, setIsImageReadyForUpload] = useState(false);

//   const onChange = async ({ fileList: newFileList }) => {
//     if (newFileList.length > 0) {
//       const file = newFileList[0].originFileObj;
//       const processedFile = await processImage(file);
//       setFileList([{ ...newFileList[0], originFileObj: processedFile }]);
//       setIsImageReadyForUpload(true);
//     } else {
//       setFileList([]);
//       setIsImageReadyForUpload(false);
//     }
//   };

//   const processImage = (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const img = new Image();
//         img.src = reader.result;
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');
//           const size = 216;
//           canvas.width = size;
//           canvas.height = size;
//           ctx.fillStyle = 'red';
//           ctx.fillRect(0, 0, size, size);
          
//           let drawWidth = img.width;
//           let drawHeight = img.height;
//           let offsetX = 0;
//           let offsetY = 0;

//           if (img.width > size || img.height > size) {
//             const scaleFactor = Math.min(size / img.width, size / img.height);
//             drawWidth = img.width * scaleFactor;
//             drawHeight = img.height * scaleFactor;
//           }

//           offsetX = (size - drawWidth) / 2;
//           offsetY = (size - drawHeight) / 2;

//           ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
//           canvas.toBlob((blob) => {
//             resolve(new File([blob], file.name, { type: file.type }));
//           }, file.type);
//         };
//       };
//     });
//   };

//   const handleImageUpload = async () => {
//     if (fileList.length > 0 && fileList[0].originFileObj) {
//       const file = fileList[0].originFileObj;
//       try {
//         const formData = new FormData();
//         formData.append('image', file);
//         const response = await uploadProfileImage(formData).unwrap();
//         if (response.message !== "") {
//           setIsImageReadyForUpload(false);
//           setProImage(response.image);
//           await updatefunction({ image: response.image });
//           message.success('Image uploaded successfully');
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         message.error('Failed to upload image');
//       }
//     }
//   };

//   const onPreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(`<img src="${src}" style="max-width: 100%; max-height: 100%;" />`);
//   };

//   return (
//     <div className="d-flex justify-content-center">
//       <ImgCrop modalWidth={size.width} modalHeight={size.height}>
//         <Upload
//           listType="picture-card"
//           fileList={fileList}
//           onChange={onChange}
//           onPreview={onPreview}
//           maxCount={1}
//         >
//           {fileList.length < 1 && '+ Upload'}
//         </Upload>
//       </ImgCrop>
//       {isImageReadyForUpload && (
//         <button onClick={handleImageUpload} disabled={loadingUpload || loadingUpdate}>
//           {loadingUpload || loadingUpdate ? 'Uploading...' : 'Upload'}
//         </button>
//       )}
//     </div>
//   );
// };

// export default ImageCrop;


// import { useState, useCallback } from "react";
// import { Upload, message } from 'antd';
// import ImgCrop from 'antd-img-crop';
// import { debounce } from 'lodash';
// import { useUploadImageMutation } from "../../slices/uploadImageApiSlice";

// const ImageCrop = ({ image, updatefunction, loadingUpdate, size }) => {
//   const [fileList, setFileList] = useState([
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: `${image}`,
//     },
//   ]);
//   const [proImage, setProImage] = useState(image);
//   const [uploadProfileImage, { isLoading: loadingUpload }] = useUploadImageMutation();
//   const [isImageReadyForUpload, setIsImageReadyForUpload] = useState(false);

//   const onChange = useCallback(debounce(async ({ fileList: newFileList }) => {
//     if (newFileList.length > 0) {
//       const file = newFileList[0].originFileObj;
//       const processedFile = await processImage(file);
//       setFileList([{ ...newFileList[0], originFileObj: processedFile }]);
//       setIsImageReadyForUpload(true);
//     } else {
//       setFileList([]);
//       setIsImageReadyForUpload(false);
//     }
//   }, 500), []);

//   const processImage = (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const img = new Image();
//         img.src = reader.result;
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');
//           const size = 216;
//           canvas.width = size;
//           canvas.height = size;
//           ctx.fillStyle = 'red';
//           ctx.fillRect(0, 0, size, size);

//           let drawWidth = img.width;
//           let drawHeight = img.height;
//           let offsetX = 0;
//           let offsetY = 0;

//           if (img.width > size || img.height > size) {
//             const scaleFactor = Math.min(size / img.width, size / img.height);
//             drawWidth = img.width * scaleFactor;
//             drawHeight = img.height * scaleFactor;
//           }

//           offsetX = (size - drawWidth) / 2;
//           offsetY = (size - drawHeight) / 2;

//           ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
//           canvas.toBlob((blob) => {
//             resolve(new File([blob], file.name, { type: file.type }));
//           }, file.type);
//         };
//       };
//     });
//   };

//   const handleImageUpload = async () => {
//     if (fileList.length > 0 && fileList[0].originFileObj) {
//       const file = fileList[0].originFileObj;
//       try {
//         const formData = new FormData();
//         formData.append('image', file);
//         const response = await uploadProfileImage(formData).unwrap();
//         if (response.message !== "") {
//           setIsImageReadyForUpload(false);
//           setProImage(response.image);
//           await updatefunction({ image: response.image });
//           message.success('Image uploaded successfully');
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         message.error('Failed to upload image');
//       }
//     }
//   };

//   const onPreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(`<img src="${src}" style="max-width: 100%; max-height: 100%;" />`);
//   };

//   return (
//     <div className="d-flex justify-content-center">
//       <ImgCrop modalWidth={size.width} modalHeight={size.height}>
//         <Upload
//           listType="picture-card"
//           fileList={fileList}
//           onChange={onChange}
//           onPreview={onPreview}
//           maxCount={1}
//         >
//           {fileList.length < 1 && '+ Upload'}
//         </Upload>
//       </ImgCrop>
//       {isImageReadyForUpload && (
//         <button onClick={handleImageUpload} disabled={loadingUpload || loadingUpdate}>
//           {loadingUpload || loadingUpdate ? 'Uploading...' : 'Upload'}
//         </button>
//       )}
//     </div>
//   );
// };

// export default ImageCrop;
