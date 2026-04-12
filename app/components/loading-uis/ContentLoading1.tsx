import { Fragment } from "react";

export const ContentLoading1 = () => {
  return (
    <Fragment>
      <div className="space-y-4 w-11/12 sm:w-8/12 lg:w-6/12">
        <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse w-4/6"></div>
        </div>
        <div className="h-48 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-300 rounded-lg animate-pulse w-1/4"></div>
      </div>
    </Fragment>
  );
};
