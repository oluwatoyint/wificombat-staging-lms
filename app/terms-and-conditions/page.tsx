import GeneralNavbar from "../components/general/GeneralNavbar"
import Footer from "../components/general/Footer"
import { PrivacyHero } from "../components/privacyPolicy/privacyHero"
import TermsCondition from "../components/termCodition/termsBody"



export default function Page(){
    return (
        <>
        <GeneralNavbar />
        <PrivacyHero 
        headerOne="Terms And Conditions" 
        headerTwo="Please read the terms and conditions carefully, we are here to give you the best experience." 
        bgColor="purple"
        text={""}/>
        <TermsCondition/>
        <Footer />
        </>
    )
}