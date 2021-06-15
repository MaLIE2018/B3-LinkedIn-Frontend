import React from 'react';
import{ api} from "../../helper/requests.js"

const fetch = api.request

const Test = () => {
    const userId = localStorage.getItem("userId")
   
    const { status, data, error, isFetching } = fetch(`/profile/${userId}`);
    return (
        <div>
          <h1>Profile</h1>
          <div>
            {status === "loading" ? (
              "Loading..."
            ) : status === "error" ? (
              <span>Error: {error.message}</span>
            ) : (
              <>
                <div>
                  {console.log(data)}
                </div>
                <div>{isFetching ? "Background Updating..." : " "}</div>
              </>
            )}
          </div>
        </div>
      );
}

export default Test;
