module.exports = {
  knex: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3',
    },
    useNullAsDefault: true,
  },
};
