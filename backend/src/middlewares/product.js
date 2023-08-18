const checkName = (req, res, next) => {
  const { name } = req.body;
  const nameExist = ['name'];
  if (!nameExist.every((element) => element in req.body)) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = {
  checkName,
};