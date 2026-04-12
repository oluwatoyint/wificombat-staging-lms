import CareerCard from "./career-card";
import HeadingDesign from "../general/HeaderDesign";

export const CareerPath = () => {
  return (
    <section className="relative">
      <HeadingDesign heading="career path" />

      <div className="mt-12 md:mt-16 mb-20 w-[93%] md:w-[90%] lg:w-[88%] 2xl:w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 lg:gap-12 2xl:gap-16">

            <CareerCard
            linkTo="/coding-pathway"
            pathway="Coding"
            desc="This pathway emphasizes problem-solving, algorithm development, and mastering various programming languages."
            bgColor="bg-blue-500"
            pathwayImage="/pathway-1.png"
            pathways={["software developer", "web developer", "system analyst", "mobile app developer", "database administrator",]}
          />

          <CareerCard
            linkTo="/gaming-pathway"
            pathway="Gaming"
            desc="This pathway covers everything from concept art and storytelling to coding and game mechanics."
            bgColor="bg-blue-300"
            pathwayImage="/pathway-2.png"
            pathways={["Game designer", "Game developer", "Level Designer", "Character Artist", "Game Tester", "Audio Engineer",]}
          />

          <CareerCard
            linkTo="/multimedia-pathway"
            pathway="Multimedia"
            desc="This pathway provides the tools and techniques to produce captivating content across various digital platforms."
            bgColor="bg-purple-500"
            pathwayImage="/pathway-3.png"
            pathways={["Graphic Designer","UI/UX Designer","Multimedia Artist","Animator","Video Editor","Digital Content Creator"]}

          />

          <CareerCard
            linkTo="/ai-pathway"
            pathway="AI"
            desc="This pathway focuses on building algorithms that enable computers to perform tasks that typically require human intelligence."
            bgColor="bg-black-500"
            textWhite={true}
            pathwayImage="/pathway-4.png"
            pathways={["Machine Learning Engineer","Data Scientist","AI Ethicist","AI Researcher","Computer Vision Engineer"]}

          />

          <CareerCard
            linkTo="/robotics-pathway"
            pathway="Robotics/IOT"
            desc="This pathway combines mechanical engineering, electronics, and computer science to create innovative solutions."
            bgColor="bg-blue-500"
            pathwayImage="/pathway-5.png"
            pathways={["Robotics Engineer","Embedded Systems Engineer","IOT Developer","Control Systems Engineer"]}
          />

          <CareerCard
            linkTo="/techpreneurship-pathway"
            pathway="Techpreneurship"
            desc="This pathway teaches you how to develop, market, and manage tech-based startups and ventures."
            bgColor="bg-yellow-500"
            pathwayImage="/pathway-6.png"
            pathways={["Startup Founder","Product Manager","Venture Capitalist","Innovation Mgnr","Business Development Manager"]}

          />
        </div>
      </div>
    </section>
  );
};