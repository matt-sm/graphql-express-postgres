// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'blog'
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'blog-test'
    },
    seeds: {
        directory: `${__dirname  }/seeds/test`
    }
  }
};
