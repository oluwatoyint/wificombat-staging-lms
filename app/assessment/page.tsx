import React, { Suspense } from "react";
import GeneralNavbar from "../components/general/GeneralNavbar";
import { AssessmentView } from "./_components/AssessmentView";

function AssessmentTwoPage() {
  return (
    <div className="relative mx-auto container max-w-[2000px]">
      <GeneralNavbar />
      <Suspense>
        <AssessmentView />
      </Suspense>
    </div>
  );
}

export default AssessmentTwoPage;
