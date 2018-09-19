import { Client, Message, RichEmbed } from "discord.js";
import { AtomosCommand } from "../lib";
import { hostname, cpus } from "os";
export default class InfoCommand extends AtomosCommand {
  async run(msg: Message) {
    if (msg.author.id == "133885827523674112") {
      const embed: RichEmbed = new RichEmbed()
        .addField("Host", hostname(), true)
        .addField("CPU's", cpus().length, true)
        .addField("Guilds", msg.client.guilds.array().length, true)
        .addField("Unique users", msg.client.users.array().length, true)
        .setColor(this.genRandomColor());

      msg.channel.send(embed);
    }
  }
  getName(): string {
    return "info";
  }
}
