const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secretName = "todolist-db-credentials";
const region = "us-east-1";

const client = new SecretsManagerClient({ region });

async function getDatabaseSecrets() {
  const data = await client.send(
    new GetSecretValueCommand({ SecretId: secretName })
  );

  const secret = JSON.parse(data.SecretString);
   console.log(secret);
  return {
    host: secret.host,
    user: secret.username,
    password: secret.password,
    database: secret.dbname,
  };
}

module.exports = {
  getDatabaseSecrets,
};
