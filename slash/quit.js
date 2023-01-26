const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Ngắt kết nối bot khỏi kênh thoại"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guild);
        let embed = new EmbedBuilder();
        if (queue) {
            queue.stop();
            return interaction.editReply({
                embeds: [
                    embed
                        .setColor(0xFFFFFF)
                        .setTitle("Trò chuyện thoại bị ngắt kết nối")
                ]
            });
        } else {
            interaction.editReply({
                embeds: [
                    embed
                        .setColor(0xFFFFFF)
                        .setTitle("Bot này không có trong trò chuyện thoại")
                ]
            });
        }
    },
};