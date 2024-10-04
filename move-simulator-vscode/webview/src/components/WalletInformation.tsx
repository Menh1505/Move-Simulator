import React, { useState } from 'react';

const WalletInformation: React.FC = () => {
  const [account, setAccount] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [balance, setBalance] = useState<string>('0 APT');

  // Hàm giả lập việc lấy số dư (có thể cập nhật với API thực sau này)
  const handleFetchBalance = () => {
    // Tạm thời để số dư là 10 APT
    setBalance(balance);
  };

  return (
    <div className="wallet-info p-4 border rounded-md bg-gray-100">
      <h3 className="text-xl font-semibold mb-4">Wallet Information</h3>

      <div className="mb-4">
        <label className="block font-medium mb-1">Account address:</label>
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Enter your account address"
          className="w-full p-2 border rounded-md"
        />
      </div>
      {/* Input cho Public Key */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Public Key:</label>
        <input
          type="text"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          placeholder="Enter your public key"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Input cho Private Key */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Private Key:</label>
        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Enter your private key"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Hiển thị số dư ví */}
      <p><strong>Balance:</strong> {balance}</p>

      {/* Nút để lấy số dư ví */}
      <div className="mt-4">
        <button
          onClick={handleFetchBalance}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Fetch Balance
        </button>
      </div>
    </div>
  );
};

export default WalletInformation;
