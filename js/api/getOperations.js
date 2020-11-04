import {API_KEY, API_URL} from "./constants";

// /**
//  * Fetch all operations
//  * @param {string} id - ID of task
//  * @param {function} successCallback - Function that saves incoming data
//  */
export const getOperations = async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
        headers: {
          Authorization: API_KEY,
        },
      });
  
      const data = await response.json();

  
      if (data.error) {
        throw new Error('Błąd!');
      }
  
      return data.data;
    } catch (err) {
      console.log(err);
    }
  };

