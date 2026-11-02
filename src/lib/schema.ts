// schema.org JSON-LD builders. The clinic + doctor graph is emitted on every page;
// pages add their own WebPage / Breadcrumb / FAQ nodes.
import { site, abs, mapLinks } from "./site";

const ids = {
  clinic: abs("/#clinic"),
  doctor: abs("/about/#doctor"),
  website: abs("/#website"),
};

export function baseGraph(services: { title: string; url: string; description: string }[]) {
  const sameAs = [site.bookingUrl, site.instagram && `https://instagram.com/${site.instagram}`].filter(Boolean);
  return [
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: abs("/"),
      name: site.name,
      inLanguage: "fa-IR",
      publisher: { "@id": ids.clinic },
    },
    {
      "@type": "MedicalClinic",
      "@id": ids.clinic,
      name: site.name,
      alternateName: [`مطب ${site.doctorPlain}`, `${site.doctor} ${site.wordmark}`],
      description: `${site.tagline}: درمان جوش و ریزش مو، بوتاکس، فیلر، مزوژل و جوان‌سازی پوست، فیشیال و برداشت خال در قلهک تهران.`,
      url: abs("/"),
      telephone: site.phoneIntl,
      image: abs("/og.jpg"),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.addressStreet,
        addressLocality: "تهران",
        addressRegion: "تهران",
        addressCountry: "IR",
      },
      geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
      hasMap: mapLinks.neshan || mapLinks.balad,
      areaServed: ["قلهک", "شمال تهران", "تهران"],
      isAcceptingNewPatients: true,
      potentialAction: {
        "@type": "ReserveAction",
        target: site.bookingUrl,
        name: "رزرو نوبت آنلاین",
      },
      availableService: services.map((s) => ({
        "@type": "MedicalProcedure",
        name: s.title,
        url: abs(s.url),
        description: s.description,
      })),
      employee: { "@id": ids.doctor },
      ...(site.hours.length ? { openingHours: site.hours.map((h: { schema?: string }) => h.schema).filter(Boolean) } : {}),
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "Person",
      "@id": ids.doctor,
      name: site.doctor,
      alternateName: site.doctorPlain,
      jobTitle: "پزشک — خدمات زیبایی پوست و مو",
      url: abs("/about/"),
      worksFor: { "@id": ids.clinic },
      alumniOf: { "@type": "CollegeOrUniversity", name: "دانشگاه علوم پزشکی تهران" },
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "دکترای حرفه‌ای پزشکی", recognizedBy: { "@type": "CollegeOrUniversity", name: "دانشگاه علوم پزشکی تهران" } },
        { "@type": "EducationalOccupationalCredential", credentialCategory: "certificate", name: "مدرک زیبایی", recognizedBy: { "@type": "CollegeOrUniversity", name: "دانشگاه علوم پزشکی شهید بهشتی" } },
      ],
      identifier: { "@type": "PropertyValue", propertyID: "IRIMC", name: "شماره نظام پزشکی", value: site.irimc },
      sameAs: [site.irimcUrl, site.bookingUrl],
    },
  ];
}

export const breadcrumb = (items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.url) })),
});

export const faqPage = (url: string, faq: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  "@id": abs(url) + "#faq",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const webPage = (url: string, name: string, description: string, type = "WebPage") => ({
  "@type": type,
  "@id": abs(url) + "#webpage",
  url: abs(url),
  name,
  description,
  inLanguage: "fa-IR",
  isPartOf: { "@id": ids.website },
  about: { "@id": ids.clinic },
});
