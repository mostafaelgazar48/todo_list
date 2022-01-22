
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: authService } = require("../services/auth-service");
const { setMessage } = require("./message-slice");


const user = JSON.parse(localStorage.getItem('user'));


export const login = createAsyncThunk(
  "authentication",
  async (userObject, thunkAPI) => {
    try {
      const {email,password} = userObject;
      const data = await authService.login(email, password);
      return {
        user:  data
      }
    } catch (error) {
      const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
        thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }

  }
)

export const logout = createAsyncThunk(
  "/logout",
  async () => {
    await authService.logout();
  }
)


const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  }
});


const { reducer } = authSlice;

export default reducer;
