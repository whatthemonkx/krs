const Product = ({ item }) => {
  return (
    item.variations[0].images?.[0].name && <a href={`/items/${item.item_id}`}>
      <div className='singleItem'>
        <img className='mainpageItemImage' src={item.variations[0].images[0].url} alt="" />
        <h3>{item.item_name}</h3>
        <p>Price: ${item.item_price}</p>
      </div>
    </a>
  );
};

export default Product;

