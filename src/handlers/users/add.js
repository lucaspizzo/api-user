require('dotenv/config');

const { newUserRepository } = require('../../utils/repository.util');
const { withStatusCode } = require('../../utils/response.util');
const { parseWith } = require('../../utils/request.util');

const repository = newUserRepository(process.env)();
const created = withStatusCode(201, JSON.stringify);
const parseJson = parseWith(JSON.parse);

exports.handler = async (event) => {
    const { body } = event;
    const user = parseJson(body);

    await repository.add(user);

    return created(user);
};
