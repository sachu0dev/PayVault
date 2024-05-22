import axios from "axios"; // Added axios import
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToContext, UserContext } from "../utils/context";

const Transfer = () => {
  const [amount, setAmount] = useState("");
  const { to, setTo } = useContext(ToContext);
  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    if (!to) {
      // Check for undefined or null
      navigate("/dashboard");
    }
  }, [to, navigate]); // Added dependencies to useEffect

  const sendMoney = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        { amount: amount, to: to._id }, // Moved data outside headers
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const json = res.data; // No need for await here
      console.log(json);
    } catch (error) {
      console.error("Error sending money:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-300">
      <div className="flex flex-col bg-white p-8  rounded-lg w-[30vw]">
        <h1 className="text-4xl font-extrabold mb-8 text-center">Send Money</h1>
        <div className="flex gap-4 items-center">
          <div className="w-[60px] h-[60px] bg-green-500 block rounded-full relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white">
              {to ? to.firstname[0].toUpperCase() : "U"}
            </span>
          </div>
          <h1 className="text-4xl font-bold">{to ? to.firstname : "User"}</h1>
        </div>
        <form className="mt-4">
          <label className="font-bold text-lg" htmlFor="to">
            Amount (in Rs):
          </label>
          <input
            className="w-full px-4 py-2 border-2 rounded-md"
            type="number"
            id="to"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md mt-4"
            onClick={(e) => {
              e.preventDefault();
              sendMoney();
            }}
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
