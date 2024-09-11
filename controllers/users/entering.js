export const enteringMid = (req, res) => {
  res.json({ message: `Welcome ${req.user.name}` });
};
