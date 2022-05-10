import React, { FC, useEffect, useState } from "react";

interface DotsProps {
    numberOfDots: number;
    onClick: (index: number) => void;
    defaultDotValue: number;
}

export const Dots: FC<DotsProps> = ({
    defaultDotValue,
    numberOfDots,
    onClick,
}) => {
    const [activeDot, setActiveDot] = useState<number>(defaultDotValue);

    const handleScroll = (index: number) => {
        setActiveDot(index);
        onClick(index);
    };

    useEffect(() => {
        setActiveDot(defaultDotValue);
    }, [defaultDotValue]);

    return (
        <ul className="dots">
            {Array.from({ length: numberOfDots }, (v, i) => i).map(
                (_, index) => (
                    <li
                        onClick={() => handleScroll(index)}
                        className={
                            activeDot === index
                                ? "dots-item-active"
                                : "dots-item"
                        }
                        key={index}
                    ></li>
                )
            )}
        </ul>
    );
};
