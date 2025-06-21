import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useFileUpload } from "@/hooks/useFileUpload";

interface FileUploadSectionProps {
  allowedFormats: string[];
  maxFileSize: number;
  selectedFiles: File[];
  onFilesSelect: (files: File[]) => void;
  onFileRemove: (index: number) => void;
}

const FileUploadSection = ({
  allowedFormats,
  maxFileSize,
  selectedFiles,
  onFilesSelect,
  onFileRemove,
}: FileUploadSectionProps) => {
  const { dragActive, setDragActive, handleDrag, validateAndFilterFiles } =
    useFileUpload(allowedFormats, maxFileSize);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const validFiles = validateAndFilterFiles(files);
      onFilesSelect(validFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = validateAndFilterFiles(files);
      onFilesSelect(validFiles);
    }
  };

  return (
    <div>
      <Label>Положение о конкурсе *</Label>
      <div
        className={`mt-1 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? "border-purple-500 bg-purple-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Icon name="Upload" className="mx-auto h-10 w-10 text-gray-400 mb-3" />
        <p className="text-gray-600 mb-2">
          Перетащите файлы сюда или
          <label className="text-purple-600 hover:text-purple-700 ml-1 cursor-pointer">
            выберите файлы
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.pptx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-sm text-gray-500">
          Поддерживаются: {allowedFormats.join(", ")} (до {maxFileSize}MB)
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={16} className="text-gray-500" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFileRemove(index)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;
