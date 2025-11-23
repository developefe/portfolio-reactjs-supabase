const categoryMap = {
  "otomotiv": { tr: "Otomotiv", en: "Automotive" },
  "bilişim & güvenlik": { tr: "Bilişim & Güvenlik", en: "IT & Security" },
  "lojistik": { tr: "Lojistik", en: "Logistics" },
  "yazılım": { tr: "Yazılım", en: "Software" },
  "aydınlatma": { tr: "Aydınlatma", en: "Lighting" },
  "elektrik & elektronik": { tr: "Elektrik & Elektronik", en: "Electrical & Electronics" },
  "tekstil": { tr: "Tekstil", en: "Textile" },
  "inşaat & mimarlık": { tr: "İnşaat & Mimarlık", en: "Construction & Architecture" },
  "savunma sanayi": { tr: "Savunma Sanayi", en: "Defense Industry" },
  "e-ticaret": { tr: "E-Ticaret", en: "E-Commerce" },
  "kurumsal": { tr: "Kurumsal", en: "Corporate" },
  "denizcilik": { tr: "Denizcilik", en: "Maritime" },
  "eğitim": { tr: "Eğitim", en: "Education" },
  "gayrimenkul": { tr: "Gayrimenkul", en: "Real Estate" },
  "hukuk & danışmanlık": { tr: "Hukuk & Danışmanlık", en: "Legal & Consultancy" },
  "metal & sanayi": { tr: "Metal & Sanayi", en: "Metal & Industry" },
  "otomasyon": { tr: "Otomasyon", en: "Automation" },
  "plastik & kimya": { tr: "Plastik & Kimya", en: "Plastics & Chemicals" },
  "ürün": { tr: "Ürün", en: "Product" },
  "sağlık": { tr: "Sağlık", en: "Health" },
};

function translateCategory(cat, lang) {
  return categoryMap[cat]?.[lang];
}