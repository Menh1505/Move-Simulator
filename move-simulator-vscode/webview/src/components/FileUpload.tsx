import React from 'react';

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, setFile }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
        Upload Contract File
      </label>
      <input
        type="file"
        id="file"
        className="w-full py-2 px-3 border rounded"
        onChange={handleFileChange}
        accept=".sol,.move"
        required
      />
      {file && <p className="mt-2 text-gray-600">Selected file: {file.name}</p>} {/* Display selected file name */}
    </div>
  );
};

export default FileUpload;
