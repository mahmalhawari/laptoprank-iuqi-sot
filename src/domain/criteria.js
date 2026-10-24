/**
 * Kontrak Kriteria LaptopRank IUQI (SOT: PRD.md & IMPLEMENTATION_PLAN.md)
 * 5 Kriteria:
 * - price: Cost (IDR)
 * - ram: Benefit provisional (GB)
 * - ssd: Benefit provisional (GB)
 * - processor: Benefit rubric (1-5)
 * - battery: Benefit rubric (1-5)
 */

export const CRITERIA_DEFINITIONS = [
  {
    id: 'price',
    name: 'Harga',
    code: 'C1',
    type: 'cost',
    defaultWeight: 30, // 30%
    unit: 'IDR',
    description: 'Harga pembelian laptop dalam Rupiah. Semakin terjangkau harganya (Cost), semakin tinggi nilai preferensinya.',
    isRubric: false
  },
  {
    id: 'ram',
    name: 'Kapasitas RAM',
    code: 'C2',
    type: 'benefit',
    defaultWeight: 20, // 20%
    unit: 'GB',
    description: 'Besaran kapasitas Random Access Memory. Semakin besar kapasitas RAM (Benefit), semakin leluasa untuk multitasking.',
    isRubric: false
  },
  {
    id: 'ssd',
    name: 'Kapasitas SSD',
    code: 'C3',
    type: 'benefit',
    defaultWeight: 20, // 20%
    unit: 'GB',
    description: 'Kapasitas penyimpanan solid state drive. Semakin besar kapasitas SSD (Benefit), semakin banyak file dan aplikasi yang dapat ditampung.',
    isRubric: false
  },
  {
    id: 'processor',
    name: 'Performa Prosesor',
    code: 'C4',
    type: 'benefit',
    defaultWeight: 15, // 15%
    unit: 'Skala 1-5',
    description: 'Tingkat kemampuan CPU berbasis rubrik ilustratif untuk kebutuhan komputasi studi.',
    isRubric: true,
    rubricScale: [
      { score: 1, label: 'Entry Level', detail: 'Dual-core / Celeron / Athlon (Aplikasi pengetikan dasar)' },
      { score: 2, label: 'Budget Quad-Core', detail: 'Intel Core i3 / Ryzen 3 gen lama (Office & web browsing)' },
      { score: 3, label: 'Mid-Range Mainstream', detail: 'Intel Core i5 / Ryzen 5 (Multitasking kuliah lancar & programming)' },
      { score: 4, label: 'High Performance', detail: 'Intel Core i7 / Ryzen 7 (Pengolahan data berat, kompilasi cepat)' },
      { score: 5, label: 'Enthusiast / Flagship', detail: 'Intel Core i9 / Ryzen 9 / Apple Silicon (Beban kerja ekstrem)' }
    ]
  },
  {
    id: 'battery',
    name: 'Daya Tahan Baterai',
    code: 'C5',
    type: 'benefit',
    defaultWeight: 15, // 15%
    unit: 'Skala 1-5',
    description: 'Ketahanan daya baterai berbasis rubrik ilustratif untuk mobilitas di lingkungan kampus.',
    isRubric: true,
    rubricScale: [
      { score: 1, label: '< 4 Jam', detail: 'Daya tahan rendah, memerlukan colokan listrik berkala' },
      { score: 2, label: '4 - 6 Jam', detail: 'Cukup untuk sesi kelas singkat' },
      { score: 3, label: '6 - 8 Jam', detail: 'Cukup untuk aktivitas perkuliahan seharian normal' },
      { score: 4, label: '8 - 10 Jam', detail: 'Daya tahan tinggi, aman dibawa tanpa charger sepanjang hari' },
      { score: 5, label: '> 10 Jam', detail: 'Sangat awet, mendukung mobilitas penuh mahasiswa' }
    ]
  }
];

export const TOTAL_WEIGHT_TARGET = 100; // Menggunakan konvensi persentase 100%

export function getDefaultWeights() {
  const weights = {};
  CRITERIA_DEFINITIONS.forEach(c => {
    weights[c.id] = c.defaultWeight;
  });
  return weights;
}
