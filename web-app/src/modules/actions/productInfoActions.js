import { get, post } from 'axios';
import { createActions } from 'redux-actions';

// Fetch Deals
export const {
	fetchProductInfoRequest,
	fetchProductInfoSuccess,
	fetchProductInfoFailure,
} = createActions({
	FETCH_PRODUCT_INFO_REQUEST: () => ({ error: false, fetching: true }),
	FETCH_PRODUCT_INFO_SUCCESS: response => ({
		error: false,
		fetching: false,
		response,
	}),
	FETCH_PRODUCT_INFO_FAILURE: error => ({ error, fetching: false }),
});

export const fetchProductInfo = (id) => (dispatch) => {
	dispatch(fetchProductInfoRequest());

	return get(`/v1/product/${id}`)
		.then((response) => {
			dispatch(fetchProductInfoSuccess(response.data));
			// console.log(response.data);
		})
		.catch(error => dispatch(fetchProductInfoFailure(error)));
};


// Fetch Deals
export const {
	changeInputValueRequest,
	changeInputValueSuccess,
	changeInputValueFailure,
} = createActions({
	CHANGE_INPUT_VALUE_REQUEST: () => ({ error: false, fetching: true }),
	CHANGE_INPUT_VALUE_SUCCESS: response => ({
		error: false,
		fetching: false,
		response,
	}),
	CHANGE_INPUT_VALUE_FAILURE: error => ({ error, fetching: false }),
});

export const changeCurrentInput = (value) => (dispatch) => {
	dispatch(changeInputValueRequest());

	console.log(value);

	dispatch(changeInputValueSuccess(value))
};
