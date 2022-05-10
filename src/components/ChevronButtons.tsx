import React, { FC } from "react";
import { IconButton } from "vcc-ui";
import { ChevronCircled } from "./Images/ChevronCircled";

interface ChevronProps {
    page: number;
    setPage: (page: number) => void;
    numberOfItems: number;
    pageSize: number;
}

export const ChevronButtons: FC<ChevronProps> = ({
    page,
    setPage,
    numberOfItems,
    pageSize,
}) => {
    const firstPage = 1;
    const lastPage = Math.ceil(numberOfItems / pageSize);

    const onNextPage = () => {
        if (page !== lastPage) {
            setPage(page + 1);
        }
    };

    const onPreviousPage = () => {
        if (page !== firstPage) {
            setPage(page - 1);
        }
    };

    return (
        <div className="chevron-container">
            <button
                className="chevron-button chevron-left"
                onClick={onPreviousPage}
            >
                <ChevronCircled />
            </button>
            <button className="chevron-button" onClick={onNextPage}>
                <ChevronCircled />
            </button>
        </div>
    );
};
