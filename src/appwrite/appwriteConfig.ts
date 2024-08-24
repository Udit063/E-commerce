import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66c9013b0009df2c899a");

export const account = new Account(client);
export const databases = new Databases(client);
