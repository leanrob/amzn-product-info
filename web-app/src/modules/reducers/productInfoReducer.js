import { handleActions, combineActions } from 'redux-actions';

import {
	fetchProductInfoRequest,
	fetchProductInfoSuccess,
	fetchProductInfoFailure,
	changeInputValueRequest,
	changeInputValueSuccess,
	changeInputValueFailure,
} from '../actions/productInfoActions';

const initialState = {
	currentProductInfo: {},
	currentInputValue: ""
};

export default handleActions(
	{
		[fetchProductInfoSuccess]: (state, { payload: { response, fetching } }) => ({
			...state,
			fetching,
			currentProductInfo: response,
		}),
		[changeInputValueSuccess]: (state, { payload: { response, fetching } }) => ({
			...state,
			fetching,
			currentInputValue: response,
		}),
		[combineActions(
			fetchProductInfoRequest,
			fetchProductInfoFailure,
			changeInputValueRequest,
			changeInputValueFailure,
		)](
			state,
			{ payload: { error, fetching } },
		) {
			return { ...state, error, fetching };
		},
	},
	initialState,
);

export const getCurrentProductInfo = state => state.productInfo.currentProductInfo;
export const getCurrentInputValue = state => state.productInfo.currentInputValue;
