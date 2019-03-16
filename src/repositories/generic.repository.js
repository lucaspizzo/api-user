var uuid4 = require('uuid4');

class GenericRepository {
    _baseParams() {
        return {
            TableName: null
        };
    }

    constructor(documentClient, tableName) {
        this._documentClient = documentClient;
        this._tableName = tableName;
    }

    async list() {
        const params = this._createParamObject();
        const response = await this._documentClient.scan(params).promise();

        return response.Items || [];
    }

    async get(id) {
        const params = this._createParamObject({ Key: { id } });
        const response = await this._documentClient.get(params).promise();

        return response.Item;
    }

    async add(model) {
        model.id = uuid4();
        const params = this._createParamObject({ Item: model });
        await this._documentClient.put(params).promise();

        return model;
    }

    async put(model) {
        const params = this._createParamObject({ Item: model });
        await this._documentClient.put(params).promise();

        return model;
    }

    async delete(id) {
        const params = this._createParamObject({ Key: { id } });
        await this._documentClient.delete(params).promise();

        return id;
    }

    _createParamObject(additionalArgs = {}) {
        return Object.assign({}, this._baseParams(), additionalArgs);
    }
}

exports.GenericRepository = GenericRepository;