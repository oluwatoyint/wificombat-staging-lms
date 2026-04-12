import { useGetAllUsersInSchool } from "@/app/hooks/school_admin/useGetAllUsersInSchool";
import {
  CheckedOutline,
  FilterLinesIcon,
  GreenCheckmark,
  UncheckedOutline,
} from "@/app/icons";
import { classArray } from "@/app/utils/class-array";
import { Truncate } from "@/app/utils/truncate";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import { TableAction } from "./TableAction";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/base-components/Button";
import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import api from "@/app/utils/auth-interceptor";

export default function StudentsListTable({ quote_id }: { quote_id: string }) {
  //
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sending, setSending] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
  const handleSendCodeToStudents = async () => {
    if (selectedStudents?.length === 0) {
      toast.error("No Students selected");
    }
    try {
      setSending(true);
      const data = {
        user_ids: selectedStudents,
        quote_id: quote_id,
      };
      const res = await api.post(`/quotes/token/send`, data);
      if (res.status === 201 || res.status === 200) {
        toast.success(res.data?.message);
        setShowSuccessModal(true);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An Error occurred");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSending(false);
    }
  };
  //
  return (
    <Fragment>
      <div className="mx-auto bg-white rounded-lg border mb-8">
        {/* Header */}
        <div className="flex p-6 justify-between items-center mb-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">
              Teachers
              {allUsers && (
                <span className="text-sm bg-[#E6F6FE] w-fit px-3 py-2 rounded-full text-[#056494]">
                  &nbsp;{data?.length} students
                </span>
              )}
            </h2>
            <p className="text-black-600">
              Keep track of all your teachers and view their class report
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
                <th className="flex items-center gap-4 px-6 py-4 whitespace-nowrap">
                  <span>
                    {data && selectedStudents?.length === data.length ? (
                      <CheckedOutline onClick={() => setSelectedStudents([])} />
                    ) : (
                      <UncheckedOutline
                        onClick={() =>
                          setSelectedStudents(
                            data?.map((item: any) => item?.id) || []
                          )
                        }
                      />
                    )}
                  </span>
                  <span>Student ID</span>
                </th>
                <th className="px-6 py-4 whitespace-nowrap">Students</th>
                <th className="px-6 py-4 whitespace-nowrap">Email</th>
                <th className="px-6 py-4 whitespace-nowrap">Class</th>
                <th className="px-6 py-4 whitespace-nowrap">Teacher</th>
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
              {allUsers &&
                data?.map((student: any) => (
                  <tr key={student?.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <TableAction
                        student={student}
                        data={data}
                        selectedStudents={selectedStudents}
                        setSelectedStudents={setSelectedStudents}
                      />
                      <span>{Truncate(student?.id, 7)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
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
                        <div className="whitespace-nowrap">
                          {`${student?.last_name || ""} ${
                            student?.first_name || ""
                          }`}
                          {!student?.last_name && !student?.first_name && "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{student?.email || "N/A"}</td>
                    <td className="px-6 py-4">
                      {classArray?.find(
                        (_class) => _class?.value === student?._class
                      )?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">{student?.teacherId || "N/A"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-6 my-4">
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
      <div className="w-full">
        <Button
          disabled={sending || selectedStudents?.length === 0}
          label={sending ? "Funding" : "Add Funds"}
          className="ml-auto !flex-row-reverse"
          onClick={handleSendCodeToStudents}
          icon={
            sending ? (
              <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
            ) : (
              <></>
            )
          }
        />
      </div>
      {/*  */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[999] bg-black/40 top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center">
          <div className="rounded-2xl p-4 bg-white max-w-[462px] min-w-[462px] flex flex-col items-center gap-3">
            <GreenCheckmark />
            <h3 className="text-center text-black-800 text-xl md:text-3xl font-bold">
              Successful
            </h3>
            <p className="text-center text-black-600 text-base sm:text-lg font-semibold">
              Students course code has been sent <br /> successfully
            </p>
            <Button
              label="Done"
              onClick={() => setShowSuccessModal(false)}
              className="!w-full"
            />
          </div>
        </div>
      )}
    </Fragment>
  );
}
