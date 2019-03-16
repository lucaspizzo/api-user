require('dotenv/config');

const { UserSeeder } = require('./user.seeder');
const { DynamoDB } = require('aws-sdk');
const { DocumentClient } = DynamoDB;
const usersData = require('./user-test-data.json');

const dynamo = new DynamoDB({
    endpoint: process.env.AWS_ENDPOINT,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const doclient = new DocumentClient({ service: dynamo });
const userSeeder = new UserSeeder(dynamo, doclient);

const log = (...mgs) => console.log('>>', ...mgs);

const seedUsers = async () => {
    const exists = await userSeeder.hasTable();
    if (exists) {
        await userSeeder.deleteTable();
    }
    await userSeeder.createTable();

    log('Seeding data');
    await userSeeder.seed(usersData);
};

seedUsers()
    .then(() => log('Done!'))
    .catch(err => console.log(err));
