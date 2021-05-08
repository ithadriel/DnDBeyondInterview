export const INITIALLY_AVAILABLE_TALENT_POINTS = 6;

const ENABLED_TALENT = {
    enabled: true,
    selected: false,
};

const DISABLED_TALENT = {
    enabled: false,
    selected: false,
};

const SELECTED_TALENT = {
    enabled: true,
    selected: true,
};

const updateTalentState = (oldState, keyToSelect, keyToEnable, keysToDisable) => {
    let potentiallyEnabledKeys = {};
    if(oldState.availablePoints === 0 && !keyToSelect){ 
        //if we're getting points back from 0, we need to re-enable the skills we disabled before
        oldState.zeroPointsLeftDisabledSkills.forEach((talent) => {
            potentiallyEnabledKeys[talent] = ENABLED_TALENT;
        });
    }
    const disabledKeys = keysToDisable.map((key) => ({
        [key]: DISABLED_TALENT,
    })).reduce((acc, val) => ({
        ...acc,
        ...val,
    }), {}); // for each key, map it to an object with key->disabled, then collect to single object
    //this should override any talents enabled illegally via potentiallyEnabledKeys
    let newState = {
        ...oldState,
        ...potentiallyEnabledKeys,
        ...disabledKeys,
        zeroPointsLeftDisabledSkills: [],
    };
    if(keyToEnable){
        newState[keyToEnable] = ENABLED_TALENT;
    }
    if (keyToSelect) {
        newState[keyToSelect] = SELECTED_TALENT;
    }
    let numSelectedTalents = Object.values(newState)
        .map((v) => (v.selected))
        .filter((v) => v).length; // count the number of talents where selected is truthy
    newState.availablePoints = INITIALLY_AVAILABLE_TALENT_POINTS - numSelectedTalents;
    
    if(newState.availablePoints === 0){
        //disable remaining talents
        Object.keys(newState).filter((key) => {
            return newState[key].enabled && !newState[key].selected;
        }).forEach((key) => {
            newState.zeroPointsLeftDisabledSkills.push(key);
            newState[key] = DISABLED_TALENT;
        });
    }
    return newState;
};

const canBeAdded = (state, key) => {
    return !state[key].selected && state[key].enabled && state.availablePoints > 0;
};

export const talentReducer = (state, action) => {
    switch (action.type) {
    case "stack":
        if (action.desiredAction === "add" && canBeAdded(state, "stack")) {
            return updateTalentState(state, action.type, "utensils", []);
        } else if (action.desiredAction === "remove") {
            return updateTalentState(state, undefined, action.type, ["utensils", "cake", "crown",]);
        }
        return state;
    case "utensils":
        if (action.desiredAction === "add" && canBeAdded(state, "utensils")) {
            return updateTalentState(state, action.type, "cake", []);
        } else if (action.desiredAction === "remove") {
            return updateTalentState(state, undefined, action.type, ["cake", "crown",]);
        }
        return state;
    case "cake":
        if (action.desiredAction === "add" && canBeAdded(state, "cake")) {
            return updateTalentState(state, action.type, "crown", []);
        } else if (action.desiredAction === "remove") {
            return updateTalentState(state, undefined, action.type, ["crown",]);
        }
        return state;
    case "crown":
        if (action.desiredAction === "add" && canBeAdded(state, "crown")) {
            return updateTalentState(state, action.type, undefined, []);
        } else if (action.desiredAction === "remove") {
            return updateTalentState(state, undefined, action.type, []);
        }
        return state;
    case "mask":
        if (action.desiredAction === "add" && canBeAdded(state, "mask")) {
            return updateTalentState(state, action.type, "scuba", []);
        } else if (action.desiredAction === "remove") {
            return updateTalentState(state, undefined, action.type, ["scuba", "lightning", "skull",]);
        }
        return state;
    case "scuba":
        if (action.desiredAction === "add" && canBeAdded(state, "scuba")) {
            return updateTalentState(state, action.type, "lightning", []);
        } else if (action.desiredAction === "remove") {
            return updateTalentState(state, undefined, action.type, ["lightning", "skull",]);
        }
        return state;
    case "lightning":
        if (action.desiredAction === "add" && canBeAdded(state, "lightning")) {
            return updateTalentState(state, action.type, "skull", []);
        } else if (action.desiredAction === "remove") {
            return updateTalentState(state, undefined, action.type, ["skull",]);
        }
        return state;
    case "skull":
        if (action.desiredAction === "add" && canBeAdded(state, "skull")) {
            return updateTalentState(state, action.type, undefined, []);
        } else if (action.desiredAction === "remove") {
            return updateTalentState(state, undefined, action.type, []);
        }
        return state;
    default:
        //no-op
        return state;
    }
};

export const initialTalentState = {
    stack: ENABLED_TALENT,
    utensils: DISABLED_TALENT,
    cake: DISABLED_TALENT,
    crown: DISABLED_TALENT,
    mask: ENABLED_TALENT,
    scuba: DISABLED_TALENT,
    lightning: DISABLED_TALENT,
    skull: DISABLED_TALENT,
    availablePoints: INITIALLY_AVAILABLE_TALENT_POINTS,
    zeroPointsLeftDisabledSkills: [],
};