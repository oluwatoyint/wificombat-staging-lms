import React, { Fragment } from "react";
import { WalletNav1 } from "./_components/WalletNav1";

const WalletLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <WalletNav1 />
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 mb-10">
        {children}
      </main>
    </Fragment>
  );
};

export default WalletLayout;
