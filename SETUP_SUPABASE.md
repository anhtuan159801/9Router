# Supabase Setup Guide

## Đã hoàn thành
- ✅ Tạo schema SQL (`supabase/schema.sql`)
- ✅ Tạo file `.env.local` với API keys
- ✅ Tạo Supabase client (`src/lib/supabase.js`)
- ✅ Tạo Supabase DB layer (`src/lib/supabaseDb.js`)
- ✅ Tạo DB wrapper (`src/lib/db.js`)

## Cần cài đặt thủ công

### Bước 1: Cài đặt Supabase SDK
```bash
npm install @supabase/supabase-js
# hoặc
yarn add @supabase/supabase-js
```

### Bước 2: Chạy schema trong Supabase Dashboard
1. Vào https://supabase.com/dashboard
2. Chọn project của bạn
3. Truy cập **SQL Editor**
4. Copy nội dung từ `supabase/schema.sql`
5. Chạy SQL

### Bước 3: Khởi động app
```bash
npm run dev
```

### Bước 4: Đăng nhập
- URL: http://localhost:20128
- Password: `123456`

## Kiểm tra
Sau khi đăng nhập thành công, dữ liệu sẽ được lưu trực tiếp vào Supabase thay vì file local.