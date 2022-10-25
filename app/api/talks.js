({
  active: true,
  metadata: {
    routing: {
      talks: {
        async say(message) {
          console.log({ message });
          return { status: 'ok' };
        },
      },
    },
  },
});
