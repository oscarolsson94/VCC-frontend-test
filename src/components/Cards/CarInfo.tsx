import React, { FC } from "react";
import { Link } from "vcc-ui";
import { Car } from "../../types";

type CarProps = {
    car: Car;
};

export const CarInfo: FC<CarProps> = ({ car }) => {
    return (
        <div className="car-info-container">
            <p className="body-type">{car.bodyType.toUpperCase()}</p>
            <div className="stack-on-mobile">
                <p className="model-name">{car.modelName}</p>
                <p className="model-type">{car.modelType}</p>
            </div>

            <div className="image-container">
                <img src={car.imageUrl} alt={car.id} />
            </div>
            <div className="link-container">
                <Link href={`/learn/${car.id}`} arrow="right">
                    LEARN
                </Link>
                <Link href={`/shop/${car.id}`} arrow="right">
                    SHOP
                </Link>
            </div>
        </div>
    );
};
