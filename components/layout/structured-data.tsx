export const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Consulting",
    description:
      "Professional AI consulting, audit, and training services for forward-thinking organizations.",
    url: "https://aiconsulting.com",
    logo: "https://aiconsulting.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://linkedin.com/company/ai-consulting",
      "https://twitter.com/aiconsulting",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Consulting Services",
    provider: {
      "@type": "Organization",
      name: "AI Consulting",
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Consulting Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Consulting",
            description:
              "Strategic AI implementation guidance tailored to your business objectives",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Audit",
            description:
              "Comprehensive assessment of your AI readiness and opportunities",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Training",
            description:
              "Professional development programs to empower your team with AI capabilities",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
};
