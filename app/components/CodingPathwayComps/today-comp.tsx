import Link from "next/link";

type Props = {
  header: string;
  desc: string;
  linkto: string;
};

export const TodayComp = ({ desc, header, linkto }: Props) => {
  return (
    <section className="py-10 md:py-14 lg:py-20 bg-blue-50">
      <h3 className="w-[90%] mx-auto text-center text-2xl md:text-4xl font-semibold">
        {header}
      </h3>
      <p className="mt-4 lg:mt-9 w-[95%] md:w-[80%] lg:w-[65%] xl:w-[60%] mx-auto text-center md:text-xl">
        {desc}
      </p>

      <div className="mt-10 w-full flex items-center justify-center">
        <Link
          href={"/courses"}
          className="px-8 md:px-12 py-5 md:text-lg font-medium lg:font-semibold text-white shadow-sm 
             bg-black-500 rounded-lg transition duration-300 hover:bg-opacity-90"
        >
          Start Now
        </Link>
      </div>
    </section>
  );
};
