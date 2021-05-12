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

const ADJACENCIES = {
    stack: ["utensils", "cake", "crown",],
    utensils: ["cake", "crown",],
    cake: ["crown",],
    crown: [],
    mask: ["scuba", "lightning", "skull",],
    scuba: ["lightning", "skull",],
    lightning: ["skull",],
    skull: [],
};

const removeTalent = (oldState, deselectedTalent, subsequentTalents) => {
    let potentiallyEnabledKeys = {};
    if (oldState.availablePoints === 0) {
        //if we're getting points back from 0, we need to re-enable the skills we disabled before
        oldState.zeroPointsLeftDisabledSkills.forEach((talent) => {
            potentiallyEnabledKeys[talent] = ENABLED_TALENT;
        });
    }
    const disabledKeys = subsequentTalents.map((key) => ({
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
        [deselectedTalent]: ENABLED_TALENT,
        zeroPointsLeftDisabledSkills: [],
    };
    let numSelectedTalents = Object.values(newState) //since we don't know how many talents we removed,
        .filter((v) => (v.selected)).length; // we count the number of talents where selected is truthy in newState
    newState.availablePoints = INITIALLY_AVAILABLE_TALENT_POINTS - numSelectedTalents;

    return newState;
};

const addTalent = (oldState, keyToSelect, keyToEnable) => {
    let newState = {
        ...oldState,
        [keyToSelect]: SELECTED_TALENT,
        availablePoints: oldState.availablePoints - 1,
    };
    if (keyToEnable) {
        newState[keyToEnable] = ENABLED_TALENT;
    }
    
    if (newState.availablePoints === 0) {
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
    if (Object.keys(ADJACENCIES).includes(action.type)) {
        if (action.desiredAction === "add" && canBeAdded(state, action.type)) {
            return addTalent(state, action.type, ADJACENCIES[action.type][0]);
        } else if (action.desiredAction === "remove") {
            return removeTalent(state,  action.type, ADJACENCIES[action.type]);
        }
        return state;
    }
    return state;
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
