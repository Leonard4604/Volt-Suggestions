module.exports = {
    name: 'deny_suggestion',
    description: "Volt Utilities - reaction roles",
    async execute(message, args, client, MessageEmbed) {
        if(message.member.roles.cache.some(r => (r.name === 'Helper') || (r.name === 'Admin'))) {
            if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
            const messageID = args[0];
            const denyQuery = args.slice(1).join(" ");

            if (!messageID) return message.reply('Please specify a message id!')
            if (!denyQuery) return message.reply('Please specify a reason!')
            try {
                const suggestionChannel = message.guild.channels.cache.get('...');
                const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);

                const data = suggestedEmbed.embeds[0]

                const denyEmbed = new MessageEmbed()
                    .setAuthor(data.author.name, data.author.iconURL)
                    .setTitle(`Suggestion Denied by ${message.author.tag}`)
                    .setDescription(data.description)
                    .setColor('#e50000')
                    .addField("Reason", denyQuery);

                suggestedEmbed.edit({ embeds: [denyEmbed] });
                message.channel.send(`Denied suggestion`)

                const user = await client.users.cache.find(
                    u => u.tag === data.author.name
                );
                user.send(`Your suggestion has been denied by ${message.author.tag}.`)
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