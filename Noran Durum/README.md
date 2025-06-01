# Discord Durum Rol Botu

:warning: **Etik Uyarı:** Bu proje açık kaynak paylaşıldı ancak birebir kopyalanıp 'ben yaptım' denmesi etik değildir.
:bust_in_silhouette: **Geliştirici:** SanchezWasHere?

Bu bot, kullanıcıların Discord durumlarında belirli bir yazı olup olmadığını kontrol eder ve buna göre rol verir/alır.

## Özellikler

- Kullanıcıların durumlarında belirli bir yazı varsa otomatik rol verme
- Durumdan yazı kaldırıldığında rolü geri alma
- Tüm işlemleri log kanalında kaydetme
- Ayarlanabilir rol, log kanalı ve takip edilecek yazı
- Modern ve kullanıcı dostu yardım menüsü
- Offline kullanıcılar için akıllı rol yönetimi

## Kurulum

1. Gerekli paketleri yükleyin:
```bash
npm install
```

2. `.env` dosyasını düzenleyin ve bot tokeninizi ekleyin:
```
BOT_TOKEN=your_bot_token_here
```

3. Botu başlatın:
```bash
npm start
```

## Komutlar

- `/rol-ayarla @rol` - Durumda belirlenen yazı varsa verilecek rolü ayarlar
- `/durum-log #kanal` - Log mesajlarının gönderileceği kanalı ayarlar
- `/yazi-ayarla [yazı]` - Takip edilecek olan yazıyı ayarlar
- `/yardım` - Bot komutları hakkında bilgi verir

## Gereksinimler

- Node.js v16.9.0 veya üzeri
- Discord.js v14
- Bot için gerekli izinler:
  - Presence Intent
  - Guild Members
  - Guild Presences
  - Guilds
  - Guild Messages

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

:crystal_ball: Role System - SanchezWasHere? 