import React from 'react';

interface PageHeaderProps {
  title: string;
  className?: string; // className is optional
  setCurrentPage: (page: any) => void; // you may want to replace `any` with a more specific type
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, className = '', setCurrentPage }) => {
  const handleGoHome = () => {
    setCurrentPage(null);
  };

  return (
    <div className={`flex items-center mb-4 ${className}`}>
      <button
        onClick={handleGoHome}
        className="mr-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Go to home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <h2 className="text-2xl">{title}</h2>
    </div>
  );
};

export default PageHeader;
