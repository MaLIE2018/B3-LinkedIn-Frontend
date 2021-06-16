import "../../css/Buttons.css";
import React from "react";
import { withRouter } from "react-router-dom";

const userId = localStorage.getItem("userId");

const EditButton = (props) => {
  if (userId === props.match.params.id) {
    return (
      <div className='edit-button btn pb-3' onClick={props.onClick}>
        <div
          className={props.classname}
          style={{
            fontWeight: "500",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}>
          <svg
            onClick={props.editProfileOn}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            data-supported-dps='24x24'
            fill='currentColor'
            className='mercado-match'
            width='24'
            height='24'
            focusable='false'>
            <path d='M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z'></path>
          </svg>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default withRouter(EditButton);
