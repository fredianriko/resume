// Shared content types for the portfolio site and the local CMS.

export interface HeroButton {
  label: string;
  href: string;
}

export interface HeroData {
  name: string;
  subtitle: string;
  profileImage: string;
  buttons: HeroButton[];
}

export interface AboutData {
  about: string;
  skills: string[];
}

export interface CareerItem {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  repoUrl: string;
}

export interface BlogItem {
  title: string;
  story: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  details: string[];
}

export interface ContactData {
  email: string;
  linkedin: string;
  github: string;
  location: string;
  resumeUrl: string;
}
