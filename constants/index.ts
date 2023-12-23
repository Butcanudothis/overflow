import { SidebarLink } from "../types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 2,
    SILVER: 5,
    GOLD: 10,
  },
  ANSWER_COUNT: {
    BRONZE: 2,
    SILVER: 5,
    GOLD: 10,
  },
  QUESTION_UPVOTES: {
    BRONZE: 2,
    SILVER: 5,
    GOLD: 10,
  },
  ANSWER_UPVOTES: {
    BRONZE: 2,
    SILVER: 5,
    GOLD: 10,
  },
  TOTAL_VIEWS: {
    BRONZE: 10,
    SILVER: 100,
    GOLD: 1000,
  },
};
