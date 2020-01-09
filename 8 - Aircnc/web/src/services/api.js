import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    user_id: localStorage.getItem("Aircnc@user_id") || null
  }
});
