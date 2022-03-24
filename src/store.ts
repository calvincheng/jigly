import { createStore, action } from "easy-peasy";

const updateUsers = action((state: any, payload) => {
  state.users = payload;
});

const store = createStore({
  users: {},
  updateUsers,
});

export default store;
