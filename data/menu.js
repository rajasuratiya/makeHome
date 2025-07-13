// export const menuItems = [
//   {
//     title: "Home",
//     links: [
//       { href: "/", label: "Homepage", isCurrent: true },
//       // { href: "/home-02", label: "Homepage 02" },
//       // { href: "/home-03", label: "Homepage 03" },
//       // { href: "/home-04", label: "Homepage 04" },
//       // { href: "/home-05", label: "Homepage 05" },
//       // { href: "/home-06", label: "Homepage 06" },
//     ],
//     isCurrent: true,
//   },
//   {
//     title: "Listing",
//     links: [
//       // { href: "/property-halfmap-grid", label: "Property Half Map Grid" },
//       // { href: "/property-halfmap-list", label: "Property Half Map List" },
//       // { href: "/topmap-grid", label: "Find Topmap Grid" },
//       { href: "/project", label: "Property" },
//       // { href: "/sidebar-grid", label: "Find Sidebar Grid" },
//       // { href: "/sidebar-list", label: "Find Sidebar List" },
//     ],
//   },
//   // {
//   //   title: "Properties",
//   //   links: [
//   //     { href: "/project-v1/1", label: "Property Details 1" },
//   //     { href: "/project-v2", label: "Property Details 2" },
//   //     { href: "/project-v3", label: "Property Details 3" },
//   //     { href: "/project-v4", label: "Property Details 4" },
//   //   ],
//   // },
//   {
//     title: "Pages",
//     links: [
//       { href: "/about-us", label: "About Us" },
//       { href: "/our-service", label: "Our Services" },
//       // { href: "/pricing", label: "Pricing" },
//       { href: "/contact", label: "Contact Us" },
//       { href: "/faq", label: "FAQs" },
//       { href: "/privacy-policy", label: "Privacy Policy" },
//     ],
//   },
//   {
//     title: "Blog",
//     links: [
//       // { href: "/blog-backup", label: "Blog Default" },
//       { href: "/blog-backup-grid", label: "Blog Grid" },
//       { href: "/blog-backup-detail/1", label: "Blog Post Details" },
//     ],
//   },
//   {
//     title: "Dashboard",
//     links: [
//       { href: "/dashboard", label: "Dashboard" },
//       { href: "/my-blogs", label: "My Blogs" },
//       // { href: "/message", label: "Message" },
//       // { href: "/my-favorites", label: "My Favorites" },
//       // { href: "/reviews", label: "Reviews" },
//       // { href: "/my-profile", label: "My Profile" },
//       { href: "/add-property", label: "Add Property" },
//       { href: "/add-blog-backup", label: "Add Blog" },
//     ],

//   },
//   {
//     title: "Current",
//     links: [
//       { href: "/", label: "Home" },
//       { href: "/project", label: "Property" },
//       { href: "/blog-backup-grid", label: "Blogs" },
//       { href: "/contact", label: "Contact" },
//       { href: "/about-us", label: "About us" },
//       // { href: "/forgot-password", label: "Forgot Password" },
//       // { href: "/reset-password", label: "Reset Password" },
//     ],
//   }
// ];

export const menuItems = [
  {
    title: "Home",
    dropdown: false,
    link: "/",
  },
  {
    title: "Projects",
    dropdown: false,
    link: "/projects",
  },
  {
    title: "Blogs",
    dropdown: false,
    link: "/blogs",
  },
  {
    title: "Services",
    dropdown: false,
    link: "/our-service",
  },
  {
    title: "Contact",
    dropdown: false,
    link: "/contact",
  },
  {
    title: "About Us",
    dropdown: false,
    link: "/about-us",
  },
  {
    title: "Our Team",
    dropdown: false,
    link: "/team",
  },
];
