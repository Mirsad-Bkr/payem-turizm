import type { PricingRow, TourContent } from "./schema";

export const RIZE = ["R", "i", "z", "e"].join("");

function times(
  departure: { location: string; time: string }[],
  ret: { location: string; time: string }[],
  included: string[],
  excluded: string[],
  program: string[],
  packingList?: string[],
): TourContent {
  return {
    program,
    included,
    excluded,
    departureTimes: departure,
    returnTimes: ret,
    packingList,
  };
}

const dayIncluded = [
  "Ulaşım",
  "Rehberlik Hizmeti",
  "Zorunlu seyahat sigortası",
  "Güler yüz ve Kaliteli hizmet",
  "Sınırsız Horon & Eğlence",
];

export const SEED_TOURS = [
  {
    slug: "huser-yaylasi",
    title: "HUSER YAYLASI",
    summary: "Huser Yaylası’nda gün batımını izleyerek huzur bulun.",
    content: times(
      [
        { location: "Trabzon", time: "09:00" },
        { location: RIZE, time: "10:00" },
      ],
      [
        { location: "Trabzon", time: "23:00" },
        { location: RIZE, time: "22:00" },
      ],
      dayIncluded,
      ["Yemekler", "Müze ve ören yeri girişleri", "Kişisel harcamalar", "Zipline-Salıncak"],
      [
        "Huser yaylası",
        "Avusor yaylası",
        "Ayder yaylası",
        "Gün batımı",
        "Tarihi köprüler",
        "Gelintülü şelalesi",
        "Fırtına vadisi",
        "Zipline & Salıncak (Extra)",
      ],
    ),
    price: 1500 as number | null,
    currency: "TRY",
    destination: RIZE,
    coverImage: "/images/tours/huser-yaylasi.jpg",
    heroImage: "/images/tour-heroes/huser-yaylasi.jpg",
    featured: false,
    published: true,
    sortOrder: 1,
  },
  {
    slug: "elevit-gito-yaylasi",
    title: "ELEVİT – GİTO YAYLASI",
    summary: "Elevit ve Gito Yaylası’nda eşsiz manzaralar keşfedin.",
    content: times(
      [{ location: RIZE, time: "09:00" }],
      [{ location: RIZE, time: "20:00" }],
      dayIncluded,
      ["Yemekler", "Müze ve ören yeri girişleri", "Kişisel harcamalar", "Zipline-Salıncak"],
      [
        "Gito Yaylası",
        "Badara Yaylası",
        "Çat Köyü",
        "Elevit Yaylası",
        "Şenyuva Köyü ( Çinçiva )",
        "Zilkale",
        "Tarihi Köprüler",
        "Fırtına Vadisi",
        "Zipline & Salıncak ( Extra )",
      ],
    ),
    price: 1500,
    currency: "TRY",
    destination: RIZE,
    coverImage: "/images/tours/elevit-gito-yaylasi.jpg",
    heroImage: "/images/tour-heroes/elevit-gito-yaylasi.jpg",
    featured: true,
    published: true,
    sortOrder: 2,
  },
  {
    slug: "uzungol-turu",
    title: "UZUNGÖL TURU",
    summary: "Uzungöl’de doğayla iç içe huzurlu bir deneyim.",
    content: times(
      [{ location: RIZE, time: "09:00" }],
      [{ location: RIZE, time: "19:00" }],
      dayIncluded,
      ["Yemekler", "Müze ve ören yeri girişleri", "Kişisel harcamalar", "Salıncak"],
      ["Uzungöl", "At Çiftliği", "Yapay Şelaleler", "Seyir Terası", "Salıncak"],
    ),
    price: null,
    currency: "TRY",
    destination: "Trabzon",
    coverImage: "/images/tours/uzungol-turu.jpg",
    heroImage: "/images/tour-heroes/uzungol-turu.jpg",
    featured: false,
    published: true,
    sortOrder: 3,
  },
  {
    slug: "mavigol-turu",
    title: "MAVİGÖL TURU",
    summary: "Mavi Göl’de eşsiz manzara ve huzuru keşfedin.",
    content: times(
      [
        { location: RIZE, time: "08.30" },
        { location: "Trabzon", time: "09:30" },
      ],
      [
        { location: RIZE, time: "23.00" },
        { location: "Trabzon", time: "22.00" },
      ],
      dayIncluded,
      [
        "Yemekler",
        "Müze ve ören yeri girişleri",
        "Tekne Turu",
        "Teleferik",
        "Kişisel harcamalar",
      ],
      [
        "Giresun Mavigöl",
        "Kuzalan Şelalesi",
        "Göksu Travertenleri",
        "Ordu Boztepe",
        "Teleferik",
      ],
    ),
    price: 1500,
    currency: "TRY",
    destination: RIZE,
    coverImage: "/images/tours/mavigol-turu.jpg",
    heroImage: "/images/tour-heroes/mavigol-turu.jpg",
    featured: true,
    published: true,
    sortOrder: 4,
  },
  {
    slug: "batum-turu",
    title: "BATUM TURU",
    summary: "Batum’da keşfe çıkın, doğa ve tarih birleşsin.",
    content: times(
      [{ location: RIZE, time: "09.00" }],
      [{ location: RIZE, time: "22.00" }],
      [
        "Rehberlik Hizmeti",
        "Türsab zorunlu seyahat sigortası",
        "Güler yüz ve Kaliteli hizmet",
        "İkramlar",
      ],
      ["Yemekler", "Kişisel Harcamalar", "Yurt dışı Çıkış Harcı", "Aktivite Ücretleri"],
      [
        "Sarp Sınır Kapısı",
        "Aziz Andrea Anıtı",
        "Orta Camii",
        "Piazza Meydanı",
        "Aziz Nicholas Kilisesi",
        "Ermeni Apostalic Kilisesi",
        "Avrupa Meydanı",
        "Öğle Yemeği Molası",
        "Ali Ve Nino Heykeli",
        "Poseidon Heykeli",
        "Alfabe Kulesi",
        "Dönme Dolap (Extra)",
        "Tekne Turu (Extra)",
        "Teleferik (Extra)",
        "Batum Sahil Parkı",
        "Serbest Zaman",
      ],
      [
        "Yeni Çipli Kimlik Veya Geçerli Pasaport",
        "18 Yaş Altı İçin Ebeveyn Muvafakatnamesi",
        "Tüm Yaşlar İçin Fotoğraflı Kimlik",
        "Yürüyüş Ayakkabısı",
        "Hava Koşullarına Uygun Kıyafet",
      ],
    ),
    price: 1500,
    currency: "TRY",
    destination: "Batum",
    coverImage: "/images/tours/batum-turu.jpg",
    heroImage: "/images/tour-heroes/batum-turu.jpg",
    featured: true,
    published: true,
    sortOrder: 5,
  },
  {
    slug: "karagol-turu",
    title: "KARAGÖL TURU",
    summary: "Karagöl’de doğayla iç içe huzurlu bir tatil.",
    content: times(
      [{ location: RIZE, time: "09:00" }],
      [{ location: RIZE, time: "20.00" }],
      dayIncluded,
      ["Yemekler", "Müze ve ören yeri girişleri", "Kişisel harcamalar", "Zipline-Salıncak"],
      [
        "Borçka Karagöl",
        "Muratlı barajı",
        "Asma Köprü",
        "Çoruh Nehri ( Zipline & Salıncak)",
        "Borçka Şehir Merkezi",
      ],
    ),
    price: 1500,
    currency: "TRY",
    destination: "Artvin",
    coverImage: "/images/tours/karagol-turu.jpg",
    heroImage: "/images/tour-heroes/karagol-turu.jpg",
    featured: true,
    published: true,
    sortOrder: 6,
  },
  {
    slug: "sumela-manastiri-turu",
    title: "SÜMELA MANASTIRI TURU",
    summary: "Sümela Manastırı’nda tarihle iç içe bir yolculuk.",
    content: times(
      [{ location: RIZE, time: "09:00" }],
      [{ location: RIZE, time: "19:30" }],
      [
        "Ulaşım",
        "Rehberlik Hizmeti",
        "Türsab zorunlu seyahat sigortası",
        "Güler yüz ve Kaliteli hizmet",
      ],
      [
        "Yemekler",
        "Müze ve ören yeri girişleri",
        "Kişisel harcamalar",
        "Sümela transfer araç ücreti",
        "Sümela manastır giriş ücreti",
        "Karaca mağarası giriş ücreti",
        "Cam teras giriş ücreti",
      ],
      ["Sümela manastırı", "Karaca mağarası", "Torul cam teras", "Hamsi köy"],
    ),
    price: 1300,
    currency: "TRY",
    destination: "Trabzon",
    coverImage: "/images/tours/sumela-manastiri-turu.jpg",
    heroImage: "/images/tour-heroes/sumela-manastiri-turu.jpg",
    featured: true,
    published: true,
    sortOrder: 7,
  },
  {
    slug: "pokut-yaylasi-turu",
    title: "POKUT YAYLASI TURU",
    summary: "Pokut Yaylası’nda doğanın içinde huzurlu bir kaçamak.",
    content: times(
      [{ location: RIZE, time: "09:00" }],
      [{ location: RIZE, time: "20:00" }],
      dayIncluded,
      ["Yemekler", "Müze ve ören yeri girişleri", "Kişisel harcamalar", "Zipline-Salıncak"],
      [
        "Pokut yaylası",
        "Sal yaylası",
        "Şenyuva köyü (Çivçiva)",
        "Ortan köprüsü",
        "Kendini Koruyan Mahalle (Teleferik)",
        "Fırtına vadisi",
        "Zipline & Salıncak (Extra)",
      ],
    ),
    price: 1500,
    currency: "TRY",
    destination: RIZE,
    coverImage: "/images/tours/pokut-yaylasi-turu.jpg",
    heroImage: "/images/tour-heroes/pokut-yaylasi-turu.jpg",
    featured: true,
    published: true,
    sortOrder: 8,
  },
  {
    slug: "misir-turu",
    title: "Mısır Turu",
    summary:
      "3 Gece 4 Gün Unutulmaz Mısır Turu. Kahire – Giza – Nil Nehri. Tarihin ve gizemin buluştuğu efsanevi bir yolculuk.",
    content: times(
      [],
      [],
      [
        "İstanbul – Kahire gidiş dönüş uçak bileti",
        "4* veya 5* otellerde 3 gece konaklama (Oda & Kahvaltı)",
        "Havalimanı – otel – havalimanı transferleri",
        "Profesyonel rehberlik hizmeti",
        "Programda belirtilen tüm geziler",
      ],
      ["Vize ücreti", "Kişisel harcamalar ve ekstra turlar", "Öğle ve akşam yemekleri"],
      [
        "1. Gün: Kahire’ye Varış & Şehir Turu — İstanbul’dan Kahire’ye uçuş; Otele transfer ve kısa dinlenme; Kahire’nin tarihi sokaklarında panoramik şehir turu; Geleneksel Mısır mutfağı deneyimi",
        "2. Gün: Giza Piramitleri & Sfenks & Mısır Müzesi — Keops, Kefren ve Mikerinos Piramitleri; Sfenks; Mısır Müzesi; Nil’de opsiyonel tekne turu (Ekstra)",
        "3. Gün: Eski Kahire & Alışveriş & Eğlence — İslam ve Kıpti Kahire; Han El-Halili Çarşısı; Nil kıyısında serbest zaman",
        "4. Gün: Kahire – İstanbul Dönüş — Otelde kahvaltı; Havalimanına transfer ve İstanbul’a dönüş",
      ],
    ),
    price: 800,
    currency: "GBP",
    destination: "Mısır",
    coverImage: "/images/tours/misir-turu.jpg",
    heroImage: "/images/tour-heroes/misir-turu.jpg",
    featured: false,
    published: true,
    sortOrder: 9,
  },
  {
    slug: "dubai-turu",
    title: "Dubai Turu",
    summary:
      "3 Gece 4 Gün Lüks ve Keşif Dolu Dubai Turu. Dubai – Abu Dhabi – Çöl Safarisi.",
    content: times(
      [],
      [],
      [
        "İstanbul – Dubai gidiş dönüş uçak bileti",
        "4* veya 5* otellerde 3 gece konaklama (Oda & Kahvaltı)",
        "Havalimanı – otel – havalimanı transferleri",
        "Profesyonel rehberlik hizmeti",
        "Programda belirtilen tüm geziler",
      ],
      ["Dubai vizesi", "Kişisel harcamalar ve ekstra turlar", "Öğle ve akşam yemekleri"],
      [
        "1. Gün: Dubai’ye Varış & Panoramik Şehir Turu — İstanbul’dan Dubai’ye uçuş; Otele transfer; Dubai Marina, Palm Jumeirah, Burj Al Arab; Dubai Fountain Show ve Dubai Mall",
        "2. Gün: Burj Khalifa & Çöl Safarisi & Akşam Eğlencesi — Burj Khalifa terası; 4×4 çöl safarisi; Geleneksel Arap gecesi (şovlar, oryantal dans, açık büfe)",
        "3. Gün: Abu Dhabi & Şeyh Zayed Camii — Abu Dhabi günübirlik; Şeyh Zayed Camii; Louvre Abu Dhabi veya Ferrari World (Opsiyonel); Corniche serbest zaman",
        "4. Gün: Dubai – İstanbul Dönüş — Kahvaltı; alışveriş; havalimanı transferi ve İstanbul’a dönüş",
      ],
    ),
    price: 800,
    currency: "GBP",
    destination: "Dubai",
    coverImage: "/images/tours/dubai-turu.jpg",
    heroImage: "/images/tour-heroes/dubai-turu.jpg",
    featured: false,
    published: true,
    sortOrder: 10,
  },
  {
    slug: "gap-turu",
    title: "GAP Turu",
    summary:
      "Büyüleyici 3 Gece 4 Gün GAP Turu. Gaziantep – Şanlıurfa – Mardin – Diyarbakır. Bu turumuzda kademeli fiyat artışı vardır.",
    content: times(
      [
        { location: `${RIZE} Payem Turizm Ofisi`, time: "19:30" },
        { location: "Trabzon Vatan Computer", time: "18:15" },
      ],
      [
        { location: RIZE, time: "06:30" },
        { location: "Trabzon", time: "07:30" },
      ],
      [
        "3 Gece 4* veya 5* Otel Konaklaması",
        "Programda belirtilen tüm gezi ve ziyaretler",
        "3 Sabah Kahvaltısı",
        "2 Akşam Yemeği",
        "Profesyonel Rehberlik Hizmetleri",
        "Lüks Turizm Araçları ile Konforlu Ulaşım",
        "Araç İçi İkramlar",
        "Zorunlu Seyahat Sigortası",
      ],
      [
        "Gaziantep’te Kahvaltı (Ekstra)",
        "Öğle Yemekleri ve 1 Akşam Yemeği",
        "Halfeti Tekne Turu (Ekstra)",
        "Sıra Gecesi (Ekstra, Yemekli)",
        "Müze ve Ören Yeri Giriş Ücretleri",
        "Yemeklerde Alınan Ekstra İçecekler",
      ],
      [
        "1. Gün: Yolculuk Başlıyor — Rize Payem Turizm Ofisi 19:30, Trabzon Vatan Computer 18:15; Zigana üzerinden gece yolculuğu",
        "2. Gün: Gaziantep – Halfeti – Şanlıurfa — Gaziantep kahvaltı (Ekstra); Zeugma Mozaik Müzesi; Gaziantep Kalesi & Bakırcılar/Baharatçılar Çarşısı; Antep mutfağı & fıstık; Halfeti Tekne Turu (Ekstra); Konaklama Şanlıurfa Uludağ Otel; akşam yemeği dahil",
        "3. Gün: Göbeklitepe – Harran – Balıklıgöl – Sıra Gecesi — Kahvaltı; Göbeklitepe; Harran; Balıklıgöl; Sıra Gecesi (Ekstra, yemekli); Konaklama Şanlıurfa Uludağ Otel",
        "4. Gün: Mardin – Dara – Midyat — Kahvaltı; Dara Antik Kenti & Beyaz Su; Mor Gabriel & Midyat Konukevi; Telkari gümüş; Konaklama Mardin Raymar Otel (5)*; akşam yemeği dahil",
        "5. Gün: Eski Mardin – Diyarbakır — Kahvaltı; Kasımiye Medresesi; Ulu Cami, Abbaralar, Şehidiye; Diyarbakır Surları, Keçi Burcu, On Gözlü Köprü; Hasan Paşa Hanı serbest zaman; Rize’ye dönüş hareketi",
        "6. Gün: Varış — 06:30 Rize, 07:30 Trabzon",
      ],
    ),
    price: 11850,
    currency: "TRY",
    destination: "GAP",
    coverImage: "/images/tours/gap-turu.jpg",
    heroImage: "/images/tour-heroes/gap-turu.jpg",
    featured: false,
    published: true,
    sortOrder: 11,
  },
  {
    slug: "kapadokya-turu",
    title: "Kapadokya Turu",
    summary:
      "3 Gün 2 Gece Unutulmaz Kapadokya Turu. Kapadokya – Ürgüp – Göreme – Avanos. Bu turumuzda kademeli fiyat artışı vardır.",
    content: times(
      [
        { location: RIZE, time: "19:00" },
        { location: "Trabzon", time: "20:15" },
      ],
      [
        { location: "Trabzon", time: "06:30" },
        { location: RIZE, time: "07:30" },
      ],
      [
        "1 Gece 5* Otel Konaklaması",
        "Programda belirtilen tüm gezi ve ziyaretler",
        "1 Sabah Kahvaltısı",
        "1 Akşam Yemeği",
        "Profesyonel Rehberlik Hizmetleri",
        "Lüks Turizm Araçları ile Konforlu Ulaşım",
        "Araç İçi İkramlar",
        "Zorunlu Seyahat Sigortası",
      ],
      [
        "Müze ve Ören Yeri Giriş Ücretleri",
        "Öğle Yemekleri (Ekstra)",
        "Yemeklerde Alınan Ekstra İçecekler",
        "ATV Safari & Türk Gecesi (Ekstra)",
        "Balon Turu & Balon Seyir Alanı Transferi (Ekstra)",
      ],
      [
        "1. Gün: Yolculuk Başlıyor! — Rize 19:00 – Trabzon 20:15; Nevşehir–Ürgüp yönü",
        "2. Gün: Kapadokya’ya Merhaba — Kahvaltı (Ekstra); Asmalı Konak; Turasan Şarap Fabrikası; Çanak Çömlek Atölyesi; Yeraltı Şehri; Uçhisar Kalesi; Sallanan Köprü; Kızılırmak serbest zaman; Devrent Vadisi & Zelve; Peri Bacaları; ATV Safari (Ekstra); Türk Gecesi (Ekstra); Perissia Hotel (5)*; akşam yemeği otelde",
        "3. Gün: Balon & Keşif — Balon Seyir Alanı (Ekstra); Balon turu rezervasyon imkanı; Kahvaltı & check-out; Göreme Açık Hava Müzesi; Çerezci; Onyx Taş Atölyesi; Güvercinlik Vadisi; Üç Güzeller & Paşabağ; O Ağacın Altı; ~19:00 dönüş yolculuğu",
        "4. Gün: Eve Dönüş — 06:30 Trabzon, 07:30 Rize",
      ],
    ),
    price: null,
    currency: "TRY",
    destination: "Kapadokya",
    coverImage: "/images/tours/kapadokya-final.jpg",
    heroImage: "/images/tour-heroes/kapadokya-turu.jpg",
    featured: false,
    published: true,
    sortOrder: 12,
  },
];

export const SEED_TRIPS = [
  {
    slug: "sumela-manastiri",
    title: "Sümela Manastırı",
    content:
      "Sümela Manastırı: Karadeniz'in İncisi. Trabzon'un Maçka ilçesinde, yaklaşık 1.200 metre yükseklikte, yemyeşil ormanların arasına gizlenmiş olan Sümela Manastırı, Karadeniz Bölgesi'nin en önemli tarihi ve kültürel yapılarından birisidir. \"Meryem Ana Manastırı\" olarak da bilinen bu muazzam yapılar kompleksi, hem tarihi hem de mimari açıdan ziyaretçilerini büyülemektedir.",
    coverImage: "/images/trips/sumela-manastiri.jpg",
    published: true,
    sortOrder: 1,
  },
  {
    slug: "kavron-yaylasi",
    title: "Kavron Yaylası",
    content:
      "Kavron Yaylası: Karadeniz'in Saklı Doğa Cenneti. Rize’nin Çamlıhemşin ilçesinde yer alan Kavron Yaylası, Karadeniz’in en güzel yaylalarından birisidir ve doğa ile iç içe huzurlu bir tatil arayanlar için mükemmel bir kaçış noktasıdır.",
    coverImage: "/images/trips/kavron-yaylasi.jpg",
    published: true,
    sortOrder: 2,
  },
  {
    slug: "palovit-yaylasi",
    title: "Palovit Yaylası",
    content:
      "Palovit Yaylası: Doğanın Kalbinde Sakin Bir Cennet. Rize'nin Çamlıhemşin ilçesinde yer alan Palovit Yaylası, Karadeniz'in eşsiz doğasını keşfetmek isteyenler için ideal bir yerdir. Yüksek dağlar, yemyeşil çayırlar ve derin vadilerle çevrilidir.",
    coverImage: "/images/trips/palovit-yaylasi.jpg",
    published: true,
    sortOrder: 3,
  },
  {
    slug: "elevit-yaylasi",
    title: "Elevit Yaylası",
    content:
      "Elevit Yaylası: Karadeniz'in Efsanevi Doğasıyla Büyüleyici Bir Yayla. Rize'nin Çamlıhemşin ilçesinde yer alan Elevit Yaylası, doğaseverlerin gözdesi haline gelmiştir.",
    coverImage: "/images/trips/elevit-yaylasi.jpg",
    published: true,
    sortOrder: 4,
  },
  {
    slug: "badara-yaylasi",
    title: "Badara Yaylası",
    content:
      "Badara Yaylası: Doğanın Kucakladığı Sakin Bir Cennet. Rize'nin Çamlıhemşin ilçesine bağlı Badara Yaylası, yemyeşil doğası ve sakin atmosferi ile Karadeniz'in en huzurlu noktalarından biridir.",
    coverImage: "/images/trips/badara-yaylasi.jpg",
    published: true,
    sortOrder: 5,
  },
  {
    slug: "gito-yaylasi",
    title: "Gito Yaylası",
    content:
      "Gito Yaylası: Karadeniz'in Saklı Cenneti. Rize'nin Çamlıhemşin ilçesinde yer alan Gito Yaylası, huzur arayan gezginlerin ve doğa tutkunlarının en sevdiği rotalardan biridir.",
    coverImage: "/images/trips/gito-yaylasi.jpg",
    published: true,
    sortOrder: 6,
  },
  {
    slug: "huser-yaylasi-gezi",
    title: "Huser Yaylası",
    content:
      "Sislerin Ülkesi: Huser Yaylası. Rize’nin Çamlıhemşin ilçesinde, deniz seviyesinden yaklaşık 2400 metre yükseklikte konumlanan Huser Yaylası, özellikle sis denizine ev sahipliği yapmasıyla meşhurdur.",
    coverImage: "/images/trips/huser-yaylasi-gezi.jpg",
    published: true,
    sortOrder: 7,
  },
  {
    slug: "pokut-yaylasi",
    title: "Pokut Yaylası",
    content:
      "Karadeniz’in Saklı Cenneti: Pokut Yaylası. Rize’nin Çamlıhemşin ilçesinde, deniz seviyesinden 2050 metre yüksekte bulunan bu büyüleyici yayla, bulut denizinin üzerindeki konumuyla adeta bir masal diyarını andırır.",
    coverImage: "/images/trips/pokut-yaylasi.jpg",
    published: true,
    sortOrder: 8,
  },
  {
    slug: "ayder-yaylasi",
    title: "Ayder Yaylası",
    content:
      "Karadeniz’in Cenneti: Ayder Yaylası. Rize’nin Çamlıhemşin ilçesinde yer alır. 1350 metre rakıma sahip olan bu eşsiz yayla, doğal güzellikleri ve bol oksijenli havasıyla ünlüdür.",
    coverImage: "/images/trips/ayder-yaylasi.jpg",
    published: true,
    sortOrder: 9,
  },
  {
    slug: "anitkabir",
    title: "Anıtkabir",
    content:
      "Anıtkabir: Tarih, Saygı ve Mimari Mirasın Buluştuğu Yer. Ankara’nın kalbinde, Gazi Mustafa Kemal Atatürk’ün ebedi istirahatgahı olan Anıtkabir, tarih ve mimarinin eşsiz bir birleşimini sunar.",
    coverImage: "/images/trips/anitkabir.jpg",
    published: true,
    sortOrder: 10,
  },
];

export const SEED_SERVICES: {
  slug: string;
  title: string;
  content: string;
  pricingTable: PricingRow[];
  coverImage: string;
  published: boolean;
  sortOrder: number;
}[] = [
  {
    slug: "vip-transfer",
    title: "VIP Transfer",
    content:
      "Profesyonel ekibimizle transfer hizmetlerinde de en iyisini sunmayı hedefliyoruz. Tüm havalimanı transferlerinizde yanınızdayız. Sizin yapmanız gereken tek şey tatilinizin keyfini çıkarmak!",
    pricingTable: [
      { label: `Trabzon Havalimanı – ${RIZE}`, price: "150$" },
      { label: "Trabzon Havalimanı – Ayder", price: "200$" },
      { label: `${RIZE} Havalimanı – Ayder`, price: "100$" },
      { label: "VIP Transfer Günlük 400 Km", price: "200$" },
    ],
    coverImage: "/images/hero.jpg",
    published: true,
    sortOrder: 1,
  },
  {
    slug: "vip-arac-kiralama",
    title: "VIP Araç Kiralama",
    content:
      "Konforlu ve güvenli VIP araç kiralama hizmetimizle seyahatinizi kendi programınıza göre planlayın. Deneyimli sürücülerimiz ve bakımlı filomuzla Karadeniz’in her noktasına ulaşımınızı kolaylaştırıyoruz.",
    pricingTable: [],
    coverImage: "/images/hero.jpg",
    published: true,
    sortOrder: 2,
  },
  {
    slug: "ucak-ve-otobus-bileti",
    title: "Uçak ve Otobüs Bileti",
    content:
      "Yurt içi ve yurt dışı uçak bileti ile otobüs bileti organizasyonlarınızda yanınızdayız. En uygun seçenekleri sizin için araştırıp rezervasyonunuzu sorunsuz şekilde tamamlıyoruz.",
    pricingTable: [],
    coverImage: "/images/hero.jpg",
    published: true,
    sortOrder: 3,
  },
];

export const SEED_SETTINGS = {
  phone: "0552 216 5553",
  phoneAlt: "0464 216 5553",
  email: "info@payemtravel.com",
  address: `Tophane, Meydan Cd. No: 41/B, 53020 Merkez/${RIZE}`,
  whatsappNumber: "905522165553",
  heroHeadline: "Karadeniz'in Eşsiz Manzaraları",
  heroSubline: "Doğayla iç içe unutulmaz bir tatil deneyimi için en iyi rotalar.",
  topBarLeft: "Benzersiz bir deneyime hazır mısınız?",
  topBarRight: "2019’dan günümüze en kaliteli hizmet",
  facebookUrl: "",
  instagramUrl: "",
};

export const SEED_PAGES = [
  {
    key: "about",
    title: "Payem Turizm ile Hayallerinize Yolculuk",
    body: `Payem Turizm olarak, Karadeniz’in muhteşem doğasından ve zengin kültürel mirasından ilham alarak yola çıktık. Bölge turizmine yeni bir soluk getirmek ve misafirlerimize unutulmaz deneyimler sunmak amacıyla çıktığımız bu yolda, profesyonel ekibimizle hizmetinizdeyiz.

Sunduğumuz hizmetler arasında, Karadeniz’in yemyeşil yaylalarını keşfedeceğiniz günübirlik turlar, romantik anılar biriktireceğiniz balayı tatilleri, kültürel ve doğa temalı yurt dışı seyahatleri yer almaktadır. Ayrıca VIP araç kiralama, havalimanı transfer hizmetleri gibi özel ihtiyaçlarınıza yönelik çözümler de sunuyoruz.

Payem Turizm olarak, her müşterimizin farklı beklentileri olduğunun bilincindeyiz. Bu nedenle hizmetlerimizi sizin ihtiyaçlarınıza uygun şekilde kişiselleştirmeye özen gösteriyoruz. İster doğanın kalbinde huzurlu bir kaçamak, ister sevdiklerinizle dolu dolu bir macera arayın, uzman ekibimiz size en iyi deneyimi yaşatmak için çalışıyor.

Karadeniz’in büyüleyici doğasıyla tanışmak, kültürel ve tarihi güzellikleri keşfetmek ya da yurt dışına unutulmaz bir seyahat yapmak için Payem Turizm her zaman yanınızda! Hayallerinize bir adım daha yaklaşmak için bize ulaşın.`,
  },
  {
    key: "contact",
    title: "Bize Ulaşın",
    body: "Her türlü soru, öneri veya talebiniz için bizimle iletişime geçebilirsiniz. Profesyonel ekibimiz, ihtiyaçlarınızı karşılamak ve size en iyi hizmeti sunmak için burada.",
  },
  {
    key: "home_intro",
    title: "Sizin için Seçtik",
    body: "Sizin ilgi alanlarınıza göre özenle seçilmiş deneyimleri keşfedin. Büyüleyici turlardan eşsiz mekanlara, sizi sadece size özel olarak hazırlanan unutulmaz yolculuklara yönlendirelim.",
  },
];
