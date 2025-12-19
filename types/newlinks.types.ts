// Types and Interfaces
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  iconUrl?: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatar?: string;
  links: LinkItem[];
  theme: {
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    buttonTextColor: string;
    headingFont: string;
    textFont: string;
  };
}

// add type due to conflicts
export interface CodeBlockType{
  code: string;
  language?: string;
  fileName?: string | null;
  theme?: 'github-light' | 'github-dark';
}