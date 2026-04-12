import Image from "next/image";

const RegisterDesign = () => {
  return (
    <div className="absolute inset-0 w-full max-lg:hidden">
      {/* 1ST DESIGN FROM TOP */}
      <div className="absolute top-2 lg:top-8 left-[35%]">
        <svg
          width="40"
          height="33"
          viewBox="0 0 40 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 0L39.0526 33H0.947441L20 0Z" fill="#BC00DD" />
        </svg>
      </div>

      {/* 2ND DESIGN */}
      <div className="absolute right-2 lg:right-[18%] top-[6px] lg:top-7">
        <svg
          width="42"
          height="40"
          viewBox="0 0 42 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 0L25.9393 15.2016H41.9232L28.992 24.5967L33.9313 39.7984L21 30.4033L8.06872 39.7984L13.008 24.5967L0.0767574 15.2016H16.0607L21 0Z"
            fill="#0784C3"
          />
        </svg>
      </div>
      {/* 3RD DESIGN */}
      <div className="absolute right-[3%] top-[50%]">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" fill="#FFB700" />
        </svg>
      </div>
      {/* 4TH DESIGN */}
      <div className="absolute bottom-[9%] right-[8%]">
        <Image
          src={`/reg-design4.png`}
          alt="design"
          width={44}
          height={44}
          className="object-contain aspect-auto"
        />
      </div>
      {/* 5TH DESIGN */}
      <div className="absolute bottom-[3%] right-[45%]">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="22" cy="22" r="22" fill="#F099FF" />
        </svg>
      </div>
      {/* 6TH DESIGN */}
      <div className="absolute bottom-[9%] left-[7%]">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" fill="#056494" />
        </svg>
      </div>
      {/* 7TH DESIGN */}
      <div className="absolute left-[6%] top-[35%]">
        <Image
          src={`/reg-design7.png`}
          alt="design"
          width={44}
          height={44}
          className="object-contain aspect-auto"
        />
      </div>
    </div>
  );
};

export default RegisterDesign;
