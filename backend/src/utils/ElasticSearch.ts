import { Client } from "@elastic/elasticsearch";

const ES_INDEX=process.env.ES_INDEX as string
const ELASTIC_ENDPOINT = process.env.ELASTIC_ENDPOINT;
const ELASTIC_API_KEY = process.env.ELASTIC_API_KEY;

const client = new Client({
  node: ELASTIC_ENDPOINT,
  auth: {
    apiKey: ELASTIC_API_KEY as string,
  },
  requestTimeout: 60000,
});

async function createIndex() {
  const exists = await client.indices.exists({
    index: ES_INDEX,
  });

  if (!exists) {
    await client.indices.create({
      index: ES_INDEX,
    });
  }
}

export async function addDocument(
  id: string,
  body: {
    user_id: string;
    title: string;
    content: string;
    url: string;
    summery: string;
  }
) {
  try {
    await createIndex();
    const response = await client.index({
      index: ES_INDEX,
      id,
      document: body,
    });
    return response;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}

export async function getDocument(id: string) {
  try {
    const response = await client.get({
      index: ES_INDEX,
      id,
    });
    return response._source;
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

export async function searchDocument(query: string, userId: string) {
  try {
    const response = await client.search({
      index: ES_INDEX,
      size: 5,
      query: {
        bool: {
          must: [
            {
              match: {
                content: query,
              },
            },
            {
              match: {
                user_id: userId,
              },
            },
          ],
        },
      },
    });
    return response.hits.hits.map((hit: any) => ({
      id: hit._id,
      score: hit._score,
      ...hit._source,
    }));
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}

// export async function deleteIndex() {
//   return await client.indices.delete({ index: ES_INDEX });
// }

export default client;
