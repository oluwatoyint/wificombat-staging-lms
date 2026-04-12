import GeneralNavbar from "../components/general/GeneralNavbar"
import Footer from "../components/general/Footer"
import { PrivacyHero } from "../components/privacyPolicy/privacyHero"
import PrivacyBody from  "../components/privacyPolicy/privacyBody"


export default function Page(){
    return (
        <>
        <GeneralNavbar />
        <PrivacyHero 
        headerOne="Privacy Policy" 
        headerTwo="Please read the privacy policy carefully, we are here to give you the best experience." 
        bgColor="purple"
        text={""}/>
        <PrivacyBody/>
        <Footer />
        </>
    )
}