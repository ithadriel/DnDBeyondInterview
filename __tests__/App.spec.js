import React from "react";
import { shallow, } from "enzyme";
import { App, } from "../app/App";
import { Header, } from "../app/components/Header/Header";
import { TalentCalculator, } from "../app/components/TalentCalculator/TalentCalculator";

jest.unmock("../app/App");

describe("App", () => {
    let tree;

    beforeEach(() => {
        tree = shallow(<App/>);
    });
    
    it("should render a Header component", () => {
        expect(tree.find(Header).exists()).toBe(true);
    });

    it("should render the TalentCalculator component", () => {
        expect(tree.find(TalentCalculator).exists()).toBe(true);    
    });
});