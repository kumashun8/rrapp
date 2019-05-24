import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ProductsContainer from './ProductsContainer';
import FormContainer from './FormContainer';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3001/products')
        .then((results) => {
            console.log(results)
            this.setState({products: results.data})
        })
        .catch ((data) => {
            console.log(data)
        })
    }

    createProduct = (product) => {
        axios.post('http://localhost:3001/products', { product: product })
        .then((response) => {
            var newProducts = this.state.products
            newProducts.push(response.data)
            this.setState({products: newProducts})
        })
        .catch ((data) => {
            console.log(data)
        })
    }

    deleteProduct = (id) => {
        axios.delete(`http://localhost:3001/products/${id}`)
        .then((response) => {
            const productIndex = this.state.products.findIndex(x => x.id === id)
            var products = this.state.products
            var newProducts = products.splice(productIndex, 1)
            this.setState({ produsts: newProducts })
        })
        .catch ((data) => {
            console.log(data)
        })
    }

    updateProduct = (id, product) => {
        axios.patch(`http://localhost:3001/products/${id}`, {product: product})
        .then((response) => {
            const productIndex = this.state.products.findIndex(x => x.id === id)
            var newProducts = this.state.products
            newProducts[productIndex].product = product
            this.setState({ produsts: newProducts })
        })
        .catch ((data) => {
            console.log(data)
        })
    }


    render() {
        return (
            <div className="app-main">
                <FormContainer
                    hendleAdd={this.hendleAdd}
                    createProduct={this.createProduct}
                />
                <ProductsContainer
                    productData={this.state.products}
                    deleteProduct={this.deleteProduct}
                    updateProduct={this.updateProduct}
                />
            </div>
        );
    }
}

export default MainContainer