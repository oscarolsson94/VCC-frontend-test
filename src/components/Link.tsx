import React, { FC } from "react";
import { ChevronSmall } from "./Images/ChevronSmall";

interface LinkProps {
    url: string;
    displayText: string;
}

export const Link: FC<LinkProps> = ({ url, displayText }) => {
    return (
        <button
            className="chevron-icon"
            onClick={() => window.location.assign(url)}
        >
            <p>{displayText}</p>
            <ChevronSmall />
        </button>
    );
};
