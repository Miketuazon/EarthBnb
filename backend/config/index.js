// jdsFT3rvIyypZA==jdsFT3rvIyypZA==
// XSRF-Token c0WoE5B6-3jrI0JpeK07clHVh6IV8uWysL0A

module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE,
    jwtConfig: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
};
