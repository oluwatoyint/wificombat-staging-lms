import { Suspense } from "react";
import { WalletTransactionsView } from "../../_components/WalletTransactionsView";

const WalletAllTransactionsPage = () => {
  //
  return (
    <Suspense fallback={<div></div>}>
      <WalletTransactionsView />
    </Suspense>
  );
};

export default WalletAllTransactionsPage;
