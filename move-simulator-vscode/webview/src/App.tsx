import './App.css';
import Aptos from './Pages/Aptos';
import Foundry from './Pages/Foundry';
import { Logo } from "./components/Logo";
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState<string | null>(null); // Keep this generic

  const togglePage = () => {
    setCurrentPage(currentPage === 'Aptos' ? 'Foundry' : 'Aptos');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Aptos':
        return <Aptos setCurrentPage={setCurrentPage} />;
      case 'Foundry':
        return <Foundry setCurrentPage={setCurrentPage} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-white text-lg sm:text-xl mb-4 text-center">Select a simulator to Start</div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                className="px-4 py-2 bg-[#ffffff1a] text-white rounded hover:bg-[#ffffff33] transition-colors"
                onClick={() => setCurrentPage('Aptos')}
              >
                Aptos
              </button>
              <button
                className="px-4 py-2 bg-[#ffffff1a] text-white rounded hover:bg-[#ffffff33] transition-colors"
                onClick={() => setCurrentPage('Foundry')}
              >
                Foundry
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white">
      <header className="flex flex-col sm:flex-row items-center p-4 bg-[#252526] border-b border-[#3c3c3c]">
        <div className="flex items-center mb-2 sm:mb-0">
          <Logo className="w-8 h-8 mr-3" />
          <h1 className="text-lg sm:text-xl font-semibold">Movement Simulator</h1>
        </div>
        {currentPage && (
          <button
            className="mt-2 sm:mt-0 sm:ml-auto px-3 py-1 bg-[#ffffff1a] rounded hover:bg-[#ffffff33] transition-colors"
            onClick={togglePage}
          >
            Switch to {currentPage === 'Aptos' ? 'Foundry' : 'Aptos'}
          </button>
        )}
      </header>
      <main className="flex-grow overflow-auto p-4">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
