import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import GLogin from "../assets/Google.svg";
import axios from "axios";
import { emailValidationError } from "../utils/emailValidationError";
import { API_URL } from "../utils/constants";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errMessage: "",
  });

  const { email, password, errMessage } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, dispatch, navigate]);

  const handleGetUrl = async () => {
    const response = await axios.get(API_URL + "/api/users/getGoogleOAUthUrl");
    window.location.assign(response.data);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    if (errMessage === "") dispatch(login(userData));
  };

  if (isLoading) {
    return <div>isLoading</div>;
  }
  return (
    <>
      <section className="heading">
        <h1>Login</h1>
      </section>

      <section className="Glogin" onClick={handleGetUrl}>
        <img src={GLogin} alt="" />
        <div>Google</div>
      </section>

      <div style={{ margin: "0 auto 2rem" }}>OR</div>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {errMessage.length > 0 && (
              <div className="text-red-500 text-xs my-0 text-start">
                *{errMessage}
              </div>
            )}
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange}
              onBlur={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  errMessage: emailValidationError(email),
                }))
              }
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>
          <div className="from-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <Link to="/updatePassword">
          <div className="forgot-password">Forgot password ?</div>
        </Link>
      </section>
    </>
  );
}

export default Login;
