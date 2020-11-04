import {API_KEY, API_URL} from "./constants";

// /**
//  * Fetch all tasks
//  * @param {function} successCallback - Function that saves incoming data 
//  */
export const getTasks = async (successCallback) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    const data = await response.json();


    if (data.error) {
      throw new Error('Błąd!');
    }

    successCallback(data.data);

  } catch (err) {
    console.log(err);
  }
};