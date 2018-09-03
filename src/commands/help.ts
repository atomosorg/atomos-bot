import { Client, Message } from 'discord.js';
import { AtomosCommand } from '../lib';
export default class HelpCommand extends AtomosCommand {
    run(msg: Message) {
        msg.reply()
    }
    getName(): string {
        return 'help';
    }
}
