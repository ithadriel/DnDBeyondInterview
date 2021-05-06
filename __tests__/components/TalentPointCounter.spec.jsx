import React from "react";
import { shallow, } from "enzyme";

import { TalentPointCounter, } from "../../app/components/TalentPointCounter";

jest.unmock("../../app/components/TalentPointCounter");

describe("TalentPointCounter", () => {
    let tree;
    
    beforeEach(() => {
        tree = shallow(<TalentPointCounter/>);
    });
    
    it("should exist", () => {
        expect(true).toBe(true);
    });
});