// import users from "./users.js";
import * as usersDao from "./users-dao.js";

// let currentUser = null;

function UsersController(app) {
  const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.send(users);
  };
  const findUserById = async (req, res) => {
    const id = req.params.id;
    // const user = users.find((user) => user.id === id);
    const user = await usersDao.findUserById(id);
    res.send(user);
  };
  const deleteUserById = async (req, res) => {
    const id = req.params.id;
    // const user = users.find((user) => user.id === id);
    // const index = users.indexOf(user);
    // users.splice(index, 1);
    const status = await usersDao.deleteUser(id);
    res.json(status);
  };
  const createUser = async (req, res) => {
    // const user = req.body;
    // users.push({ ...user, id: new Date().getTime() });
    const user = await usersDao.createUser(req.body);
    res.json(user);
  };

  //actually update user profile:only current user
  const updateUser = async (req, res) => {
    const id = req.params.id;
    const currentUser = req.session["currentUser"];
    // const user = users.find((user) => user.id === id);
    // const index = users.indexOf(user);
    // users[index] = { ...user, ...req.body };
    if (id === currentUser._id){
        req.session["currentUser"] = {...currentUser, ...req.body};
    }
    const status = await usersDao.updateUser(id, req.body);
    res.json(status);
  };

  const login = async (req, res) => {
    const user = req.body;
    console.log(user);

    const foundUser = await usersDao.findUserByCredentials(
      req.body.username,
      req.body.password
    );
    console.log("foundUser")
    console.log(foundUser);
    if (foundUser) {
      req.session["currentUser"] = foundUser;
      res.send(foundUser);
    } else {
      res.sendStatus(404);
    }
  };

  const register = async (req, res) => {
    const user = req.body;
    // const foundUser = users.find((user) => user.username === req.body.username);
    const foundUser = await usersDao.findUserByUsername(req.body.username);
    if (foundUser) {
      res.sendStatus(409);
    } else {
      // const newUser = { ...user, id: new Date().getTime() };
      const newUser = await usersDao.createUser(user);
      req.session["currentUser"] = newUser;
      // users.push(newUser);
      res.json(newUser);
    }
  };
  const logout = async (req, res) => {
    req.session.destroy();
    // currentUser = null;
    res.sendStatus(204);
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.send(currentUser);
    } else {
      res.sendStatus(404);
    }
  };

  // update user cart by adding a product
  const addProductsToUserCart = async (req, res) => {
    const userId = req.params.id;
    const productId = req.params.pid;
    const count = req.params.c;
    const status = await usersDao.addProductsToUserCart(userId, productId, count);
    res.json(status);
  };

  const getCartByUserId = async (req, res) => {
    const userId = req.params.id;
    const user = await usersDao.findUserById(userId);
    if (user) {
      res.json(user.cart);
    } else {
      res.sendStatus(404);
    }
  };


  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.get("/api/users/profile", profile);
  app.post("/api/users/register", register);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/userId/:id", findUserById);
  app.delete("/api/users/:id", deleteUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);

  app.put("/api/users/:id/cart/:pid/count/:c", addProductsToUserCart);
  app.get("/api/users/:id/cart", getCartByUserId);
}

export default UsersController;
