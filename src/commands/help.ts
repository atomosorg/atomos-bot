import { Client, Message, RichEmbed } from 'discord.js';
import { AtomosCommand } from '../lib';
export default class HelpCommand extends AtomosCommand {
    run(msg: Message) {
        const embed: RichEmbed = new RichEmbed()
            .addField('help', 'Displays this')
            .setColor(this.genRandomColor())
        msg.channel.send(embed)
    }
    getName(): string {
        return 'help';
    }
}
