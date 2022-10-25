({
  active: true,
  metadata: {
    routing: {
      user: {
        async read(id) {
          return modules.db('users').read(id, ['id', 'login']);
        },

        async create({ login, password }) {
          const passwordHash = await common.hash(password);
          return modules.db('users').create({ login, password: passwordHash });
        },

        async update(id, { login, password }) {
          const passwordHash = await common.hash(password);
          return modules.db('users').update(id, { login, password: passwordHash });
        },

        async delete(id) {
          return modules.db('users').delete(id);
        },

        async find(mask) {
          const sql = 'SELECT login from users where login like $1';
          return modules.db('users').query(sql, [mask]);
        },
      },
    },
  },
});
