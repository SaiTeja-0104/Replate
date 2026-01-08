import TabsDemo from "../components/TabsDemo";
import replate from "../assets/replate.png";

const Register = () => {
  return (
    <div className="min-h-screen font-pop flex flex-col lg:flex-row bg-orange-100 lg:bg-orange-300">

      {/* LEFT BRAND SECTION */}
      <div className="hidden lg:flex lg:w-1/2  text-white items-center justify-center">
        <div className="text-center">
          <img
            src={replate}
            alt="Replate"
            className="w-62 mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-5xl font-extrabold tracking-wide">
            Replate
          </h1>
          <p className="mt-4 text-lg text-white max-w-sm">
            Reduce food waste. Feed communities. Make an impact.
          </p>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex-1 flex lg:bg-gray-100 items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-md  rounded-2xl p-6 sm:p-8">

          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-6">
            <img src={replate} className="w-28 mb-2" alt="Replate" />
            <h2 className="text-2xl font-bold text-gray-800">
              Replate
            </h2>
          </div>

          {/* Tabs (Login / Register) */}
          <TabsDemo />
        </div>
      </div>
    </div>
  );
};

export default Register;
