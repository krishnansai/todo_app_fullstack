require('dotenv').config();
const { createPool } = require("mysql2/promise");
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

let pool;

async function getSecretsFromAWS() {
  const client = new SecretsManagerClient({
    region: process.env.AWS_REGION || "us-east-1",
  });

  const command = new GetSecretValueCommand({
    SecretId: process.env.AWS_SECRET_NAME,
  });

  const data = await client.send(command);

  const secret = JSON.parse(data.SecretString);

  return {
    host: secret.host,
    user: secret.username,
    password: secret.password,
    database: secret.dbname,
  };
}

async function getDbConfig() {
    return await getSecretsFromAWS();
}

async function initPool() {
  const config = await getDbConfig();

  pool = createPool({
    ...config,
    namedPlaceholders: true,
  });

  console.log("✅ MySQL pool initialized");
}

function getPool() {
  if (!pool) {
    throw new Error("Pool has not been initialized. Call initPool() first.");
  }
  return pool;
}

module.exports = {
  initPool,
  getPool,
};
