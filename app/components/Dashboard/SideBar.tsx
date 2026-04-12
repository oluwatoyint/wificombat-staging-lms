"use client";

import { raleway } from "@/app/fonts";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import {
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdOutlineLogout,
} from "react-icons/md";
import { signOut } from "@/app/utils/services";
import { getCookie } from "cookies-next";
import { useUserNav } from "@/app/hooks/user-nav/useUserNav";
import { cn } from "@/app/utils/cn";
import { Truncate } from "@/app/utils/truncate";
import { TbFileCertificate } from "react-icons/tb";
import { LibraryIcon, PeopleIcon } from "@/app/icons";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { useGetDashboardPathways } from "@/app/hooks/user-nav/useGetDashboardPathways";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Na here this component start oohh!!!
const SideBar = ({ sidebarOpen, setSidebarOpen }: Props) => {
  //
  const { primaryColor } = usePrimaryColor();
  //
  const role = getCookie("role");

  //
  const teacher = role === "teacher";
  const user = role === "user";
  const school_admin = role === "school_admin";
  const student = role === "student";
  //
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | undefined>();
  //
  const { handleNavigation } = useUserNav();
  const { pathways } = useGetDashboardPathways();
  //
  const [navigations, setNavigation] = useState<any[]>([]);
  //
  useEffect(() => {
    if (pathways !== undefined) {
      setNavigation(() => {
        const baseNavigation = [
          {
            name: "Dashboard",
            href:
              role === "student"
                ? "/dashboard/student"
                : role === "teacher"
                ? "/dashboard/teacher"
                : role === "user"
                ? "/dashboard/user"
                : role === "school_admin"
                ? "/dashboard/admin"
                : "/dashboard",
            icon: MdOutlineDashboard,
            current: true,
            comingSoon: false,
          },
          {
            name: "Career Path",
            href:
              pathways?.length < 1 || teacher || school_admin
                ? "/dashboard/career-path"
                : pathways && pathways?.length < 1
                ? "/dashboard/career-path"
                : "",
            icon: IoBookOutline,
            current: false,
            comingSoon: false,
            subNav: user || student ? pathways || [] : [],
          },
          // {
          //   name: "Leaderboard",
          //   href: "/dashboard/leaderboard",
          //   icon: HiOutlineTrophy,
          //   current: false,
          //   comingSoon: false,
          // },
          {
            name: "My Profile",
            href: "/dashboard/profile",
            icon: MdOutlineAccountCircle,
            current: false,
            comingSoon: false,
          },
          // {
          //   name: "Video Library",
          //   href: "/dashboard/video-library",
          //   icon: MdVideocam,
          //   current: false,
          //   comingSoon: false,
          // },
        ];

        // Append Portfolio or Students
        if (user || student) {
          baseNavigation.push(
            {
              name: "Portfolio",
              href: "/dashboard/portfolio",
              icon: TbFileCertificate,
              current: false,
              comingSoon: false,
            },
            {
              name: "Library",
              href: "/dashboard/library",
              icon: LibraryIcon,
              current: false,
              comingSoon: false,
            }
          );
        }
        if (teacher || school_admin) {
          baseNavigation.push(
            {
              name: "Students",
              href: "/dashboard/students",
              icon: PeopleIcon,
              current: false,
              comingSoon: false,
            },
            {
              name: "Teachers",
              href: "/dashboard/teachers",
              icon: PeopleIcon,
              current: false,
              comingSoon: false,
            }
          );
        }

        return baseNavigation; // Correctly return the updated state
      });
    }
  }, [pathways, role, teacher, school_admin, student, user]);
  //
  const handleExpand = (name: string) => {
    setExpanded(expanded === name ? undefined : name);
  };

  const isCareerPathActive = pathname.startsWith("/dashboard/career-path");
  //

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

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <FaXmark
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div
                className={`${raleway.className} 
              flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 ring-1 ring-white/10`}
                style={{ background: primaryColor }}
              >
                <Link href={`/`} className="flex h-16 shrink-0 items-center">
                  <Image
                    src={`/assets/auth/E-learn_logo_sidebar.png`}
                    alt={`logo`}
                    width={90}
                    height={90}
                    className="mt-5 object-contain text-neutral-400"
                  />
                </Link>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigations?.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={() => {
                                handleNavigation(item?.href);
                                if (item.subNav) handleExpand(item.name);
                              }}
                              className={classNames(
                                pathname === item.href ||
                                  (isCareerPathActive &&
                                    item.name === "Career Path")
                                  ? "text-[#F2F2F3]"
                                  : "text-gray-200 hover:text-white hover:bg-gray-800",
                                "group flex gap-x-3 items-center rounded-md p-3 text-lg leading-6 font-semibold cursor-pointer"
                              )}
                              style={
                                pathname === item.href ||
                                (isCareerPathActive &&
                                  item.name === "Career Path")
                                  ? {
                                      background: "#131314",
                                    }
                                  : {}
                              }
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {item.name}

                              {item.subNav && item.subNav.length > 0 && (
                                <div
                                  className={`ml-auto ${
                                    expanded === item.name ? "rotate-180" : ""
                                  }`}
                                >
                                  {expanded === item.name ? (
                                    <IoMdArrowDropdown size={25} />
                                  ) : (
                                    <IoMdArrowDropup size={25} />
                                  )}
                                </div>
                              )}
                            </Link>
                            {item.subNav &&
                              item.subNav.length > 0 &&
                              expanded === item.name && (
                                <ul className="pl-8 space-y-2 mt-2">
                                  {item.subNav.map((subItem: any) => (
                                    <li key={subItem.name}>
                                      <Link
                                        title={subItem?.title}
                                        href={`/dashboard/career-path/${subItem?.id}`}
                                        // className={classNames(
                                        //   pathname === subItem.href
                                        //     ? "text-[#F2F2F3]"
                                        //     : "text-gray-200 hover:text-white hover:bg-gray-800",
                                        //   "group flex gap-x-3 rounded-md p-2 text-base leading-5 font-medium"
                                        // )}
                                        // style={
                                        //   pathname === subItem.href
                                        //     ? { color: "#131314" }
                                        //     : {}
                                        // }
                                        className={cn(
                                          "text-white/60 p-2 text-base text-center transition-all duration-300 ease-in-out hover:text-white",
                                          pathname === subItem?.href &&
                                            "text-white"
                                        )}
                                      >
                                        {Truncate(subItem.title, 15)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li
                      className="mt-auto cursor-pointer select-none"
                      onClick={signOut}
                    >
                      <span
                        className="group -mx-2 flex gap-x-3 rounded-md p-3 text-sm font-semibold 
                        leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <MdOutlineLogout
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        Logout
                      </span>
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

export default SideBar;
