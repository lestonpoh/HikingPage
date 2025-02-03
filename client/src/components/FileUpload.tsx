import { ChangeEvent, useEffect, useRef, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

interface Props {
  onFilesSelected: (files: File[]) => void;
  maxFiles: number;
}

const FileUpload = ({ onFilesSelected, maxFiles }: Props) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isError, setIsError] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [photoList, setPhotoList] = useState<string[]>([]);

  const handleFileUpload = (uploadedFiles: File[]) => {
    if (files.length + uploadedFiles.length > maxFiles) {
      setIsError(true);
      uploadedFiles = uploadedFiles.slice(0, maxFiles - files.length);
    }

    if (uploadedFiles && uploadedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files as ArrayLike<File>);

    handleFileUpload(selectedFiles);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropFiles = [...e.dataTransfer.files];
    handleFileUpload(dropFiles);
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const browseFilesOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInput.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (files.length <= maxFiles) {
      setIsError(false);
    }
  };

  const displayPhotos = (files: File[]) => {
    let tempList: string[] = [];
    files.forEach((file) => {
      tempList.push(URL.createObjectURL(file));
    });
    setPhotoList(tempList);
  };

  useEffect(() => {
    onFilesSelected(files), displayPhotos(files);
  }, [files]);

  return (
    <>
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
        <div className="text-sm">Supported file types: png, jpeg, jpg</div>
        <div className="text-xs">Up to {maxFiles} file(s)</div>
        <input
          type="file"
          hidden
          ref={fileInput}
          onChange={handleFileChange}
          accept=".png,.jpeg,.jpg"
          multiple={maxFiles > 1 ? true : false}
        />
        <button onClick={browseFilesOnClick} className="button">
          Browse files
        </button>
      </div>
      {isError && (
        <p className="text-red-500 text-xs mt-1">
          Maximum {maxFiles} file(s) accepted
        </p>
      )}
      <div className="mt-3">
        <ul className="flex flex-wrap gap-3">
          {photoList.map((photo, i) => (
            <li key={i} className="relative">
              <img className="h-40 w-40 object-cover" src={photo} alt="" />
              <div
                onClick={() => handleRemoveFile(i)}
                className="absolute top-0 right-0 cursor-pointer flex translate-x-1/2 -translate-y-1/2"
              >
                <CancelRoundedIcon fontSize="small" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FileUpload;
