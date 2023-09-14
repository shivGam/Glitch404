import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const InterMediatoryAuth = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      window.location.href = "/";
    }
    dispatch(reset());
  }, [isError, isSuccess, user, dispatch]);

  useEffect(() => {
    async function fetchAccessToken() {
      const response = await axios.post(
        "http://localhost:5000/api/users/getGoogleAuthCode",
        { code }
      );
      return response.data;
    }
    fetchAccessToken()
      .then((res) => {
        dispatch(login(res));
      })
      .catch((e) => {
        toast.error(e.message);
        window.location.href = "/";
      });
  }, []);

  return <div></div>;
};

export default InterMediatoryAuth;
