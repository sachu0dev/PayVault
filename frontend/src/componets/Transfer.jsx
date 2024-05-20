const Transfer = ({ to }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-300">
      <div className="flex flex-col bg-white p-8  rounded-lg w-[30vw]">
        <h1 className="text-4xl font-extrabold mb-8 text-center">Send Money</h1>
        <div className="flex gap-4 items-center">
          <div className="w-[60px] h-[60px] bg-green-500 block rounded-full relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-white">
              {"U"}
            </span>
          </div>
          <h1 className="text-4xl font-bold">{"user"}</h1>
        </div>
        <form className="mt-4">
          <label className="font-bold text-lg" htmlFor="to">
            Amount (in Rs):
          </label>
          <input
            className="w-full px-4 py-2 border-2 rounded-md"
            type="text"
            id="to"
            placeholder="Enter amount"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md mt-4"
            type="submit"
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
