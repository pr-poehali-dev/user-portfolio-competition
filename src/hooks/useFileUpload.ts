import { useState } from "react";

export const useFileUpload = (
  allowedFormats: string[],
  maxFileSize: number,
) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndFilterFiles = (files: File[]): File[] => {
    return files.filter((file) => {
      const fileExtension = file.name.split(".").pop()?.toUpperCase();
      const isValidFormat = allowedFormats.includes(fileExtension || "");
      const isValidSize = file.size <= maxFileSize * 1024 * 1024;

      if (!isValidFormat) {
        alert(`Файл ${file.name} имеет недопустимый формат`);
        return false;
      }
      if (!isValidSize) {
        alert(
          `Файл ${file.name} превышает максимальный размер ${maxFileSize}MB`,
        );
        return false;
      }
      return true;
    });
  };

  return {
    dragActive,
    setDragActive,
    handleDrag,
    validateAndFilterFiles,
  };
};
