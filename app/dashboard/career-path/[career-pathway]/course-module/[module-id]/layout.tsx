import React, { ReactNode, Suspense } from "react";

const ModuleDetailLayout = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default ModuleDetailLayout;
