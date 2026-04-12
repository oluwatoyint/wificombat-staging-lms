"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/app/utils";
import { usePathname, useRouter } from "next/navigation";
import { IoBookOutline } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import {
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineLogout,
  MdVideocam,
} from "react-icons/md";
import { motion } from "framer-motion";
import { normalizePath } from "@/app/utils/paths";
import Image from "next/image";
import { TbFileCertificate } from "react-icons/tb";
import { raleway } from "@/app/fonts";
import Link from "next/link";
import { useMain } from "@/app/context/MainContext";
import { signOut } from "@/app/utils/services";
import { getCookie } from "cookies-next";
import { useUserNav } from "@/app/hooks/user-nav/useUserNav";
import { cn } from "@/app/utils/cn";
import { Truncate } from "@/app/utils/truncate";
import { LibraryIcon, PeopleIcon } from "@/app/icons";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { useGetDashboardPathways } from "@/app/hooks/user-nav/useGetDashboardPathways";

// Component started here oohh!!!
const DesktopSidebar = ({ userAge }: { userAge: number }) => {
  //
  const { primaryColor } = usePrimaryColor();
  //
  const role = getCookie("role");
  const teacher = role === "teacher";
  const user = role === "user";
  const school_admin = role === "school_admin";
  const student = role === "student";
  //
  const pathname = normalizePath(usePathname());
  const { toggleSidebar, setToggleSidebar } = useMain();
  const [activeLink, setActiveLink] = useState<string | undefined>();
  const [toggleButtonVisible, setToggleButtonVisible] = useState(true);
  const [expanded, setExpanded] = useState<string | undefined>();
  //
  const { handleNavigation } = useUserNav();
  const { pathways } = useGetDashboardPathways();
  //
  const [navigations, setNavigation] = useState<any[]>([]);
  //
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

  const sidebarVariants = {
    iconsOnly: {
      width: "8rem", // Width when showing icons only
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },

    full: {
      width: "16rem", // Full width when showing sidebar content
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleToggle = () => {
    if (toggleSidebar) {
      setToggleButtonVisible(false);
      setTimeout(() => {
        setToggleSidebar(!toggleSidebar);
        setTimeout(() => setToggleButtonVisible(true), 300); // Show the button after the sidebar transition
      }, 100);
    } else {
      setToggleSidebar(!toggleSidebar);
    }
  };

  const handleExpand = (name: string) => {
    setExpanded(expanded === name ? undefined : name);
  };

  const isCareerPathActive = pathname.startsWith("/dashboard/career-path");
  //
  //
  return (
    <div
      className={`hidden lg:fixed lg:inset-y-0 z-50 lg:flex lg:flex-col 
    transition duration-700 ease-in-out ${toggleSidebar ? "w-fit" : "lg:w-64"}`}
    >
      {/* bg-[#BC00DD] */}

      <motion.div
        initial="full"
        animate={toggleSidebar ? "iconsOnly" : "full"}
        style={{ background: primaryColor }}
        className={` ${raleway.className} flex grow flex-col gap-y-16 overflow-y-auto  px-6 pb-4`}
      >
        {toggleButtonVisible && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 1 }}
            onClick={handleToggle}
            style={{ borderColor: primaryColor }}
            className="toggle-button hidden z-[53] small-view-arrow-bg absolute 
          h-8 w-8 bg-white lg:flex items-center 
          justify-center rounded-full border shadow-xl top-8 right-[-1rem] transition 
          duration-300 cursor-pointer"
          >
            {toggleSidebar ? (
              <MdOutlineKeyboardDoubleArrowRight
                size={14}
                style={{ color: primaryColor }}
              />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft
                size={14}
                style={{ color: primaryColor }}
              />
            )}
          </motion.div>
        )}

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
              <ul role="list" className="-mx-2 space-y-5">
                {navigations?.map((item) => (
                  <li key={item.name} className="">
                    <Link
                      href={item.href}
                      onClick={() => {
                        handleNavigation(item.href);
                        if (item?.subNav) handleExpand(item.name);
                      }}
                      className={classNames(
                        item.comingSoon
                          ? `text-gray-400 pointer-events-none cursor-not-allowed`
                          : normalizePath(pathname) ===
                              normalizePath(item.href) ||
                            (isCareerPathActive && item.name === "Career Path")
                          ? `text-[#F2F2F3]`
                          : `text-gray-200 hover:text-white hover:bg-gray-50/40`,
                        `group flex items-center gap-x-3 rounded-md p-3 text-lg leading-6 
                      font-medium transition duration-700 ease-in-out cursor-pointer ${
                        toggleSidebar && "w-fit mx-auto"
                      }`
                      )}
                      style={
                        normalizePath(pathname) === normalizePath(item.href) ||
                        (isCareerPathActive && item.name === "Career Path")
                          ? { background: "#131314" }
                          : {}
                      }
                    >
                      <item.icon
                        className={`h-6 w-6 shrink-0 ${
                          toggleSidebar && "mx-auto"
                        }`}
                        aria-hidden="true"
                      />

                      {!toggleSidebar && item.name}
                      {!toggleSidebar && item.comingSoon && (
                        <span
                          className="basis-[30%] inline-flex items-center text-center rounded-md 
                      bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                        >
                          Coming Soon
                        </span>
                      )}

                      {item?.subNav &&
                        item?.subNav?.length > 0 &&
                        !toggleSidebar && (
                          <div className={`ml-1`}>
                            {expanded === item.name ? (
                              <IoMdArrowDropdown size={25} />
                            ) : (
                              <IoMdArrowDropup size={25} />
                            )}
                          </div>
                        )}
                    </Link>

                    {item?.subNav &&
                      item?.subNav?.length > 0 &&
                      expanded === item.name &&
                      !toggleSidebar && (
                        <ul className="pl-8 space-y-2 mt-2">
                          {item.subNav.map((subItem: any) => (
                            <li key={subItem?.id}>
                              <Link
                                title={subItem?.title}
                                href={`/dashboard/career-path/${subItem?.id}`}
                                //   className={classNames(
                                //     normalizePath(pathname) ===
                                //       normalizePath(subItem.href)
                                //       ? `text-[#F2F2F3]`
                                //       : `text-gray-700 hover:text-gray-300`,
                                //     `group flex gap-x-3 rounded-md p-2 text-base text-center leading-5 font-medium
                                // transition duration-300 ease-in-out`
                                //   )}
                                //   style={
                                //     normalizePath(pathname) ===
                                //     normalizePath(subItem.href)
                                //       ? { color: "#131314" }
                                //       : {}
                                //   }
                                className={cn(
                                  "text-white/60 p-2 text-base text-center transition-all duration-300 ease-in-out hover:text-white",
                                  pathname === subItem?.href && "text-white"
                                )}
                              >
                                {Truncate(subItem?.title, 15)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </li>

            <li className="mt-auto cursor-pointer" onClick={signOut}>
              <span
                // href="#"
                className="group -mx-2 select-none flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 
                text-gray-200 hover:bg-gray-800 hover:text-white"
              >
                <MdOutlineLogout
                  className={`h-6 w-6 shrink-0 ${toggleSidebar && "mx-auto"}`}
                  aria-hidden="true"
                />
                {!toggleSidebar && `Logout`}
              </span>
            </li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default DesktopSidebar;
