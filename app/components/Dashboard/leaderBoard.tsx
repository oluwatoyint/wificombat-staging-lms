import { useEffect, useState } from "react";
import Image from "next/image";



const rankPosition = [
    {
        profile:"/Ellipse_4.png",
        name:"Thomas",
        point:647372,
         positionimage:"/Group4.png"

    },
    {
        profile:"/Ellipse_3.png",
        name:"John",
        point:892384,
        positionimage:"/Group3.png"

    },
    {
        profile:"/Ellipse4.png",
        name:"Jesse",
        point:6372,
        positionimage:"/Group5.png"

    },
]

const rankContinue = [
    {
        positions:4,
        names:"John Doe",
        images:"/Ellipse_4.png",
        points:2982
    },
    {
        positions:5,
        names:"John Doe",
        images:"/Ellipse_4.png",
        points:2982
    },
    {
        positions:6,
        names:"John Doe",
        images:"/Ellipse_4.png",
        points:2982
    },
    {
        positions:7,
        names:"John Doe",
        images:"/Ellipse_4.png",
        points:2982
    }

]

const badges =  [
    {
       badgeimage:"/Leaguebadge2.png"  
    },
    {
        badgeimage:"/Leaguebadge3.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     },
     {
        badgeimage:"/Leaguebadge4.png"  
     }
]

const LeaderBoard = () => {

    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime((prev) => prev + 1 );
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const formatTime = (seconds:number): string => {
        const days = Math.floor(seconds /( 24 * 3600));
        seconds %= 24 * 3600;
        const hours = Math.floor(seconds /3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`
    }
    return(
        <>
          <div className="flex">

            <div className="border-r-2  flex flex-col items-center">
             <div className="flex w-[614px] px-6 py-3 justify-between">
              <div className="flex gap-1">
                 <Image 
                    src="/Leaguebadge3.png"
                    alt="ruby"
                    width={50}
                    height={50}
                   
                  />
                  <p className="mt-2">Ruby League</p>
            </div>
            <div className="flex bg-[#E6F6FE] w-[132px] h-[30px] rounded gap-2 justify-center">
         
            <Image src="/clock.svg"
              alt=""
              width={20}
              height={20}
    
            />
           <p className="font-bold text-[12px] mt-1">{formatTime(elapsedTime)}</p>
          </div>
          </div>
          <div className="flex gap-5">
          {rankPosition.map((rank, index) => (
                <div key={index} className="">
                  <Image
                   src={rank.profile}
                   alt={rank.name}
                   width={50}
                   height={50}
                   className="border-[#BC00DD] border-2 rounded-full"
                   />
                   <p>{rank.name}</p>
                   {/* <p className="bg-[#BC00DD] text-white rounded-md px-2">{rank.point}p</p>
                   <Image 
                      src={rank.positionimage}
                      alt=""
                      width={50}
                      height={50}
                   /> */}
                </div>

                
            ))}
            </div>
            <div className="">
          <div className="">
           {rankContinue.map((rankcontinue, index) => (
            <div key={index} className="flex mt-2 bg-[#FBE5FF] w-[400px] px-4 py-3 rounded-xl justify-between hover:bg-[#E866FF] hover:text-white">
            <div className="flex gap-2">
               <p className="border border-[#BC00DD] w-[28px] h-[28px] text-center rounded-md font-normal text[12px] hover:bg-[#BC00DD]">{rankcontinue.positions}</p>
               <Image
                 src={rankcontinue.images}
               alt={rankcontinue.names}
               width={30}
               height={30}
            />
            <p className="font-semibold text-[14px]">{rankcontinue.names}</p>
            </div>
            <p className="font-bold text-[16px]">{rankcontinue.points}p</p>
            </div>
           )) }
             </div>
             </div>
            </div>
             <div className="grid grid-cols-3 gap-4 items-center">
                
                {badges.map((badge, index) => (
                    <div key={index}>
                         <Image
                         src={badge.badgeimage}
                         alt=""
                         width={90}
                         height={90}
                         />
                    </div>
                ))}
             
             </div>
          </div>
        </>
    )
}


export default LeaderBoard