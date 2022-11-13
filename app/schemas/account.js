({
  active: true,
  metadata: {
    masterData: {
      user: {
        kind: 'masterData',
        type: 'me#/masterData/User',
        description: {
          en: 'Users',
        },
        fields: {
          login: {
            name: 'login',
            type: 'string',
            pg: {
              type: 'varchar',
              notNULL: true,
            },
            description: {
              en: 'Login',
            },
          },
          password: {
            name: 'password',
            type: 'string',
            pg: {
              type: 'varchar',
              notNULL: true,
            },
            secretField: true,
            description: {
              en: 'Password',
            },
          },
        },
        hooks: {
          beforeSave: async (failure = false) => {
            console.debug('Before save User');
          },
          afterSave: async (failure = false) => {
            console.debug('After save User');
          },
        },
      },
    },
  },
});