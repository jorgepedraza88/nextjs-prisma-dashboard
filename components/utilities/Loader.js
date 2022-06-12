import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed z-10 grid h-screen w-screen place-items-center bg-gray-100 opacity-95">
      <div className="flex flex-col items-center justify-center py-16 px-24">
        <p className="font-semibold">Loading...</p>
        <ThreeDots color="#0284c7" width={75} />
      </div>
    </div>
  );
};

export default Loader;
