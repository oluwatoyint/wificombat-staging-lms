"use client";

import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import Modal from "@/app/utils/modal";
import { Fragment, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import Image from "next/image";
import { useSettings } from "@/app/hooks/settings-hook/useSettings";
import { RiLoader4Fill } from "react-icons/ri";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useRouter } from "next/navigation";

const Page = () => {
  const { dashboardData } = useDashboardStore();
  const { toggleSidebar } = useMain();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModals, setOpenModals] = useState(false);
  const [setting, setSetting] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  //
  const router = useRouter();
  //
  const {
    handleChangePassword,
    passwordDetails,
    setPasswordDetails,
    updatingPass,
  } = useSettings();

  function nextSetting() {
    setSetting(2);
  }

  function prevSetting() {
    setSetting(1);
  }

  function modal() {
    setSetting(3);
  }

  return (
    <Fragment>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        <div
          className={`${
            toggleSidebar ? "lg:pl-36" : "lg:pl-64"
          } transition-all duration-500 ease-in-out`}
        >
          {setting === 1 && (
            <article className="px-4 sm:px-6 lg:px-8 space-y-10 pb-10 mt-8 flex flex-col justify-center">
              <div className="flex gap-3 border-b border-black-50 p-5">
                <IoChevronBackOutline
                  onClick={() => router.back()}
                  className="max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm"
                />
                <p className="mt-4">Settings</p>
              </div>
              <div className="mt-16">
                <div className="flex border border-black-50 px-5 py-4 w-full md:min-w-[600px] max-w-[800px] rounded-2xl mb-10 gap-8">
                  <div className="w-full">
                    <p className="font-semibold">Change Password</p>
                    <p className="text-[14px] font-normal">
                      You can make changes to your password or create a new
                      password.
                    </p>
                  </div>
                  <span>
                    <IoChevronForward
                      onClick={nextSetting}
                      className="max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm"
                    />
                  </span>
                </div>
                <div className="flex border border-black-50 px-5 py-4 w-full md:min-w-[600px] max-w-[800px] rounded-2xl gap-8">
                  <div className="w-full">
                    <p className="font-semibold">Notification</p>
                    <p className="text-[14px] font-normal">
                      You can make changes to how you get your notification.
                    </p>
                  </div>
                  <span>
                    <IoChevronForward className="max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm" />
                  </span>
                </div>
              </div>
            </article>
          )}
          {setting === 2 && (
            <article className="px-4 sm:px-6 lg:px-8 space-y-10 pb-10 mt-8 flex flex-col justify-center">
              <div className="flex gap-3 border-b border-black-50 p-5">
                <IoChevronBackOutline
                  onClick={prevSetting}
                  className="max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm"
                />
                <p className="mt-4">Changing password</p>
              </div>

              <div className="w-full md:min-w-[600px] max-w-[800px] bg-[#F2F2F3] rounded-lg">
                <div className="py-6 px-6">
                  <div>
                    <p className="mb-7">Change passowrd</p>
                    <form
                      className="space-y-6"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <>
                        <div className="w-full">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Current password
                          </label>

                          <div className="mt-2">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              placeholder="*********"
                              className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                              onChange={(e) =>
                                setPasswordDetails({
                                  ...passwordDetails,
                                  current_password: e.target.value,
                                })
                              }
                            />

                            <p className="text-[#F00101]"></p>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            New Password
                          </label>

                          <div className="mt-2 relative">
                            <div className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"></div>

                            <input
                              type={passwordVisible ? "text" : "password"}
                              placeholder="*********"
                              className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                              onChange={(e) =>
                                setPasswordDetails({
                                  ...passwordDetails,
                                  new_password: e.target.value,
                                })
                              }
                            />
                            <p className="text-[#F00101]"></p>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Confirm New Password
                          </label>

                          <div className="mt-2 relative">
                            <div className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"></div>

                            <input
                              type={passwordVisible ? "text" : "password"}
                              placeholder="*********"
                              className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                              onChange={(e) =>
                                setPasswordDetails({
                                  ...passwordDetails,
                                  new_password: e.target.value,
                                })
                              }
                            />
                            <p className="text-[#F00101]"></p>
                          </div>
                        </div>
                        <div className="mt-14 flex justify-end">
                          <button
                            type="submit"
                            onClick={() => {
                              modal;
                              setOpenModals(true);
                            }}
                            className="flex w-48 justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                       p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B1B1B4] focus-visible:outline 
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B1B1B4]"
                          >
                            Save Changes
                          </button>
                        </div>
                      </>
                    </form>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
      {openModals && (
        <Modal isOpen={openModals} onClose={() => setOpenModals(false)}>
          <div
            className={`${raleway.className} fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto`}
          >
            <div className="fixed inset-0 bg-[#26002C80]"></div>
            <div
              className={`bg-white rounded-3xl shadow-lg z-60 w-full p-6 
              relative  max-w-lg max-md:mt-16 h-fit max-md:w-[96%]`}
            >
              <div>
                <Image
                  src={`/assets/auth/successpurple.svg`}
                  alt="success"
                  width={91}
                  height={87}
                  className="mt-7 object-contain mx-auto"
                />

                <div className="mt-6 text-xl font-semibold text-center">
                  Are you sure you want to save changes?
                </div>
                <p className="text-lg font-medium my-4 text-center">
                  You are about to save changes to your personal information
                </p>

                <button
                  onClick={handleChangePassword}
                  className="mt-10 flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                      p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  {updatingPass ? (
                    <div className="flex items-center gap-1">
                      Saving
                      <RiLoader4Fill size={24} className="animate-spin" />
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default Page;
