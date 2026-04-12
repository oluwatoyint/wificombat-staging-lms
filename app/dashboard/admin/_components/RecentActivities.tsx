"use client";
import Image from "next/image";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export const RecentActivities = () => {
  const [search, setSearch] = useState<string>("");
  //
  const activities: any[] = [
    {
      activity_type: "profile",
      description: "User updated their profile",
      role: "school_admin",
      formatted_date: "2025-01-06 17:18",
      created_at: "2025-01-06T17:18:31.074826Z",
      updated_at: "2025-01-06T17:18:31.074846Z",
    },
    {
      activity_type: "assignment",
      description: "User updated their profile",
      role: "school_admin",
      formatted_date: "2025-01-06 17:18",
      created_at: "2025-01-06T17:18:31.074826Z",
      updated_at: "2025-01-06T17:18:31.074846Z",
    },
  ];
  //
  return (
    <div>
      <div className="mx-4 flex items-center justify-between mt-10 border-b pb-3">
        <p className="text-primary font-[600] text-[16px]">Recent Activities</p>
        <div className="flex items-center gap-3">
          <div className="border flex items-center p-2 rounded-[8px] w-[300px]">
            <BiSearch className="text-[18px]" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full outline-none pl-1"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center gap-2 border p-2 rounded-[8px] cursor-pointer">
            <BsFilter className="text-[18px]" />
            <p>Filter</p>
          </div>
        </div>
      </div>
      <div className="mt-[2rem]">
        {activities
          ?.filter((item) => {
            if (search === "") return item;
            else if (
              // item.full_name.toLowerCase().includes(search.toLowerCase())
              item.activity_type.toLowerCase().includes(search.toLowerCase())
            )
              return item;
          })
          .map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-[#4B4B4E] border-b py-5"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#F2F2F3] rounded-[8px]">
                  {item.activity_type === "login" ? (
                    <Image
                      src="/assets/login.svg"
                      width={30}
                      height={30}
                      alt={item?.activity_type}
                      className="object-cover object-center"
                    />
                  ) : item.activity_type === "profile" ? (
                    <Image
                      src="/assets/totalUsers.svg"
                      width={30}
                      height={30}
                      alt={item?.activity_type}
                      className="object-cover object-center"
                    />
                  ) : item.activity_type === "assignment" ? (
                    <Image
                      src="/assets/assignment.svg"
                      width={30}
                      height={30}
                      alt={item?.activity_type}
                      className="object-cover object-center"
                    />
                  ) : item.activity_type === "course" ? (
                    <Image
                      src="/assets/assignments.svg"
                      width={30}
                      height={30}
                      alt={item?.activity_type}
                      className="object-cover object-center"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt={item?.activity_type}
                      className="object-cover object-center"
                    />
                  )}
                  {/* <img src="/assets/login.svg" alt=""/> */}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-1">
                    <p className="pb-[2px] capitalize font-[600]">
                      {item?.activity_type}
                    </p>
                    <p className="bg-[#E6F6FE] px-3 py-[2px] flex items-center gap-2 rounded-full text-[14px] text-[#0784C3] capitalize">
                      {" "}
                      <span className="p-1 rounded-full bg-[#0784C3]"></span>
                      {item?.role}
                    </p>
                  </div>
                  <p>{item?.description}</p>
                </div>
              </div>
              <p>{new Date(item?.created_at).toDateString()}</p>
              {/* <p>{new Date(activity.created_at).toDateString()}</p> */}
            </div>
          ))}
      </div>
    </div>
  );
};
