import {
    useQuery,
  } from "react-query";

//   - GET https://yourapi.herokuapp.com/api/profile/

//     Retrieves list of profiles

//     - GET https://yourapi.herokuapp.com/api/profile/{userId}

//     Retrieves the profile with userId = {userId}

//     - POST https://yourapi.herokuapp.com/api/profile/

//     Create the user profile with all his details

//     - PUT https://yourapi.herokuapp.com/api/profile/

//     Update current user profile details

//     - POST https://yourapi.herokuapp.com/api/profile/{userId}/picture

//     Replace user profile picture (name = profile)

//     - GET https://yourapi.herokuapp.com/api/profile/{userId}/CV

//     Generates and download a PDF with the CV of the user (details, picture, experiences)

//   - GET https://yourapi.herokuapp.com/api/posts/

//   Retrieve posts

//   - POST https://yourapi.herokuapp.com/api/posts/

//   Creates a new post

//   - GET https://yourapi.herokuapp.com/api/posts/{postId}

//   Retrieves the specified post

//   - PUT https://yourapi.herokuapp.com/api/posts/{postId}

//   Edit a given post

//   - DELETE https://yourapi.herokuapp.com/api/posts/{postId}

//   Removes a post

//   - POST https://yourapi.herokuapp.com/api/posts/{postId}

//   Add an image to the post under the name of "post"

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
          console.log(apiURL)  
          console.log(res)
          return await res.json();
        });
      }
}