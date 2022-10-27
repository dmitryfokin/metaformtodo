({
  active: true,
  metadata: {
    masterData: {
      session: {
        kind: 'masterData',
        type: 'me#/masterData/Session',
        description: {
          en: 'Users sessions',
        },
        fields: {
          user: {
            name: 'user',
            type: 'me#/masterData/User',
            pg: {
              type: 'uuid',
              notNULL: true,
            },
            description: {
              en: 'User',
            },
          },
          data: {
            name: 'data',
            type: 'object',
            pg: {
              type: 'jsonb',
            },
            description: {
              en: 'Data session',
            },
          },
        },
        hooks: {
          beforeSave: async (failure = false) => {
            console.debug('Before save Session');
          },
          afterSave: async (failure = false) => {
            console.debug('After save Session');
          },
        },
      },
    },
  },
});