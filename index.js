import 'dotenv/config';
import { Voice } from '@signalwire/realtime-api';

const client = new Voice.Client({
    project: process.env.PROJECTID,
    token: process.env.TOKEN,
    host: 'relay.swire.io',
    contexts: ['relaymlpoc']
});

/* YAML Example */
// let action = `
//                 sections:
//                 main:
//                 - answer
//                 - play: "say:Hello World!"
//                 - hangup
//             `;

/* JSON Example -  */
let action = JSON.stringify({
    "sections": {
        "main": [
            "answer",
            {
                "play": "say:Hello World!"
            },
            "hangup"
        ]
    }
});

client.on("call.received", async (call) => {
    try {
        console.log(`[CALL EVENT] ${call}`);

        await client.execute({
            method: 'calling.transfer',
            params: {
                node_id: call.nodeId,
                call_id: call.callId,
                dest: action
            }
        })
    } catch (err) {
        console.log(`[ERROR] ${err}`);
    }
});