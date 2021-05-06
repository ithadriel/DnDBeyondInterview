import "./index.css";
import React from "react";
import { Header, } from "./components/Header";
import { TalentCalculator, } from "./components/TalentCalculator";

export const App = () => {
    return (
        <div>
            <Header/>
            <TalentCalculator/>
        </div>
    );
};