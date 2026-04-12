import { SuccessModal } from "@/app/components/base-components/SuccessModal";
import { useSearchParams } from "next/navigation";
import React, { Fragment } from "react";

export const WalletPageModalView = () => {
  const searchParams = useSearchParams();
  const is_success = searchParams.get("is_success");
  return (
    <Fragment>
      {is_success && is_success === "true" && <SuccessModal />}
    </Fragment>
  );
};
