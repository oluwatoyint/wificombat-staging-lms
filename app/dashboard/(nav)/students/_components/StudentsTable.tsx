import { useGetAllUsersInSchool } from "@/app/hooks/school_admin/useGetAllUsersInSchool";
import { FilterLinesIcon } from "@/app/icons";
import { classArray } from "@/app/utils/class-array";
import { Truncate } from "@/app/utils/truncate";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { TableAction } from "./TableAction";
import { cn } from "@/app/utils/cn";

const statusColors: any = {
  Excellent: "bg-green-100 text-green-700",
  Satisfactory: "bg-purple-100 text-purple-700",
  "Needs attention": "bg-red-100 text-red-700",
};

export default function StudentsTable() {
  //
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const role = searchParams.get("role") || "student";
  const page = searchParams.get("page") || "1";
  //
  const { allUsers, loadingAllUsers } = useGetAllUsersInSchool({
    role: role,
    page: page,
  });
  //
  const [search, setSearch] = useState<string>("");
  const [showFilters, setShowFilter] = useState<boolean>(false);
  //
  const data = useMemo(() => {
    if (search) {
      return allUsers?.data?.filter(
        (item: any) =>
          item?.email?.toLowerCase().includes(search?.toLowerCase()) ||
          item?.student?.first_name
            ?.toLowerCase()
            .includes(search?.toLowerCase()) ||
          item?.student?.last_name
            ?.toLowerCase()
            .includes(search?.toLowerCase()) ||
          item?._class?.toLowerCase().includes(search?.toLowerCase())
      );
    }
    return allUsers?.data;
  }, [allUsers?.data, search]);
  //
  const handleNextPage = () => {
    const new_page = Number(page) + 1;
    params.set("page", new_page.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePrevPage = () => {
    const new_page = Number(page) - 1;
    params.set("page", new_page.toString());
    router.push(`?${params.toString()}`);
  };
  //
  return (
    <div className="mx-auto bg-white rounded-lg border mb-8">
      {/* Header */}
      <div className="flex p-6 justify-between items-center mb-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">
            Students
            {allUsers && (
              <span className="text-sm bg-[#E6F6FE] w-fit px-3 py-2 rounded-full text-[#056494]">
                &nbsp;{data?.length} students
              </span>
            )}
          </h2>
          <p className="text-black-600">
            Keep track of all your students and their performance
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearch(e.target.value?.toLowerCase())}
          />
          <div className="relative">
            <button
              className="flex items-center gap-1 cursor-pointer px-4 py-2 bg-white border border-gray-400 rounded-md"
              onClick={() => setShowFilter(!showFilters)}
            >
              <FilterLinesIcon />
              <span className="hidden sm:block">{role || "Filters"}</span>
            </button>
            {showFilters && allUsers && (
              <div className="absolute top-[50px] left-0 max-h-[200px] overflow-y-auto bg-white flex flex-col gap-2">
                {allUsers &&
                  data?.map((item: any, index: any) => (
                    <p
                      className="py-2 cursor-pointer px-3"
                      key={index}
                      onClick={() => {
                        params.set("_class", item?.value);
                        router.push(`?${params}`);
                        setShowFilter(false);
                      }}
                    >
                      {item?.value}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="text-left bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Student ID</th>
              <th className="px-6 py-4 whitespace-nowrap">Students</th>
              <th className="px-6 py-4 whitespace-nowrap">Email</th>
              <th className="px-6 py-4 whitespace-nowrap">Class</th>
              <th className="px-6 py-4 whitespace-nowrap">Performance</th>
              <th className="px-6 py-4 whitespace-nowrap">Report</th>
              <th className="px-6 py-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loadingAllUsers &&
              Array.from({ length: 8 }, (_, idx) => {
                const isEven = idx % 2;
                return (
                  <tr key={idx} className="my-2">
                    <td
                      colSpan={14}
                      className={cn(
                        "h-10 py-3 animate-pulse",
                        isEven ? "bg-gray-200" : "bg-gray-100"
                      )}
                    ></td>
                  </tr>
                );
              })}

            {data?.length < 1 && (
              <tr>
                <td
                  colSpan={10}
                  className="col-span-7 py-6 font-semibold text-center text-gray-600"
                >
                  No Student available
                </td>
              </tr>
            )}
            {data?.map((student: any) => (
              <tr key={student?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{Truncate(student?.id, 7)}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-[40px] h-[40px]">
                    <Image
                      src={
                        !student?.profile_pic
                          ? "/assets/no-profile.jpg"
                          : student?.profile_pic?.media
                      }
                      alt="profile mock image"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full object-center rounded-full"
                    />
                  </div>
                  <span className="whitespace-nowrap">
                    {`${student?.last_name || ""} ${student?.first_name || ""}`}
                    {!student?.last_name && !student?.first_name && "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4">{student?.email || "N/A"}</td>
                <td className="px-6 py-4">
                  {classArray?.find(
                    (_class) => _class?.value === student?._class
                  )?.name || "N/A"}
                </td>
                <td className="px-6 py-4">{student?.performance || "N/A"}</td>
                <td className="px-6 py-4">
                  <button className="text-[#0784C3] w-fit px-3 py-1 rounded-full bg-[#E6F6FE] cursor-pointer text-lg font-medium">
                    View
                  </button>
                </td>
                <td className="px-6 py-4">
                  <TableAction student={student} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-6">
        {allUsers && (
          <p className="text-gray-600">
            Page {allUsers?.current_page} of&nbsp;
            {allUsers?.total_pages}
          </p>
        )}
        <div className="flex gap-2">
          {allUsers && (
            <button
              disabled={!allUsers?.previous}
              className="px-4 py-2 bg-white border border-gray-700 text-gray-700 rounded-md hover:bg-gray-300 disabled:hover:bg-white"
              onClick={handlePrevPage}
            >
              Previous
            </button>
          )}
          {allUsers && (
            <button
              disabled={!allUsers?.next}
              className="px-4 py-2 bg-white border border-gray-700 text-gray-700 rounded-md hover:bg-gray-300 disabled:hover:bg-white"
              onClick={handleNextPage}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
