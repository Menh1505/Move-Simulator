import React from 'react';

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  page: string | null;
  setFileName: (file: string | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, setFile, page, setFileName }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name.split('.').slice(0, -1).join('.'));

    } else {
      setFile(null);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-white text-xl font-semibold mb-2 text-gray-700" htmlFor="file">
        Upload Contract File
      </label>
      <input
        type="file"
        id="file"
        className="w-full py-2 px-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
        onChange={handleFileChange}
        accept={page === 'aptos' ? '.move' : '.sol'}
        required
      />
      {file && <p className="mt-2 text-gray-600">Selected file: {file.name}</p>} {/* Display selected file name */}
    </div>
  );
};

export default FileUpload;
