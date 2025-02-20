import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface cartItem {
    id: number;
    name: string;
    points: number;
    actualPrice: string;
    qty: number;
    image: string;
}

const cartSlice = createSlice({
    name: "cart",
    initialState: [] as cartItem[],
    reducers : {
        // add(state, action : PayloadAction<cartItem>){
        //     state.push(action.payload);
        // },
        add: (state, action: PayloadAction<cartItem>) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
              existingItem.qty += 1; // Increase qty if item exists
            } else {
              state.push({ ...action.payload, qty: 1 }); // Add new item with qty: 1
            }
          },
        remove(state, action: PayloadAction<number>){
            return state.filter((item)=> item.id !== action.payload);
        },
        increaseQty: (state, action: PayloadAction<number>) => {
            const item = state.find(item => item.id === action.payload);
            if (item) {
              item.qty += 1;
            }
        },
        decreaseQty: (state, action: PayloadAction<number>) => {
            const item = state.find(item => item.id === action.payload);
            if (item && item.qty > 1) {
              item.qty -= 1;
            } else {
              return state.filter(item => item.id !== action.payload);
            }
        },
    }
})

export const {add,remove,increaseQty,decreaseQty} = cartSlice.actions

export default cartSlice.reducer