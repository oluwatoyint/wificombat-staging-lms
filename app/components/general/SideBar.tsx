"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { FaMinus, FaPlus, FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { schoolLinks, studentLinks } from "@/app/utils/types-and-links";
import { link, PopupProps } from "./Popup";
import { getCookie } from "cookies-next";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "@/app/utils/services";

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Courses", href: "/courses" },
  { name: "Students", href: "#" },
  { name: "Schools", href: "#" },
  { name: "Portfolio & Projects", href: "/portfolio-and-projects" },
  // { name: "Play Games", href: "/play-games" },
  { name: "Login", href: "/login" },
  { name: "Take Assessment", href: "/assessment" },
];

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const isSubLinkActive = (links: link[], pathname: string) => {
  return links.some((link) => pathname === link.href);
};

const Popup = ({ links, onClose }: PopupProps) => (
  <div className=" shadow-md px-4 text-gray-200 rounded z-50">
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className="block px-2 py-2 active:bg-gray-300 active:text-gray-900 cursor-pointer transition-colors duration-200"
            onClick={onClose}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const MobileSideBar = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const pathname = usePathname();
  const [schoolsPopupVisible, setSchoolsPopupVisible] = useState(false);
  const [studentsPopupVisible, setStudentsPopupVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  //
  useEffect(() => {
    if (getCookie("role")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  //
  const mobileNavLinks = useMemo(() => {
    if (isLoggedIn) {
      return navigation?.filter((item) => item?.name !== "Login");
    }
    return navigation;
  }, [isLoggedIn]);

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-16 flex w-[80%] flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-full top-0 flex w-16 justify-center pt-5 border-none border-transparent">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 outline-none focus:outline-none"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only border-none">Close sidebar</span>
                    <FaXmark
                      className="h-6 w-6 text-white border-none"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#0C0C0D] px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <Image
                    src="/E-learn_logo.png"
                    alt="homepage"
                    width={150}
                    height={150}
                    className="mt-3"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 px-2 space-y-1">
                        {navigation &&
                          mobileNavLinks?.map((item) => (
                            <li key={item.name} className="relative">
                              <Link
                                href={`${item.href}`}
                                className={classNames(
                                  pathname === item.href ||
                                    (item.name === "Schools" &&
                                      isSubLinkActive(schoolLinks, pathname)) ||
                                    (item.name === "Students" &&
                                      isSubLinkActive(studentLinks, pathname))
                                    ? "text-[#F2F2F3] border-b border-blue-500"
                                    : "text-gray-400",
                                  "group flex gap-x-3 py-2 text-lg leading-6 font-medium"
                                )}
                                onClick={() => {
                                  if (item.name === "Schools") {
                                    setSchoolsPopupVisible(
                                      !schoolsPopupVisible
                                    );
                                    setStudentsPopupVisible(false);
                                  } else if (item.name === "Students") {
                                    setStudentsPopupVisible(
                                      !studentsPopupVisible
                                    );
                                    setSchoolsPopupVisible(false);
                                  } else {
                                    setSidebarOpen(false);
                                  }
                                }}
                              >
                                {item.name}
                                {item.name === "Schools" && (
                                  <span className="ml-auto">
                                    {schoolsPopupVisible ? (
                                      <FaMinus size={18} />
                                    ) : (
                                      <FaPlus size={18} />
                                    )}
                                  </span>
                                )}
                                {item.name === "Students" && (
                                  <span className="ml-auto">
                                    {studentsPopupVisible ? (
                                      <FaMinus size={18} />
                                    ) : (
                                      <FaPlus size={18} />
                                    )}
                                  </span>
                                )}
                              </Link>
                              {item.name === "Schools" &&
                                schoolsPopupVisible && (
                                  <Popup
                                    links={schoolLinks}
                                    onClose={() =>
                                      setSchoolsPopupVisible(false)
                                    }
                                  />
                                )}
                              {item.name === "Students" &&
                                studentsPopupVisible && (
                                  <Popup
                                    links={studentLinks}
                                    onClose={() =>
                                      setStudentsPopupVisible(false)
                                    }
                                  />
                                )}
                            </li>
                          ))}
                        {isLoggedIn && (
                          <div className="flex flex-col gap-2">
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-2 hover:text-[#F2F2F3] cursor-pointer text-gray-400 py-2 text-lg leading-6 font-medium"
                            >
                              Dashboard
                            </Link>
                            <li
                              className="flex items-center gap-2 hover:text-[#F2F2F3] cursor-pointer text-gray-400 py-2 text-lg leading-6 font-medium"
                              onClick={signOut}
                            >
                              <span>
                                <BiLogOut size={22} className="mt-1" />
                              </span>
                              <span>Logout</span>
                            </li>
                          </div>
                        )}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileSideBar;
