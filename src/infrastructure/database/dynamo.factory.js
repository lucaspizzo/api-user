const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const withProcessEnv = ({ AWS_ENDPOINT, AWS_REGION, IS_OFFLINE }) => () => {
    let options;

    if (!!IS_OFFLINE) {
        options = {
            endpoint: AWS_ENDPOINT,
            region: AWS_REGION,
        };
    }

    return new DocumentClient(options);
};

module.exports = {
    withProcessEnv
};
