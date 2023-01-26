const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Di chuyển hàng đợi về phía trước một bài hát"),

    run: async ({ client, interaction }) => {

        const embed = new EmbedBuilder();

        const queue = client.player.getQueue(interaction.guildId);

        if (!queue || queue.tracks.length === 0) {
            return await interaction.editReply({
                embeds: [
                    embed
                        .setColor(0xFFFFFF)
                        .setTitle("Không có bản nhạc nào trong hàng đợi")
                ]
            });
        }

        queue.skip();

        const song = queue.current;
        return await interaction.editReply({
            embeds: [
                embed
                    .setColor(0xFFFFFF)
                    .setTitle(`Pominięto "${song.title}"`)
                    .setDescription(`autorstwa ${song.author}`)

            ]
        });
    }
}