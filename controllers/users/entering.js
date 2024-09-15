module.exports = {
  enteringMid: (req, res) => {
    res.json({ message: `Welcome ${req.user.name}` });
  },
};
