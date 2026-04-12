import { SpinnerCoverUi } from "@/app/components/loaders/SpinnerCoverUi";
import { raleway } from "@/app/fonts";
import { useProfile } from "@/app/hooks/profile/useProfile";
import { BackIcon } from "@/app/icons";
import { EditIcon } from "@/app/icons/EditIcon";
import { SingleUserProfileDetailProp } from "@/app/types/single-profile-detail-prop";
import api from "@/app/utils/auth-interceptor";
import { classArray } from "@/app/utils/class-array";
import Modal from "@/app/utils/modal";
import { react_select_options, react_select_style1 } from "@/app/utils/vars";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useLayoutEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { BiChevronDown } from "react-icons/bi";
import { RiLoader4Fill } from "react-icons/ri";
import Creatable from "react-select/creatable";

interface profileDetailsProp {
  first_name: string;
  last_name: string;
  _class: string;
  school: string;
  bio: string;
  phone: string;
  profile_pic: string;
  age: string;
  no_student_you_teach: number;
  interests: string[];
}
export const AdminProfileEditView = ({
  editModals,
  setEditModals,
  toggleSidebar,
  setSidebarOpen,
  profileInfo,
}: {
  editModals: boolean;
  setEditModals: Dispatch<SetStateAction<any>>;
  toggleSidebar: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  profileInfo: SingleUserProfileDetailProp;
}) => {
  // profile hooks
  const {
    allSchools,
    selectedSchool,
    setSelectedSchool,
    updating,
    setUpdating,
    profilePicPreview,
    setProfilePicPreview,
    uploadingImg,
    setUploadingImg,
  } = useProfile();

  //profile states
  const [dropDown, setDropDown] = useState<string>("");
  const [profileDetails, setProfileDetails] = useState<profileDetailsProp>({
    first_name: profileInfo?.first_name || "",
    last_name: profileInfo?.last_name || "",
    _class: profileInfo?._class || "",
    age: profileInfo?.age || "",
    bio: profileInfo?.bio || "",
    phone: profileInfo?.phone || "",
    profile_pic: profileInfo?.profile_pic?.id || "",
    school: profileInfo?.school?.id || "",
    no_student_you_teach: profileInfo?.no_student_you_teach || 0,
    interests: profileInfo?.user_interests || [],
  });
  //
  const router = useRouter();
  //
  useLayoutEffect(() => {
    if (profileInfo) {
      setProfilePicPreview(profileInfo?.profile_pic?.media as string);
      setSelectedSchool(profileInfo?.school?.name);
    }
  }, []);
  //
  const validateBeforeUpdate = async (e: any) => {
    e.preventDefault();
    console.log("Hello");
    if (
      !profileDetails?.first_name ||
      !profileDetails?.last_name ||
      !profileDetails?._class ||
      !profileDetails?.age ||
      !profileDetails?.bio ||
      !profileDetails?.phone ||
      !profileDetails?.profile_pic ||
      !profileDetails?.school ||
      profileDetails?.interests?.length < 1
    ) {
      toast.error("Please fill in all details");
      return;
    } else {
      setEditModals(true);
    }
  };
  //
  // function to upload profile picture
  const uploadProfilePic = async (file: File) => {
    setUploadingImg(true);
    try {
      const res = await api.post(
        "/media/upload",
        {
          media: file,
          media_type: "photo",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data?.message);
        setProfilePicPreview(res.data?.data?.media);
        setProfileDetails({
          ...profileDetails,
          profile_pic: res.data?.data?.id,
        });
      }
    } catch (error: any) {
      toast.error(error.response.data?.message);
    } finally {
      setUploadingImg(false);
    }
  };
  //
  const updateProfileDetails = async () => {
    try {
      setUpdating(true);
      const res = await api.put("/dashboard/update-profile", profileDetails);
      if (!res.data?.success) {
        toast.error(res.data?.message);
        return;
      }
      if (res.data?.success) {
        toast.success(res.data?.message);
        setCookie("age", res.data?.data?.age, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        setCookie("_class", res.data?.data?._class, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        setCookie("first_name", res.data?.data?.first_name, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        setCookie("last_name", res.data?.data?.last_name, {
          // httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
        });
        setEditModals(false);
        router.push("/dashboard/profile");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setUpdating(false);
    }
  };

  //
  return (
    <Fragment>
      <div
        className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}
      >
        <div className="sticky top-0 left-0 flex justify-between items-center py-5 border-b border-b-gray-400 bg-white z-[999] px-4">
          <div className="flex items-center gap-2">
            <BackIcon onClick={() => router.push("/dashboard/profile")} />
            <p>Edit Profile</p>
          </div>
        </div>

        <main className="pb-10">
          <div className="px-4 sm:px-6 lg:px-8 lg:py-6 space-y-10">
            <div className="z-[1] relative w-full h-[12rem] lg:h-[14rem]">
              <Image
                width={1110}
                height={252}
                alt="profile"
                src={`/profile-bg.jpeg`}
                className="z-[1] relative w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <label
                htmlFor="profile_pic"
                className="h-[110px] w-[110px] rounded-full"
              >
                <div className="relative h-[110px] w-[110px] cursor-pointer">
                  {!uploadingImg ? (
                    <Image
                      src={
                        profilePicPreview
                          ? profilePicPreview
                          : `/assets/no-profile.jpg`
                      }
                      alt="profile"
                      width={381}
                      height={480}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <SpinnerCoverUi text={"Uploading Image"} />
                  )}
                  <input
                    type="file"
                    hidden
                    id="profile_pic"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        uploadProfilePic(file);
                      }
                    }}
                  />
                  <EditIcon size="30" className="absolute right-0 bottom-6" />
                </div>
              </label>
              {/*  */}
              <div className="mx-auto w-full">
                <div className="mt-5 py-6 px-6">
                  <form className="flex flex-col gap-5">
                    {/* My information */}
                    <div className="bg-[#F2F2F3] rounded-2xl space-y-6 p-7">
                      <p className="mb-7">My Infomation</p>
                      <div className="flex items-center gap-4 flex-wrap min-[576px]:flex-nowrap">
                        <div className="w-full min-[576px]:w-1/2">
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            First Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id="first_name"
                              placeholder="Johnson"
                              className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                              value={profileDetails?.first_name}
                              onChange={(e) =>
                                setProfileDetails({
                                  ...profileDetails,
                                  first_name: e.target.value,
                                })
                              }
                            />

                            <p className="text-[#F00101]"></p>
                          </div>
                        </div>
                        <div className="w-full min-[576px]:w-1/2">
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Last Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              id="last_name"
                              placeholder="Annabel"
                              className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                              value={profileDetails?.last_name}
                              onChange={(e) =>
                                setProfileDetails({
                                  ...profileDetails,
                                  last_name: e.target.value,
                                })
                              }
                            />

                            <p className="text-[#F00101]"></p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone no.
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            placeholder="phone no"
                            className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                            value={profileDetails?.phone}
                            onChange={(e) =>
                              setProfileDetails({
                                ...profileDetails,
                                phone: e.target.value,
                              })
                            }
                          />

                          <p className="text-[#F00101]"></p>
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="interests"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Interests
                        </label>
                        <div className="mt-2">
                          <Creatable
                            isMulti
                            onChange={(value: any) => {
                              const values = value?.map(
                                (item: any) => item?.value
                              );
                              setProfileDetails({
                                ...profileDetails,
                                interests: [...values],
                              });
                            }}
                            styles={{
                              control: (base: any) => react_select_style1(base),
                            }}
                            options={react_select_options}
                            defaultValue={
                              profileInfo &&
                              profileInfo?.user_interests?.map((item) => ({
                                label: item,
                                value: item,
                              }))
                            }
                          />
                          <p className="text-[#F00101]"></p>
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Bio
                        </label>
                        <div className="mt-2">
                          <textarea
                            placeholder="bio..."
                            rows={6}
                            className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6 resize-none"
                            value={profileDetails?.bio}
                            onChange={(e) =>
                              setProfileDetails({
                                ...profileDetails,
                                bio: e.target.value,
                              })
                            }
                          />

                          <p className="text-[#F00101]"></p>
                        </div>
                      </div>
                    </div>
                    {/* School information */}
                    <div className="bg-[#F2F2F3] rounded-2xl space-y-6 p-7">
                      <p className="mb-7">School Infomation</p>
                      <div className="w-full mb-[1.5rem] relative">
                        <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">
                          School
                        </label>
                        <div className="border flex items-center justify-between rounded-md focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                          <input
                            type="text"
                            id="schoolName"
                            placeholder="School"
                            required
                            className="block outline-none w-full bg-[#F2F2F3] border-neutral-300 placeholder:text-gray-700"
                            value={selectedSchool}
                            onChange={() => {}}
                          />
                          <BiChevronDown
                            onClick={() =>
                              setDropDown(dropDown === "school" ? "" : "school")
                            }
                            className="cursor-pointer text-gray-500 text-[24px]"
                          />
                        </div>
                        {dropDown === "school" && (
                          <div className="absolute bg-white z-[889] h-[240px] overflow-y-auto w-full mt-1 p-2 rounded-md shadow-md border">
                            {allSchools?.map((school, index) => (
                              <div
                                key={index}
                                className="cursor-pointer hover:bg-gray-100 p-2"
                                onClick={() => {
                                  setProfileDetails({
                                    ...profileDetails,
                                    school: school?.id,
                                  });
                                  setSelectedSchool(school?.name);
                                  setDropDown("");
                                }}
                              >
                                {school?.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-4">
                        <div className="w-full mb-[1.5rem] relative">
                          <label className="block text-sm mb-2 font-medium leading-6 text-gray-900">
                            Class
                          </label>
                          <div className="border flex items-center justify-between rounded-md focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            <input
                              type="text"
                              id="schoolName"
                              placeholder="Year 2"
                              required
                              className="block outline-none w-full bg-[#F2F2F3] border-neutral-300 placeholder:text-gray-700"
                              value={profileDetails?._class}
                              onChange={() => {}}
                            />
                            <BiChevronDown
                              onClick={() =>
                                setDropDown(dropDown === "class" ? "" : "class")
                              }
                              className="cursor-pointer text-gray-500 text-[24px]"
                            />
                          </div>
                          {dropDown === "class" && (
                            <div className="absolute bg-white w-full mt-1 z-[889] h-[240px] overflow-y-auto p-2 rounded-md shadow-md border">
                              {classArray.map((clas, index) => (
                                <div
                                  key={index}
                                  className="cursor-pointer hover:bg-gray-100 p-2"
                                  onClick={() => {
                                    setProfileDetails({
                                      ...profileDetails,
                                      _class: clas?.value,
                                    });
                                    setDropDown("");
                                  }}
                                >
                                  {clas?.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="age"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Age
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Age"
                              className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                              value={profileDetails?.age}
                              onChange={(e) =>
                                setProfileDetails({
                                  ...profileDetails,
                                  age: e.target.value,
                                })
                              }
                            />

                            <p className="text-[#F00101]"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-14 flex justify-end">
                      <button
                        type="submit"
                        onClick={validateBeforeUpdate}
                        className="flex w-48 justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                       p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B1B1B4] focus-visible:outline 
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B1B1B4]"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {editModals && (
        <Modal isOpen={editModals} onClose={() => setEditModals(false)}>
          <div
            className={` ${raleway.className} fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto`}
          >
            <div
              className="fixed inset-0 bg-[#26002C80]"
              onClick={() => setEditModals(false)}
            ></div>
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
                  className="mt-10 flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                            p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  onClick={updateProfileDetails}
                >
                  {updating ? (
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
