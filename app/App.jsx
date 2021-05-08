import "./index.scss";
import React from "react";
import { Header, } from "./components/Header/Header";
import { TalentCalculator, } from "./components/TalentCalculator/TalentCalculator";

export const App = () => {
    return (
        <div>
            <Header/>
            <TalentCalculator/>
        </div>
    );
};