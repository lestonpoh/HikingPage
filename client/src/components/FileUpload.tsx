import { ChangeEvent, useEffect, useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

interface Props {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload = ({ onFilesSelected }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [photoList, setPhotoList] = useState<string[]>([]);

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
