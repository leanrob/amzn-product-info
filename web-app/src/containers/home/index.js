import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchProductInfo, changeCurrentInput } from '../../modules/actions/productInfoActions'
import { getCurrentProductInfo, getCurrentInputValue  } from '../../modules/reducers/productInfoReducer'

const Home = ({ fetchProductInfo, productInfo, changeCurrentInput, inputValue }) => {

    console.log(inputValue);

    let renderProductInfo = () => {
        if (productInfo !== {}) {
            return (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>
                        ID: {productInfo.id}
                    </div>
                    <div>
                        Weight: {productInfo.Weight}
                    </div>
                    <div>
                        Dimensions: {productInfo.Dimensions}
                    </div>
                    <div>
                        Ranks: {JSON.stringify(productInfo.Ranks)}
                    </div>
                </div>
            )
        }
        return null
    };

    return (
        <div>
            <h1>Welcome to Amazon Product Info Scraper</h1>
            <p>Please enter the ASIN</p>
            {/*<input onChange={(event) => console.log(event.target.value)}/>*/}
            <input onChange={(event) => changeCurrentInput(event.target.value)}/>
            <button onClick={() => fetchProductInfo(inputValue)}>Submit</button>
            { renderProductInfo() }
        </div>
    )
};

const mapStateToProps = state => ({
    productInfo: getCurrentProductInfo(state),
    inputValue: getCurrentInputValue(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProductInfo,
    changeCurrentInput,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
