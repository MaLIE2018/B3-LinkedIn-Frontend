import {
  useQuery,
} from "react-query";

const apiURL = process.env.REACT_APP_BE_URL

export const api = {
 request: function usePosts(url ,method ="GET", body=null) {
      return useQuery("posts", async () => {
        const res = await fetch(
          `${apiURL}` + url,
          {
              method: method,
              headers:{
                  "Content-Type": "application/json"
              }
          }
        );

        return await res.json();
      });
    }
}