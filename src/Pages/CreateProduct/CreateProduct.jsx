import { use } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router";
import Container from "../../Components/Container/Container";
import Swal from "sweetalert2";
import AllProductsContext from "../../Context/AllProductsContext";
import ProductForm from "../../Components/ProductForm/ProductForm";

const CreateProduct = () => {
  const { setAllProducts, allProducts } = use(AllProductsContext);
  const navigate = useNavigate();

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const {
      title,
      category,
      email,
      location,
      name,
      pCondition,
      pImage,
      price_max,
      price_min,
      productInfo,
      sContact,
      sImgURL,
      usageTime,
    } = formJson;

    const newProduct = {
      title: title,
      price_min: price_min,
      price_max: price_max,
      email: email,
      category: category,
      image: pImage,
      location: location,
      seller_image: sImgURL,
      seller_name: name,
      condition: pCondition,
      usage: usageTime,
      description: productInfo,
      seller_contact: sContact,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          newProduct._id = data.insertedId;

          setAllProducts([...allProducts, newProduct]);

          form.reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Product added Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="text-center mb-5">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer inline-flex items-center gap-2 hover:text-accent-content transition-colors duration-100"
          >
            <FiArrowLeft size={20} />
            Back To Products
          </button>
          <h1 className="text-3xl xl:text-5xl font-bold">
            Create{" "}
            <span
              style={{ backgroundImage: "var(--gradient-primary)" }}
              className="bg-clip-text text-transparent"
            >
              a Product
            </span>
          </h1>
        </div>
        {/* product form  */}
        <ProductForm submitHandler={handleCreateProduct} />
      </div>
    </Container>
  );
};

export default CreateProduct;
