const { GenericRepository } = require('./generic.repository');

class UserRepository extends GenericRepository {
    _baseParams() {
        return {
            TableName: this._tableName
        };
    }

    constructor(documentClient, tableName) {
        super(documentClient, tableName);
    }
}

exports.UserRepository = UserRepository;