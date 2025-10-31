const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-md">
      <div className="skeleton h-60 w-full"></div>
      <div className="skeleton h-4 w-44"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-12 w-full"></div>
    </div>
  );
};

export default ProductCardSkeleton;
