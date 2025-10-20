import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
    const incoming = action.payload;
    if (!incoming || !incoming.name) {
      return;
    }
    const existingItem = state.items.find(item => item.name === incoming.name);
    if (existingItem) {
      const incrementBy = incoming.quantity && Number(incoming.quantity) > 0 ? Number(incoming.quantity) : 1;
      existingItem.quantity += incrementBy;
    } else {
      state.items.push({
        name: incoming.name,
        image: incoming.image,
        description: incoming.description,
        cost: incoming.cost,
        quantity: incoming.quantity && Number(incoming.quantity) > 0 ? Number(incoming.quantity) : 1,
      });
    }
    },
    removeItem: (state, action) => {
    },
    updateQuantity: (state, action) => {

    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
