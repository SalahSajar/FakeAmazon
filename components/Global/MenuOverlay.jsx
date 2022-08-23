import React from "react";

import classes from "../../styles/Components/Global/MenuOverlay.module.scss";

const MenuOverlay = ({ active_overlay }) => {
  return (
    <div
      className={`${classes["menu_overlay__EL"]} ${
        active_overlay && classes["active_overlay"]
      }`}
    ></div>
  );
};

export default MenuOverlay;
