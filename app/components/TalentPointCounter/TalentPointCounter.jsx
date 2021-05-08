import React from "react";
import * as PropTypes from "prop-types";
import styles from "./TalentPointCounter.module.scss";
import { INITIALLY_AVAILABLE_TALENT_POINTS, } from "../TalentCalculator/talentStateUtil";

export const TalentPointCounter = ({ talentPoints, }) => {
    return <div className={styles.talentCounterContainer}>
        <div className={styles.talentCounter}>
            <div className={styles.pointCounter}>{talentPoints}&nbsp;/&nbsp;{INITIALLY_AVAILABLE_TALENT_POINTS} </div>
            <div className={styles.pointText}>Points Spent</div>
        </div>
    </div>;
};

TalentPointCounter.propTypes = {
    talentPoints: PropTypes.number.isRequired,
};
