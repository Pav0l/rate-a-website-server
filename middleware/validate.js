module.exports = validate => {
  return (req, res, next) => {
    const { error } = validate({
      ...req.body,
      ip: req.ip,
    });

    if (error) {
      return res.status(422).json(error);
    }

    next();
  };
};
