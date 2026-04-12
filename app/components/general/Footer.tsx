import Link from "next/link";

const pathwayData = [
  { id: "Coding", link: "coding-pathway" },
  { id: "Gaming", link: "gaming-pathway" },
  { id: "Multimedia", link: "multimedia-pathway" },
  { id: "Robotics and IOT ", link: "robotics-pathway" },
  { id: "Artificial Intelligence", link: "ai-pathway" },
  { id: "Techprenuership", link: "techprenuership-pathway" },
];

const featuresData = [
  { id: "Gamification", link: "features" },
  { id: "Portfolio", link: "portfolio-and-projects" },
  { id: "Curriculum", link: "" },
  { id: "Mentorship", link: "" },
];

const companyData = [
  { id: "About Us", link: "" },
  { id: "Events", link: "" },
  { id: "Blog & News", link: "" },
  { id: "Community", link: "" },
];


const getInTouch = [
  { id: "Contact Us", link: "contact-us" },
  { id: "FAQs", link: "faqs" },
  { id: "Security", link: "" },
  { id: "Privacy Policy", link: "privacy-policy" },
  { id: "Terms and Conditions", link: "terms-and-conditions" },
];


const navLinkTitles = [
  { id: "Career Pathway", title: "Career Pathway" },
  { id: "Features", title: "Features" },
  { id: "Company", title: "Company" },
  { id: "Get In Touch", title: "Get In Touch" },
];

const Footer = () => {
  return (
    <footer className="text-left">
      <div className="w-full mx-auto  bg-[#131314] px-6 py-6 md:py-20 lg:px-12">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center whitespace-nowrap text-xl font-semibold text-white md:text-4xl">
                Wificombat E-learn
              </span>
            </Link>

            <p className="m my-6 max-w-md text-xl text-white font-normal leading-8">
            Join the WifiCombat eLearn community and unlock your potential. Elevate your education today.{" "}
            </p>

            <Link href={`/assessment`}>
              <button className="rounded-lg bg-white px-14 py-4 text-black font-medium transition-all hover:translate-y-1">
                Start Learning
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-8 md:grid-cols-4">
            {navLinkTitles.map((navLinkTitle) => (
              <div key={navLinkTitle.id}>
                <h2 className="mb-3.5 text-xl font-semibold capitalize text-white lg:mb-6">
                  {navLinkTitle.title}
                </h2>
                <ul className="font-medium text-white">
                  {navLinkTitle.id === "Career Pathway" &&
                    pathwayData.map((pathway) => (
                      <li
                        key={pathway.id}
                        className="mb-3 lg:mb-4 lg:text-lg"
                      >
                        <Link href={`/${pathway.link}`} className="hover:underline">
                          {pathway.id}
                        </Link>
                      </li>
                    ))}
                  {navLinkTitle.id === "Features" &&
                    featuresData.map((features) => (
                      <li
                        key={features.id}
                        className="mb-3 lg:mb-4 lg:text-lg"
                      >
                        <Link href={`/${features.link}`} className="hover:underline">
                          {features.id}
                        </Link>
                      </li>
                    ))}
                  {navLinkTitle.id === "Company" &&
                    companyData.map((company) => (
                      <li
                        key={company.id}
                        className="mb-3 lg:mb-4 lg:text-lg"
                      >
                        <Link href={`/`} className="hover:underline">
                          {company.id}
                        </Link>
                      </li>
                    ))}
                  {navLinkTitle.id === "Get In Touch" &&
                    getInTouch.map((getInTouch) => (
                      <li
                        key={getInTouch.id}
                        className="mb-3 lg:mb-4 lg:text-lg"
                      >
                        <Link href={`/${getInTouch.link}`} className="whitespace-nowrap hover:underline">
                          {getInTouch.id}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-6 sm:flex sm:items-center sm:justify-between lg:px-24 lg:py-8">
        <span className="text-sm text-black sm:text-center">
          <span>©</span>
          2024{" "}
          <Link href="/" className="hover:underline">
            wificombat™
          </Link>
          . All Rights Reserved.
        </span>
        <div className="mt-4 flex max-[330px]:gap-5 gap-12 sm:mt-0 max-[330px]:justify-between sm:justify-center">
          <Link
            target="_blank"
            href="https://x.com/wificombat?s=21&t=_aWwVHjPihXSjRGFLWUMZU5DU1e1nPmEl6wz_Sl4IF0"
            className="hover:ms-5 text-black hover:text-black"
          >
            <svg
              className=" max-[330px]:h-6 max-[330px]:w-6 h-8 w-8 md:h-10 md:w-10"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fillRule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Twitter page</span>
          </Link>
          <Link href="/" className="hover: text-black hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="max-[330px]:h-6 max-[330px]:w-6 h-8 w-8 md:h-10 md:w-10"
              viewBox="0 0 41 40"
              fill="none"
            >
              <path
                d="M20.6667 3.40039C11.5 3.40039 4 10.8837 4 20.1004C4 28.4337 10.1 35.3504 18.0667 36.6004V24.9337H13.8333V20.1004H18.0667V16.4171C18.0667 12.2337 20.55 9.93372 24.3667 9.93372C26.1833 9.93372 28.0833 10.2504 28.0833 10.2504V14.3671H25.9833C23.9167 14.3671 23.2667 15.6504 23.2667 16.9671V20.1004H27.9L27.15 24.9337H23.2667V36.6004C27.1941 35.9801 30.7703 33.9762 33.3499 30.9505C35.9294 27.9247 37.3423 24.0765 37.3333 20.1004C37.3333 10.8837 29.8333 3.40039 20.6667 3.40039Z"
                fill="#131314"
              />
            </svg>
            <span className="sr-only">Facebook page</span>
          </Link>
          <Link
            target="_blank"
            href="https://www.instagram.com/wificombat?igsh=MWs2azIzZGFnNjUzYw=="
            className="hover:ms-5 text-black hover:text-black"
          >
            <svg
              className=" max-[330px]:h-6 max-[330px]:w-6 h-8 w-8 md:h-10 md:w-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 41 40"
              fill="none"
            >
              <path
                d="M13.3337 3.33301H27.3337C32.667 3.33301 37.0003 7.66634 37.0003 12.9997V26.9997C37.0003 29.5634 35.9819 32.0222 34.169 33.835C32.3562 35.6479 29.8974 36.6663 27.3337 36.6663H13.3337C8.00033 36.6663 3.66699 32.333 3.66699 26.9997V12.9997C3.66699 10.4359 4.68544 7.97716 6.49829 6.16431C8.31114 4.35146 10.7699 3.33301 13.3337 3.33301ZM13.0003 6.66634C11.409 6.66634 9.8829 7.29848 8.75768 8.4237C7.63247 9.54892 7.00033 11.075 7.00033 12.6663V27.333C7.00033 30.6497 9.68366 33.333 13.0003 33.333H27.667C29.2583 33.333 30.7844 32.7009 31.9096 31.5756C33.0349 30.4504 33.667 28.9243 33.667 27.333V12.6663C33.667 9.34967 30.9837 6.66634 27.667 6.66634H13.0003ZM29.0837 9.16634C29.6362 9.16634 30.1661 9.38583 30.5568 9.77654C30.9475 10.1672 31.167 10.6971 31.167 11.2497C31.167 11.8022 30.9475 12.3321 30.5568 12.7228C30.1661 13.1135 29.6362 13.333 29.0837 13.333C28.5311 13.333 28.0012 13.1135 27.6105 12.7228C27.2198 12.3321 27.0003 11.8022 27.0003 11.2497C27.0003 10.6971 27.2198 10.1672 27.6105 9.77654C28.0012 9.38583 28.5311 9.16634 29.0837 9.16634ZM20.3337 11.6663C22.5438 11.6663 24.6634 12.5443 26.2262 14.1071C27.789 15.6699 28.667 17.7895 28.667 19.9997C28.667 22.2098 27.789 24.3294 26.2262 25.8922C24.6634 27.455 22.5438 28.333 20.3337 28.333C18.1235 28.333 16.0039 27.455 14.4411 25.8922C12.8783 24.3294 12.0003 22.2098 12.0003 19.9997C12.0003 17.7895 12.8783 15.6699 14.4411 14.1071C16.0039 12.5443 18.1235 11.6663 20.3337 11.6663ZM20.3337 14.9997C19.0076 14.9997 17.7358 15.5265 16.7981 16.4641C15.8604 17.4018 15.3337 18.6736 15.3337 19.9997C15.3337 21.3258 15.8604 22.5975 16.7981 23.5352C17.7358 24.4729 19.0076 24.9997 20.3337 24.9997C21.6597 24.9997 22.9315 24.4729 23.8692 23.5352C24.8069 22.5975 25.3337 21.3258 25.3337 19.9997C25.3337 18.6736 24.8069 17.4018 23.8692 16.4641C22.9315 15.5265 21.6597 14.9997 20.3337 14.9997Z"
                fill="#131314"
              />
            </svg>
            <span className="sr-only">Instagram handle</span>
          </Link>

          <Link
            target="_blank"
            href="https://www.linkedin.com/company/wificombat-academy/"
            className="hover:ms-5 text-black hover:text-black"
          >
            <svg
              className=" max-[330px]:h-6 max-[330px]:w-6 h-8 w-8 md:h-10 md:w-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M31.6667 5C32.5507 5 33.3986 5.35119 34.0237 5.97631C34.6488 6.60143 35 7.44928 35 8.33333V31.6667C35 32.5507 34.6488 33.3986 34.0237 34.0237C33.3986 34.6488 32.5507 35 31.6667 35H8.33333C7.44928 35 6.60143 34.6488 5.97631 34.0237C5.35119 33.3986 5 32.5507 5 31.6667V8.33333C5 7.44928 5.35119 6.60143 5.97631 5.97631C6.60143 5.35119 7.44928 5 8.33333 5H31.6667ZM30.8333 30.8333V22C30.8333 20.559 30.2609 19.177 29.2419 18.1581C28.223 17.1391 26.841 16.5667 25.4 16.5667C23.9833 16.5667 22.3333 17.4333 21.5333 18.7333V16.8833H16.8833V30.8333H21.5333V22.6167C21.5333 21.3333 22.5667 20.2833 23.85 20.2833C24.4688 20.2833 25.0623 20.5292 25.4999 20.9668C25.9375 21.4043 26.1833 21.9978 26.1833 22.6167V30.8333H30.8333ZM11.4667 14.2667C12.2093 14.2667 12.9215 13.9717 13.4466 13.4466C13.9717 12.9215 14.2667 12.2093 14.2667 11.4667C14.2667 9.91667 13.0167 8.65 11.4667 8.65C10.7196 8.65 10.0032 8.94675 9.47498 9.47498C8.94675 10.0032 8.65 10.7196 8.65 11.4667C8.65 13.0167 9.91667 14.2667 11.4667 14.2667ZM13.7833 30.8333V16.8833H9.16667V30.8333H13.7833Z"
                fill="#131314"
              />
            </svg>
            <span className="sr-only">LinkedIn account</span>
          </Link>
        </div>
        </div>
    </footer>
  );
};

export default Footer;