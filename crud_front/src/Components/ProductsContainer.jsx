import React from 'react';
import ViewProduct from './ViewProduct';

class ProductsContainer extends React.Component {
    render() {
        return (
            <div className='prouductList'>
                {this.props.productData.map((data) => {
                    return (
                        <ViewProduct data={ data } key={ data.id } />
                    );
                })}
            </div>
        );
    }
}

export default ProductsContainer