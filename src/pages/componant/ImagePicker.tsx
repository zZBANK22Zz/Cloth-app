import React, { ChangeEventHandler, useState } from "react";
import { CloseIcon } from "@nextui-org/shared-icons";

interface Props {
  previewUrl?: string | null;
  multiple?: boolean;
  onSelectImage?: (previewUrl: string | null, file: File | null) => void;
  onSelectImages?: (
    previewUrls: (string | null)[],
    files: (File | null)[]
  ) => void;
  onDelete?: () => void;
}

const ImagePicker: React.FC<Props> = ({
  previewUrl,
  multiple,
  onSelectImage,
  onSelectImages,
  onDelete,
}) => {
  const extractFileContent = (file: File | null) => {
    return new Promise<string | null>((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (result) => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      if (!file) return resolve(null);
      else fileReader.readAsDataURL(file);
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files) {
      const files = e.target.files;
      const rawFiles: (File | null)[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        rawFiles.push(file);
      }

      const results = await Promise.all(
        rawFiles.map((file) => extractFileContent(file))
      );

      if (multiple) {
        onSelectImages && onSelectImages(results, rawFiles);
      } else {
        onSelectImage && onSelectImage(results[0], rawFiles[0]);
      }
    }
  };

  return (
    <div className="relative">
      <label>
        <div className="cursor-pointer">
          <div className="flex items-center justify-center border border-dashed hover:border-primary min-w-12 max-w-52 aspect-square transition-all">
            <div className="p-2">
              {!previewUrl ? (
                <p className="text-sm text-gray-400">
                  {!multiple ? "Select an image" : "Select images"}
                </p>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="preview-upload" className="w-full" />
              )}
            </div>
          </div>
        </div>
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleChange}
          multiple={multiple}
        />
      </label>
      {onDelete && (
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onDelete}
        >
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

export default ImagePicker;