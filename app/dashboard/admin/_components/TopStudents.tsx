import Image from "next/image";

const students = [
  {
    id: 1,
    name: "Jane Cooper",
    status: "Excellent",
    img: "https://randomuser.me/api/portraits/women/41.jpg",
  },
  {
    id: 2,
    name: "Esther Howard",
    status: "Excellent",
    img: "https://randomuser.me/api/portraits/women/41.jpg",
  },
];
export const TopStudents = () => {
  return (
    <div className="rounded-xl font-bold text-lg sm:text-xl border">
      <h3 className="border-b p-5">Top students</h3>
      <div className="flex flex-col gap-4 p-5">
        {students?.map((item) => (
          <div
            key={item?.id}
            className="rounded-lg bg-[#F2F2F3] p-4 flex flex-col gap-2"
          >
            <Image
              src={item?.img}
              alt={item?.name}
              width={50}
              height={50}
              className="rounded-full object-cover object-center"
            />
            <h3 className="text-base">{item?.name}</h3>
            <p className="text-green-400 font-light text-sm">{item?.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
