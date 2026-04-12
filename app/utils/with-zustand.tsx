import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useDashboardStore } from '../context/useDashboardStore';

// Define the structure of your props
interface DashboardProps {
  dashboardData: any; // Replace 'any' with a more specific type if possible
}

export const withZustand = (gssp: any) => {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<DashboardProps>> => {
    const result = await gssp(context);

    // Since result should always have props, we can directly destructure it.
    const { props } = result; // No need for an assertion here

    // On the server, you'll be fetching and hydrating dashboard data
    if (props.dashboardData) {
      useDashboardStore.getState().setDashboardData(props.dashboardData);
    }

    return result;
  };
};