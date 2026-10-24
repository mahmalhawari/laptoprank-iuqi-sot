/**
 * Data Dummy Lokal Alternatif Laptop (SOT: PRD.md Section 7)
 * Seluruh data di bawah ini adalah data simulasi ilustratif untuk pengujian SPK.
 */

export const MOCK_LAPTOPS = [
  {
    id: 'lap-01',
    name: 'Laptop A (Asus VivoBook Go 14)',
    brand: 'Asus',
    price: 5500000,
    ram: 8,
    ssd: 512,
    processor: 3, // Skala 1-5 (Intel Core i3 / Ryzen 3 modern)
    battery: 3,   // Skala 1-5 (6-8 Jam)
    specs: {
      cpuDetail: 'AMD Ryzen 3 7320U',
      screen: '14" FHD IPS Anti-Glare',
      weight: '1.38 kg',
      ports: 'USB-C, USB-A, HDMI'
    },
    description: 'Pilihan hemat untuk kebutuhan komputasi harian mahasiswa dengan penyimpanan 512GB.'
  },
  {
    id: 'lap-02',
    name: 'Laptop B (Lenovo IdeaPad Slim 3)',
    brand: 'Lenovo',
    price: 7000000,
    ram: 16,
    ssd: 512,
    processor: 4, // Skala 1-5 (AMD Ryzen 5 / Core i5)
    battery: 4,   // Skala 1-5 (8-10 Jam)
    specs: {
      cpuDetail: 'AMD Ryzen 5 7530U (6 Cores / 12 Threads)',
      screen: '14" FHD IPS 300 nits',
      weight: '1.43 kg',
      ports: 'USB-C (Power Delivery), HDMI, SD Reader'
    },
    description: 'Kombinasi RAM 16GB dan prosesor kencang untuk mahasiswa teknik informatika dan multitasking berat.'
  },
  {
    id: 'lap-03',
    name: 'Laptop C (Acer Aspire Lite 14)',
    brand: 'Acer',
    price: 6000000,
    ram: 8,
    ssd: 256,
    processor: 3, // Skala 1-5
    battery: 2,   // Skala 1-5 (4-6 Jam)
    specs: {
      cpuDetail: 'Intel Core i3-1215U',
      screen: '14" WUXGA IPS',
      weight: '1.35 kg',
      ports: 'Type-C, 3x USB 3.2, HDMI'
    },
    description: 'Pilihan ringkas dan portabel untuk mahasiswa yang mengutamakan mobilitas dan pengetikan tugas.'
  },
  {
    id: 'lap-04',
    name: 'Laptop D (HP Pavilion 14 Aero)',
    brand: 'HP',
    price: 8000000,
    ram: 16,
    ssd: 1024,
    processor: 5, // Skala 1-5 (Ryzen 7 / Core i7)
    battery: 4,   // Skala 1-5 (8-10 Jam)
    specs: {
      cpuDetail: 'AMD Ryzen 7 7735U',
      screen: '14" 2.2K IPS sRGB 100%',
      weight: '0.99 kg',
      ports: 'USB-C DisplayPort, HDMI 2.1'
    },
    description: 'Spesifikasi tinggi dengan bobot di bawah 1 kg dan SSD 1TB, cocok untuk skripsi, analisis data, dan desain.'
  },
  {
    id: 'lap-05',
    name: 'Laptop E (Axioo Hype 5 AMD)',
    brand: 'Axioo',
    price: 4999000,
    ram: 8,
    ssd: 256,
    processor: 3, // Skala 1-5
    battery: 2,   // Skala 1-5
    specs: {
      cpuDetail: 'AMD Ryzen 5 3500U',
      screen: '14" FHD IPS',
      weight: '1.42 kg',
      ports: 'Full Function Type-C, USB 3.0, HDMI'
    },
    description: 'Opsi ekonomis dengan prosesor quad-core berkinerja stabil untuk anggaran terbatas.'
  },
  {
    id: 'lap-06',
    name: 'Laptop F (MSI Modern 14 C12M)',
    brand: 'MSI',
    price: 7500000,
    ram: 16,
    ssd: 512,
    processor: 4, // Skala 1-5
    battery: 3,   // Skala 1-5
    specs: {
      cpuDetail: 'Intel Core i5-1235U',
      screen: '14" FHD IPS-Level',
      weight: '1.40 kg',
      ports: 'Type-C USB3.2 Gen2, Micro SD'
    },
    description: 'Desain elegan kelas bisnis dengan performa komputasi mumpuni untuk presentasi dan coding.'
  }
];
