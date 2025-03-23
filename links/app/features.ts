interface Feature {
  icon: string;
  title: string;
  details: string;
}

const features: Feature[] = [
  {
    icon: "/icons/code-icon.svg",
    title: "Open Source Powered",
    details:
      "Links is fully open-source, giving you the freedom to customize and contribute.",
  },
  {
    icon: "/icons/phone-icon.svg",
    title: "Mobile-Optimized",
    details:
      "Your link-in-bio page is fully responsive, ensuring it looks great on any device.",
  },
  {
    icon: "/icons/customize-icon.svg",
    title: "Customizable Pages",
    details:
      "Personalize your link-in-bio page with custom colors, fonts, and layouts.",
  },
  {
    icon: "/icons/seo-icon.svg",
    title: "SEO Friendly",
    details:
      "Optimize your link-in-bio pages for better search engine visibility and discoverability.",
  },
];

export default features;
