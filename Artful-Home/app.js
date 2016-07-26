'use strict';

import SearchInput, {createFilter} from 'react-search-input'
const KEYS_TO_FILTER_1 = ['artTeam'];
const KEYS_TO_FILTER_2 = ['itemSKU'];
let artfulData;

class Layout extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    this._fetchData();
  }

  getInitialState() {
    return {
      searchTerm: ''
    }
  }

  render() {
    //APICALL will need to be changed to the actual returned object from the Domo AJAX request
    const filteredProducts = APICALL.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER_1));

    return (
      <div>
        <h1>Artful Home Project</h1>
        <span>Art Team Filter</span>
        <SearchInput className="search-input" onChange={this._searchUpdated} />
        {filteredProducts.map(product => {
          return (
            <ProductRow product={product}/>
          )
        })}
      </div>
    )
  }

  _fetchData() {
    //Using this for mock dataset
    $.getJSON('./data.json', function(data) {
      console.log("DATA: ", data);
      artfulData = data;
    })

    //Domo function is not working properly
    // domo.get('/data/v1/chart').then(function(data){
    //   console.log("DATA: ", data);
    //   artfulData = data;
    // });
  }

  _searchUpdated (term) {
    this.setState({searchTerm: term})
  }

}

//Will probably remove specific class if deemed useless
//Still need to work on dropdown once data starts flowing through
class ProductRow extends React.Component {
  render() {
    return(
      <div className="ah-productRow">
        <div className="ah-imageContainer">
          <img className="ah-image" src=""/>
        </div>
        <div className="ah-descriptionContainer">
          <div className="ah-firstRow">
            <div className="ah-block">
              <div className="ah-itemTitle">{this.props.product.itemTitle}</div>
              <div className="ah-variant">{this.props.product.variant}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Item SKU</span>
              <div className="ah-sku">{this.props.product.sku}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Activated</span>
              <div className="ah-dateFirstActivated">{this.props.product.dateFirstActivated}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Art Team</span>
              <div className="ah-artist">{this.props.product.artist}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Primary Category</span>
              <div className="ah-categoryFine">{this.props.product.categoryFine}</div>
            </div>
          </div>
          <div className="ah-secondRow">
            <div className="ah-block">
              <span className="ah-blockDescription">Catalog</span>
              <div className="ah-catalogId">{this.props.product.catalogId}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Item Price</span>
              <div className="ah-price">{this.props.product.price}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Margin</span>
              <div className="ah-margin">{this.props.product.margin}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Dollars Sold</span>
              <div className="ah-revenue">{this.props.product.revenue}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Units Sold</span>
              <div className="ah-quantity">{this.props.product.quantity}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Units Returned</span>
              <div className="ah-returnedUnits">{this.props.product.returnedUnits}</div>
            </div>
            <div className="ah-block">
              <span className="ah-blockDescription">Dollars Returned</span>
              <div className="ah-returnedCost">{this.props.product.returnedCost}</div>
            </div>
          </div>
        </div>
        <div class="collapse" id="collapseExample">
          <div class="well">

          </div>
        </div>
        <button data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Expand</button>
      </div>
    )
  }
}

//Mock data
const APICALL = [
  {
    artTeamId: '123456789',
    artist: 'Comfy USA',
    styleId: '987654321',
    sku: 'P08530-P00399',
    pageLinkWithImage: 'https://www.URLHERE.com',
    itemTitle: 'Jode Dress',
    variant: 'Navy (22W-24W)',
    catalogId: 1,
    price: 168,
    revenue: 1512,
    dateFirstActivated: '03/11/2016',
    quantity: 9,
    categoryFine: 'Dresses',
    returnedCost: 0,
    returnedUnits: 0,
    catelogDrop: '2015 - Winter Jan',
    setSku: 'P085530-P00399',
    circulation: 331756,
    shippingPrice: 12,
    returnedPercentage: 2,
    daysToShip: 6
  }
]

ReactDOM.render(<Layout />, document.getElementById('react-load'));
