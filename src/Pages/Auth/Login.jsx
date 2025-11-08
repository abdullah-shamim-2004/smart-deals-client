import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
// import AuthContext from "../../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
// import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../../Context/AuthContext";

const Login = () => {
  const { UserSignIn, googleSignIn } = use(AuthContext);
  const [ShowPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");

  //component for handle login
  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    UserSignIn(email, password)
      .then(() => {
        // Signed in
        toast("Login Succesfully");
        Navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        switch (errorCode) {
          case "auth/invalid-email":
            toast.error("Invalid email address!");
            break;
          case "auth/user-disabled":
            toast.error("This account has been disabled!");
            break;
          case "auth/user-not-found":
            toast.error("No account found with this email!");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password!");
            break;
          case "auth/too-many-requests":
            toast.error("Too many login attempts. Try again later!");
            break;
          case "auth/network-request-failed":
            toast.error("Network error. Check your connection!");
            break;
          default:
            toast.error("Login failed. Please try again!");
        }
      });
  };
  const handleSignInWithGoogle = () => {
    googleSignIn()
      .then(() => {
        // Signed in
        toast("Login successfully with Gmail");
        Navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        switch (errorCode) {
          case "auth/popup-closed-by-user":
            toast.error("Login cancelled. You closed the popup!");
            break;
          case "auth/cancelled-popup-request":
            toast.error("Another login popup is already open!");
            break;
          case "auth/popup-blocked":
            toast.error("Popup blocked by your browser!");
            break;
          case "auth/network-request-failed":
            toast.error("Network error. Check your connection!");
            break;
          case "auth/account-exists-with-different-credential":
            toast.error(
              "This Google account is already linked with another login method!"
            );
            break;
          default:
            toast.error("Google login failed. Please try again!");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* <Toaster /> */}
      <ToastContainer />
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center py-4">
            Login your account
          </h2>
          <form onSubmit={handleLogIn} className="fieldset relative">
            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Email"
              required
            />
            {/* Password */}
            <label className="label">Password</label>
            <input
              name="password"
              type={ShowPassword ? "text" : "password"}
              className="input"
              placeholder="Password"
              required
            />
            <div
              className="absolute right-7 top-[32%] translate-y-[-25%] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!ShowPassword)}
            >
              {ShowPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            <div>
              <Link
                to="/auth/forgot-password"
                state={{ email }}
                className="link link-hover cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="btn btn-neutral mt-4 ">
              Login
            </button>
            {/* Divider */}
            <div className="divider">OR</div>

            {/* Google */}
            <button
              onClick={handleSignInWithGoogle}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
            <p className="text-md font-semibold text-center my-1.5">
              Dont’t Have An Account ?{" "}
              <Link
                state={location?.state}
                className="text-secondary"
                to="/auth/register"
              >
                Register
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;