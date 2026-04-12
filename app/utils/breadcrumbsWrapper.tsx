import React, { ReactNode, Suspense } from 'react';
import { Breadcrumbs } from './breadcrumb'; // Adjust the import path as necessary

type Props = {
    children: ReactNode;
}

const BreadcrumbsWrapper = ({  children }: Props) => {
    return (
        <Suspense fallback={<></>}>
            {children}
        </Suspense>
    );
};

export default BreadcrumbsWrapper;