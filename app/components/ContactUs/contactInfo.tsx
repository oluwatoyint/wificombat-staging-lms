



export const ContactInfo = () => {
    return (
        <>
        <div className='flex items-center  overflow-hidden gap-10 h-72 justify-center lg:gap-60  bg-[url("/bbbbbb.png")] p-4'>
        <div>
            <p className="text-custom-lg  leading-custom-lg">Contact Info</p>
            <p className="font-semibold  text-[16px] lg:text-[48px]">We are always <br/> happy to assist you</p>
        </div>
        <div className="">
            <div className="">
              <p className="font-medium text-[10px] lg:text-[20px]">Email Address</p>
              <p  className="font-semibold  text-[10px] lg:text-[22px] ">wificombatacademy@gmail.com</p>
            </div>
            <div className="mt-2">
               <p className="font-medium  text-[10px] lg:text-[20px]">Number</p>
               <p  className="font-semibold text-[10px] lg:text-[22px] text-[#131314]">(808) 998-34256</p>
            </div>
            <div className="mt-2">
               <p className="font-medium text-[10px] lg:text-[20px]">Assistance hours: <br/> Monday - Friday 6 am to 8 pm EST</p> 
               
            </div>
        </div>
        </div>
        </>
    )
}