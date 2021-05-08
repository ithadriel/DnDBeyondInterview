import React from "react";
import * as PropTypes from "prop-types";
import styles from "./Talent.module.scss";
import classNames from "classnames";

export const Talent = ({ type, enabled, onClick, selected, className, }) => {
    return <button
        className={classNames(styles.talent, styles[type], className, {
            [styles.selected]: selected,
        })}
        disabled={!enabled}
        onClick={onClick}
        onContextMenu={onClick}
    />;
};

Talent.propTypes = {
    type: PropTypes.oneOf(["stack", "utensils", "cake", "crown", "mask", "scuba", "lightning", "skull",]).isRequired,
    enabled: PropTypes.bool,
    selected: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};
