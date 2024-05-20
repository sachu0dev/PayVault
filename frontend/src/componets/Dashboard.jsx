import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Prevent rendering dashboard content if not authenticated
  }

  return (
    <>
      <div className=" h-[8vh] flex justify-between items-center p-4 border-b-2">
        <h1 className="text-4xl font-bold">PayVault</h1>
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl">Hello, {"user"}</h2>
          <div className="w-[60px] h-[60px] bg-slate-400 block rounded-full relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white">
              {"U"}
            </span>
          </div>
        </div>
      </div>
      <div className="m-2 p-4 ">
        <h2 className="text-3xl font-bold mb-6">Your Balance {"₹"}</h2>
        <h2 className="text-2xl font-bold mb-6 ">Users</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted:", search);
          }}
        >
          <input
            className="w-full px-4 py-2 border-2 rounded-md"
            type="text"
            placeholder="Search users..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="m-6">
          <div className="mt-12 flex justify-between items-center">
            <div className="flex gap-4  items-center">
              <div className="flex gap-4 items-center">
                <div className="w-[60px] h-[60px] bg-slate-400 block rounded-full relative">
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white">
                    {"U"}
                  </span>
                </div>
              </div>
              <h2 className="text-3xl font-bold">{"user"}</h2>
            </div>
            <button className="bg-black text-white text-xl font-bold px-4 py-3 rounded-md">
              Send Money
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
