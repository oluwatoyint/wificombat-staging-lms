import { FaRegFolderOpen } from "react-icons/fa";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { TbCertificate } from "react-icons/tb";

type Props = {
  coursesCompleted: string;
  completedProjects: string;
  badges: string;
  certificates: string;
}

const cardData = [
  {
    title: "Courses completed",
    icon: IoBookOutline,
    stats: "0",
    iconColor: "text-[#0784C3]",
    iconBg: "bg-[#CEEDFD]",
    cardBg: "bg-[#E6F6FE]",
  },
  {
    title: "Completed Project",
    icon: FaRegFolderOpen,
    stats: "0",
    iconColor: "text-[#BC00DD]",
    iconBg: "bg-[#F7CCFF]",
    cardBg: "bg-[#FBE5FF]",
  },
  {
    title: "Badges Earned",
    icon: HiOutlineTrophy,
    stats: "0",
    iconColor: "text-[#FFB700]",
    iconBg: "bg-[#FFE299]",
    cardBg: "bg-[#FFF1CC]",
  },
  {
    title: "Certificates",
    icon: TbCertificate,
    stats: "0",
    iconColor: "text-black-500",
    iconBg: "bg-black-100",
    cardBg: "bg-black-50",
  },
];

const Main = ({ coursesCompleted, completedProjects, badges, certificates }: Props) => {
  cardData[0].stats = coursesCompleted.toString();
  cardData[1].stats = completedProjects.toString();
  cardData[2].stats = badges.toString();
  cardData[3].stats = certificates.toString();
  return (
    <div>
      <div className="w-full flex gap-4 max-lg:flex-col">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Main;

const Card = ({
  title,
  icon: Icon,
  stats,
  iconColor,
  iconBg,
  cardBg,
}: {
  title: string;
  icon: React.ElementType;
  stats: string;
  iconColor: string;
  iconBg: string;
  cardBg: string;
}) => {
  return (
    <div
      className={`p-5 border flex flex-col gap-3 rounded-2xl shadow w-full  ${cardBg}`}
    >
      <div className={`flex flex-col items-center gap-3`}>

        <div className={`${iconBg} p-4 rounded-full`}>
          <Icon className={`${iconColor} font-bold text-2xl`} />
        </div>

        <h5 className="text-lg tracking-tight text-gray-900">{title}</h5>
      </div>
      
      <div className="">
        <p className="text-[#131314] font-bold text-6xl text-center">{stats}</p>
      </div>
    </div>
  );
};
