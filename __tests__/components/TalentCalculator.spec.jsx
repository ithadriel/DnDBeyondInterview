import React from "react";
import { shallow, } from "enzyme";

import { TalentCalculator, } from "../../app/components/TalentCalculator/TalentCalculator";
import { TalentPointCounter, } from "../../app/components/TalentPointCounter/TalentPointCounter";
import { Talent, } from "../../app/components/Talent/Talent";
import each from "jest-each";
import { INITIALLY_AVAILABLE_TALENT_POINTS, } from "../../app/components/TalentCalculator/talentStateUtil";

jest.unmock("../../app/components/TalentCalculator/TalentCalculator");
jest.unmock("../../app/components/TalentCalculator/talentStateUtil");

describe("TalentCalculator", () => {
    let tree;
    let preventDefault = jest.fn();
    const NUMBER_OF_TALENTS = 8;
    const LEFT_CLICK = { button: 0, preventDefault, };
    const RIGHT_CLICK = { button: 2, preventDefault, };
    const OTHER_CLICK = { button: 1, preventDefault, };

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

    describe("TalentPointCounter control", () => {
        it("should start with 0 talent points spent", () => {
            expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(0);
        });

        it("should not increase talent points more than once when repeatedly left-clicking a talent", () => {
            tree.find(Talent).at(0).props().onClick(LEFT_CLICK);
            tree.find(Talent).at(0).props().onClick(LEFT_CLICK);
            tree.find(Talent).at(0).props().onClick(LEFT_CLICK);
            tree.find(Talent).at(0).props().onClick(LEFT_CLICK);
            tree.find(Talent).at(0).props().onClick(LEFT_CLICK);
            tree.find(Talent).at(0).props().onClick(LEFT_CLICK);

            expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(1);
        });

        it("should not allow a user to select more talents than initially available", () => {
            for (let i = 0; i < NUMBER_OF_TALENTS; i++) {
                tree.find(Talent).at(i).props().onClick(LEFT_CLICK);
            }

            for (let i = 0; i < INITIALLY_AVAILABLE_TALENT_POINTS; i++) {
                expect(tree.find(Talent).at(i).props().selected).toBe(true);
            }
            for (let i = INITIALLY_AVAILABLE_TALENT_POINTS; i < NUMBER_OF_TALENTS; i++) {
                expect(tree.find(Talent).at(i).props().selected).toBe(false);
            }
            
            expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(6);
        });

        it("should refund the correct amount of points when multiple talents become deselected at once", () => {
            for (let i = 0; i < 4; i++) {
                tree.find(Talent).at(i).props().onClick(LEFT_CLICK);
            }
            
            expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(4);
            
            tree.find(Talent).at(0).props().onClick(RIGHT_CLICK); // removing the first talent should remove all the talents that would become disabled as a result and refund points

            expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(0);
        });
    });

    each([
        ["Talent Tree One", "talent-path-1", 0, ["stack", "utensils", "cake", "crown",],],
        ["Talent Tree Two", "talent-path-2", 4, ["mask", "scuba", "lightning", "skull",],],
    ]).describe("%s", (treeName, dataTestId, offset, types) => {
        let talentTree;
        let talentOne;
        let talentTwo;
        let talentThree;
        let talentFour;

        beforeEach(() => {
            talentTree = tree.find(`[data-test="${dataTestId}"]`);
            talentOne = talentTree.find(Talent).at(0);
            talentTwo = talentTree.find(Talent).at(1);
            talentThree = talentTree.find(Talent).at(2);
            talentFour = talentTree.find(Talent).at(3);
        });

        describe("initial state (no talents points spent)", () => {
            it("should pass the correct type prop to each talent", () => {
                expect(talentOne.props().type).toEqual(types[0]);
                expect(talentTwo.props().type).toEqual(types[1]);
                expect(talentThree.props().type).toEqual(types[2]);
                expect(talentFour.props().type).toEqual(types[3]);
            });

            it("should only enable the first talent", () => {
                expect(talentOne.props().enabled).toBe(true);
                expect(talentTwo.props().enabled).toBe(false);
                expect(talentThree.props().enabled).toBe(false);
                expect(talentFour.props().enabled).toBe(false);
            });

            it("should not decrease available talent points when a disabled talent is clicked", () => {
                expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(0);

                talentTwo.props().onClick(LEFT_CLICK);
                talentThree.props().onClick(LEFT_CLICK);
                talentFour.props().onClick(LEFT_CLICK);

                expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(0);
            });

            it("should call preventDefault for all talents on any click event", () => {
                talentOne.props().onClick(LEFT_CLICK);
                talentTwo.props().onClick(LEFT_CLICK);
                talentThree.props().onClick(LEFT_CLICK);
                talentFour.props().onClick(LEFT_CLICK);
                talentOne.props().onClick(RIGHT_CLICK);
                talentTwo.props().onClick(RIGHT_CLICK);
                talentThree.props().onClick(RIGHT_CLICK);
                talentFour.props().onClick(RIGHT_CLICK);
                talentOne.props().onClick(OTHER_CLICK);
                talentTwo.props().onClick(OTHER_CLICK);
                talentThree.props().onClick(OTHER_CLICK);
                talentFour.props().onClick(OTHER_CLICK);

                expect(preventDefault).toHaveBeenCalledTimes(12);
            });
        });

        describe("Spending talent points", () => {

            describe("First talent selection", () => {
                it("should update TalentPointCounter with available talent points on first talent add/remove", () => {
                    expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(0);

                    talentOne.props().onClick(LEFT_CLICK);

                    expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(1);

                    talentOne.props().onClick(RIGHT_CLICK);

                    expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(0);
                });

                it("should pass the selected prop to the first talent on left click and remove it on right click", () => {
                    expect(talentOne.props().selected).toBeFalsy();

                    talentOne.props().onClick(LEFT_CLICK);

                    expect(tree.find(Talent).at(offset + 0).props().selected).toBeTruthy();

                    talentOne.props().onClick(RIGHT_CLICK);

                    expect(tree.find(Talent).at(offset + 0).selected).toBeFalsy();
                });

                it("should enable the second talent when the stack is left clicked and disable on right click", () => {
                    talentOne.props().onClick(LEFT_CLICK);

                    expect(tree.find(Talent).at(offset + 1).props().enabled).toBe(true);

                    talentOne.props().onClick(RIGHT_CLICK);

                    expect(tree.find(Talent).at(offset + 1).props().enabled).toBe(false);
                });

                describe("Second talent selection", () => {
                    beforeEach(() => {
                        talentOne.props().onClick(LEFT_CLICK);
                    });

                    it("should update TalentPointCounter with available talent points on second talent add/remove", () => {
                        expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(1);

                        talentTwo.props().onClick(LEFT_CLICK);

                        expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(2);

                        talentTwo.props().onClick(RIGHT_CLICK);

                        expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(1);
                    });

                    it("should pass the selected prop to the second talent on left click and remove it on right click", () => {
                        expect(talentTwo.props().selected).toBeFalsy();

                        talentTwo.props().onClick(LEFT_CLICK);

                        expect(tree.find(Talent).at(offset + 1).props().selected).toBeTruthy();

                        talentTwo.props().onClick(RIGHT_CLICK);

                        expect(tree.find(Talent).at(offset + 1).props().selected).toBeFalsy();
                    });

                    it("should enable the third talent when the second talent is left clicked and disable on right click", () => {
                        talentTwo.props().onClick(LEFT_CLICK);

                        expect(tree.find(Talent).at(offset + 2).props().enabled).toBe(true);

                        talentTwo.props().onClick(RIGHT_CLICK);

                        expect(tree.find(Talent).at(offset + 2).props().enabled).toBe(false);
                    });

                    describe("Third talent selection", () => {
                        beforeEach(() => {
                            talentTwo.props().onClick(LEFT_CLICK);
                        });

                        it("should update TalentPointCounter with available talent points on third talent add/remove", () => {
                            expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(2);

                            talentThree.props().onClick(LEFT_CLICK);

                            expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(3);

                            talentThree.props().onClick(RIGHT_CLICK);

                            expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(2);
                        });

                        it("should pass the selected prop to the third talent on left click and remove it on right click", () => {
                            expect(talentThree.props().selected).toBeFalsy();

                            talentThree.props().onClick(LEFT_CLICK);

                            expect(tree.find(Talent).at(offset + 2).props().selected).toBeTruthy();

                            talentThree.props().onClick(RIGHT_CLICK);

                            expect(tree.find(Talent).at(offset + 2).props().selected).toBeFalsy();
                        });

                        it("should enable the fourth talent when the third talent is left clicked and disable on right click", () => {
                            talentThree.props().onClick(LEFT_CLICK);

                            expect(tree.find(Talent).at(offset + 3).props().enabled).toBe(true);

                            talentThree.props().onClick(RIGHT_CLICK);

                            expect(tree.find(Talent).at(offset + 3).props().enabled).toBe(false);
                        });

                        describe("Fourth Talent Selection", () => {
                            beforeEach(() => {
                                talentThree.props().onClick(LEFT_CLICK);
                            });

                            it("should update TalentPointCounter with available talent points on fourth talent add/remove", () => {
                                expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(3);

                                talentFour.props().onClick(LEFT_CLICK);

                                expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(4);

                                talentFour.props().onClick(RIGHT_CLICK);

                                expect(tree.find(TalentPointCounter).props().talentPoints).toEqual(3);
                            });

                            it("should pass the selected prop to the fourth talent on left click and remove it on right click", () => {
                                expect(talentFour.props().selected).toBeFalsy();

                                talentFour.props().onClick(LEFT_CLICK);

                                expect(tree.find(Talent).at(offset + 3).props().selected).toBeTruthy();

                                talentFour.props().onClick(RIGHT_CLICK);

                                expect(tree.find(Talent).at(offset + 3).props().selected).toBeFalsy();
                            });
                        });
                    });
                });
            });
        });
    });

    describe("With 6 talents selected", () => {
        it("should disable remaining talents", () => {
            for (let i = 0; i < 6; i++) {
                tree.find(Talent).at(i).props().onClick(LEFT_CLICK);
            } //first talent tree fully selected, 2 points in second tree
            
            //final two in second tree should be disabled
            expect(tree.find(Talent).at(6).props().enabled).toBe(false);
            expect(tree.find(Talent).at(7).props().enabled).toBe(false);
            
            //swap to 3 in each
            tree.find(Talent).at(3).props().onClick(RIGHT_CLICK);
            tree.find(Talent).at(6).props().onClick(LEFT_CLICK);
            
            //final talent in each tree should be disabled
            expect(tree.find(Talent).at(3).props().enabled).toBe(false);
            expect(tree.find(Talent).at(7).props().enabled).toBe(false);
        });
    });
});
