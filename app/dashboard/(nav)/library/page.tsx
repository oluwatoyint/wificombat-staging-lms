import DashboardPageWrapper from "@/app/components/base-components/DashboardPageWrapper";
import { LibraryList } from "@/app/components/Dashboard/LibraryPage/LibraryList";
import { LibraryPageHeader } from "@/app/components/Dashboard/LibraryPage/LibraryPageHeader";

const LibraryPage = () => {
  //
  return (
    <DashboardPageWrapper>
      <LibraryPageHeader />
      <LibraryList />
    </DashboardPageWrapper>
  );
};

export default LibraryPage;
