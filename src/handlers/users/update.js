require('dotenv/config');


const { newUserRepository } = require('../../utils/repository.util');
const { withStatusCode } = require('../../utils/response.util');
const { parseWith } = require('../../utils/request.util');


const repository = newUserRepository(process.env)();
const ok = withStatusCode(200);
const badRequest = withStatusCode(400);
const notFound = withStatusCode(404);
const parseJson = parseWith(JSON.parse);

exports.handler = async (event) => {
    const { body, pathParameters } = event;
    const { id } = pathParameters;

    const existingUser = await repository.get(id);
    const user = parseJson(body);

    if (!existingUser) {
        return notFound();
    }

    if (existingUser.id !== user.id) {
        return badRequest();
    }

    await repository.put(user);

    return ok(user);
};