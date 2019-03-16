const { UserRepository } = require('../repositories/user.repository');
const { withProcessEnv } = require('../infrastructure/database/dynamo.factory');

const newUserRepository = (env) => {
    const docClient = withProcessEnv(env)();
    return (tableName) => new UserRepository(docClient, tableName || env.USERS_TABLE);
};

module.exports = {
    newUserRepository
};

