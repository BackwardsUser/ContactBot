import { Client, Events, GatewayIntentBits, Message } from "discord.js";
import site from "./site";
import {config} from "dotenv";
config();

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

client.login(process.env.TOKEN);