const { Client, Intents, Collection, MessageEmbed  } = require('discord.js');

const client = new Client({
	intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
	partials: [
        'MESSAGE',
        'CHANNEL', 
        'REACTION'
    ],
});

const prefix = '.'

const fs = require('fs');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Volt Suggestions is online!')

    client.user.setActivity('Volt Users Suggestions', { type: 'WATCHING' });
})

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'suggestions') {
        client.commands.get('suggestions').execute(message, args, client, MessageEmbed);
    }
    else if (command === 'accept_suggestion') {
        client.commands.get('accept_suggestion').execute(message, args, client, MessageEmbed);
    }
    else if (command === 'deny_suggestion') {
        client.commands.get('deny_suggestion').execute(message, args, client, MessageEmbed);
    }
})


client.on('messageReactionAdd', async (reaction, user) => {
  const suggestionEmoji = '📝';
  const channel = '...'
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id == channel) {
      if (reaction.emoji.name === suggestionEmoji) {
          // Send DM and remove reaction from the user
          await reaction.message.guild.members.cache.get(user.id).send(`You've **2 minutes** to reply and add your suggestion!`);

          await reaction.users.remove(user.id);

          const startTime = new Date().getTime() / 1000;
          let status = false;

          client.on('messageCreate', async (directMessage) => {
              // If it's a DM
              if (directMessage.guild == null && directMessage.author.id !== 'botDiscordId') {
                  const finishTime = new Date().getTime() / 1000;

                  const res = await client.commands.get('new_suggestion').execute(client, MessageEmbed, directMessage, reaction, user, startTime, finishTime, status);
              
                  if (res && res !== undefined) {
                      status = true;

                      return true;
                  }
              }
          })
      }
    }
    else {
        return;
    }
});



client.login('...');