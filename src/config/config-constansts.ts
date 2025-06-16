export default () => ({
  security: {
    secret: process.env.JWT_SECRET,
    jwt: {
      ttl: process.env.JWT_TTL,
      refreshTtl: process.env.JWT_REFRESH_TTL,
    },
  },
});
