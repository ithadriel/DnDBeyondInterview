import React from "react";
import { shallow, } from "enzyme";

import { Header, } from "../../app/components/Header/Header";

jest.unmock("../../app/components/Header/Header");

describe("Header", () => {
    let tree;
    
    beforeEach(() => {
        tree = shallow(<Header/>);
    });
    
    it("should render the TitanStar Legends header text", () => {
        expect(tree.find(".header").text()).toEqual("TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000");
    });
});