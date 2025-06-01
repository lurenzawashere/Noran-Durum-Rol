// :crystal_ball: Role System - SanchezWasHere?
// @dev SanchezWasHere? - Core Logic
// Encoded Signature: U2FuY2hlekF6YXppbD8= (Base64 - SanchezAzazil?)

const { Client, GatewayIntentBits, Partials, Collection, Events, REST, Routes, SlashCommandBuilder, EmbedBuilder, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

// SanchezWasHere? - System Initialization
console.log("✅ SYSTEM by SanchezWasHere?");

// Bot ayarlarını yükle
const settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8'));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
    ],
    partials: [Partials.User, Partials.GuildMember]
});

// Slash komutları
const commands = [
    new SlashCommandBuilder()
        .setName('rol-ayarla')
        .setDescription('Durumda belirlenen yazı varsa verilecek rolü ayarlar')
        .addRoleOption(option =>
            option.setName('rol')
                .setDescription('Verilecek rol')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('durum-log')
        .setDescription('Log mesajlarının gönderileceği kanalı ayarlar')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('Log kanalı')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('yazi-ayarla')
        .setDescription('Takip edilecek olan yazıyı ayarlar')
        .addStringOption(option =>
            option.setName('yazi')
                .setDescription('Takip edilecek yazı')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Bot komutları hakkında bilgi verir')
].map(command => command.toJSON());

// Komutları kaydet
const rest = new REST({ version: '10' }).setToken(settings.token);

// Bot durumunu güncelle
async function updateBotPresence() {
    try {
        let totalUsers = 0;

        // Tüm sunucuları kontrol et
        for (const guild of client.guilds.cache.values()) {
            const guildId = guild.id;
            const statusText = await db.get(`guild_${guildId}.statusText`);
            
            if (!statusText) continue;

            // Sunucudaki tüm üyeleri kontrol et
            const members = await guild.members.fetch();
            const usersWithStatus = members.filter(member => {
                const status = member.presence?.activities?.find(a => a.type === 4)?.state || '';
                return status.includes(statusText);
            });

            totalUsers += usersWithStatus.size;
        }

        // Bot durumunu güncelle
        client.user.setPresence({
            activities: [{
                name: `✨ | Durumu yapan: ${totalUsers} kişi`,
                type: ActivityType.Watching
            }],
            status: 'online'
        });
    } catch (error) {
        console.error('Bot durumu güncellenirken hata:', error);
    }
}

client.once(Events.ClientReady, async () => {
    try {
        console.log('Bot hazır!');
        await rest.put(
            Routes.applicationGuildCommands(settings.clientId, settings.guildId),
            { body: commands }
        );

        // İlk durum güncellemesi
        await updateBotPresence();

        // Her 30 saniyede bir durumu güncelle
        setInterval(updateBotPresence, 30000);
    } catch (error) {
        console.error('Komutlar kaydedilirken hata oluştu:', error);
    }
});

// Komut işleyicisi
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand() && !interaction.isButton()) return;

    const { commandName } = interaction;
    const guildId = interaction.guildId;

    if (commandName === 'rol-ayarla') {
        const role = interaction.options.getRole('rol');
        await db.set(`guild_${guildId}.roleId`, role.id);
        await interaction.reply(`<:verify:1365604616225689600> **Rol başarıyla ayarlandı:** ${role.name}`);
    }
    else if (commandName === 'durum-log') {
        const channel = interaction.options.getChannel('kanal');
        await db.set(`guild_${guildId}.logChannelId`, channel.id);
        await interaction.reply(`<:verify:1365604616225689600> **Log kanalı başarıyla ayarlandı:** ${channel}`);
    }
    else if (commandName === 'yazi-ayarla') {
        const text = interaction.options.getString('yazi');
        await db.set(`guild_${guildId}.statusText`, text);
        await interaction.reply(`<:verify:1365604616225689600> **Takip edilecek yazı başarıyla ayarlandı:** "${text}"`);
    }
    else if (commandName === 'yardım') {
        const embed = new EmbedBuilder()
            .setTitle('⭐ Role System • Yardım Menüsü')
            .setColor('#8d00ff')
            .setDescription('Aşağıdan bir kategori seçerek komutları görüntüleyebilirsin.')
            .setFooter({ 
                text: '© NORAN • SanchezWasHere?',
                iconURL: interaction.guild.iconURL()
            });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('setup-SanchezWasHere')
                    .setLabel('🛠️ Kurulum')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('info-SanchezWasHere')
                    .setLabel('📊 Bilgi')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('system-SanchezWasHere')
                    .setLabel('⚙️ Sistem')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('durum_list-SanchezWasHere')
                    .setLabel('📋 Durum Yapanlar')
                    .setStyle(ButtonStyle.Primary)
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
    else if (interaction.isButton()) {
        const { customId } = interaction;

        if (customId === 'setup-SanchezWasHere') {
            const embed = new EmbedBuilder()
                .setTitle('🛠️ Kurulum Komutları')
                .setColor('#8d00ff')
                .setDescription('Sistemi kurmak için gerekli komutlar:')
                .addFields(
                    { name: '`/yazı-ayarla [yazı]`', value: 'Takip edilecek durumu ayarlar.', inline: false },
                    { name: '`/rol-ayarla [@rol]`', value: 'Yazıyı durumuna alanlara verilecek rol.', inline: false },
                    { name: '`/durum-log [#kanal]`', value: 'Embed loglarının gönderileceği kanalı ayarlar.', inline: false }
                )
                .setFooter({ 
                    text: '© WasHere? 2025 • Her şey izleniyor...',
                    iconURL: interaction.guild.iconURL()
                });

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        else if (customId === 'info-SanchezWasHere') {
            const embed = new EmbedBuilder()
                .setTitle('📊 Bilgi Komutları')
                .setColor('#8d00ff')
                .setDescription('Sistem hakkında bilgi alabileceğiniz komutlar:')
                .addFields(
                    { name: '`/yardım`', value: 'Bu menüyü tekrar görüntüler.', inline: false }
                )
                .setFooter({ 
                    text: '© WasHere? 2025 • Her şey izleniyor...',
                    iconURL: interaction.guild.iconURL()
                });

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        else if (customId === 'system-SanchezWasHere') {
            // Ayarları veritabanından al
            const roleId = await db.get(`guild_${interaction.guildId}.roleId`);
            const logChannelId = await db.get(`guild_${interaction.guildId}.logChannelId`);
            const statusText = await db.get(`guild_${interaction.guildId}.statusText`);

            // Ayarların durumunu kontrol et
            const isComplete = roleId && logChannelId && statusText;
            
            const embed = new EmbedBuilder()
                .setTitle('⚙️ Güncel Sistem Ayarları')
                .setColor('#8d00ff')
                .setDescription(isComplete ? '📌 Şu anki bot ayarları:' : '⚠️ Ayarlar tamamlanmamış:')
                .addFields(
                    { 
                        name: '• Durum Yazısı', 
                        value: statusText ? `\`${statusText}\`` : '[⛔ Ayarlanmamış]',
                        inline: false 
                    },
                    { 
                        name: '• Verilecek Rol', 
                        value: roleId ? `<@&${roleId}>` : '[⛔ Ayarlanmamış]',
                        inline: false 
                    },
                    { 
                        name: '• Log Kanalı', 
                        value: logChannelId ? `<#${logChannelId}>` : '[⛔ Ayarlanmamış]',
                        inline: false 
                    }
                )
                .setFooter({ 
                    text: '© WasHere? 2025 • Her şey izleniyor...',
                    iconURL: interaction.guild.iconURL()
                });

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        else if (customId === 'durum_list-SanchezWasHere') {
            const statusText = await db.get(`guild_${interaction.guildId}.statusText`);
            
            if (!statusText) {
                await interaction.reply({ 
                    content: '❌ Önce `/yazi-ayarla` komutu ile takip edilecek yazıyı ayarlamalısınız.',
                    ephemeral: true 
                });
                return;
            }

            // Sunucudaki tüm üyeleri kontrol et
            const members = await interaction.guild.members.fetch();
            const usersWithStatus = members.filter(member => {
                // Offline kullanıcıları hariç tut
                if (member.presence?.status === "offline") return false;
                
                const status = member.presence?.activities?.find(a => a.type === 4)?.state || '';
                return status.includes(statusText);
            });

            if (usersWithStatus.size === 0) {
                await interaction.reply({ 
                    content: '❌ Şu anda belirlenen yazıyı kullanan kimse yok.',
                    ephemeral: true 
                });
                return;
            }

            // Kullanıcı listesini oluştur
            const userList = usersWithStatus.map(member => `- ${member}`).join('\n');

            // Embed oluştur
            const embed = new EmbedBuilder()
                .setTitle('📋 Durumu Kullananlar')
                .setColor('#8d00ff')
                .setDescription(`📋 Şu anda \`${statusText}\` yazısını durumuna almış ${usersWithStatus.size} kişi var:\n\n${userList}`)
                .setFooter({ 
                    text: `${interaction.guild.name}`,
                    iconURL: interaction.guild.iconURL()
                });

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
});

// Durum değişikliği kontrolü
client.on(Events.PresenceUpdate, async (oldPresence, newPresence) => {
    const guildId = newPresence.guild.id;
    
    // Sunucu ayarlarını veritabanından al
    const roleId = await db.get(`guild_${guildId}.roleId`);
    const logChannelId = await db.get(`guild_${guildId}.logChannelId`);
    const statusText = await db.get(`guild_${guildId}.statusText`);

    if (!roleId || !logChannelId || !statusText) return;

    const guild = newPresence.guild;
    const member = newPresence.member;
    const logChannel = guild.channels.cache.get(logChannelId);
    const role = guild.roles.cache.get(roleId);

    if (!logChannel || !role) return;

    // Kullanıcı offline ise işlem yapma
    if (newPresence.status === "offline") return;

    const oldStatus = oldPresence?.activities?.find(a => a.type === 4)?.state || '';
    const newStatus = newPresence.activities?.find(a => a.type === 4)?.state || '';

    const hasStatus = newStatus.includes(statusText);
    const hadStatus = oldStatus.includes(statusText);

    if (hasStatus && !hadStatus) {
        // Kullanıcının zaten rolü var mı kontrol et
        if (member.roles.cache.has(roleId)) return;

        // Rol verme
        try {
            await member.roles.add(role);
            const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
            
            const embed = new EmbedBuilder()
                .setTitle('<a:rules:1365638898029564016> Sanchez Role System')
                .setColor('#7900ff')
                .addFields(
                    { name: '<:hii:1365601456819802174> Kullanıcı', value: `${member}`, inline: true },
                    { name: '<a:arrow:1365602061126729799> Durum', value: `\`${statusText}\``, inline: true },
                    { name: '<a:starr:1365599071968034887> Açıklama', value: `${role} verildi.`, inline: true }
                )
                .setFooter({ 
                    text: `${guild.name} • bugün saat ${time}`,
                    iconURL: guild.iconURL()
                });

            if (member.user.avatarURL()) {
                embed.setThumbnail(member.user.avatarURL());
            }

            await logChannel.send({ embeds: [embed] });
            
            // Durum değişikliğinden sonra bot durumunu güncelle
            await updateBotPresence();
        } catch (error) {
            console.error('Rol verilirken hata:', error);
        }
    } else if (!hasStatus && hadStatus && newPresence.status !== "offline") {
        // Rol alma - sadece kullanıcı aktif ve durumdan yazı kaldırılmışsa
        try {
            await member.roles.remove(role);
            const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
            
            const embed = new EmbedBuilder()
                .setTitle('<a:rules:1365638898029564016> Sanchez Role System')
                .setColor('#7900ff')
                .addFields(
                    { name: '<:hii:1365601456819802174> Kullanıcı', value: `${member}`, inline: true },
                    { name: '<a:arrow:1365602061126729799> Durum', value: `\`${statusText}\``, inline: true },
                    { name: '<a:starr:1365599071968034887> Açıklama', value: `${role} geri alındı.`, inline: true }
                )
                .setFooter({ 
                    text: `${guild.name} • bugün saat ${time}`,
                    iconURL: guild.iconURL()
                });

            if (member.user.avatarURL()) {
                embed.setThumbnail(member.user.avatarURL());
            }

            await logChannel.send({ embeds: [embed] });
            
            // Durum değişikliğinden sonra bot durumunu güncelle
            await updateBotPresence();
        } catch (error) {
            console.error('Rol alınırken hata:', error);
        }
    }
});

// Gizli imza fonksiyonu
function SanchezWasHereSignature() {
    return "Developed by SanchezWasHere?";
}

// Botu başlat
client.login(settings.token); 