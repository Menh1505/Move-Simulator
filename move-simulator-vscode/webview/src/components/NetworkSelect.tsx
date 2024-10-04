import React from 'react';

const MOVEMENT_NETWORKS = {
  aptos: [
    {
      name: "Aptos Testnet (Suzuka)",
      value: "aptos-testnet-suzuka",
      rpcUrl: "https://aptos.testnet.suzuka.movementlabs.xyz/v1",
      explorer: "https://explorer.movementnetwork.xyz/?network=testnet",
      faucet: "https://faucet.movementlabs.xyz/?network=aptos"
    },
    {
      name: "Aptos Devnet (Suzuka)",
      value: "aptos-devnet-suzuka",
      rpcUrl: "https://devnet.suzuka.movementnetwork.xyz/v1",
      explorer: "https://explorer.suzuka.movementnetwork.xyz/?network=devnet",
      faucet: "https://faucet.devnet.suzuka.movementnetwork.xyz/"
    }
  ],
  solidity: [
    {
      name: "EVM Environment (EVM)",
      value: "solidity-testnet",
      description: "Compatible with Foundry and Hardhat",
      rpcUrl: "https://mevm.devnet.imola.movementlabs.xyz",
      explorer: "https://explorer.devnet.imola.movementlabs.xyz",
      faucet: "https://faucet.movementlabs.xyz/?network=mevm"
    }
  ]
};

interface NetworkSelectProps {
  network: string;
  setNetwork: (network: string) => void;
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({ network, setNetwork }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="network">
        Network
      </label>
      <select
        id="network"
        className="w-full py-2 px-3 border rounded"
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
      >
        <optgroup label="Aptos Networks">
          {MOVEMENT_NETWORKS.aptos.map((net) => (
            <option key={net.value} value={net.value}>
              {net.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="Solidity Networks">
          {MOVEMENT_NETWORKS.solidity.map((net) => (
            <option key={net.value} value={net.value}>
              {net.name} ({net.description})
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default NetworkSelect;
