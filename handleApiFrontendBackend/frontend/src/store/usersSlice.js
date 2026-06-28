import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ── async thunks ─────────────────────────────────────────────────

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await axios.get('/api/users');
  return res.data;
});

export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async ({ id, status }) => {
    const res = await axios.patch(`/api/users/${id}/status`, { status });
    return res.data;          // returns the updated user
  }
);

// ── slice ─────────────────────────────────────────────────────────

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list:    [],
    loading: false,
    error:   null,
    // track per-user update loading  { [userId]: true/false }
    updating: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchUsers
    builder
      .addCase(fetchUsers.pending,  (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchUsers.fulfilled,(state, action) => {
        state.loading = false;
        state.list    = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.error.message;
      });

    // updateUserStatus
    builder
      .addCase(updateUserStatus.pending, (state, action) => {
        state.updating[action.meta.arg.id] = true;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.list.findIndex(u => u.id === updated.id);
        if (idx !== -1) state.list[idx] = updated;
        delete state.updating[updated.id];
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        delete state.updating[action.meta.arg.id];
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;

// ── selectors ─────────────────────────────────────────────────────
export const selectUsers       = (state) => state.users.list;
export const selectUsersLoading= (state) => state.users.loading;
export const selectUsersError  = (state) => state.users.error;
export const selectUpdating    = (id) => (state) => !!state.users.updating[id];