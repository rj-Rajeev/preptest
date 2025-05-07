// config/site.ts
export type NavLink = {
    title: string
    href: string
    disabled?: boolean
  }
  
  export type SiteConfig = {
    name: string
    description: string
    mainNav: NavLink[]
    links: {
      github: string
      docs: string
    }
  }
  
  export const siteConfig: SiteConfig = {
    name: "MyApp", // Change to your site name
    description: "A modern web app powered by Next.js and Tailwind CSS.",
    mainNav: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
      {
        title: "Blog",
        href: "/blog",
      },
      {
        title: "Contact",
        href: "/contact",
        disabled: true, // example of a disabled link
      },
    ],
    links: {
      github: "https://github.com/yourusername/yourrepo",
      docs: "https://yourdocsurl.com",
    },
  }
  