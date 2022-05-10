import "../public/css/styles.css";
import React from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import { CarsList } from "../src/components/CarsList";

function HomePage() {
    return (
        <StyleProvider>
            <ThemePicker variant="light">
                <React.StrictMode>
                    <CarsList />
                </React.StrictMode>
            </ThemePicker>
        </StyleProvider>
    );
}

export default HomePage;
