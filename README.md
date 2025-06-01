
<p align="center">
  <img src="durum.png" alt="Discord Durum Rol Botu" width="600"/>
</p>

# 💠 Noran-Durum-Rol

> Kullanıcıların Discord profil durumlarına göre **otomatik rol** veren ve yöneten gelişmiş sistem.  
> ⚙️ Geliştirildi: **SanchezWasHere?** | 🤖 Destek: **ChatGPT AI** ile

---

## ⚠️ Etik Uyarı
Bu proje açık kaynak olarak paylaşılmıştır ancak birebir kopyalanıp "**ben yaptım**" denmesi **etik değildir**.  
Lütfen emeğe saygı gösterin.

---

## 🚀 Özellikler

- 🔍 Discord durumunda belirli yazı varsa otomatik rol verme
- ❌ Yazı kaldırıldığında rolün geri alınması
- 🧾 Embed destekli log sistemi
- 🛠️ Komutlarla ayarlanabilir sistem: yazı, rol ve log kanalı
- 🎛️ Modern, butonlu ve kategorize edilmiş yardım menüsü
- 🧠 Offline kullanıcıları dikkate alan akıllı kontrol
- 📊 Durumda yazıyı kullananları listeleme

---

## 🧩 Kurulum

```bash
npm install
```

`settings.json` dosyasına bot tokeninizi ekleyin:
```
token=your_bot_token_here
```

Botu başlatın:
```bash
npm start
```

---

## 💬 Komutlar

| Komut                  | Açıklama |
|------------------------|----------|
| `/rol-ayarla @rol`     | Durumu yapanlara verilecek rolü ayarlar |
| `/durum-log #kanal`    | Log embedlerinin gönderileceği kanalı ayarlar |
| `/yazi-ayarla [yazı]`  | Takip edilecek durumu belirler |
| `/yardım`              | Yardım menüsünü gösterir |
| `📋 Durum Yapanlar`     | (Yardım menüsündeki butonla) aktif kullanıcıları listeler |

---

## 📦 Gereksinimler

- Node.js `v16.9.0` veya üzeri
- Discord.js `v14`
- Aşağıdaki Discord intent izinleri:
  - Presence Intent
  - Guild Members
  - Guild Presences
  - Guilds
  - Guild Messages

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---

## 🧠 Not

Bu proje **ChatGPT ve diğer yapay zeka araçlarının** katkısıyla geliştirilmiştir.  
Geliştirici imzası: `SanchezWasHere?`

---
