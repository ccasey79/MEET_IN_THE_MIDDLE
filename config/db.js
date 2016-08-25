dbURIs = {
  test: "mongodb://localhost/middle_api_test",
  development: "mongodb://localhost/middle_api",
  production: process.env.MONGODB_URI || "mongodb://localhost/middle_api"
}

module.exports = function(env) {
  return dbURIs[env];
}





