const userSessionIdMap = new Map();

const setUser = (id, user) => {
  userSessionIdMap.set(id, user);
};

const getUser = (id) => {
  return userSessionIdMap.get(id);
};

const delUser = (id) => {
  return userSessionIdMap.delete(id);
};

module.exports = { setUser, getUser, delUser };
