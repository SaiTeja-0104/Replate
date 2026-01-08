const Impact = () => {
  return (
    <section className="bg-[#FFF3E0] py-16 font-pop">
      <div className="max-w-[80%] mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          Our Impact So Far
        </h2>

        <div className="grid sm:grid-cols-3 gap-12">
          <div>
            <p className="text-5xl font-bold text-[#FF7043]">100K+</p>
            <p className="text-gray-600 mt-2">Meals Donated</p>
          </div>

          <div>
            <p className="text-5xl font-bold text-[#FF7043]">150+</p>
            <p className="text-gray-600 mt-2">NGOs Connected</p>
          </div>

          <div>
            <p className="text-5xl font-bold text-[#FF7043]">50+</p>
            <p className="text-gray-600 mt-2">Cities Served</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
