import { GuildMember, Collection, Message, RichEmbed, Guild } from "discord.js";
import { AtomosCommand } from "../lib";
export default class HelpCommand extends AtomosCommand {
  async run(msg: Message) {
    let toKick: Array<GuildMember> = [];
    let stringOut = "";
    let mems = msg.mentions.members.array();
    let i = 0;
    for (let memI in mems) {
      let mem = mems[memI];
      stringOut = `${stringOut}${mem.user.username}#${mem.user.discriminator}${
        i == mems.length - 1 ? "" : ", "
      }`;
      toKick.push(mem);
      i++;
    }
    let promises = [];
    let kickChannel = await msg.guild.createChannel("kick", "voice");
    for (let toKickI in toKick) {
      let mem = toKick[toKickI];
      if (mem.voiceChannel) {
        promises.push(mem.setVoiceChannel(kickChannel));
      }
    }
    await Promise.all(promises);
    kickChannel.delete();
    const embed: RichEmbed = new RichEmbed()
      .addField("Voice-Kicking", stringOut)
      .setColor(this.genRandomColor());
    msg.channel.send(embed);
  }
  getName(): string {
    return "voicekick";
  }
}
