import React, { useContext } from "react";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/login.png";
import { authProvider } from "../../Context/AuthContext";

const Login = () => {
  const { googleSignIn, emailPassSignIn } = useContext(authProvider);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(redirect, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    emailPassSignIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        const userEmail = {
          email: loggedUser.email,
        };

        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userEmail),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("res data:", data);

            // store token in localStorage
            localStorage.setItem("car-access-token", data.token);
            navigate(redirect, { replace: true });
          });
      })
      .catch((error) => console.log(error.message));
      
  };

  return (
    <div className="hero my-[120px]">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center w-1/2 lg:text-left">
          <img src={login} alt="" />
        </div>
        <div className="card flex-shrink-0 w-1/2 max-w-sm shadow bg-base-100">
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="button-fill">
                Sign In
              </button>
            </div>
          </form>
          <div className="text-center space-y-3 mb-5">
            <p className="">Or Sign in with</p>
            <div className="space-x-6">
              <button
                onClick={handleGoogleSignIn}
                className="text-xl hover:text-[#FF3811]"
                title="sign in with google"
              >
                <FaGoogle></FaGoogle>{" "}
              </button>
              <button
                className="text-xl hover:text-[#FF3811]"
                title="sign in with facebook"
              >
                <FaFacebook />{" "}
              </button>
              <button
                className="text-xl hover:text-[#FF3811]"
                title="sign in with twitter"
              >
                <FaTwitter />
              </button>
            </div>
            <Link to="/signup" className="">
              Don't have an account?{" "}
              <span className="text-[#FF3811] font-semibold">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
