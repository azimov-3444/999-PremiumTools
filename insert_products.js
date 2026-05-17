
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vqkysyqrikjoigffavfc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxa3lzeXFyaWtqb2lnZmZhdmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzUwNjcsImV4cCI6MjA4MDI1MTA2N30.PqHVCTJXaWgkBcxoUtAIeTPBxV0MXLuo-57af5DVE5A'
const supabase = createClient(supabaseUrl, supabaseKey)

const products = [
  {
    name: "Zargarlik mikroskopi №51",
    name_uz: "Zargarlik mikroskopi №51",
    name_ru: "Ювелирный микроскоп №51",
    name_en: "Jewelry Microscope №51",
    price: 4500000,
    category_id: 8,
    stock: 5,
    description: "Professional darajadagi zargarlik mikroskopi. 7x-45x kattalashtirish.",
    description_uz: "Professional darajadagi zargarlik mikroskopi. 7x-45x kattalashtirish.",
    description_ru: "Профессиональный ювелирный микроскоп. Увеличение 7x-45x.",
    description_en: "Professional jewelry microscope. 7x-45x magnification.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/microscope.jpg", is_primary: true }]
  },
  {
    name: "Ultrato'lqinli tozalagich №52",
    name_uz: "Ultrato'lqinli tozalagich №52",
    name_ru: "Ультразвуковой очиститель №52",
    name_en: "Ultrasonic Cleaner №52",
    price: 1200000,
    category_id: 8,
    stock: 12,
    description: "Zargarlik buyumlarini tozalash uchun 2 litrli uskunalar.",
    description_uz: "Zargarlik buyumlarini tozalash uchun 2 litrli uskunalar.",
    description_ru: "2-литровый ультразвуковой очиститель для ювелирных изделий.",
    description_en: "2-liter ultrasonic cleaner for jewelry.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/ultrasonic.jpg", is_primary: true }]
  },
  {
    name: "Bug'li tozalagich №53",
    name_uz: "Bug'li tozalagich №53",
    name_ru: "Пароочиститель №53",
    name_en: "Steam Cleaner №53",
    price: 3800000,
    category_id: 8,
    stock: 3,
    description: "Zargarlik buyumlarini yuqori bosimda tozalash uskunasi.",
    description_uz: "Zargarlik buyumlarini yuqori bosimda tozalash uskunasi.",
    description_ru: "Парогенератор высокого давления для ювелирных изделий.",
    description_en: "High-pressure steam cleaner for jewelry.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/steam.jpg", is_primary: true }]
  },
  {
    name: "Jilo berish matori №54",
    name_uz: "Jilo berish matori №54",
    name_ru: "Полировальный мотор №54",
    name_en: "Polishing Motor №54",
    price: 2500000,
    category_id: 8,
    stock: 8,
    description: "Ikki tomonlama jilo berish matori.",
    description_uz: "Ikki tomonlama jilo berish matori.",
    description_ru: "Двусторонний полировальный мотор.",
    description_en: "Double-sided polishing motor.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/polishing.jpg", is_primary: true }]
  },
  {
    name: "Raqamli tarozi №55",
    name_uz: "Raqamli tarozi №55",
    name_ru: "Цифровые весы №55",
    name_en: "Digital Scale №55",
    price: 850000,
    category_id: 8,
    stock: 20,
    description: "0.001g aniqlikdagi zargarlik tarozisi.",
    description_uz: "0.001g aniqlikdagi zargarlik tarozisi.",
    description_ru: "Ювелирные весы с точностью 0.001 г.",
    description_en: "Jewelry scale with 0.001g accuracy.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/scale.jpg", is_primary: true }]
  },
  {
    name: "Uzuk o'lchagich №56",
    name_uz: "Uzuk o'lchagich №56",
    name_ru: "Кольцемер №56",
    name_en: "Ring Mandrel №56",
    price: 150000,
    category_id: 8,
    stock: 50,
    description: "Alyuminiydan tayyorlangan uzuk o'lchash moslamasi.",
    description_uz: "Alyuminiydan tayyorlangan uzuk o'lchash moslamasi.",
    description_ru: "Алюминиевый ригель для измерения размеров колец.",
    description_en: "Aluminum ring mandrel for measuring ring sizes.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/mandrel.jpg", is_primary: true }]
  },
  {
    name: "Omburchalar to'plami №57",
    name_uz: "Omburchalar to'plami №57",
    name_ru: "Набор плоскогубцев №57",
    name_en: "Pliers Set №57",
    price: 450000,
    category_id: 8,
    stock: 15,
    description: "Zargarlar uchun 5 xil omburchalar to'plami.",
    description_uz: "Zargarlar uchun 5 xil omburchalar to'plami.",
    description_ru: "Набор из 5 ювелирных плоскогубцев.",
    description_en: "Set of 5 jewelry pliers.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/pliers.jpg", is_primary: true }]
  },
  {
    name: "Egovlar to'plami №58",
    name_uz: "Egovlar to'plami №58",
    name_ru: "Набор надфилей №58",
    name_en: "File Set №58",
    price: 280000,
    category_id: 8,
    stock: 25,
    description: "Yuqori sifatli 10 xil egovlar to'plami.",
    description_uz: "Yuqori sifatli 10 xil egovlar to'plami.",
    description_ru: "Набор из 10 качественных надфилей.",
    description_en: "Set of 10 high-quality needle files.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/files.jpg", is_primary: true }]
  },
  {
    name: "Ish stoli uchun moslama №59",
    name_uz: "Ish stoli uchun moslama №59",
    name_ru: "Финагель №59",
    name_en: "Bench Pin №59",
    price: 120000,
    category_id: 8,
    stock: 30,
    description: "Zargarlik stoli uchun yog'och moslama.",
    description_uz: "Zargarlik stoli uchun yog'och moslama.",
    description_ru: "Деревянный финагель для ювелирного верстака.",
    description_en: "Wooden bench pin for jewelry bench.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/benchpin.jpg", is_primary: true }]
  },
  {
    name: "Gazli gorelkа №60",
    name_uz: "Gazli gorelkа №60",
    name_ru: "Газовая горелка №60",
    name_en: "Gas Torch №60",
    price: 650000,
    category_id: 8,
    stock: 10,
    description: "Kichik zaxira gazli gorelka.",
    description_uz: "Kichik zaxira gazli gorelka.",
    description_ru: "Микро-газовая горелка.",
    description_en: "Micro gas torch.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/torch.jpg", is_primary: true }]
  },
  {
    name: "Bino mikroskop №61",
    name_uz: "Bino mikroskop №61",
    name_ru: "Бинокулярная лупа №61",
    name_en: "Binocular Loupe №61",
    price: 350000,
    category_id: 8,
    stock: 20,
    description: "Boshga taqiladigan optik lupa.",
    description_uz: "Boshga taqiladigan optik lupa.",
    description_ru: "Налобная бинокулярная лупа.",
    description_en: "Head-mounted binocular loupe.",
    images: [{ url: "https://vqkysyqrikjoigffavfc.supabase.co/storage/v1/object/public/products/loupe.jpg", is_primary: true }]
  }
]

async function insert() {
  for (const product of products) {
    const { data, error } = await supabase.from('products').insert([product])
    if (error) {
      console.error(`Error inserting ${product.name}:`, error)
    } else {
      console.log(`Inserted ${product.name}`)
    }
  }
}

insert()
