import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToContext, UserContext } from "../utils/context";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [balance, setBalance] = useState("....");
  const [users, setUsers] = useState([]);
  const { to, setTo } = useContext(ToContext);

  useEffect(() => {
    if (!userToken) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await axios.get(
        "https://pay-vault.vercel.app/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const json = await res.data;
      setBalance(json.balance);
    };

    fetchBalance();
  }, [userToken]);
  const getUsers = async () => {
    const res = await axios.get(
      "https://pay-vault.vercel.app/api/v1/user/users?filter=" +
        search.toLowerCase(),
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const json = await res.data;
    console.log(json);
    setUsers(json.users);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handelSend = (user) => {
    setTo(user);
    navigate("/transfer");
  };

  return (
    <>
      <div className=" h-[8vh] flex justify-between items-center p-4 border-b-2">
        <h1 className="text-4xl font-bold">PayVault</h1>
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl">
            Hello, {userToken ? localStorage.getItem("firstname") : "User"}
          </h2>
          <div className="w-[60px] h-[60px] bg-slate-400 block rounded-full relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white">
              {userToken
                ? localStorage.getItem("firstname")[0].toUpperCase()
                : "U"}
            </span>
          </div>
        </div>
      </div>
      <div className="m-2 p-4 ">
        <h2 className="text-3xl font-bold mb-6">
          Your Balance {"₹"} {balance}
        </h2>
        <h2 className="text-2xl font-bold mb-6 ">Users</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getUsers();
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
          {users.map((user) => {
            if (user) {
              return (
                <div
                  className="mt-12 flex justify-between items-center"
                  key={user._id}
                >
                  <div className="flex gap-4  items-center">
                    <div className="flex gap-4 items-center">
                      <div className="w-[60px] h-[60px] bg-slate-400 block rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white">
                          {user.firstname[0].toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold">{user.firstname}</h2>
                  </div>
                  <button
                    onClick={() => handelSend(user)}
                    className="bg-black text-white text-xl font-bold px-4 py-3 rounded-md"
                  >
                    Send Money
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
