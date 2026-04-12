import { ColumnText } from "@/app/components/base-components/ColumnText";
import { EditIcon } from "@/app/icons/EditIcon";
import { SettingIcon } from "@/app/icons/SettingIcon";
import { SingleUserProfileDetailProp } from "@/app/types/single-profile-detail-prop";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import router from "next/router";
import { useRouter } from "next/navigation";
import { recentActivityProp } from "@/app/types/recent-activity-prop";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";

dayjs.extend(relativeTime);
export const AdminProfileView = ({
  profileInfo,
  recentActivities,
}: {
  profileInfo: SingleUserProfileDetailProp;
  recentActivities: recentActivityProp[];
}) => {
  const router = useRouter();
  //
  const { getShade } = usePrimaryColor();
  //
  return (
    <div className="w-[96%] mx-auto">
      <div className="h-[196px] overflow-hidden rounded-xl w-full mb-4">
        <Image
          src={"/profile-bg.jpeg"}
          alt="profile background"
          width={100}
          height={80}
          className="h-full w-full object-cover object-center"
        />
      </div>
      {/*  */}
      <div className="flex justify-between flex-wrap items-center gap-3">
        <div className="flex gap-4 items-center">
          <div className="w-[80px] h-[80px]">
            <Image
              src={
                !profileInfo?.profile_pic
                  ? "/assets/no-profile.jpg"
                  : profileInfo?.profile_pic?.media
              }
              alt="profile mock image"
              width={80}
              height={80}
              className="object-cover w-full h-full object-center rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-lg text-black">
              {`${profileInfo?.first_name} ${profileInfo?.last_name}`}
            </h4>
            <p className="text-black/70">{profileInfo?.email}</p>
            <p className="text-black/70">
              {profileInfo?._class}, {profileInfo?.school?.name}
            </p>
            <div
              style={{ background: getShade(100) }}
              className="flex items-center justify-center w-[140px] gap-1 rounded-2xl"
            >
              <div className="h-3 w-3 bg-primary rounded-full" />
              <p className="capitalize text-black">{profileInfo?.role}</p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex items-center gap-3">
          <EditIcon
            size="38"
            onClick={() => router.push("/dashboard/profile/edit")}
          />
          <SettingIcon
            size="38"
            onClick={() => router.push("/dashboard/profile/settings")}
          />
        </div>
      </div>

      {/* Recent  activity section */}
      <figure className="border p-5 rounded-2xl mt-8">
        <h2 className="font-semibold text-base sm:text-lg md:text-xl mb-4">
          Recent Activity
        </h2>
        <div className="flex flex-col gap-4">
          {recentActivities.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-3"
            >
              <div className="flex items-center gap-3">
                {item?.activity_type === "profile" ? (
                  <div className="p-2 h-[30px] w-[30px] flex items-center justify-center bg-[#F2F2F3] rounded-[8px]">
                    <Image
                      src={"/assets/userIcon.svg"}
                      width={30}
                      height={30}
                      alt={item?.activity_type}
                      className="object-cover h-full w-full object-center"
                    />
                  </div>
                ) : item?.activity_type === "login" ? (
                  <Image
                    src={"/assets/login.svg"}
                    width={30}
                    height={30}
                    alt={item?.activity_type}
                  />
                ) : item?.activity_type === "course" ? (
                  <Image
                    src={"/assets/open-book-icon.svg"}
                    width={30}
                    height={30}
                    alt={item?.activity_type}
                  />
                ) : (
                  <Image
                    src={"/assets/list-icon.svg"}
                    width={30}
                    height={30}
                    alt={item?.activity_type}
                  />
                )}
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold capitalize text-black text-base">
                    {item?.activity_type}
                  </h3>
                  <p className="text-black/70 text-sm">{item?.description}</p>
                </div>
              </div>
              <p className="text-black/80 text-sm">
                {dayjs(item?.updated_at).fromNow()}
              </p>
            </div>
          ))}
        </div>
      </figure>
    </div>
  );
};
