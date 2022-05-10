import React, { useEffect, useRef, useState } from "react";
import { TabNav, TabNavItem } from "vcc-ui";
import { BodyType, Car } from "../types";
import { CarInfo } from "./Cards/CarInfo";
import { ChevronButtons } from "./ChevronButtons";
import { Dots } from "./Dots";
import { ErrorView } from "./ErrorView";

const PAGINATION_PAGE_SIZE = 4;

export const CarsList = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [displayCars, setDisplayCars] = useState<Car[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isMobile, setIsMobile] = useState<boolean>();
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [defaultDotValue, setDefaultDotValue] = useState<number>(0);

    const listContainerRef = useRef<HTMLDivElement>(null);

    const desktopAndNeedsPagination =
        isMobile === false && displayCars.length > PAGINATION_PAGE_SIZE;
    const filterTabs = ["All", ...Object.values(BodyType)];

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const currentScrollX = event.currentTarget.scrollLeft;
        const activeDot = Math.round(
            currentScrollX / (0.75 * window.innerWidth)
        );

        setDefaultDotValue(activeDot);
    };

    const handleFilter = (tab: string) => {
        if (tab === "All") {
            setDisplayCars(cars);
        } else {
            const carsToShow = cars.filter(
                (car) => car.bodyType === tab.toLocaleLowerCase()
            );
            setDisplayCars(carsToShow);
        }
        setPage(1);
        handleDotClick(0);
        setActiveFilter(tab);
    };

    const handleDotClick = (index: number) => {
        listContainerRef.current?.scrollTo(index * window.innerWidth * 0.75, 0);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/cars.json");
                const data = await response.json();
                setCars(data);
                setDisplayCars(data);
            } catch {
                setError(true);
            }
        };

        fetchData();

        const handleViewportChange = () => {
            const mobileDisplay = window && window.innerWidth < 700;
            if (mobileDisplay) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        handleViewportChange();

        window.addEventListener("resize", handleViewportChange);
        return () => window.removeEventListener("resize", handleViewportChange);
    }, []);

    if (error) return <ErrorView />;

    return (
        <div className="list">
            <TabNav enableLineTransition>
                {filterTabs.map((tab, i) => (
                    <TabNavItem
                        isActive={tab === activeFilter}
                        onClick={() => handleFilter(tab)}
                        key={`${tab}-${i}`}
                    >
                        {tab}
                    </TabNavItem>
                ))}
            </TabNav>
            <div
                className="list-container"
                ref={listContainerRef}
                onScroll={handleScroll}
            >
                {isMobile
                    ? displayCars.map((carItem) => (
                          <CarInfo car={carItem} key={carItem.id} />
                      ))
                    : displayCars
                          .slice(
                              (page - 1) * PAGINATION_PAGE_SIZE,
                              page * PAGINATION_PAGE_SIZE
                          )
                          .map((carItem) => (
                              <CarInfo car={carItem} key={carItem.id} />
                          ))}
            </div>
            {desktopAndNeedsPagination && (
                <ChevronButtons
                    page={page}
                    setPage={(page) => setPage(page)}
                    numberOfItems={displayCars.length}
                    pageSize={PAGINATION_PAGE_SIZE}
                />
            )}
            {isMobile && (
                <Dots
                    defaultDotValue={defaultDotValue}
                    numberOfDots={displayCars.length}
                    onClick={handleDotClick}
                />
            )}
        </div>
    );
};
