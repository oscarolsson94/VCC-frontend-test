import React from "react";

export const ErrorView = () => {
    return (
        <>
            <div>There was an error fetching the data, please try again!</div>
            <button onClick={() => document.location.reload()}>Refetch</button>
        </>
    );
};
