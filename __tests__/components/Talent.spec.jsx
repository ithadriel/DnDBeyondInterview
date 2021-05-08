import React from "react";
import { shallow, } from "enzyme";

import { Talent, } from "../../app/components/Talent/Talent";

jest.unmock("../../app/components/Talent/Talent");

describe("Talent", () => {
    let tree;
    const onClick = jest.fn();

    beforeEach(() => {
        tree = shallow(<Talent type={"stack"} onClick={onClick} enabled selected/>);
    });
    
    it("should inherit type from props and use it to inform className", () => {
        expect(tree.find(".stack").exists()).toBe(true);
    });

    it("should enable and disable the button based on props", () => {
        expect(tree.find(".stack").props().disabled).toBeFalsy();
        
        tree = shallow(<Talent type={"stack"} onClick={onClick}/>);
        expect(tree.find(".stack").props().disabled).toBeTruthy();
    });

    it("should inherit onClick from props and use it for onContextMenu", () => {
        tree.find(".stack").props().onClick();
        tree.find(".stack").props().onContextMenu();
        
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("should add the selected class if selected prop is truthy", () => {
        expect(tree.find(".selected").exists()).toBe(true);

        tree = shallow(<Talent type={"stack"} onClick={onClick} enabled/>);
        
        expect(tree.find(".selected").exists()).toBe(false);
    });
});