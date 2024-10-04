import React from 'react';

interface DeployButtonProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DeployButton: React.FC<DeployButtonProps> = ({ handleSubmit }) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      onClick={handleSubmit}
    >
      Deploy
    </button>
  );
};

export default DeployButton;
