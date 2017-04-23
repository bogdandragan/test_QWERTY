import axios from "axios";

export function fetchUsers() {
  return function(dispatch) {
    dispatch({type: "FETCH_USERS_BEGIN"})
    axios.post("http://localhost:3000/getUsers")
      .then((response) => {
        dispatch({type: "FETCH_USERS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
          console.log(err);
        dispatch({type: "FETCH_USERS_REJECTED", payload: err.status + ":" + err.statusText})
      })
  }
}

export function importVKUsers() {
  return function(dispatch) {
    dispatch({type: "IMPORT_VK_USERS_BEGIN"})
    axios.post("http://localhost:3000/importVKUsers")
        .then((response) => {
          dispatch({type: "IMPORT_VK_USERS_FULFILLED", payload: response.data})
        })
        .catch((err) => {
          console.log(err);
          dispatch({type: "IMPORT_VK_USERS_REJECTED", payload: err.status + ":" + err.statusText})
        })
  }
}

export function sortUsers(columnType) {
  console.log(columnType);
  return {
    type: 'SORT_USERS',
    payload: {
      columnType
    }
  }
}

export function addTweet(id, text) {
  return {
    type: 'ADD_TWEET',
    payload: {
      id,
      text,
    },
  }
}

export function updateTweet(id, text) {
  return {
    type: 'UPDATE_TWEET',
    payload: {
      id,
      text,
    },
  }
}

export function deleteTweet(id) {
  return { type: 'DELETE_TWEET', payload: id}
}
