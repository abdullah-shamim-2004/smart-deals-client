import React, { use, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext);
  const [error, setError] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const Navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const displayName = form.name.value;
    const photoURL = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase, one lowercase, one number, and be at least 6 characters long."
      );
      return;
    }

    //If valid password, clear error
    setError("");

    // With createUser, user will register
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        toast("Register Successfully with email and password");
        updateUser({
          displayName,
          photoURL,
        })
          .then(() => {
            setUser({ ...user, displayName, photoURL });
            Navigate("/");
          })
          .catch((error) => {
            console.log(error);
            switch (error.code) {
              case "auth/requires-recent-login":
                toast.error("Please login again to update your profile.");
                break;
              case "auth/network-request-failed":
                toast.error("Network error. Please try again!");
                break;
              default:
                toast.error("Failed to update profile!");
            }
            setUser(user);
          });
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "auth/email-already-in-use":
            toast.error("Email already in use!");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email address!");
            break;
          case "auth/weak-password":
            toast.error("Password is too weak!");
            break;
          case "auth/network-request-failed":
            toast.error("Network error. Please try again!");
            break;
          default:
            toast.error("Registration failed!");
        }
      });
  };
  const handleSignInWithGoogle = () => {
    googleSignIn()
      .then((result) => {
        // Signed in
        toast("Login successfully with Gmail");
        //create user in database
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        fetch("http://localhost:3000/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User data", data);
          });
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
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <ToastContainer></ToastContainer>
        <div className="card-body ">
          <h2 className="text-2xl font-semibold text-center py-4">
            Register your account
          </h2>
          <form onSubmit={handleRegister} className="fieldset relative">
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Enter Your Name"
            />
            {/* photo url */}
            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="name"
              className="input"
              placeholder="photo url"
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Enter Your Email"
            />

            {/* Password */}
            <label className="label">Password</label>
            <input
              name="password"
              type={ShowPassword ? "text" : "password"}
              className="input"
              placeholder="Password"
            />
            <div
              className="absolute right-7 top-[60%] translate-y-[-25%] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!ShowPassword)}
            >
              {ShowPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            <p className="text-xs text-red-500">{error}</p>
            <div className="flex items-center gap-1.5 my-1.5">
              <input type="checkbox" className="checkbox" />
              <p className="text-md">
                Accept <span className="font-semibold">terms & conditions</span>
              </p>
            </div>

            <button className="btn btn-neutral mt-4">Register</button>
            {/* Divider */}
            <div className="divider">OR</div>
            <button
              type="button"
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
              Already Have An Account ?{" "}
              <Link className="text-secondary" to="/auth/login">
                Login
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
