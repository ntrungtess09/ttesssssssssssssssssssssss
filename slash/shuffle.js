const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("thay đổi ngẫu nhiên thứ tự phát lại hàng đợi"),
    run: async ({ client, interaction }) => {
        const embed = new EmbedBuilder();
        const queue = client.player.getQueue(interaction.guild);
        if (!queue || queue.tracks.length === 0) {
            return await interaction.editReply({
                embeds: [
                    embed
                        .setColor(0xFFFFFF)
                        .setTitle("Không có bản nhạc nào trong hàng đợi")
                ]
            });
        }
        queue.shuffle();
        return await interaction.editReply({
            embeds: [
                embed
                    .setColor(0xFFFFFF)
                    .setTitle("Successfully mixed")
            ]
        });
    },
};
