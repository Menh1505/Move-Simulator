//@ts-ignore
import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "../../icons/ArrowLeft";
import { useEffect, useState } from "react";
import { AptosIcon } from "../../icons/AptosIcon";
import { FoundryIcon } from "../../icons/FoundryIcon";
import { ethers } from "ethers";

const AccountBalance = () => {
    //@ts-ignore
    const [walletAddress, setWalletAddress] = useState<string>(() => localStorage.getItem('walletAddress') || '');
    const [selectedCoin, setSelectedCoin] = useState('');
    //@ts-ignore
    const [balance, setBalance] = useState<string>('0');
    //@ts-ignore
    const [number, setNumber] = useState<number | string>('');
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCoin(e.target.value);
        console.log(e.target.value)
    };


    useEffect(() => {
        const getBalance = async (address: string) => {
            let provider = ethers.getDefaultProvider("https://mevm.devnet.imola.movementlabs.xyz");
            if (!address) return; // Nếu địa chỉ không tồn tại, không làm gì cả
            try {
                const balance = await provider.getBalance(address);
                const balanceMove = ethers.formatUnits(balance, 18);
                setBalance(balanceMove.toString());
            } catch (error) {
                console.error('Lỗi khi lấy số dư:', error);
            }
        };
        getBalance(walletAddress);
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
                                Account Balance {page}
                            </div>
                        </div>


                        <div className="flex flex-col gap-[24px] my-5 w-full ">
                            <div>
                                <label htmlFor="coin"
                                    className=" block text-xl text-white font-semibold mb-2 text-gray-700"
                                >Asset Type</label>
                                <input
                                    className={`w-full px-5 py-4 text-[#8f8f8f] text-[20px] border border-[#5a5a5a] rounded-lg bg-[#0e0f0e] `}
                                    type="text"
                                    value="Coin"
                                    disabled
                                />
                            </div>

                            <div>
                                <label htmlFor="coin"
                                    className=" block text-xl text-white font-semibold mb-2 text-gray-700"
                                >Coin Type</label>
                                <select
                                    id="coin"
                                    value={selectedCoin}
                                    onChange={handleSelectChange}
                                    className="w-full px-5 py-4 text-[#8f8f8f] text-[20px] border border-[#5a5a5a] rounded-lg bg-[#0e0f0e]"
                                >
                                    <option value="Move" className="bg-white text-[#8f8f8f]">Move</option>
                                </select>
                            </div>
                            <div >
                                <label
                                    className=" block text-white text-xl font-semibold mb-2 text-gray-700"
                                >Balance</label>
                                <input
                                    className={`w-full px-5 py-4 text-[#8f8f8f] text-[20px] border border-[#5a5a5a] rounded-lg bg-[#0e0f0e] `}
                                    type="text"
                                    max={10000000000}
                                    value={balance}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className=" bg-blue-500 text-white font-bold py-2 px-4 rounded  cursor-pointer self-end"
                    onClick={() => { navigate("/deploy") }}>
                    Deploy
                </div>
            </div>
        </>
    );
}
export default AccountBalance;