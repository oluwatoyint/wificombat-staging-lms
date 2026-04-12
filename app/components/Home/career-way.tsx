import Image from "next/image";
import HeadingDesign from "../general/HeaderDesign";

export const CareerPathway = () => {
  return (
    <section className="relative">
       <HeadingDesign headingTwo={<>
        <div className="mb-2 flex flex-col gap-5 items-center">
          <h3>About</h3>
          <h3>Career Pathways</h3>
        </div>
        </>}/>

      <div className="mt-12 md:mt-16 lg:mt-20 xl:mt-[5.5rem] mb-20 w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 lg:gap-16">
          <div className="w-full md:basis-[50%]">
            <p className="md:w-[90%] font-semibold  text-[30px] md:text-3xl">
              Career Pathway for Tech: Empowering Kids to Find Their Path in
              Technology
            </p>

            <p className="mt-4 md:mt-6 md:w-[90%] lg:w-[85%] md:text-xl text-black-700 leading-8">
              <span className="font-semibold">
                Explore six dynamic career pathways in technology,
              </span>{" "}
              including AI for innovation, Robotics & IoT for automation,
              Multimedia for creative expression, Coding for software mastery,
              Software Engineering/DevOps for infrastructure optimization, and
              Gaming for immersive entertainment. Each pathway offers unique
              opportunities to innovate, create, and lead in their respective
              fields. Start your journey today and shape the future of
              technology
            </p>
          </div>

          <div className="w-full md:basis-[50%]">
            <div className="w-full h-[350px] 2xl:h-[350px] min-[2000px]:h-[380px]
             bg-primary-gray border-4 border-black-500 rounded-2xl">
                <Image
                  src={`/pathway.jpeg`}
                  alt="pathway-image"
                  width={514}
                  height={348}
                  className="w-full h-full object-cover rounded-2xl"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
