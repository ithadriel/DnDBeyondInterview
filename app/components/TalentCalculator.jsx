import React from "react";
import { TalentPointCounter, } from "./TalentPointCounter";
import { Talent, } from "./Talent";

export const TalentCalculator = () => {
    return (
        <>
            <div data-test={"talent-path-1"}>
                TALENT PATH 1
                <Talent/>
                <Talent/>
                <Talent/>
                <Talent/>
            </div>
            <div data-test={"talent-path-2"}>
                TALENT PATH 2
                <Talent/>
                <Talent/>
                <Talent/>
                <Talent/>
            </div>
            <TalentPointCounter/>
        </>
    );
};

TalentCalculator.propTypes = {};
