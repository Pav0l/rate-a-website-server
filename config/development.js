module.exports = {
  knex: {
    client: 'sqlite3',
    connection: {
      filename: './data/survey.sqlite3',
    },
    useNullAsDefault: true,
  },
};
