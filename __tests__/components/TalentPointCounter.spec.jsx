import React from "react";
import { shallow, } from "enzyme";

import { TalentPointCounter, } from "../../app/components/TalentPointCounter/TalentPointCounter";

jest.unmock("../../app/components/TalentPointCounter/TalentPointCounter");
jest.unmock("../../app/components/TalentCalculator/talentStateUtil");

describe("TalentPointCounter", () => {
    let tree;
    
    beforeEach(() => {
        tree = shallow(<TalentPointCounter talentPoints={6}/>);
    });
    
    it("should display remaining talent points from props", () => {
        expect(tree.find(".talentCounterContainer").text()).toEqual("6\u00A0/\u00A06 Points Spent"); // \u00A0 is the unicode for non-breaking space

        tree = shallow(<TalentPointCounter talentPoints={2}/>);

        expect(tree.find(".talentCounterContainer").text()).toEqual("2\u00A0/\u00A06 Points Spent");
    });
});