const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: 'auth',
  initialState: ['WTF'],
  reducers: {
    test(state, action) {
      state.push('TEST');
    }
  }
});

export const { test } = authSlice.actions;
export default authSlice.reducer;
