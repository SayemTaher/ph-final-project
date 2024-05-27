

const OrderCard = ({data}) => {
    const { name, recipe, image, price } = data;
    return (
      <div className="mt-10">
        <div className="card border-2 border-gray-100 w-96 bg-base-100 flex flex-col justify-between h-[500px] shadow-md">
          <figure >
            <img
              src={image}
              alt="Shoes"
              
            />
                </figure>
                <p className="absolute right-0 mr-4 mt-4 px-4 bg-black text-white">$ { price}</p>
          <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{ recipe}</p>
            <div className="card-actions">
              <button className="btn btn-primary">Add to order</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default OrderCard;