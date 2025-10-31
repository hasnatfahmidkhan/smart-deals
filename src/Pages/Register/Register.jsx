import { Link } from "react-router";
import BtnPrimary from "../../Components/Buttons/BtnPrimary/BtnPrimary";
import { IoMdEyeOff } from "react-icons/io";
import MyInput from "../../Components/MyInput/MyInput";
import MyLabel from "../../Components/MyLabel/MyLabel";
import { useState } from "react";
import { IoEye } from "react-icons/io5";

const Register = () => {
  const [showPass, setShowPass] = useState(false);

  const handleEmailPasswordRegister = (e) => {
    console.log(e);
  };
  return (
    <div className="hero h-[calc(100vh-160px)]">
      <div className="card-body bg-white max-w-md w-full space-y-5 p-8 rounded-xl shadow-xl">
        <div className="text-center space-y-3">
          <h1 className="text-3xl text-center font-bold tracking-wide ">
            Register
          </h1>
          <p>
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="bg-clip-text text-transparent font-medium hover:underline bg-linear-to-br from-[#632ee3] to-[#9f62f2]"
            >
              Login Now
            </Link>
          </p>
        </div>
        <form>
          <fieldset className="fieldset flex flex-col gap-3 ">
            {/* Display Name  */}
            <div className="space-y-1.5">
              <MyLabel>User Name</MyLabel>{" "}
              <MyInput type={"email"} placeholder={"Enter your user name"} />
            </div>

            {/* Photo URL  */}
            <div className="space-y-1.5">
              <MyLabel>Photo URL</MyLabel>{" "}
              <MyInput type={"email"} placeholder={"Enter your photo url"} />
            </div>

            {/* Email  */}
            <div className="space-y-1.5">
              <MyLabel>Email</MyLabel>{" "}
              <MyInput type={"email"} placeholder={"Enter your email"} />
            </div>

            {/* Password  */}
            <div className="space-y-1.5">
              <div className="space-y-1.5">
                <MyLabel>Password</MyLabel>
                <div className="relative flex items-center">
                  <MyInput
                    type={showPass ? "text" : "password"}
                    placeholder="**********"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className={`z-50 absolute right-4 active:translate-y-0.5 duration-300 cursor-pointer`}
                  >
                    {showPass ? <IoEye size={24} /> : <IoMdEyeOff size={24} />}
                  </span>
                </div>
              </div>
            </div>
            <BtnPrimary
              onClick={handleEmailPasswordRegister}
              className={"py-5.5"}
            >
              Sign Up
            </BtnPrimary>
            <div className="divider text-base font-semibold">OR</div>
            {/* Google */}
            <button className="btn bg-white text-black border-[#e5e5e5]">
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
              Sign Up With Google
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
