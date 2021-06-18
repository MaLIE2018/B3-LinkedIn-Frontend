import React, { useState, useEffect } from "react";
import Box from "./parts/Box";
import ItemsList from "./parts/ItemsList";

const api = process.env.REACT_APP_BE_URL;

const PeopleAlsoViewed = () => {
  const [profiles, setProfiles] = useState([]);
  const getProfiles = async () => {
    try {
      const requestProfile = await fetch(api + "api/profile/", {
        method: "GET",
        headers: {},
      });
      if (requestProfile.ok) {
        const response = await requestProfile.json();
        setProfiles(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfiles();
  }, []);

  if (profiles.length > 0) {
    return (
      <Box
        title={
          <span className='font-weight-bold' style={{ color: "black" }}>
            People also viewed
          </span>
        }
        footerText={"Show more"}
        render={(open) => (
          <ItemsList
            rounded={true}
            connect={true}
            items={profiles}
            open={open.openCollapse}
          />
        )}
      />
    );
  } else {
    return "Loading";
  }
};

export default PeopleAlsoViewed;
