import { useGetMyBadges } from "@/app/hooks/user/useGetMyBadges";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { SingleUserProfileDetailProp } from "@/app/types/single-profile-detail-prop";
import React from "react";

type Props = {
  profileInfo: SingleUserProfileDetailProp;
};

const ProfileInfo = (props: Props) => {
  const { getShade } = usePrimaryColor();
  //
  const { myBadges, loadingMyBadges } = useGetMyBadges();
  //
  return (
    <div className="text-black-500">
      <div className="mt-3">
        <h2 className="font-semibold">{`${props?.profileInfo?.first_name} ${props?.profileInfo?.last_name}`}</h2>
        <h3 className="mt-2">{props?.profileInfo?.email}</h3>
        <div
          style={{ background: getShade(100) }}
          className="w-fit mt-3 py-2 px-5 rounded-3xl flex items-center gap-2"
        >
          <div className="w-2 h-2 capitalize bg-primary rounded-full"></div>
          <p>{props?.profileInfo?.role}</p>
        </div>

        <h2 className="mt-6 font-semibold">Bio</h2>
        <h3 className="mt-2">{props?.profileInfo?.bio}</h3>

        <h2 className="mt-6 font-semibold">Interest</h2>
        <ul className="mt-3 list-disc flex flex-wrap items-center gap-10">
          {props?.profileInfo &&
          props?.profileInfo?.user_interests?.length < 1 ? (
            <div>No interests yet...</div>
          ) : (
            props?.profileInfo?.user_interests?.map(
              (interest: string, index: number) => (
                <li key={index} className="m-0">
                  {interest}
                </li>
              )
            )
          )}
        </ul>

        <h2 className="mt-6 font-semibold">Earned Badges</h2>
        {loadingMyBadges && (
          <div className="h-[15px] w-[15px] bg-gray-200 animate-pulse" />
        )}
        {myBadges && (
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {myBadges?.length}
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
