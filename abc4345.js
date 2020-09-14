const elasticsearch = require('elasticsearch');
const AWS = require('aws-sdk');
const connectionClass = require('http-aws-es');
const { SECRET_ACCESS_KEY, ACCESS_KEY_ID } = process.env;

const client = new elasticsearch.Client({
  hosts: ['https://search-docquik-f5yusla53yrryeaiviukr46ez4.ap-south-1.es.amazonaws.com/'],
  log: 'e',
  connectionClass,
  amazonES: {
    credentials: new AWS.EnvironmentCredentials(ACCESS_KEY_ID, SECRET_ACCESS_KEY)
  }
});

async function ping() {
  const result = await client.ping({ requestTimeout: 30000 });
  if (result) return true;
  return false;
}

// 1. Create index
async function initIndex(indexName) {
  const result = await client.indices.create({ index: indexName });
  if (result) return indexName;
  return false;
}

// 2. Check if index exists
async function indexExists(indexName) {
  const result = await client.indices.exists({ index: indexName });
  if (result) return true;
  return false;
}

// 3.  Preparing index and its mapping
// async function initMapping(indexName, docType, payload) {
//   const result = await client.indices.putMapping({
//     index: indexName,
//     type: docType,
//     body: payload
//   });
//   if (result) return true;
//   return false;
// }

// 4. Add/Update a document
async function addDocument(indexName, _id, payload) {
  const result = await client.index({
    index: indexName,
    id: _id,
    body: payload
  });
  if (result) return true;
  return false;
}

// 5. Update a document
async function updateDocument (index, _id, docType, payload) {
  const result = await client.update({
    index,
    type: docType,
    id: _id,
    body: payload
  });
  if (result) return true;
  return false;
}

// 6. Search
async function search (indexName, payload) {
  const result = await client.search({
    index: indexName,
    body: payload
  });
  if (result) return { result, success: true };
  return { succes: false };
}

// Delete a document from an index
async function deleteDocument (index, _id, docType) {
  const result = await client.delete({
    index,
    type: docType,
    id: _id
  });
  if (result) return true;
  return false;
}

// Delete all
async function deleteAll() {
  const result = await client.indices.delete({
    index: '_all'
  });
  if (result) return true;
  return false;
}

module.exports = {
  ping,
  initIndex,
  indexExists,
  // initMapping,
  addDocument,
  updateDocument,
  search,
  deleteDocument,
  deleteAll
};
