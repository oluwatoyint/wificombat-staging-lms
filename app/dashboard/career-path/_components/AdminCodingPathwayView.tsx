import { Button } from "@/app/components/base-components/Button";
import { cn } from "@/app/utils/cn";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// const QuillEditor = dynamic(()=>import)

export const AdminCodingPathwayView = () => {
  const [value, setValue] = useState();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  //
  if (!hydrated) return null;
  //
  return (
    <main className="pb-10 mt-8">
      <div className="px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
            Recent Request
          </h3>
          <Link
            className="text-base text-[#056494] underline underline-offset-8 sm:text-lg md:text-xl font-semibold"
            href="#"
          >
            History
          </Link>
        </div>
        {/*  */}
        <div className="flex flex-col gap-9">
          {recentRequests?.map((item) => (
            <div
              key={item?.id}
              className="flex justify-between items-center p-5 rounded-lg border"
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-lg sm:text-xl">
                  {item?.title}
                </h2>
                <div className="flex items-center gap-4 text-gray-400">
                  <p>{item?._class}</p>
                  <p>{item?.student_sum} Students Added</p>
                </div>
                <p
                  className={cn(
                    "font-semibold text-sm rounded-full capitalize px-3 py-1 w-[100px] h-[28px] flex justify-center items-center",
                    item?.status === "approved"
                      ? "text-green-500 bg-green-200"
                      : item?.status === "pending"
                      ? "text-yellow-500 bg-yellow-100"
                      : "text-red-500 bg-red-200"
                  )}
                >
                  {item?.status}
                </p>
              </div>
              <Link
                href={"#"}
                className={cn(
                  item?.status !== "approved" && "pointer-events-none"
                )}
              >
                <Button
                  disabled={item?.status !== "approved"}
                  label="Add Students"
                  className="flex-row-reverse text-sm"
                  icon={<BiPlus size={24} />}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

const recentRequests = [
  {
    id: "1",
    title: "Coding Pathway",
    _class: "Primary 1",
    student_sum: "0/57",
    status: "pending",
  },
  {
    id: "2",
    title: "Coding Pathway",
    _class: "Primary 1",
    student_sum: "0/57",
    status: "approved",
  },
  {
    id: "3",
    title: "Coding Pathway",
    _class: "Primary 1",
    student_sum: "0/57",
    status: "declined",
  },
];
