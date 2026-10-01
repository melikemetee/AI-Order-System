# Yapay Zeka Destekli Sipariş Sistemi

Yapay zeka destekli bir sipariş sistemi. Kullanıcı, siparişini doğal bir cümle ile yazar. Sistem, yapay zeka kullanarak sipariş içerisindeki ürün, adet, müşteri adı, telefon ve adres bilgilerini çıkarır. Eksik bilgiler tamamlandıktan sonra sipariş onaylanarak veritabanına kaydedilir.

## Proje Özellikleri

* Doğal dil ile sipariş oluşturma
* Yapay zeka ile sipariş bilgilerinin çıkarılması
* Eksik bilgilerin kontrol edilmesi
* Ürün ve stok kontrolü
* Toplam fiyatın sistemdeki ürün fiyatına göre hesaplanması
* Sipariş onayı
* Siparişin veritabanına kaydedilmesi
* Sipariş numarası oluşturulması
* Admin paneli
* Sipariş durumunu güncelleme

## Kullanılan Teknolojiler

### Frontend

* React.js
* Vite
* CSS

### Backend

* PHP
* Laravel
* REST API

### AI Service

* Python
* Flask
* Google Gemini API

### Database

* PostgreSQL

## Proje Yapısı

```text
AI-Order-System
│
├── ai-service
│   ├── app.py
│   ├── requirements.txt
│   └── .env
│
├── backend
│   ├── app
│   │   ├── Http
│   │   │   └── Controllers
│   │   │       └── OrderController.php
│   │   └── Models
│   │       ├── Order.php
│   │       └── Product.php
│   │
│   ├── database
│   │   └── migrations
│   │
│   └── routes
│       └── api.php
│
└── frontend
    └── src
        ├── App.jsx
        ├── Admin.jsx
        ├── App.css
        └── index.css
```

## Proje Kapsamında Geliştirilen Dosyalar

### AI Service

**`ai-service/app.py`**

Python ve Flask kullanılarak oluşturulan AI servisidir. Kullanıcının yazdığı sipariş mesajını Gemini API'ye gönderir ve aşağıdaki bilgileri çıkarmaya çalışır:

* Ürün
* Adet
* Ad Soyad
* Telefon
* Adres

### Frontend

**`frontend/src/App.jsx`**

Ana sipariş ekranıdır. Kullanıcının mesajını AI servisine gönderir, gelen bilgileri gösterir, eksik bilgileri kontrol eder ve siparişin onaylanmasını sağlar.

**`frontend/src/Admin.jsx`**

Admin panelidir. Kayıtlı siparişleri gösterir ve sipariş durumunun değiştirilmesini sağlar.

**`frontend/src/App.css`**

Sipariş ekranının tasarımı için kullanılan CSS dosyasıdır.

**`frontend/src/index.css`**

Genel sayfa stillerinin bulunduğu CSS dosyasıdır.

### Backend

**`backend/routes/api.php`**

Ürünleri ve siparişleri yönetmek için kullanılan API route'larını içerir.

**`backend/app/Http/Controllers/OrderController.php`**

Sipariş oluşturma, ürün kontrolü, stok kontrolü, toplam fiyat hesaplama ve sipariş durumunun güncellenmesi işlemlerini gerçekleştirir.

**`backend/app/Models/Order.php`**

Sipariş verileri için kullanılan Laravel modelidir.

**`backend/app/Models/Product.php`**

Ürün verileri için kullanılan Laravel modelidir.

### Database

Ürün ve sipariş bilgilerinin PostgreSQL veritabanında tutulması için gerekli migration dosyaları kullanılmıştır.

## Sipariş Süreci

Sistem temel olarak aşağıdaki şekilde çalışır:

```text
Kullanıcı
   ↓
Sipariş mesajı
   ↓
React
   ↓
Python / Flask
   ↓
Gemini AI
   ↓
Sipariş bilgileri
   ↓
Eksik bilgi kontrolü
   ↓
Sipariş onayı
   ↓
Laravel API
   ↓
PostgreSQL
   ↓
Sipariş numarası
```

## Örnek Sipariş

Kullanıcı aşağıdaki gibi bir mesaj yazabilir:

```text
2 adet USB Bellek 64GB istiyorum.
Adım Melike Mete.
Telefon numaram 05321234567.
Adresim İstanbul Kadıköy Caferağa Mahallesi.
```

Sistem bu mesajdan:

```text
Ürün: USB Bellek 64GB
Adet: 2
Müşteri: Melike Mete
Telefon: 05321234567
Adres: İstanbul Kadıköy Caferağa Mahallesi
```

bilgilerini çıkarır.

Ürünün sistemdeki fiyatı kontrol edilir ve toplam tutar hesaplanır.

Örneğin:

```text
USB Bellek 64GB: 400 TL
Adet: 2

Toplam: 800 TL
```

Kullanıcı siparişi onayladıktan sonra sipariş veritabanına kaydedilir ve sipariş numarası gösterilir.

## Admin Paneli

Admin panelinde kayıtlı siparişler görüntülenebilir.

Sipariş bilgilerinde:

* Sipariş numarası
* Müşteri adı
* Ürün
* Adet
* Telefon
* Adres
* Toplam fiyat
* Sipariş durumu

görüntülenebilir.

Sipariş durumu aşağıdaki seçeneklerden biri olarak güncellenebilir:

```text
pending
confirmed
shipped
completed
```

## Kurulum

### 1. Projeyi klonlayın

```bash
git clone https://github.com/melikemetee/AI-Order-System.git
cd AI-Order-System
```

### 2. Backend kurulumu

```bash
cd backend
composer install
```

`.env` dosyasını oluşturun ve PostgreSQL veritabanı bilgilerinizi girin.

Ardından:

```bash
php artisan migrate
```

Laravel sunucusunu başlatın:

```bash
php artisan serve
```

Backend:

```text
http://127.0.0.1:8000
```

### 3. AI Service kurulumu

```bash
cd ai-service
```

Python sanal ortamını oluşturun:

```bash
python -m venv venv
```

Sanal ortamı aktif edin ve gerekli paketleri yükleyin:

```bash
pip install -r requirements.txt
```

`.env` dosyasına Gemini API anahtarınızı ekleyin:

```text
GEMINI_API_KEY=your_api_key
```

AI servisini başlatın:

```bash
python app.py
```

AI Service:

```text
http://127.0.0.1:5000
```

### 4. Frontend kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Admin paneli:

```text
http://localhost:5173/admin
```

## Önemli Not

API anahtarı gibi özel bilgiler GitHub'a yüklenmemiştir. `.env` dosyası `.gitignore` içerisinde tutulmuştur.

## Proje Durumu

Proje kapsamında sipariş oluşturma, AI ile bilgi çıkarma, eksik bilgi kontrolü, stok kontrolü, veritabanına kayıt ve admin paneli işlemleri tamamlanmıştır.
