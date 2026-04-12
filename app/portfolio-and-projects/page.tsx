import GeneralNavbar from "../components/general/GeneralNavbar";
import Footer from "@/app/components/general/Footer";
import { PortfolioBenefit } from "../components/PortfolioProject/keybenefit";
import { PortfolioEnhance } from "../components/PortfolioProject/portfolio-enhance";
import { Prepare } from "../components/PortfolioProject/prepare";
import { PortfolioManagement } from "../components/PortfolioProject/portfolio-management";
import { PortHero } from "../components/PortfolioProject/porthero";
export default function Page() {
    return (
        <div className="mx-auto relative container w-full max-w-[2000px]">
            <GeneralNavbar />
            <PortHero/>
            <PortfolioManagement/>
            <PortfolioBenefit/>
            <PortfolioEnhance/>
            <Prepare/>
            <Footer />
        </div>
    )
}
