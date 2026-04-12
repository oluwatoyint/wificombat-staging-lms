import Image from "next/image";


export const Partner = () => {
    return (
        <>
       <div className="flex flex-col items-center justify-center mb-14">
       <h2 className="font-bold text-4xl leading-[45px] text-left  mb-10">Our Partners</h2>
       <Image
          src="/partner_wifi.png"
          alt="partners"
          width={400}
          height={40}
          className="w-[423px] h-[119.62px]"
        />
        </div>
            </>        
    )
}

