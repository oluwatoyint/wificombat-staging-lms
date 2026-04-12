import GeneralNavbar from "../components/general/GeneralNavbar"
import Footer from "../components/general/Footer"
import { BePartContact } from "../components/ContactUs/bepartContact"
import { ContactHero } from "../components/ContactUs/contactHero"
import { MessageUs } from "../components/ContactUs/mesageUs"
import { ContactInfo } from "../components/ContactUs/contactInfo"

export default function Page() {
    return (
        <div className="mx-auto relative container w-full max-w-[2000px]">
             <GeneralNavbar />
             <ContactHero 
                headerOne="Get in touch with us. We're here to assist you."
                bgColor="purple"
               
                textColor={true}  text={""} 
                />
             <MessageUs/> 
              <ContactInfo/>
             <BePartContact/>
             <Footer/>
        </div>
    )
}
