import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-orange-100 py-16 text-center text-black font-pop px-2">
      <h2 className="text-4xl font-bold">
        Be Part of the Change
      </h2>
      <p className="text-lg mt-4">
        Start donating or requesting food today.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link to="/register">
          <button className="bg-white text-[#FF7043] px-6 py-3 cursor-pointer rounded-lg font-semibold hover:bg-orange-400 hover:text-white transition">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
