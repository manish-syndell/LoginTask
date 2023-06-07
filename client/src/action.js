import axios from "axios";


// register user
export const registerUser = (email, password,name) =>{

}


//login action
export const loginHandler = (email, password) => async (dispatch) => {
  try {
    console.log("login function called");
    dispatch({ type: "LOGIN_REQUEST" });

    const data = await axios.post(
      "http://localhost:5000/api/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data);

    dispatch({ type: "LOGIN_SUCCESS", payload: data.data.message });
  } catch (error) {
    console.log("Hello I am error : ", error);
  }
};

// verify user

export const verifyUser = (code) => async (dispatch) => {
  try {
    dispatch({ type: "VERIFY_REQUEST" });
    const data = await axios.post(
      "http://localhost:5000/api/verify",
      { code },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "VERIFY_SUCCESS", payload: data.data.user });
  } catch (error) {}
};

export const verifyLink = (token) => async (dispatch) => {
  try {
    dispatch({ type: "VERIFY_REQUEST" });
    const data = await axios.get(
      `http://localhost:5000/api/verifyLink?token=${token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "VERIFY_SUCCESS", payload: data.data.user });
  } catch (error) {
    dispatch({type:'VERIFY_FAIL', payload: error.response.data.message})
  }
};

// logout handler

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`http://localhost:5000/api/logout`, {
      withCredentials: true,
    });

    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });

    const { data } = await axios.get("http://localhost:5000/api/me", {
      withCredentials: true,
    });

    dispatch({ type: "LOAD_USER_SUCCESS", payload: data });
    
  } catch (error) {
    dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.message });
  }
};
