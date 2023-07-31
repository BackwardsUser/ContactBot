import bodyParser from 'body-parser';
import { join } from 'node:path';
import express from 'express';
import { Client, Embed, EmbedBuilder } from 'discord.js';
import { FormBody } from './interfaces';

var app = express();
var port: string = "3000";

export default function init(client: Client) {

    async function postMessage(content: FormBody) {
        var icon = (client.user?.avatarURL()) as string | undefined;
        var messageEmbed = new EmbedBuilder();
        if (content.Other == "") {
            messageEmbed.setDescription(`# A Message has Been Submitted via the Website's Contact Portal. \n ### Message: \n${content.message}\n\n### Sent by: ${content.FullName}\n\n### Contact:\n* *Discord*: \`${content.Discord}\`\n* *Instagram*: \`${content.Instagram}\`\n* *Telephone*: \`${content.Telephone}\`\n\n Make Sure to Contact ${content.FullName} ASAP.`)
            .setColor("Blurple") // Can be replaced with Brand Color.
            .setFooter({
                iconURL: icon, // Can be replaced with Guild URL
                text: `Enter Watermark Here`
            });
        } else {
            var other: string[] = [];
            content.Other.split(",").forEach((oC) => {
                var oc = oC.trimStart().split(":");
                other.push(` * *${oc[0].trimStart()}*: \`${oc[1].trimStart()}\``)
            });
            messageEmbed.setDescription(`# A Message has Been Submitted via the Website's Contact Portal. \n ### Message: \n${content.message}\n\n### Sent by: ${content.FullName}\n\n### Contact:\n* *Discord*: \`${content.Discord}\`\n* *Instagram*: \`${content.Instagram}\`\n* *Telephone*: \`${content.Telephone}\`\n* *Other*:\n${other.join("\n")}.\n\n Make Sure to Contact ${content.FullName} ASAP.`)
            .setColor("Blurple") // Can be replaced with Brand Color.
            .setFooter({
                iconURL: icon, // Can be replaced with Guild URL
                text: `Enter Watermark Here`
            });
        }


        var contactGuild = await client.guilds.fetch("837036139793350718");
        var contactChannel = await contactGuild.channels.fetch("1135577585175236658");
        if (!contactChannel?.isTextBased()) return console.error(`Cannot send a message to ${contactChannel} as it is not Text based.`);
        contactChannel.send({ embeds: [messageEmbed] });
    }

    app.use(express.static(join(__dirname, "..", "public")));
    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))

    app.listen(port, (): void => {
        console.log(`Site now listening to port ${port}`);
    });

    app.get("/", (req, res): void => {
        res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    });

    app.post("/messageSend", (req, res) => {
        res.send('Message Sent!');
        postMessage(req.body);
    });
};