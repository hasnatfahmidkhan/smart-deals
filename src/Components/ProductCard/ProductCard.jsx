import BtnSecondary from "../../Components/Buttons/BtnSecondary/BtnSecondary";
import productImg from "../../assets/thumbnail-card.png";
const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-sm p-4 space-y-4">
      <figure>
        <img src={productImg} alt="Shoes" className="rounded-md" />
      </figure>
      <div className="card-body p-0">
        <h2 className="card-title">{product.title}</h2>
        <p
          className="bg-clip-text text-transparent text-xl font-semibold"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          $ {product.price_min}- {product.price_max}
        </p>
        <div className="card-actions mt-2">
          <BtnSecondary className={"w-full"}>View Details</BtnSecondary>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
