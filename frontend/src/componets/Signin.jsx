import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/context";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isEmailMod, setIsEmailMod] = useState(false);

  const { userToken, setUserToken } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
    if (userToken) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    var input = {};
    if (isEmailMod) {
      input = {
        email: formData.email,
        password: formData.password,
      };
    } else {
      input = {
        username: formData.username,
        password: formData.password,
      };
    }
    const res = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      input
    );
    const json = await res.data;
    localStorage.setItem("token", json.token);
    localStorage.setItem("firstname", json.firstname);
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black/60">
      <div className="flex flex-col bg-white p-8 items-center rounded-lg">
        <h1 className="text-4xl font-bold mb-2">Sign </h1>
        <p className="text-lg">Enter your information to Signin acount</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-4 items-center w-full"
        >
          {isEmailMod ? (
            <label className="flex flex-col w-full">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@ex.com"
                className="w-full border-2  p-2 rounded-md"
              />
            </label>
          ) : (
            <label className="flex flex-col w-full">
              Username
              <input
                type="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="example123"
                className="w-full border-2  p-2 rounded-md"
              />
            </label>
          )}

          <br />
          <label className="flex flex-col w-full">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border-2  p-2 rounded-md"
            />
          </label>

          <br />
          <button
            className="bg-black text-white p-2 text-2xl my-2 rounded-md hover:bg-black/80"
            type="submit"
          >
            Signin
          </button>
        </form>
        <p
          className="text-lg underline cursor-pointer"
          onClick={() => {
            setIsEmailMod(!isEmailMod);
            setFormData({ ...formData, email: "", username: "", password: "" });
          }}
        >
          Signin using {isEmailMod ? "Username" : "Email"}
        </p>
        <Link className="mt-2" to="/signup">
          Don{"'"}t have an account? Signup
        </Link>
      </div>
    </div>
  );
};

export default Signin;
