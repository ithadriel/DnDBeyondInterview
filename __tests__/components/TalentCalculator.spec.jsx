import React from "react";
import { shallow, } from "enzyme";

import { TalentCalculator, } from "../../app/components/TalentCalculator";
import { TalentPointCounter, } from "../../app/components/TalentPointCounter";
import { Talent, } from "../../app/components/Talent";

jest.unmock("../../app/components/TalentCalculator");

describe("TalentCalculator", () => {
    let tree;
    
    beforeEach(() => {
        tree = shallow(<TalentCalculator/>);
    });
    
    it("should render a talent point counter", () => {
        expect(tree.find(TalentPointCounter).exists()).toBe(true);
    });

    it("should render two talent paths with four talents in each", () => {
        let talentTreeOne = tree.find("[data-test=\"talent-path-1\"]");
        expect(talentTreeOne.text()).toContain("TALENT PATH 1");
        expect(talentTreeOne.find(Talent).length).toEqual(4);

        let talentTreeTwo = tree.find("[data-test=\"talent-path-2\"]");
        expect(talentTreeTwo.text()).toContain("TALENT PATH 2");
        expect(talentTreeTwo.find(Talent).length).toEqual(4);
    });
});