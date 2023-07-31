import { Client, Events, GatewayIntentBits, Message } from "discord.js";
import site from "./site";

var intents: GatewayIntentBits[] = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]

var client = new Client({
    intents: intents
});

client.once(Events.ClientReady, async () => {
    console.log(`Successfully Logged in as ${client.user?.tag}`);
    site(client);
});

client.login("NzUyOTgxMzQ0NzUzMjg3MjQ1.GKMYpP.aVUqLH5ujcWi9Liwwt9PZZVV3yVpSkl4iQae6k");