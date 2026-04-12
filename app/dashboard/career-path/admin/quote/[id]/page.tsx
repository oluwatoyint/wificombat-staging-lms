"use client";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import StudentsListTable from "../../_components/StudentsListTable";

const AddStudentsToQuotePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const { id } = useParams();
  //
  return (
    <Fragment>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative `}>
        <div
          className={`${
            toggleSidebar ? "lg:pl-36" : "lg:pl-64"
          } transition-all duration-500 ease-in-out`}
        >
          <DashboardHeader setSidebarOpen={setSidebarOpen} />
          <Fragment>
            <article className="px-4 sm:px-6 lg:px-8 space-y-10 pb-10 mt-8 flex flex-col justify-center">
              <div>
                <StudentsListTable quote_id={id.toString()} />
              </div>
            </article>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default AddStudentsToQuotePage;
