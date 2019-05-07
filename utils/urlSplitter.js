module.exports = url => {
  const splitUrl = url.split('/');
  return `${splitUrl[0]}//${splitUrl[2]}`;
};
