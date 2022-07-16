import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Item extends payloadType {
  quantity: number;
}

type payloadType = {
  id: number;
  image: string;
  price: number;
  title: string;
};

interface CounterState {
  value: number;
  type: number;
  items?: Item[];
}

const initialState: CounterState = {
  value: 0,
  type: 0,
  items: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCard(state, action: PayloadAction<payloadType>) {
      let iid = -1;
      if (state.items) {
        if (state.items.length > 0) {
          state.items.forEach((element, index) => {
            if (element.id === action.payload.id) {
              iid = index;
            }
          });
        }

        if (iid === -1) {
          state.items.push({
            id: action.payload.id,
            image: action.payload.image,
            price: action.payload.price,
            title: action.payload.title,
            quantity: 1,
          });
          state.value += action.payload.price;
        } else {
          state.items[iid].quantity += 1;
          state.value += state.items[iid].price;
        }
        state.type = state.items.length;
      }
    },
    removeFromCard(state, action: PayloadAction<payloadType>) {
      let iid = -1;
      if (state.items) {
        if (state.items.length > 0) {
          state.items.forEach((element, index) => {
            if (element.id === action.payload.id) {
              iid = index;
            }
          });
        }

        if (state.items[iid].quantity === 1) {
          state.value -= state.items[iid].price;
          state.items.splice(iid, 1);
        } else if (state.items[iid].quantity > 1) {
          state.items[iid].quantity -= 1;
          state.value -= state.items[iid].price;
        }
        state.type = state.items.length;
      }
    },
  },
});

export const { addToCard, removeFromCard } = shopSlice.actions;

export const selectData = (state: RootState) => state.value;

export default shopSlice.reducer;
