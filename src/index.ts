import { Client, Collection, Message } from 'discord.js';
import * as debug from 'debug';
import * as fs from 'fs';
import * as path from 'path';
import { AtomosCommand } from './lib';
import HelpCommand from './commands/help';
import { V4MAPPED } from 'dns';
const prefix = 'atom!'
debug('prelaunch')(process.cwd())
if (!fs.existsSync(path.join(process.cwd(), 'cred.secret.json'))) {
    debug('prelaunch')('Credential file does not exist.')
    process.exit(1)
}
const cred: any = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'cred.secret.json')).toString())

const client: Client = new Client();
const dbg = debug('atomos-bot');
console.log('Please export an variable: DEBUG=*')
let commands: Collection<String, AtomosCommand> = new Collection<String, AtomosCommand>();

client.on('ready', async () => {
    dbg('Logged in. Ready')
    let commandsFS = fs.readdirSync(path.join(__dirname, 'commands'));
    let modules: any = {};
    for (let commandI in commandsFS) {
        let command = commandsFS[commandI];
        // let commandReq: AtomosCommand = require(path.join(__dirname, 'commands', command));
        let commandReq: AtomosCommand = new (require(path.resolve(__dirname, 'commands', command))).default(client)
        commands.set(commandReq.getName(), commandReq)
        //let commandReq: AtomosCommand = require(path.join(__dirname, 'commands', command))
    }
});
client.on('message', (message: Message) => {
    let msgParts: Array<string> = message.toString().split(' ');
    if (msgParts[0].startsWith(prefix)) {
        msgParts[0] = msgParts[0].replace(prefix, '')
        if (commands.has(msgParts[0])) {
            commands.get(msgParts[0])!.run(message) //Oh the beauty
        }
    }
})
dbg('Logging in with credentials stored in cred.secret.json')
client.login(cred['token']);

