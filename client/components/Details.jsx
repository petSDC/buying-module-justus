import React from 'react';
// import ReactModal from 'react-modal';

// ReactModal.setAppElement('#buying-module');

const SmallerText = styled.div`
  font-size: 75%;
`;

const SmallerGreyText = styled.div`
  font-size: 75%;
  color: grey;
`

class Details extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      option: 'unselected',
      quantity: 1,
      showModal: false,
    };
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max + 2);
  }

  handleOptionsChange(event) {
    this.setState({
      option: event.target.value,
    });
  }

  handleQuantityChange(event) {
    this.setState({
      quantity: event.target.value,
    });
  }

  // handleOpenModal () {
  //   this.setState({
  //     showModal: true,
  //   });
  // }

  // handleCloseModal () {
  //   this.setState({
  //     showModal: false,
  //   });
  // }

  render() {
    const {
      name,
      options,
      quantity,
    } = this.props;

    const quantityArray = [];
    for (let i = 1; i < quantity; i += 1) {
      quantityArray.push(i);
    }

    const createOptionsDropdown = () => {
      let holder = [];
      let i = 0;
      while (i < options.price.length) {
        options.differentOptions.map(option => {
          holder.push(<option value={option} key={option}>{option} (${options.price[i]})</option>);
          i += 1;
        });
      }
      return holder;
    };

    let shownPrice = (options.price[0] * this.state.quantity).toFixed(2);
    for (let i = 0; i < options.differentOptions.length; i += 1) {
      if (this.state.option === options.differentOptions[i]) {
        shownPrice = (options.price[i] * this.state.quantity).toFixed(2);
      }
    }

    return (
      <div>
        <h1>{name}</h1>
        <h2>${this.state.option === 'unselected' ? `${shownPrice}+` : shownPrice}</h2>
        <div>{options.name}</div>
        <select className="form-control" value={this.state.option} onChange={this.handleOptionsChange}>
          <option value="unselected">Select {options.name === null ? 'dimensions' : options.name.toLowerCase()}</option>
          {createOptionsDropdown()}
        </select>
        <div>Quantity</div>
        <select
          className="form-control"
          value={this.state.quantity}
          onChange={this.handleQuantityChange}
        >
          {quantityArray.map(number =>
            <option value={number} key={number}>{number}</option>)}
        </select>
        <div>
          <button
            type="button"
            className="btn btn-outline-secondary"
            // onClick={this.handleOpenModal}
            data-toggle="modal"
            data-target="#buyItNow"
          >
            Buy it now
          </button>
<<<<<<< HEAD
          {/* <
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="test"
            onRequestClose={this.handleCloseModal}
          >
            MODAL TEXT HERE
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal> */}
          <div className="modal fade" id="buyItNow" tabIndex="-1" role="dialog" aria-labelledby="buyItNowLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
=======
          <Modal open={this.state.showModal} onClose={this.closeModal} center>
            <h5>Choose your payment method&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</h5>
            <form>
              <input type="radio" value="cc" name="payment" /> Credit card<br />
              <input type="radio" value="paypal" name="payment" /> PayPal<br />
            </form>
            <hr />
            <div><p><strong>Order summary</strong></p></div>
            <Flex><span>Item(s) total</span><span>${shownPrice}</span></Flex>
            <Flex><span>Shipping</span><span>SHIPPING PRICE HERE</span></Flex>
            <SmallerText>(To COUNTRY HERE)</SmallerText>
            <hr />
            <Flex><span><strong>Total</strong></span><span><strong>${shownPrice}</strong></span></Flex>
            <SmallerGreyText>Additional duties and taxes <a href="https://www.etsy.com/help/article/5023">may apply</a></SmallerGreyText>
            <div><center><button type="button" className="btn btn-secondary">Proceed to checkout</button></center></div>
          </Modal>
          {/* <div className="modal fade" id="buyItNow" tabIndex="-1" role="dialog" aria-labelledby="buyItNowLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
>>>>>>> Implement buy it now modal skeleton.
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="buyItNow">Choose your payment method</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  ...
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-outline-secondary">Add to cart</button>
        </div>
        <div>
          Other people want this. {this.getRandomInt(20)} people have this in their carts right now.
        </div>
      </div>
    );
  }
}

export default Details;
