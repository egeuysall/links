import { v4 as uuidv4 } from 'uuid';

export interface ChangelogEntry {
  id: string;
  title: string;
  desc: string;
  date: string;
  iconPath: string;
  detailedDesc?: string;
}

const changes: ChangelogEntry[] = [
  {
    id: "changelog-1", // Using static IDs for development
    title: "New Dashboard Layout",
    desc: "We've redesigned the dashboard for better usability and modern look.",
    date: "2025-03-30",
    iconPath: "/icons/layout.png",
    detailedDesc: "Our new dashboard layout brings significant improvements to the user experience. We've reorganized the navigation, added new widgets, and improved the overall performance."
  },
  {
    id: "changelog-2", // Using static IDs for development
    title: "Performance Improvements",
    desc: "Significant performance upgrades across the entire platform.",
    date: "2025-03-30",
    iconPath: "/icons/performance.png",
    detailedDesc: "This update focuses on speed and reliability. We've optimized database queries, improved caching mechanisms, and reduced load times across all pages."
  }
];

export default changes;