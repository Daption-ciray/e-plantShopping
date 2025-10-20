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
      const payload = action.payload;
      const name = typeof payload === 'string' ? payload : payload?.name;
      if (!name) return;
      state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, delta, quantity } = action.payload || {};
      if (!name) return;
      const target = state.items.find(item => item.name === name);
      if (!target) return;
      if (typeof quantity === 'number') {
        target.quantity = quantity;
      } else if (typeof delta === 'number') {
        target.quantity += delta;
      } else {
        return;
      }
      if (target.quantity <= 0) {
        state.items = state.items.filter(item => item.name !== name);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
