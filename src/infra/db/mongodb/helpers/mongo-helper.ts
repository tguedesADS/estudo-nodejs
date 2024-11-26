import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
    client: null as MongoClient,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async connect (uri: string): Promise<void> {
        this.client = await MongoClient.connect(process.env.MONGO_URL);
    },

    async disconnect() {
        await this.client.close();
    },

    getCollection(name: string): Collection {
        return this.client.db().collection(name);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapDocument: (document: any): any => {
        const { _id, ...rest } = document;
        return { ...rest, id: _id.toString() };
    }
};
