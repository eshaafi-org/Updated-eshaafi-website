// subscriptionReducer.js

const initialState = {
    selectedCategory: "1 month",
    plans: [],
};

export const planListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        case 'SET_PLANS':
            return { ...state, plans: action.payload };
        default:
            return state;
    }
};
