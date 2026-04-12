import GeneralNavbar from "../components/general/GeneralNavbar"
import Footer from "../components/general/Footer"
import { FaqsHero } from "../components/Faqs/faqsHero"
import { FAQContent } from "../components/Faqs/faqContent"


export default function Page(){
    return(
        <>
        <GeneralNavbar/>
       <FaqsHero
                headerOne="Frequently Asked Questions"
                bgColor="purple"

                textColor={true} text={""} headerTwo="Feel free to contact our support team if you have any additional questions or specific inquiries not covered in this FAQ. Happy learning!"       />
        <FAQContent noSpace={true}/>
        <Footer/>
        </>
    )
}