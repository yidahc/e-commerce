import React from 'react';

const CartProductBlock = ({products,removeItem}) => {

    const renderCartImage = (images) => {
        if(images.length > 0){
            return images[0].url
        } else {
            return '/images/image_not_availble.png'
        }
    }


    const renderItems = () => (
        products.cartDetail ?
            products.cartDetail.map(product=>(
                <div className="user_product_block" key={product._id}>
                    <div className="item">
                        <div
                            className="image"
                            style={{background:`url(${renderCartImage(product.images)}) no-repeat`}}
                        ></div>
                    </div>
                    <div className="item">
                        <h4>Producto</h4>
                        <div>
                            {product.brand.name} {product.name}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Cantidad</h4>
                        <div>
                            {product.quantity}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Precio</h4>
                        <div>
                           $ {product.price}
                        </div>
                    </div>
                    <div className="item btn">
                       <div className="cart_remove_btn" 
                            onClick={()=> removeItem(product._id)}>
                            Sacar de Carrito
                       </div>
                    </div>
                </div>
            ))

        :null
    )


    return (
        <div>
            {renderItems()}
        </div>
    );
};

export default CartProductBlock;