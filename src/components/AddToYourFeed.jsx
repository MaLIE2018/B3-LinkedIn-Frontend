import React, { useState, useEffect } from "react";
import Box from "./parts/Box";
import ItemsList from "./parts/ItemsList";

const api = process.env.REACT_APP_BE_URL;

const AddToYourFeed = () => {
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
            Add to your feed
          </span>
        }
        footerText={"View all recommendations"}
        render={(open) => (
          <ItemsList
            rounded={true}
            follow={true}
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

export default AddToYourFeed;
