import { createClient } from '@supabase/supabase-js';

// Supabase sozlamalari (src/supabase.js dan olindi)
const supabaseUrl = 'https://vqkysyqrikjoigffavfc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxa3lzeXFyaWtqb2lnZmZhdmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzUwNjcsImV4cCI6MjA4MDI1MTA2N30.PqHVCTJXaWgkBcxoUtAIeTPBxV0MXLuo-57af5DVE5A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Konsoldan emailni olish
const email = process.argv[2];

async function promoteUser() {
    if (!email) {
        console.log('---------------------------------------------------');
        console.log('XATOLIK: Email kiritilmadi!');
        console.log('Ishlatish tartibi: node make_admin.js <email>');
        console.log('Misol: node make_admin.js user@example.com');
        console.log('---------------------------------------------------');
        return;
    }

    console.log(`Foydalanuvchi qidirilmoqda: ${email}...`);

    // 1. Foydalanuvchini topish
    const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (fetchError || !user) {
        console.error('Xatolik: Foydalanuvchi topilmadi yoki baza bilan aloqa yo\'q.');
        if (fetchError) console.error(fetchError.message);
        return;
    }

    console.log(`Topildi: ${user.first_name} ${user.last_name} (${user.role})`);

    if (user.role === 'super_admin') {
        console.log('Bu foydalanuvchi allaqachon super_admin!');
        return;
    }

    // 2. Rolni yangilash
    console.log('Rol o\'zgartirilmoqda...');
    const { error: updateError } = await supabase
        .from('users')
        .update({ role: 'super_admin' })
        .eq('id', user.id);

    if (updateError) {
        console.error('Xatolik yuz berdi:', updateError.message);
    } else {
        console.log('---------------------------------------------------');
        console.log(`MUVAFFAQIYATLI! ${email} endi "super_admin" bo'ldi.`);
        console.log('Saytni yangilab, qaytadan kiring.');
        console.log('---------------------------------------------------');
    }
}

promoteUser();
