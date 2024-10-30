module.exports = {
    name: 'suggestions',
    description: "Volt Utilities - reaction roles",
    async execute(message, args, client, MessageEmbed) {
        if(message.member.roles.cache.some(r => (r.name === 'Helper') || (r.name === 'Admin'))) {
            const suggestionEmoji = '📝';

            const embed = new MessageEmbed()
                .setTitle('Volt Suggestions Manager')
                .setDescription(`React with 📝 to make a new suggestion. Remember: **Make a new suggestion ONLY if that suggestion hasn't been made yet.**
                `)
                .setColor('#f8ff58')


            let messageEmbed = await message.guild.channels.cache.get('...').send({ embeds: [embed] })
            messageEmbed.react(suggestionEmoji);
        }
        else {
            message.channel.send(`You don't have the permission to do this!`)
        }
    }
}