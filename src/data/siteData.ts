/**
 * siteData.ts
 * ───────────
 * Single source of truth for all page content, brand tokens, and navigation.
 * Feed this from an API / admin service later by replacing the const exports.
 */
import { Car, Heart, Mail, Phone, Plane, Wrench, Zap } from "lucide-react";

import rasuLogo        from "@/images/rasu-logo.png";
import fineforgeLogo   from "@/images/fineforge-logo.png";
import recognition1Img from "@/images/recognition-1.png";
import recognition2Img from "@/images/recognition-2.png";
import recognition3Img from "@/images/recognition-3.png";
import recognition4Img from "@/images/recognition-4.png";
import siemensCalendar1 from "@/images/calendar-1.png";
import siemensCalendar2 from "@/images/calendar-2.png";
import siemensCalendar3 from "@/images/calendar-3.png";
import siemensConference from "@/images/plm-conference.png";


// ─── Brand tokens ─────────────────────────────────────────────────────────────
export const BRAND_DARK  = "#1A1A1A";
export const BRAND_GOLD  = "#C4A432";
export const BRAND_GOLD2 = "#A88B28";
export const BRAND_WARM  = "#FAF6EE";

// ─── Font Scale System ──────────────────────────────────────────────────────
/** Convert px → rem (base 16px). Use this for all font sizes. */
export const pxToRem = (px: number): string => `${px / 16}rem`;

/** Global font-size tokens. All components should reference these. */
export const FONT = {
  xs:   pxToRem(12),  // 0.75rem  — captions, badges
  sm:   pxToRem(14),  // 0.875rem — body small, labels, meta
  base: pxToRem(16),  // 1rem     — body text, nav links, inputs
  md:   pxToRem(18),  // 1.125rem — subheadings
  lg:   pxToRem(20),  // 1.25rem  — card titles, section subheads
  xl:   pxToRem(24),  // 1.5rem   — section headers
  "2xl": pxToRem(32), // 2rem     — hero secondary
  "3xl": pxToRem(48),  // 3rem     — hero primary (mobile)
  "4xl": pxToRem(64),  // 4rem     — hero primary (desktop)
  "5xl": pxToRem(80),  // 5rem     — display
} as const;

// ─── Navbar offset ────────────────────────────────────────────────────────────
export const NAVBAR_HEIGHT = 68; // px

// ─── Primary navigation links (desktop bar + mobile menu) ─────────────────────
export const NAV_LINKS = [
  { label: "Engineering Solutions", href: "#engineering" },
  { label: "Digital Engineering",   href: "#digital" },
  { label: "Global Delivery",       href: "#delivery" },
  { label: "Industries",            href: "#industries" },
  { label: "Academy",               href: "#academy" },
  { label: "Innovation Hub",        href: "#innovation" },
  { label: "About",                 href: "#about" },
] as const;

/**
 * Secondary links shown in the desktop "More ↓" dropdown and in the mobile menu.
 * Add or remove items here to control what appears in the overflow nav.
 */
export const MORE_LINKS = [
  { label: "Publications",          href: "#publications" },
  { label: "Awards & Recognitions", href: "#awards" },
  { label: "Clients",               href: "#clients" },
  { label: "Careers",               href: "#careers" },
] as const;

// ─── Icon maps ────────────────────────────────────────────────────────────────
export const INDUSTRY_ICONS = {
  plane:  Plane,
  car:    Car,
  wrench: Wrench,
  heart:  Heart,
  zap:    Zap,
} as const;

export const CONTACT_ICONS = { phone: Phone, mail: Mail } as const;

// ─── Site content ─────────────────────────────────────────────────────────────
export const SITE_DATA = {
  company: {
    name:        "Vidhrrumaa",
    tagline:     "Transforming Engineering Vision into Production Reality",
    description: "Built on over two decades of deep industry expertise, driven by innovation, and fiercely focused on customer success.",
  },

  contact: {
    person: "Srinivaskumar Twarakavi",
    phone:  "91-93464-15412",
    email:  "info@vidhrrumaa.com",
  },

  stats: [
    { value: "20+", label: "Years Expertise" },
    { value: "5",   label: "Global Industries" },
    { value: "6",   label: "Service Domains" },
  ],

  // ── Services ─────────────────────────────────────────────────────────────────
  services: [
    {
      id:       "engineering",
      title:    "Engineering Solutions",
      tagline:  "Transforming concepts into production-ready realities with world-class CAD, CAM, and CAE expertise.",
      imageId:  "1581091226825-a6a2a5aee158",
      imageAlt: "Precision manufacturing and CAD engineering facility",
      items: [
        { name: "CAD Engineering",               subtitle: "Intelligent Product Design" },
        { name: "CAM Manufacturing",             subtitle: "Precision & Efficiency" },
        { name: "CAE Simulation",                subtitle: "Virtual Validation" },
        { name: "Product Development",           subtitle: "End-to-End Solutions" },
        { name: "NX Customization & Automation", subtitle: "Tailored Workflows" },
      ],
    },
    {
      id:       "digital",
      title:    "Digital Engineering",
      tagline:  "Unifying your engineering, manufacturing, and business processes into a seamless digital ecosystem.",
      imageId:  "1518770660439-4636190af475",
      imageAlt: "Digital engineering and Industry 4.0 technology",
      items: [
        { name: "Siemens NX Solutions",        subtitle: "Master-Level Implementation" },
        { name: "Teamcenter PLM",              subtitle: "Lifecycle Excellence" },
        { name: "Digital Twin",                subtitle: "Predictive Modeling" },
        { name: "Industry 4.0",                subtitle: "The Future of Manufacturing" },
        { name: "Engineering Automation & AI", subtitle: "Smart Workflows" },
      ],
    },
    {
      id:       "delivery",
      title:    "Global Delivery",
      tagline:  "Scale your engineering operations globally with flexible, secure, and highly cost-effective delivery models.",
      imageId:  "1451187580459-43490279c0fa",
      imageAlt: "Global delivery network and offshore engineering teams",
      items: [
        { name: "Offshore Development Center (ODC)",  subtitle: "Your Global Hub" },
        { name: "Dedicated Engineering Teams",        subtitle: "Seamless Integration" },
        { name: "Engineering Outsourcing & Staffing", subtitle: "Expert Talent on Demand" },
        { name: "Secure Backup Office",               subtitle: "Business Continuity" },
      ],
    },
  ],

  // ── Industries ───────────────────────────────────────────────────────────────
  industries: {
    title:   "Industries",
    tagline: "Delivering specialized engineering excellence to solve the most complex challenges across key global sectors.",
    items: [
      { name: "Aerospace & Defense",                     subtitle: "Mission-Critical Precision", icon: "plane"  },
      { name: "Automotive & Rail Transportation",         subtitle: "Next-Gen Mobility",          icon: "car"    },
      { name: "Industrial Machinery & Heavy Engineering", subtitle: "Robust Design",              icon: "wrench" },
      { name: "Medical Devices",                         subtitle: "Compliance & Innovation",    icon: "heart"  },
      { name: "Energy & Power",                          subtitle: "Sustainable Solutions",      icon: "zap"    },
    ],
  },

  // ── Academy ──────────────────────────────────────────────────────────────────
  academy: {
    title:    "Academic Excellence",
    tagline:  "Empowering the next generation of engineers with specialized, globally recognized software training and licensing programs.",
    imageId:  "1522071820081-009f0129c71c",
    imageAlt: "Corporate engineering training and Siemens NX certification programs",
    items: [
      { name: "Corporate NX Training",     subtitle: "Upskill Your Workforce" },
      { name: "Siemens Learning Programs", subtitle: "Certified Excellence" },
      { name: "NX Certification Programs", subtitle: "CAD, CAM & CAE Mastery" },
      { name: "University Programs",       subtitle: "Bridging the Skills Gap" },
    ],
  },

  // ── Innovation ───────────────────────────────────────────────────────────────
  innovation: {
    title:   "Innovation Hub",
    tagline: "Bringing the most advanced global engineering technologies, AI tools, and software platforms directly to your workflow.",
    items: [
      { name: "Advanced Engineering Software",      subtitle: "The Latest Tools" },
      { name: "AI & Generative Design",             subtitle: "Algorithm-Driven Innovation" },
      { name: "Smart Manufacturing",                subtitle: "Intelligent Production" },
      { name: "Engineering Research & Partnerships",subtitle: "Collaborative Growth" },
    ],
  },

  // ── About ────────────────────────────────────────────────────────────────────
  about: {
    title:   "About Vidhrrumaa",
    tagline: "Built on over two decades of deep industry expertise, driven by innovation, and fiercely focused on customer success.",
    story: "Business Innovations Private Limited is a high-impact engineering and technology company delivering advanced, end-to-end solutions across product development and digital transformation. Built on a strong foundation in mechanical R&D, we specialize in CAD/CAM/CAE engineering, intelligent software development, and AI-driven innovation tailored for global industries.",
    mission: "To deliver High-End, Value-added innovative engineering and software solutions that empower businesses, drive technological growth, and create value through excellence, integrity, and expertise.",
    vision:  "To be a global leader in Specialized Engineering and software services, known for innovation, quality, and transformative solutions that shape a smarter and more connected future.",
    leaderTitle: "SIEMENS Certified PLM / Digital Transformation Executive",
    leaderBio:   `Mr. Srinivas Kumar, A SIEMENS Certified Professional and visionary Digital Transformation Executive bringing over 25 years of leadership in architecting enterprise CAD/CAM/CAE/PLM ecosystems. He is currently serving as the Founder & CEO of Vidhrrumaa Business Innovations Private Limited, and has driven engineering excellence being the Founder of Sree Varahhas Technologies (Formerly known as G4 Solutions & Applications). He specializes in bridging the gap between advanced SIEMENS technologies and scalable business value. Leveraging an extensive background in technical consulting with industry pioneers such as SIEMENS PLM, TCS, and Satyam, he has defined his career by transforming complex engineering capabilities into streamlined, high-performance operational realities.

Resourceful in all areas of Engineering Services marketing, with the ability to understand customer pain areas and suggest appropriate solutions and services, on a consistent basis to ensure long term associations with all clients.

A capable leader to carry the internal team and the external customers through clear vision along with ethical & transparent interactions.`,
    leaderNote:  "Ethical Leadership: Builds agile teams with a focus on transparency, trust, and continuous improvement.",
    strengths: [
      { title: "STRATEGIC ACCOUNT ARCHITECTURE",   desc: "Directing Technical Account Management (TAM) and Customer Relationship Management (CRM) across the Aerospace, Heavy Engineering, and Automotive sectors. I design SIEMENS PLM solutions that optimize product lifecycles, drive cross-functional efficiency, and build resilient client partnerships." },
      { title: "TECHNICAL AUTHORITY (NX MASTERY)",     desc: "Deep subject matter expertise across the comprehensive NX portfolio. Highly proficient in Advanced Assemblies, Advanced Sheetmetal, Electrical & Mechanical Routing, PMI, NX Open, WAVE Geometry Linker, Quality Tools, and Product Template Studio (PTS). I translate geometric and systemic complexity into clear, competitive advantages." },
      { title: "CLIENT-CENTRIC ENGINEERING ECOSYSTEMS", desc: "Diagnosing industry bottlenecks to engineer bespoke CAD/CAM/PLM frameworks. I ensure seamless deployment, rapid adoption, and sustained engineering excellence tailored to precise operational demands." },
      { title: "VISIONARY & ETHICAL LEADERSHIP",     desc: "Cultivating high-performing, agile engineering teams. I champion transparent, ethical engagements and foster a culture of continuous technological innovation and mutual trust." },
      { title: "OPERATIONAL EXCELLENCE & PROCESS SYNCHRONIZATION",       desc: "Navigating sophisticated engineering service landscapes to identify strategic opportunities, aligning advanced technical solutions with long-term commercial growth." },
      { title: "MARKET EXPANSION & BUSINESS DEVELOPMENT",          desc: "Effective across cross-functional, multicultural environments" },
      { title: "GLOBAL ECOSYSTEM AGILITY",          desc: "Proven success in driving cross-functional initiatives within diverse cultural and global business matrixes, embracing dynamic challenges to deliver impactful engineering outcomes." },
    ],
    partnerships: [
      "Collaborate with manufacturing units, tech companies, and academic institutions.",
      "Build alliances with international software resellers and outsourcing partners.",
      "Engage with government and R&D programs for innovation grants and projects.",
    ],
    items: [
      { name: "Our Story",              subtitle: "The Vidhrrumaa Journey", key: "story" },
      { name: "Vision & Mission",       subtitle: "Defining the Future",    key: "vision" },
      { name: "Leadership",             subtitle: "Expert Guidance",        key: "leadership" },
      { name: "Strategic Partnerships", subtitle: "Our Global Network",     key: "partnerships" },
      { name: "Careers & Contact Us",   subtitle: "Join or Reach Out",      key: "careers" },
    ],
  },


  // ── Awards & Recognitions ──────────────────────────────────────────────────
  awards: {
    title:   "Awards & Recognitions",
    tagline: "Industry recognition for engineering excellence, innovation, and design leadership.",
    items: [
      {
        id: "recognition1",
        title: "Best Engineering Design Service Provider — India",
        images: [recognition1Img],
      },
      {
        id: "recognition2",
        title: "Empowering Industies with Next generation CAD Solutions",
        images: [recognition2Img],
      },
      {
        id: "recognition3",
        title: "High Quality Services for an Ever Changing Manufacturing Industry",
        images: [recognition3Img],
      },
      {
        id: "recognition4",
        title:"Making Design Automation Affordable",
        images: [recognition4Img],
      },
    ],
  },

  // ── Publications ─────────────────────────────────────────────────────────────
  publications: {
    title:   "Publications & Industry Recognitions",
    tagline: "Recognized by leading industry bodies for engineering excellence, innovation, and design leadership.",
    items: [
      {
        id:           "ghp-medtech",
        year:         "2020",
        title:        "Best Medical Implant Product Design & Development Organization — India",
        organization: "GHP MedTech Awards",
        links: [
          { label: "Award Booklet",             href: "https://www.ghp-news.com/issues/medtech-awards-2020/" },
          { label: "Winners List",              href: "https://www.ghp-news.com/winners-list/?award=11517-2020" },
          { label: "Press Release (March 2021)",href: "https://www.ghp-news.com/ghp-magazine-announces-the-winners-of-the-2020-medtech-awards/" },
        ],
      },
      {
        id:           "siemens-partner",
        year:         "",
        title:        "Unique Design Automation Approach",
        organization: "Siemens Solution Partner Recognition",
        links: [
          { label: "Siemens Partner Blog Feature",          href: "https://blogs.sw.siemens.com/partners/siemens-partner-recognized-for-unique-design-automation-approach/" },
          { label: "Siemens Official Twitter Announcement", href: "https://twitter.com/SiemensPartners/status/1354421380327075842?s=20" },
        ],
      },
      {
        id:           "silicon-india-2020",
        year:         "November 2020",
        title:        "10 Most Promising Engineering Design Service Providers",
        organization: "Silicon India Magazine",
        links: [
          { label: "Digital Magazine Issue", href: "https://www.siliconindia.com/digital-magazine/engineering-design-services-november-2020/#page=10" },
          { label: "Vendor Profile Feature", href: "https://enterprise-services.siliconindia.com/vendor/sree-varahhas-technologies-providing-customized-automation-solutions-across-all-aspects-of-design-manufacturing-cid-13827.html" },
        ],
      },
      
      
      {
        id:           "silicon-india-2015",
        year:         "March 2015",
        title:        "10 Most Promising PLM Companies: Carving PLM Dreams into Reality",
        organization: "Silicon India",
        links: [
          { label: "Magazine Issue",   href: "https://www.siliconindia.com/magazine/SI-Mar-special2-2015/" },
          { label: "Featured Article", href: "https://www.siliconindia.com/magazine-articles-in/G4-Solutions-&-ApplicationsCarving-PLM-Dreams-into-Reality-WMRT679800118.html" },
        ],
      },
      
      
    ],
  },

  // ── Clients ──────────────────────────────────────────────────────────────────
  /**
   * Each client entry has:
   *   id       — unique key
   *   name     — display name
   *   logo     — URL to logo image (leave "" for placeholder)
   *   sector   — industry sector label
   *   website  — optional link (leave "" if not public)
   *
   * Replace placeholder entries with real client data via the admin service.
   */
  clients: {
    title:   "Our Clients",
    tagline: "Trusted by leading organizations across industries to deliver engineering excellence at scale.",
    items: [
      { id: "rasuIndustriesId", name: "RASU INDUSTRIES PVT LTD", logo: rasuLogo, website: "" },
      { id: "fineforgeId", name: "FINE FORGE LTD", logo: fineforgeLogo, website: "" },
    ],
  },

  // ── Siemens ──────────────────────────────────────────────────────────────────
  siemens: {
    title:   "Siemens Partnership",
    tagline: "Featured in Siemens PLM Software calendars and recognized at Siemens PLM conferences for engineering innovation.",
    calendars: {
      heading: "Siemens PLM Software Calendars",
      items: [
        { img: siemensCalendar1, caption: "Siemens PLM Software Calendar — August 2013" },
        { img: siemensCalendar2, caption: "Siemens PLM Software Calendar — April 2014" },
        { img: siemensCalendar3, caption: "Siemens PLM Software Calendar — August 2015" },
      ],
    },
    conferences: {
      heading: "Participations in Siemens PLM Conferences",
      items: [
        { img: siemensConference, caption: "National Award Winning Image — Siemens PLM Connection India 2011" },
      ],
    },
  },

  // ── Careers form options ──────────────────────────────────────────────────────
  careers: {
    roles: [
      "CAM Engineer", "CAD Engineer", "CAE Engineer", "PLM Consultant",
      "Software Developer", "Project Manager", "Sales & Business Development", "Other",
    ],
    experiences: [
      "0–2 years (Fresher)", "2–5 years", "5–10 years", "10–15 years", "15+ years",
    ],
    domains: [
      "Automotive", "Aerospace", "Heavy Engineering", "Power Sectors", "Medical Implants / Health",
    ],
    softwares: [
      "NX", "Catia", "Solidworks", "Solidedge", "Autocad",
      "Ansys", "Abaqus", "Nastran", "Hypermesh", "LS-Dyna",
    ],
  },
} as const;
