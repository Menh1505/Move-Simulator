import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import WalletInput from '../components/WalletInput';
import NetworkSelect from '../components/NetworkSelect';
import DeployButton from '../components/DeployButton';
import PageHeader from '../components/PageHeader';

interface FoundryProps {
  setCurrentPage: (page: string) => void; // Accepts any string
}

const Foundry: React.FC<FoundryProps> = ({ setCurrentPage }) => {
  const [file, setFile] = useState<File | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [network, setNetwork] = useState<string>('foundry-testnet');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('walletAddress', walletAddress);
    formData.append('privateKey', privateKey);
    formData.append('network', network);

    try {
      const response = await fetch('http://localhost:5000/deployFoundry', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      alert(`Deployment successful: ${result.message}`);
    } catch (error) {
      alert('Error during deployment');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <PageHeader title="Deploy Foundry Contract" setCurrentPage={setCurrentPage} />
      <form onSubmit={handleSubmit}>
        <FileUpload file={file} setFile={setFile} />
        <WalletInput
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
        />
        <NetworkSelect network={network} setNetwork={setNetwork} />
        <DeployButton handleSubmit={(e) => { e.preventDefault(); handleSubmit(e as any); }} />
      </form>
    </div>
  );
};

export default Foundry;
