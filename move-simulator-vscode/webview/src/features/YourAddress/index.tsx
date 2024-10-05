import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { ArrowLeft } from "../../icons/ArrowLeft";
import { AptosIcon } from "../../icons/AptosIcon";
import { FoundryIcon } from "../../icons/FoundryIcon";

const YourAddress = () => {
    const [walletAddress, setWalletAddress] = useState<string>(() => localStorage.getItem('walletAddress') || '');
    const [privateKey, setPrivateKey] = useState<string>(() => localStorage.getItem('privateKey') || '');
    const [publicKey, setPublicKey] = useState<string>(() => localStorage.getItem('publicKey') || '');
    const createAccount = () => {
        const wallet = ethers.Wallet.createRandom();
        const address = wallet.address;
        const privKey = wallet.privateKey.replace(/^0x/, '');
        const pubKey = wallet.publicKey;

        // Update state and store in localStorage
        setWalletAddress(address);
        setPrivateKey(privKey);
        setPublicKey(pubKey);

        localStorage.setItem('walletAddress', address);
        localStorage.setItem('privateKey', privKey);
        localStorage.setItem('publicKey', pubKey);

    };

    const location = useLocation();
    const page = location.state?.page;

    useEffect(() => {
        const savedWalletAddress = localStorage.getItem('walletAddress') || '';
        const savedPrivateKey = localStorage.getItem('privateKey') || '';
        const savedPublicKey = localStorage.getItem('publicKey') || '';

        // Set state from localStorage if values exist
        setWalletAddress(savedWalletAddress);
        setPrivateKey(savedPrivateKey);
        setPublicKey(savedPublicKey);
    }, []);

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/${page}`);
    };

    return (
        <>
            <div className="h-[300vh] grow overflow-y-scroll">
                <div className="absolute w-[640px] sidebar:w-[400px] h-[766px] top-[-178px] left-[25px]">
                    <div className="flex flex-col w-full items-start gap-[20px] absolute top-[228px] left-0">
                        <div
                            className="flex items-end gap-[8px] relative self-stretch w-full flex-[0_0_auto]"
                            onClick={handleNavigate}>
                            <ArrowLeft className="!relative !w-[24px] !h-[24px]" />
                            {page === 'aptos' ? <AptosIcon className="!relative !w-[24px] !h-[24px] bg-white rounded-xl" /> : <FoundryIcon className="!relative !w-[24px] !h-[24px] bg-white rounded-xl" />}
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Aeonik-Regular',Helvetica] font-normal text-white text-[18px] text-center tracking-[0] leading-[21.6px] whitespace-nowrap uppercase">
                                Create Account {page}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[24px] my-5 w-full ">
                            <div>
                                <label
                                    className="block text-white text-xl font-semibold mb-2 text-gray-700"
                                >Wallet Address</label>
                                <input
                                    className="w-full px-5 py-4 text-[#8f8f8f] text-[20px] border border-[#5a5a5a] rounded-lg bg-[#0e0f0e]"
                                    type="text"
                                    value={walletAddress}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-white text-xl font-semibold mb-2 text-gray-700"
                                >Private Key</label>
                                <input
                                    className="w-full px-5 py-4 text-[#8f8f8f] text-[20px] border border-[#5a5a5a] rounded-lg bg-[#0e0f0e]"
                                    type="text"
                                    value={privateKey}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-white text-xl font-semibold mb-2 text-gray-700"
                                >Public Key</label>
                                <input
                                    className="w-full px-5 py-4 text-[#8f8f8f] text-[20px] border border-[#5a5a5a] rounded-lg bg-[#0e0f0e]"
                                    type="text"
                                    value={publicKey}
                                    readOnly
                                />
                            </div>
                            <div className="mt-5">
                                <button
                                    className="w-full px-5 py-4 mt-4 text-white text-[18px] rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
                                    onClick={createAccount} // Use the function directly without wrapping it in another function
                                >
                                    Create Account
                                </button>

                                <button
                                    className="w-full mt-3.5 px-5 py-4 text-white text-[18px] rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
                                    onClick={handleNavigate}
                                >
                                    Account already exists
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer self-end"
                    onClick={() => { navigate("/deploy") }}>
                    Deploy
                </div>
            </div>
        </>
    );
}

export default YourAddress;