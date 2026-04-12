import Image from "next/image";
import HeadingDesign from "../../general/HeaderDesign";

export const TechSkill = () => {
  return (
    <section>
      <HeadingDesign heading="anyone can learn a tech skill" />

      <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
        <p className="md:w-[88%] mx-auto mt-6 md:mt-9 lg:mt-12 md:text-2xl text-center font-medium">
        The WiFiCombat eLearn platform ensures that anyone, regardless of their background or experience, can learn valuable tech skills and thrive in the digital world.

        </p>
      </div>

      <div className="md:w-[90%] mx-auto mt-9 md:mt-14 mb-20 flex flex-col items-center justify-center">
        <div className="flex gap-7 md:gap-12 lg:gap-20 xl:gap-28 items-center justify-center">
          <div className="relative w-[8rem] h-[10rem] md:w-[20rem] md:h-[22rem] xl:w-[26rem] xl:h-[26.69rem]">
            <div className="polygon bg-primary-gray w-full h-full">
              <Image 
              src={`/assets/pathway/tech-skill-1.png`}
              alt="skill"
              width={414}
              height={427}
              className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative w-[8rem] h-[10rem] md:w-[20rem] md:h-[22rem] xl:w-[26rem] xl:h-[26.69rem]">
            <div className="polygon bg-primary-gray w-full h-full">
               <Image 
              src={`/assets/pathway/tech-skill-2.png`}
              alt="skill"
              width={414}
              height={427}
              className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative w-[8rem] h-[10rem] md:w-[20rem] md:h-[22rem] xl:w-[26rem] xl:h-[26.69rem]">
          <div className="polygon bg-primary-gray w-full h-full">
             <Image 
              src={`/assets/pathway/tech-skill-3.png`}
              alt="skill"
              width={414}
              height={427}
              className="w-full h-full object-cover"
              />
          </div>
        </div>
      </div>
    </section>
  );
};
