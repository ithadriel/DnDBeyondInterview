import React from "react";
import { shallow, } from "enzyme";

import { Talent, } from "../../app/components/Talent";

jest.unmock("../../app/components/Talent");

describe("Talent", () => {
    let tree;
    
    beforeEach(() => {
        tree = shallow(<Talent/>);
    });
    
    it("should exist", () => {
        expect(true).toBe(true);
    });
});