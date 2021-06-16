import "../../css/Buttons.css";
import { AddOutline } from "react-ionicons";

import React from "react";
import { withRouter } from "react-router-dom";

const userId = localStorage.getItem("userId");

const AddButton = (props) => {
  if (userId === props.match.params.id) {
    return (
      <div
        className='edit-button btn'
        onClick={(e) => props.onEditButtonClick(e)}>
        <AddOutline
          color={"#5E5E5E"}
          title={"add"}
          height='20px'
          width='20px'
        />
      </div>
    );
  } else {
    return null;
  }
};

export default withRouter(AddButton);
