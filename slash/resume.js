const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Phát lại bản nhạc đã dừng"),
    run: async ({ client, interaction }) => {

        let embed = new EmbedBuilder();

        const queue = client.player.getQueue(interaction.guild);

        if (!queue) {
            return await interaction.editReply({
                embeds: [
                    embed
                        .setColor(0xFFFFFF)
                        .setTitle("Không có bản nhạc nào trong hàng đợi")
                ]
            });
        }

        if (!interaction.member.voice.channel) {
            return interaction.editReply({
                embeds: [
                    embed
                        .setColor(0xFFFFFF)
                        .setTitle(":raccoon: Bạn phải kết nối với trò chuyện thoại để sử dụng lệnh này")
                ]
            });
        }

        queue.setPaused(false);

        return await interaction.editReply({
            embeds: [
                embed
                    .setColor(0xFFFFFF)
                    .setTitle("Tôi đang phát lại hàng đợi")
            ]
        });
    }
} 