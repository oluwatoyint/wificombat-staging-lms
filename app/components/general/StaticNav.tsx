"use client";
import Image from "next/image";
import Link from "next/link";
import { useNavbarVisibility, useScrollToView } from "../../hooks";
import { RiMenu2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Popup from "./Popup";
import { schoolLinks, studentLinks } from "@/app/utils/types-and-links";
import MobileSideBar from "./SideBar";
import { useUserNav } from "@/app/hooks/user-nav/useUserNav";
import { signOut } from "@/app/utils/services";

type Props = {};

const StaticNav = (props: Props) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [schoolsPopupVisible, setSchoolsPopupVisible] = useState(false);
  const [studentsPopupVisible, setStudentsPopupVisible] = useState(false);
  const scrollToView = useScrollToView();
  const { removeNavbar } = useNavbarVisibility();
  // const session = getCookie("session_id") || getCookie("user_id");
  const { isLogged, setShowUserDropDown, showUserDropDown } = useUserNav();
  //
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  //
  return (
    <motion.nav
      className={`max-w-screen z-[98] w-full bg-black transition-all duration-300 ease-in-out
      ${removeNavbar ? "hidden" : "relative"}
      `}
    >
      <MobileSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/E-learn_logo.png"
                alt="homepage"
                width={150}
                height={150}
                className="max-w-[120px] md:max-w-[150px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}

          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/features"
              onClick={() => scrollToView("features")}
              className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                text-white hover:text-[#0784C3] ${
                  pathname === "/features" ? "border-b-4 border-blue-500" : ""
                }`}
            >
              Features
            </Link>
            <Link
              href="/courses"
              // onClick={() => scrollToView("courses")}
              className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                text-white hover:text-[#0784C3] ${
                  pathname === "/courses" ? "border-b-4 border-blue-500" : ""
                }`}
            >
              Courses
            </Link>

            <div
              className="relative list-none"
              onMouseEnter={() => setStudentsPopupVisible(true)}
              onMouseLeave={() => setStudentsPopupVisible(false)}
              onClick={() => setStudentsPopupVisible(!studentsPopupVisible)}
            >
              <li
                className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                  text-white hover:text-[#0784C3] cursor-pointer ${
                    pathname.startsWith("/students")
                      ? "border-b-4 border-blue-500"
                      : ""
                  }`}
              >
                Students
              </li>
              {studentsPopupVisible && <Popup links={studentLinks} />}
            </div>

            <div
              className="relative list-none"
              onMouseEnter={() => setSchoolsPopupVisible(true)}
              onMouseLeave={() => setSchoolsPopupVisible(false)}
              onClick={() => setSchoolsPopupVisible(!schoolsPopupVisible)}
            >
              <li
                className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                  text-white hover:text-[#0784C3] cursor-pointer ${
                    pathname.startsWith("/schools")
                      ? "border-b-4 border-blue-500"
                      : ""
                  }`}
              >
                Schools
              </li>
              {schoolsPopupVisible && <Popup links={schoolLinks} />}
            </div>

            <Link
              href="/portfolio-and-projects"
              onClick={() => scrollToView("portfolio-and-projects")}
              className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                text-white hover:text-[#0784C3] ${
                  pathname === "/portfolio-and-projects"
                    ? "border-b-4 border-blue-500"
                    : ""
                }`}
            >
              Portfolio & Projects
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              // href="/assessment"
              href="/assessment"
              className="px-4 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                border border-white text-white font-bold rounded-lg 
                transition-colors duration-300 hover:bg-slate-50/20"
            >
              Take Assessment
            </Link>
            {hydrated && (
              <>
                {!isLogged ? (
                  <Link
                    href={"/login"}
                    className={`px-8 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                ${
                  isLogged
                    ? "bg-white font-bold flex items-center gap-2"
                    : "bg-white font-bold"
                }
                rounded-lg transition-colors duration-300 hover:bg-opacity-90`}
                  >
                    {/* {session ?  "Login"  : <> Dashboard <FaUserCircle /></>} */}
                    Login
                  </Link>
                ) : (
                  <div className="relative">
                    <div
                      className="bg-white cursor-pointer h-[40px] w-[40px] border-gray-400 rounded-full flex justify-center p-[10px] items-center"
                      onClick={() => setShowUserDropDown(!showUserDropDown)}
                    >
                      <Image
                        src="/userIcon.svg"
                        alt="user icon"
                        width={35}
                        height={35}
                        className="w-full object-cover object-center"
                      />
                    </div>
                    {/*  */}
                    {showUserDropDown && (
                      <>
                        <div
                          className="fixed top-0 left-0 right-0 bottom-0 inset-0 z-50"
                          onClick={() => setShowUserDropDown(false)}
                        />
                        <div className="absolute overflow-hidden top-[50px] right-[8px] bg-white rounded-lg flex flex-col gap-2 border-gray-500 border z-[60]">
                          <Link
                            className="px-3 py-3 hover:bg-gray-300 cursor-pointer"
                            href={"/dashboard"}
                          >
                            Dashboard
                          </Link>
                          <div
                            className="px-3 py-3 hover:bg-gray-300 cursor-pointer"
                            onClick={signOut}
                          >
                            Logout
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            {/* <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            > */}
            <RiMenu2Line
              size={25}
              onClick={() => setSidebarOpen(true)}
              className="text-gray-300 lg:hidden"
            />
            {/* </button> */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default StaticNav;
