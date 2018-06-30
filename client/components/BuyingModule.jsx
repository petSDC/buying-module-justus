import React from 'react';
import Details from './Details';
import Overview from './Overview';
import Shipping from './Shipping';
import '../styles.css';

const axios = require('axios');

class BuyingModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritedBy: null,
      feedback: null,
      freeShipping: null,
      giftCard: null,
      giftMessage: null,
      handmade: null,
      id: null,
      madeToOrder: null,
      materials: null,
      name: null,
      options: {
        name: null,
        differentOptions: [],
        price: [],
      },
      quantity: null,
      shippingCountries: [],
      shippingPrice: [],
      shippingMin: null,
      shippingMax: null,
      shopLocation: null,
      currentCountry: null,
      currentShipping: null,
      wantNumber: Math.floor(Math.random() * 18 + 2),
    };
    this.handleSelectCountry = this.handleSelectCountry.bind(this);
  }

  componentDidMount() {
    console.log('test', `${window.location.pathname}details`)
    axios.get(`${window.location.pathname}details`)
      .then((response) => {
        console.log('response', response)
        this.setState({
          favoritedBy: response.data.rows[0].favoritedby,
          feedback: response.data.rows[0].feedback,
          freeShipping: response.data.rows[0].freeshipping,
          giftCard: response.data.rows[0].giftcard,
          giftMessage: response.data.rows[0].giftmessage,
          handmade: response.data.rows[0].handmade,
          id: response.data.rows[0].id,
          madeToOrder: response.data.rows[0].madetooorder,
          materials: response.data.rows[0].materials,
          name: response.data.rows[0].name,
          options: {
            name: response.data.rows[0].optionsname,
            differentOptions: response.data.rows[0].differentoptions,
            price: response.data.rows[0].price,
          },
          quantity: response.data.rows[0].quantity,
          shippingCountries: response.data.rows[0].shippingcountries,
          shippingPrice: response.data.rows[0].shippingprice,
          shippingMin: response.data.rows[0].shippingmin,
          shippingMax: response.data.rows[0].shippingmax,
          shopLocation: response.data.rows[0].shoplocation,
          currentCountry: response.data.rows[0].shippingcountries[0],
          currentShippingPrice: response.data.rows[0].shippingprice[0],
        });
      })
      .catch(error => console.error('Error in getting product data: ', error));
  }

  handleSelectCountry(country) {
    let result;
    for (let i = 0; i < this.state.shippingCountries.length; i += 1) {
      if (this.state.shippingCountries[i] === country) {
        result = i;
      }
    }
    const displayedShippingPrice = this.state.shippingPrice[result] === 0 ? 'Free' : this.state.shippingPrice[result].toFixed(2);

    this.setState({
      currentCountry: country,
      currentShippingPrice: displayedShippingPrice,
    });
  }

  render() {
    return (
      <div className="container">
        <Details
          name={this.state.name}
          options={this.state.options}
          quantity={this.state.quantity}
          wantNumber={this.state.wantNumber}
          currentCountry={this.state.currentCountry}
          currentShippingPrice={this.state.currentShippingPrice}
        />
        <hr />
        <Overview
          handmade={this.state.handmade}
          madeToOrder={this.state.madeToOrder}
          materials={this.state.materials}
          giftMessage={this.state.giftMessage}
          giftCard={this.state.giftCard}
          feedback={this.state.feedback}
          favoritedBy={this.state.favoritedBy}
          shippingMin={this.state.shippingMin}
          shippingMax={this.state.shippingMax}
        />
        <hr />
        <Shipping
          shippingCountries={this.state.shippingCountries}
          shippingPrice={this.state.shippingPrice}
          shippingMin={this.state.shippingMin}
          shippingMax={this.state.shippingMax}
          shopLocation={this.state.shopLocation}
          currentCountry={this.state.currentCountry}
          currentShippingPrice={this.state.currentShippingPrice}
          handleSelectCountry={this.handleSelectCountry}
        />
      </div>
    );
  }
}

export default BuyingModule;
