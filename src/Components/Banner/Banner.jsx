import { CiSearch } from "react-icons/ci";
import leftbg from "../../assets/bg-hero-left.png";
import rightbg from "../../assets/bg-hero-right.png";
import BtnPrimary from "../../Components/Buttons/BtnPrimary/BtnPrimary";
import BtnSecondary from "../../Components/Buttons/BtnSecondary/BtnSecondary";

const Banner = () => {
    return (
        <section className="relative bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5] w-full h-[450px] md:h-[500px] lg:h-[550px] ">
      <img
        className="absolute left-0 top-0 hidden md:inline-block"
        src={leftbg}
        alt=""
      />
      <img
        className="absolute right-0 top-0 hidden md:inline-block"
        src={rightbg}
        alt=""
      />

      <div className="text-center flex flex-col justify-center items-center h-full gap-5 md:gap-7 p-4">
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-wide leading-tight">
          Deal your{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Products
          </span>{" "}
          <br />
          in a{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Smart
          </span>{" "}
          way !
        </h1>
        <p className="text-base md:text-xl text-accent-content md:w-2/3">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>

        <div className="join w-80 md:w-md">
          <input
            className="input join-item rounded-l-full w-full focus:outline-none focus:border-[#632ee3]"
            placeholder="search For Products, Categoriees..."
          />

          <button
            className="btn join-item rounded-r-full text-white "
            style={{ background: "var(--gradient-primary)" }}
          >
            <CiSearch size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 ">
          <BtnPrimary className={"py-6"}>Watch All Products</BtnPrimary>
          <BtnSecondary className={"bg-transparent py-6"}>
            Post an Product
          </BtnSecondary>
        </div>
      </div>
    </section>
    );
};

export default Banner;