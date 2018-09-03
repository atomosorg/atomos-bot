import { Client, Collection, Message } from 'discord.js';
import * as debug from 'debug';
class Command {
    required: any;
    dclient: Client;
    constructor(requireLoc: string, client: Client) {
        this.required = require(requireLoc)
        this.dclient = client;
    }
    run(message: Message) {
        this.required.cmdrun(message, this.dclient);
    }
    getAliases() {
        return this.required.cmdaliases;
    }
    getName() {
        return this.required.cmdname;
    }
}
const client: Client = new Client();
const dbg = debug('atomos-bot');
console.log('Please export an variable: DEBUG=*')
let data: Collection<String, Command>;
client.on('ready', () => {
    dbg('ready')
});
dbg('Logging in with credentials stored in cred.json')