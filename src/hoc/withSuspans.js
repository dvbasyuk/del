import React, { Suspense } from 'react';

export const withSuspens = (Component) => {


    return (props) => {
        return <Suspense fallback={<div>Lading...</div>}>
            <Component {...props} />
        </Suspense>
    }
}