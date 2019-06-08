import React from 'react';

const CartProductBlock = ({products,removeItem}) => {

    const renderCartImage = (images) => {
        let path = "/images/"
        if(images.length > 0){
            return path.concat(images[0])
        } else {
            return '/images/product1.jpg'
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
                            {product.brand.name} 
                            <div/>
                            {product.name}
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
                       <div className="fancyButton" 
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