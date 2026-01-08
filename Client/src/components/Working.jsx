import w1 from "../assets/work1.png";
import w2 from "../assets/work2.png";
import w3 from "../assets/work3.png";

const Working = () => {
  return (
    <section id="aboutPage" className="py-20 font-pop text-center bg-white px-4">
      <h2 className="text-4xl font-bold mb-14">
        How Replate Works
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-16 max-w-[85%] mx-auto">
        {[ 
          { img: w1, text: "Donors list surplus food" },
          { img: w2, text: "NGOs receive instant alerts" },
          { img: w3, text: "Food reaches people in need" },
        ].map((step, i) => (
          <div key={i} className="max-w-[280px] mx-auto">
            <img src={step.img} className="rounded-xl shadow-lg mb-4" />
            <p className="text-lg font-medium">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Working;
