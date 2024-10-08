import { ArrowRight } from "../icons/ArrowRight";

interface TabProps {
    icon: JSX.Element;
    title: string;
}

export const Tab = ({ icon, title }: TabProps) => {
    return (
        <div className="flex  overflow-hidden justify-between p-[10px] bg-[#50505026] mini:w-[80%]">
            <div className="inline-flex items-center gap-[12px]">
                {icon}
                <div className="w-fit mt-[-1.00px] [font-family:'Aeonik-Regular',Helvetica] font-normal text-white text-[18px] whitespace-nowrap">
                    {title}
                </div>
            </div>
            <ArrowRight className="!relative !w-[24px] !h-[24px] mini:hidden" />
        </div>
    )
}
