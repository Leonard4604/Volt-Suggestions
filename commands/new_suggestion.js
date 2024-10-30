module.exports = {
    name: 'new_suggestion',
    description: "Volt Utilities - reaction roles",
    async execute(client, MessageEmbed, directMessage, reaction, user, startTime, finishTime, status) {
        if (directMessage.author.bot) return;
        if (status) return;
        if (finishTime - startTime >= 120) {
            await reaction.message.guild.members.cache.get(user.id).send(`Timeout!`);

            return;
        }

        const confirmEmoji = '<:positive:...>';
        const impartialEmoji = '<:impartial:...>';
        const rejectEmoji = '<:negative:...>';

        const embed = new MessageEmbed()
            .setAuthor(directMessage.author.tag, directMessage.author.displayAvatarURL({ dynamic: true }))
            .setTitle('New Suggestion Pending')
            .setDescription(directMessage.content)
            .setColor('#f8ff58')
            .setTimestamp()

        directMessage.channel.send('Submitted suggestion!');

        let messageEmbed = await client.channels.cache.get('...').send({ embeds: [embed] })
        messageEmbed.react(confirmEmoji);
        messageEmbed.react(impartialEmoji);
        messageEmbed.react(rejectEmoji);

        return true;
    }
}