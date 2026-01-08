import donor from "../assets/donor.png";
import ngo from "../assets/ngo.png";
import volunteer from "../assets/voluntary.png";

const Matters = () => {
  return (
    <section className="py-20 bg-[#fffaee] font-pop">
      <h2 className="text-4xl font-bold text-center mb-14">
        Why Replate Matters
      </h2>

      <div className="flex flex-col md:flex-row gap-10 justify-center max-w-[85%] mx-auto">
        {[
          { img: donor, title: "Donors", desc: "Reduce food waste responsibly" },
          { img: ngo, title: "NGOs", desc: "Feed more people efficiently" },
          { img: volunteer, title: "Volunteers", desc: "Build a sustainable community" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition"
          >
            <img src={card.img} className="w-[160px] mx-auto mb-4" />
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-gray-600 mt-2">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Matters;
