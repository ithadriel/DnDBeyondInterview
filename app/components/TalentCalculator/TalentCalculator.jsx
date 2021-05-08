import React, { useReducer, } from "react";
import { TalentPointCounter, } from "../TalentPointCounter/TalentPointCounter";
import { Talent, } from "../Talent/Talent";
import styles from "./TalentCalculator.module.scss";
import { INITIALLY_AVAILABLE_TALENT_POINTS, initialTalentState, talentReducer, } from "./talentStateUtil";
import classNames from "classnames";

export const TalentCalculator = () => {
    const [talentState, talentDispatch,] = useReducer(talentReducer, initialTalentState);

    const onTalentClick = (type) => {
        return (e) => {
            e.preventDefault();
            if (e.button === 0 || e.button === 2) { //left click or right click
                talentDispatch({
                    type,
                    desiredAction: e.button === 0 ? "add" : "remove",
                });
            }
        };
    };

    return (
        <div className={styles.calculatorContainer}>
            <div className={styles.flex}>
                <div data-test={"talent-path-1"} className={styles.talentContainer}>
                    <div className={styles.pathLabel}>
                    TALENT PATH 1
                    </div>
                    <Talent type={"stack"}
                        enabled={talentState.stack.enabled}
                        onClick={onTalentClick("stack")}
                        selected={talentState.stack.selected}
                        className={classNames({ [styles.selected]: talentState.stack.selected, })}
                    />
                    <div className={styles.divider}/>
                    <Talent type={"utensils"}
                        enabled={talentState.utensils.enabled}
                        onClick={onTalentClick("utensils")}
                        selected={talentState.utensils.selected}
                        className={classNames({ [styles.selected]: talentState.utensils.selected, })}
                    />
                    <div className={styles.divider}/>
                    <Talent type={"cake"}
                        enabled={talentState.cake.enabled}
                        onClick={onTalentClick("cake")}
                        selected={talentState.cake.selected}
                        className={classNames({ [styles.selected]: talentState.cake.selected, })}
                    />
                    <div className={styles.divider}/>
                    <Talent type={"crown"}
                        enabled={talentState.crown.enabled}
                        onClick={onTalentClick("crown")}
                        selected={talentState.crown.selected}
                        className={classNames({ [styles.selected]: talentState.crown.selected, })}
                    />
                </div>
                <div data-test={"talent-path-2"} className={styles.talentContainer}>
                    <div className={styles.pathLabel}>
                    TALENT PATH 2
                    </div>
                    <Talent type={"mask"}
                        enabled={talentState.mask.enabled}
                        onClick={onTalentClick("mask")}
                        selected={talentState.mask.selected}
                        className={classNames({ [styles.selected]: talentState.mask.selected, })}
                    />
                    <div className={styles.divider}/>
                    <Talent type={"scuba"}
                        enabled={talentState.scuba.enabled}
                        onClick={onTalentClick("scuba")}
                        selected={talentState.scuba.selected}
                        className={classNames({ [styles.selected]: talentState.scuba.selected, })}
                    />
                    <div className={styles.divider}/>
                    <Talent type={"lightning"}
                        enabled={talentState.lightning.enabled}
                        onClick={onTalentClick("lightning")}
                        selected={talentState.lightning.selected}
                        className={classNames({ [styles.selected]: talentState.lightning.selected, })}
                    />
                    <div className={styles.divider}/>
                    <Talent type={"skull"}
                        enabled={talentState.skull.enabled}
                        onClick={onTalentClick("skull")}
                        selected={talentState.skull.selected}
                        className={classNames({ [styles.selected]: talentState.skull.selected, })}
                    />
                </div>
            </div>
            <TalentPointCounter talentPoints={INITIALLY_AVAILABLE_TALENT_POINTS - talentState.availablePoints}/>
        </div>
    );
};

TalentCalculator.propTypes = {};
