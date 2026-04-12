import { EyeOutlineIcon, TrashOutlineIcon } from "@/app/icons";
import React, { Fragment } from "react";

export const TableAction = ({ student }: { student: any }) => {
  return (
    <Fragment>
      <div className="flex items-center gap-5">
        <EyeOutlineIcon />
        <TrashOutlineIcon />
      </div>
    </Fragment>
  );
};
