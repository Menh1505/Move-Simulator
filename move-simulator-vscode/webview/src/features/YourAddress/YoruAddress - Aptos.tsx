import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AptosAccount } from "aptos";
import { ArrowLeft } from "../../icons/ArrowLeft";
import { AptosIcon } from "../../icons/AptosIcon";
import { FoundryIcon } from "../../icons/FoundryIcon";

const YourAddressAptos = () => {
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');
    const [publicKey, setPublicKey] = useState<string>('');

    useEffect(() => {
        const account = new AptosAccount();
        setWalletAddress(account.address().hex());
        setPrivateKey(account.toPrivateKeyObject().privateKeyHex);
        setPublicKey(account.pubKey().hex());
    }, []);

    const location = useLocation();
    const page = location.state?.page;
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
                                YourAddress {page}
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

export default YourAddressAptos;