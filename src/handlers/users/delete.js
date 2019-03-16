require('dotenv/config');

const { withStatusCode } = require('../../utils/response.util');
const { newUserRepository } = require('../../utils/repository.util');

const repository = newUserRepository(process.env)();
const noContent = withStatusCode(204);

exports.handler = async (event) => {
    const { id } = event.pathParameters;

    await repository.delete(id);

    return noContent();
};
