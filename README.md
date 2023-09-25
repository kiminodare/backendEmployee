
# Aldera Angular Pre-Test

## How to use
1. Clone the repo
``` bash
git clone https://github.com/kiminodare/backendEmployee.git
```

2. Install dependencies <br>

- Unduh kedua folder yang ada di repositori GitHub ini.
- Buka folder backendEmployee di terminal atau cmd dengan path ke folder tersebut.
- Jalankan perintah ``` yarn install ``` untuk menginstal semua dependensi yang dibutuhkan.
- Setup .env dengan kode berikut
```
HOST="localhost"
PORT="3000"
DATABASE_URL="mysql://(username:password)@localhost:3306/(letakdatabase)"
LOG_LEVEL="silent"
```
- Setelah selesai, jalankan perintah ``` npx tsc -w``` lalu akses backend server di http://localhost:3000.

## 🧑🏻‍💻 Usage

- Gunakan Postman atau web browser untuk berinteraksi dengan backend server.
- Generate data terlebih dahulu, buka URL http://localhost:3000/employees/generate.
- Setelah berhasil, data karyawan contoh akan tersedia untuk digunakan.

##

3. Instalasi Frontend

-  Clone repo angular di    ``` git clone https://github.com/kiminodare/AngularAldera.git ```
- Buka folder AngularAldera di terminal atau cmd.
-   Jalankan perintah ``` yarn install ``` untuk menginstal semua dependensi yang dibutuhkan.
-    Jalankan perintah ``` ng serve ``` atau ``` npm start ``` untuk menjalankan aplikasi Angular.
-    Aplikasi akan berjalan di http://localhost:4200.