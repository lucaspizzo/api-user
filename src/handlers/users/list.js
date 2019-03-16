require('dotenv/config');

const { withStatusCode } = require('../../utils/response.util');
const { newUserRepository } = require('../../utils/repository.util');

const repository = newUserRepository(process.env)();
const ok = withStatusCode(200, JSON.stringify);

exports.handler = async (event) => {
    const users = await repository.list();
    return ok(users);
};