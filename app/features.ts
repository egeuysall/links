interface Feature {
  icon: string;
  title: string;
  details: string;
}

const features: Feature[] = [
  {
    icon: "/icons/code-icon.svg",
    title: "Open source powered",
    details:
      "Links is fully open-source, giving you the freedom to customize and contribute.",
  },
  {
    icon: "/icons/phone-icon.svg",
    title: "Mobile-optimized",
    details:
      "Your link-in-bio page is fully responsive, ensuring it looks great on any device.",
  },
  {
    icon: "/icons/pig-money.svg",
    title: "Zero cost",
    details:
      "Access all features for free with no hidden fees or subscriptions, forever.",
  },
  {
    icon: "/icons/seo-icon.svg",
    title: "SEO friendly",
    details:
      "Optimize your link-in-bio pages for better search engine visibility and discoverability.",
  },
];

export default features;
