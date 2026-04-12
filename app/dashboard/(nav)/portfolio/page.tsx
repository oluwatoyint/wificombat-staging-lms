"use client";
import { Button } from "@/app/components/base-components/Button";
import SuccessfulModal from "@/app/components/base-components/SuccessfulModal";
import Certificates from "@/app/components/Dashboard/Certificates";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import { PortfolioCard } from "@/app/components/Dashboard/PortfolioCard";
import SideBar from "@/app/components/Dashboard/SideBar";
import Popup from "@/app/components/general/Popup";
import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import { useMain } from "@/app/context/MainContext";
import { merriweather, raleway } from "@/app/fonts";
import api from "@/app/utils/auth-interceptor";
import Modal from "@/app/utils/modal";
import { addToPortfolioLinks, sections } from "@/app/utils/types-and-links";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
interface PayloadProp {
  title: string;
  description: string;
  content_type: string;
  date: string;
  link: string;
  team_members: string;
}

const schema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  content_type: z.string().min(1, "Project type cannot be empty"),
  date: z.string().min(1, "Date field cannot be blank"),
  link: z.string().min(1, "Project url is required").url("Invalid url format"),
  team_members: z.string(),
});

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const [selectedSection, setSelectedSection] = useState("Student Portfolio");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  //
  const [uploading, setUploading] = useState<boolean>(false);
  const [successful_msg, setSuccessfulMsg] = useState<string>("");
  const [showSuccessfulModal, setShowSuccessfulModal] =
    useState<boolean>(false);
  //
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PayloadProp>({
    defaultValues: {
      title: "",
      description: "",
      content_type: "project",
      date: "",
      link: "",
      team_members: "",
    },
    resolver: zodResolver(schema),
  });
  //
  const uploadProject = async (data: PayloadProp) => {
    try {
      setUploading(true);
      const res = await api.post("/portfolio-projects/", data);
      if (res.status === 200 || res.status === 201) {
        setSuccessfulMsg(
          res.data?.message || "Project has uploaded successfully"
        );
        setShowSuccessfulModal(true);
        reset();
        setOpenModal(false);
      }
    } catch (error: any) {
      toast.error(error.response.data?.message);
    } finally {
      setUploading(false);
    }
  };
  //
  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div
          className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}
        >
          <DashboardHeader setSidebarOpen={setSidebarOpen} />

          <main className="pb-10">
            <div className="space-y-10">
              <div className="w-[95%] mx-auto mt-5 flex items-center justify-between">
                <div className="flex gap-4 md:gap-7 items-center justify-between text-black-500 text-xl">
                  {sections.map((level) => (
                    <h2
                      key={level}
                      className={`cursor-pointer 
                      ${
                        selectedSection === level
                          ? "text-black-500 border-b-2 border-black-500 font-semibold"
                          : ""
                      }`}
                      onClick={() => setSelectedSection(level)}
                    >
                      {level}
                    </h2>
                  ))}
                </div>

                <div
                  className="relative"
                  onClick={() => setIsPopupVisible(!isPopupVisible)} // Toggle modal on click
                  onMouseEnter={() => setIsPopupVisible(true)} // Show modal on hover
                  onMouseLeave={() => setIsPopupVisible(false)}
                >
                  {selectedSection === "Student Portfolio" && (
                    <button
                      className={`disabled:bg-[#B1B1B4] disabled:cursor-not-allowed bg-black-500 text-white 
                      py-2 md:py-3 2xl:py-4 px-3 md:px-4 lg:px-6 
                      transition duration-300 hover:bg-opacity-90 rounded-lg`}
                    >
                      Add
                    </button>
                  )}
                  {isPopupVisible && (
                    <Popup
                      onclick={(label) => {
                        setModalContent(label);
                        setOpenModal(true);
                        const selected = label?.toLowerCase();
                        const select_v2 =
                          selected === "competition"
                            ? "competition"
                            : selected === "project"
                            ? "project"
                            : "techpreneurship";
                        setValue("content_type", select_v2);
                      }}
                      links={addToPortfolioLinks}
                      portfolio={true}
                    />
                  )}
                </div>
              </div>
              {selectedSection === "Student Portfolio" && <PortfolioCard />}
              {selectedSection === "Certificate" && <Certificates />}
            </div>
          </main>
        </div>
      </div>

      {openModal && (
        <Modal
          portfolio={true}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        >
          <div
            className={` w-[95%] mx-auto py-4 text-black-500 ${raleway.className} `}
          >
            <Image
              src={`/assets/auth/blacklogo.png`}
              alt={`logo`}
              width={150}
              height={150}
              className="mt-5 object-contain mx-auto text-neutral-400"
            />

            <h2
              className={`${merriweather.className} mt-4 font-bold text-xl md:text-2xl text-center`}
            >
              {`Add Your ${modalContent}`}
            </h2>

            <div className="mt-6 w-full">
              <label htmlFor="text" className="block font-medium leading-6">
                {modalContent} Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  type="text"
                  placeholder="Mobile app"
                  className={`block outline-none w-full rounded-md border border-black-300 py-4 px-4 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:[#656765] focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm 
                    sm:leading-6`}
                  {...register("title")}
                />
                <small className="text-red-400">{errors.title?.message}</small>
              </div>
            </div>

            <div className="mt-4 w-full">
              <label htmlFor="text" className="block font-medium leading-6">
                Team Members
              </label>
              <div className="mt-2">
                <input
                  id="members"
                  type="text"
                  placeholder="John, James, Evelyn"
                  className={`block outline-none w-full rounded-md border border-black-300 py-4 px-4 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:[#656765] focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm 
                    sm:leading-6`}
                  {...register("team_members")}
                />
                <small className="text-red-400">
                  {errors.team_members?.message}
                </small>
              </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row items-center gap-4">
              <div className="mt-4 w-full lg:basis-[50%]">
                <label htmlFor="text" className="block font-medium leading-6">
                  Date
                </label>
                <div className="mt-2">
                  <input
                    id="date"
                    type="date"
                    // placeholder="02/03/24"
                    className={`block outline-none w-full rounded-md border border-black-300 py-4 px-4 shadow-sm ring-1 ring-inset 
                      ring-gray-300 placeholder:[#656765] focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm 
                      sm:leading-6 select-none`}
                    {...register("date")}
                  />
                  <small className="text-red-400">{errors.date?.message}</small>
                </div>
              </div>

              <div className="mt-4 w-full lg:basis-[50%]">
                <label htmlFor="text" className="block font-medium leading-6">
                  Link
                </label>
                <div className="mt-2">
                  <input
                    id="link"
                    type="text"
                    placeholder="https://grace.jenny.535.com"
                    className={`block outline-none w-full rounded-md border border-black-300 py-4 px-4 shadow-sm ring-1 ring-inset 
                      ring-gray-300 placeholder:[#656765] focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm 
                      sm:leading-6`}
                    {...register("link")}
                  />
                  <small className="text-red-400">{errors.link?.message}</small>
                </div>
              </div>
            </div>

            <div className="mt-4 w-full">
              <label
                htmlFor="description"
                className="block font-medium leading-6"
              >
                Project Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  placeholder="Enter a description..."
                  className="block outline-none w-full rounded-md border border-black-300 py-4 px-4 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:[#656765] focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm 
                    sm:leading-6 resize-none"
                  rows={4} // Adjust height as needed
                  {...register("description")}
                />
                <small className="text-red-400">
                  {errors.description?.message}
                </small>
              </div>

              {/* BUTTON */}
              <div className="mt-5 w-full flex items-center justify-center">
                <Button
                  disabled={uploading}
                  label={uploading ? "Uploading" : "Submit"}
                  type="button"
                  className="!w-full min-[476px]:!w-[170px]"
                  onClick={handleSubmit(uploadProject)}
                  icon={
                    uploading ? (
                      <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
                    ) : (
                      <></>
                    )
                  }
                />
              </div>
              {/* BUTTON */}
            </div>
          </div>
        </Modal>
      )}
      <SuccessfulModal
        text_one="Project Uploaded"
        text_two={successful_msg}
        showModal={showSuccessfulModal}
        setShowModal={setShowSuccessfulModal}
      />
    </>
  );
};

export default Page;
