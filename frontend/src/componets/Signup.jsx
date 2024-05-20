import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // api calls goes here
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black/60">
      <div className="flex flex-col bg-white p-8 items-center rounded-lg">
        <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
        <p className="text-lg">Enter your information to create an account</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-4 items-center w-full"
        >
          <label className="flex flex-col w-full">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@ex.com"
              className="w-full border-2  p-2 rounded-md"
            />
          </label>
          <br />
          <label className="flex flex-col w-full">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="example123"
              className="w-full border-2  p-2 rounded-md"
            />
          </label>
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
          <label className="flex flex-col w-full">
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full border-2  p-2 rounded-md"
            />
          </label>
          <br />
          <label className="flex flex-col w-full">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full border-2  p-2 rounded-md"
            />
          </label>
          <br />
          <button
            className="bg-black text-white p-2 text-2xl my-2 rounded-md hover:bg-black/80"
            type="submit"
          >
            Signup
          </button>
        </form>
        <Link to="/signin">Already have an account? Signin</Link>
      </div>
    </div>
  );
};

export default Signup;