class UserSeeder {
    constructor(dynamodb, docClient) {
        this.dynamodb = dynamodb;
        this.docClient = docClient;
        this._tablename = process.env.USERS_TABLE || 'users-api-dev-users';
    }

    async hasTable() {
        const tables = await this.dynamodb.listTables({ Limit: 5 }).promise();
        return tables.TableNames && tables.TableNames.indexOf(this._tablename) >= 0;
    }

    async createTable() {
        const tableParams = {
            TableName: this._tablename,
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH',
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'S',
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            }
        };

        const result = await this.dynamodb.createTable(tableParams).promise();

        return !!result.$response.error;
    }

    async deleteTable() {
        const result = await this.dynamodb.deleteTable({ TableName: this._tablename }).promise();

        return !!result.$response.err
    }

    async seed(users = []) {
        const putRequests = users.map(c => ({
            PutRequest: {
                Item: Object.assign({}, c)
            }
        }));

        const params = {
            RequestItems: {
                [this._tablename]: putRequests
            }
        };

        await this.docClient.batchWrite(params).promise();
    }
}

exports.UserSeeder = UserSeeder;