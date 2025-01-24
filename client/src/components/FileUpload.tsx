import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload = ({ onFilesSelected }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropFiles = e.dataTransfer.files;
    if (dropFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...dropFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`${
        isDragOver ? "border-gray-600" : "border-gray-300"
      } py-20 w-full border border-dashed flex items-center justify-center flex-col gap-2 rounded-lg
      `}
    >
      <div className="font-bold text-lg">Drop your files here to upload</div>
      <div className="text-sm">Supported file types: png, jpeg</div>
      <input
        type="file"
        hidden
        id="browse"
        onChange={handleFileChange}
        accept=".png,.jpeg"
        multiple
      />
      <label htmlFor="browse" className="button">
        Browse files
      </label>
    </div>
  );
};

export default FileUpload;
