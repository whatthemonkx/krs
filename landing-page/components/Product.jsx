const Product = ({ item }) => {
  return (
    <a href={`/items/${item.item_id}`}>
      <div className='singleItem'>
        <img className='mainpageItemImage' src={`${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.variations[0].images[0].name}`} alt="" />
        <h3>{item.item_name}</h3>
        <p>Price: ${item.item_price}</p>
      </div>
    </a>
  );
};

export default Product;

