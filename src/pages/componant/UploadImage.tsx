// import React, { useEffect, useState } from "react";
// import UploadImage from "./ImagePicker";

// interface Props {
//   previewUrlsProps?: string[],
//   onAddImages?: (files: File[]) => void;
//   onUpdateImage?: (index: number, file: File) => void;
//   onDeleteImage?: (index: number) => void;
// }

// const UploadImages: React.FC<Props> = ({
//   previewUrlsProps,
//   onAddImages,
//   onUpdateImage,
//   onDeleteImage,
// }) => {
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);

//   useEffect(() => {
//     if (previewUrlsProps) {
//       setPreviewUrls(previewUrlsProps)
//     }
//   }, [previewUrlsProps]);

//   const handleUpdateImage = (
//     index: number,
//     preview: string | null,
//     file: File | null
//   ) => {
//     if (preview) {
//       previewUrls[index] = preview;
//       setPreviewUrls([...previewUrls]);
//     }

//     if (file && onUpdateImage) {
//       onUpdateImage(index, file);
//     }
//   };

//   const handleAddImages = (
//     previews: (string | null)[],
//     files: (File | null)[]
//   ) => {
//     const validPreviews = previews.filter((preview) => !!preview) as string[];
//     setPreviewUrls([...previewUrls, ...validPreviews]);

//     if (onAddImages) {
//       const validFiles = files.filter((f) => !!f) as File[];
//       onAddImages(validFiles);
//     }
//   };

//   const handleDeleteImage = (index: number) => {
//     const filtered = previewUrls.filter((_, i) => index !== i);
//     setPreviewUrls(filtered);

//     if (onDeleteImage) {
//       onDeleteImage(index);
//     }
//   };

//   return (
//     <div className="grid grid-cols-2 gap-2">
//       {previewUrls.map((previewUrl, index) => (
//         <UploadImage
//           key={`${previewUrl}-${index}}`}
//           previewUrl={previewUrl}
//           onSelectImage={(preview, file) =>
//             handleUpdateImage(index, preview, file)
//           }
//           onDelete={() => handleDeleteImage(index)}
//         />
//       ))}
//       <UploadImage onSelectImages={handleAddImages} multiple />
//     </div>
//   );
// };

// export default UploadImages;