
import React from 'react';
import './filterableProductTable.css';


const PRODUCTS = [
   {
      category: "Sporting Goods",
      price: "$49.99",
      stocked: true,
      name: "Football"
   },
   {
      category: "Sporting Goods",
      price: "$9.99",
      stocked: true,
      name: "Baseball"
   },
   {
      category: "Sporting Goods",
      price: "$29.99",
      stocked: false,
      name: "Basketball"
   },
   {
      category: "Electronics",
      price: "$99.99",
      stocked: true,
      name: "iPod Touch"
   },
   {
      category: "Electronics",
      price: "$399.99",
      stocked: false,
      name: "iPhone 5"
   },
   {
      category: "Electronics",
      price: "$199.99",
      stocked: true,
      name: "Nexus 7"
   },
   {
      category: "Electronics",
      price: "$200",
      stocked: false,
      name: "Axus 7"
   }
];


class FilterableProductTable extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         filterText: "",
         inStockOnly: false
      };
   }

   filterTextChange = filterText => {
      this.setState({
         filterText: filterText
      });
   };

   inStockChange = inStockOnly => {
      this.setState({
         inStockOnly: inStockOnly
      });
   };

   render() {
      return (
         <div className="filterable__product__table border rounded px-3 py-4">
            <div className='container'>
               <div className='row'>
                  <div className='col-12'>
                     <div className="alert alert-primary" role="alert">
                        <h4 className='text-center'>Simple Products-list React app</h4>
                     </div>
                  </div>
                  <div className='col-12'>
                     <SearchBar
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                        filterTextChange={this.filterTextChange}
                        inStockChange={this.inStockChange}
                     />
                  </div>
                  <div className='col-12'>
                     <ProductTable
                        products={PRODUCTS}
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                     />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
export default FilterableProductTable;


class SearchBar extends React.Component {

   handleFilterText = event => {
      this.props.filterTextChange(event.target.value);
   };

   handleInStockOnly = event => {
      this.props.inStockChange(event.target.checked);
   };

   render() {
      return (
         <div className="search__bar">
            <form>
               <div className="form-group">
                  <input
                     className='d-block w-100 p-2 border rounded'
                     type="text"
                     name="search__bar__input"
                     value={this.props.filterText}
                     onChange={this.handleFilterText}
                     placeholder='Search some products'
                  />
               </div>
               <div className="form-group">
                  <input
                     className='d-inline-block mr-2'
                     type="checkbox"
                     name="stock"
                     checked={this.props.inStockOnly}
                     onChange={this.handleInStockOnly}
                  />
                  <mark>Only show products in stock</mark>
               </div>
            </form>
         </div>
      );
   }
}



class ProductTable extends React.Component {

   render() {

      let rows = [];
      let lastCategory = null;
      const filterText = this.props.filterText;
      const inStockOnly = this.props.inStockOnly;

      this.props.products.forEach(product => {

         if (product.name.indexOf(filterText) === -1) {
            return;
         }
         else if (inStockOnly && !product.stocked) {
            return;
         }
         else if (product.category !== lastCategory) {
            rows.push(
               <ProductCategoryRow
                  category={product.category}
                  key={product.category}
               />
            );
         }
         rows.push(<ProductRow product={product} key={product.name} />);
         lastCategory = product.category;
      });

      return (
         <div className="product__table">{rows}</div>
      );
   }
}



class ProductCategoryRow extends React.Component {

   render() {
      return (
         <div className="product__category__row alert alert-success m-0 mt-4">
            <h6 className='m-0'>Category: {this.props.category}</h6>
         </div>
      );
   }
}



class ProductRow extends React.Component {

   render() {
      let product = this.props.product;
      return (
         <div className="product__row">
            <ul className="list-group">
               <li className="list-group-item d-flex justify-content-between">
                  <span style={{ color: product.stocked ? 'red' : 'black' }}>{product.name}</span>
                  <strong>{product.price}</strong>
               </li>
            </ul>
         </div>
      );
   }
}
