import { Client, Collection, Message } from 'discord.js';

class AtomosCommand {
    dclient: Client;
    constructor(client: Client) {
        this.dclient = client;
    }
    run(message: Message) {
        // Implement in Command Class.
    }
    getName(): string {
        throw new Error('This class may not be used directly.');
        //return '';
        // Implement in Command Class.
    }
}

export { AtomosCommand };
