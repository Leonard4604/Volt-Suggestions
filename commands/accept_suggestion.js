module.exports = {
  name: 'accept_suggestion',
  description: "Volt Utilities - reaction roles",
  async execute(message, args, client, MessageEmbed) {
    if (message.member.roles.cache.some(r => (r.name === 'Helper') || (r.name === 'Admin'))) {
      if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
      const messageID = args[0];
      const acceptQuery = args.slice(1).join(" ");

      if (!messageID) return message.reply('Please specify a message id!')
      if (!acceptQuery) return message.reply('Please specify a reason!')
      try {
        const suggestionChannel = message.guild.channels.cache.get('...');
        const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);

        const data = suggestedEmbed.embeds[0]

        const acceptEmbed = new MessageEmbed()
          .setAuthor(data.author.name, data.author.iconURL)
          .setTitle(`Suggestion Accepted by ${message.author.tag}`)
          .setDescription(data.description)
          .setColor('#009900')
          .addField("Reason", acceptQuery);

        suggestedEmbed.edit({ embeds: [acceptEmbed] });
        message.channel.send(`Accepted suggestion`)

        const user = await client.users.cache.find(
          u => u.tag === data.author.name
        );
        user.send(`Your suggestion has been accepted by ${message.author.tag}.`)
      }
      catch (err) {
        console.log(err)
        message.cannel.send(`This suggestion does't exist!`)
      }
    }
    else {
      message.channel.send(`You don't have the permission to do this!`)
    }
  }
}