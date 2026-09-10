// SINGLE SOURCE OF TRUTH for all event content.
// Do not hardcode event facts, contacts, or repeated card copy inside components.

export const EVENT = {
  name: "India Solar International Show",
  nameWithYear: "India Solar International Show 2026",
  altName: "India International Solar Show",
  tagline: "Connecting Solar Industry",
  positioning:
    "Uniting the Renewable Energy Value Chain to Showcase Cutting-Edge Solar Technologies, Energy Storage Innovations, and Sustainable Power Solutions.",
  dates: {
    display: "02-03-04 Oct. 2026",
    displayLong: "02–03–04 October 2026",
    start: "2026-10-02T00:00:00+05:30",
    end: "2026-10-04T18:00:00+05:30",
  },
  venue: {
    name: "Auto Cluster Exhibition Center",
    line: "Chinchwad, Pimpri-Chinchwad",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    full: "Auto Cluster Exhibition Center, Chinchwad, Pimpri-Chinchwad, Pune, India",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Auto+Cluster+Exhibition+Center+Chinchwad+Pune",
  },
  organizer: {
    name: "Futurex",
    fullName: "Futurex Trade Fair & Events Pvt. Ltd.",
  },
  website: "https://indiasolarshow.com",
  brochurePath: "/India-Solar-International-Show-Brochure.pdf",
} as const;

export const CO_LOCATED = [
  {
    name: "India Battery International Show",
    edition: "",
    logo: "/logos/india-battery-logo.png",
    blurb:
      "Battery manufacturing, energy storage, LFP, lithium-ion, lead-acid, ESS integration.",
  },
  {
    name: "India EV International Show",
    edition: "8th Edition",
    logo: "/logos/india-ev-logo.png",
    blurb:
      "EV technology, charging infrastructure, mobility ecosystem, e-mobility innovation.",
  },
] as const;

export const CONTACTS = [
  {
    name: "Ms. Nidhi Sharma",
    phone: "+91 98718 39040",
    phoneHref: "tel:+919871839040",
    email: "nidhi@futurextrade.com",
    whatsapp: "https://wa.me/919871839040",
  },
  {
    name: "Mr. Namit Gupta",
    phone: "+91 9810855697",
    phoneHref: "tel:+919810855697",
    email: "namit@futurextrade.com",
    whatsapp: "https://wa.me/919810855697",
  },
] as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Exhibitor",
    href: "/exhibitor",
    children: [
      { label: "Exhibitor Profile", href: "/exhibitor" },
      {
        label: "Exhibitor Registration",
        href: "https://app.warpbay.com/E2yy0Klq",
      },
    ],
  },
  {
    label: "Visitor",
    href: "/visitor",
    children: [
      { label: "Visitor Profile", href: "/visitor" },
      {
        label: "Visitor Registration",
        href: "https://app.warpbay.com/qPMIy6ii",
      },
    ],
  },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Conference", href: "https://bharatemmsummit.com/" },
  { label: "Venue", href: "/venue" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Exhibitor", href: "/exhibitor" },
  { label: "Exhibitor Registration", href: "https://app.warpbay.com/E2yy0Klq" },
  { label: "Visitor", href: "/visitor" },
  { label: "Visitor Registration", href: "https://app.warpbay.com/qPMIy6ii" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Media Partners", href: "/media-partners" },
  { label: "Venue", href: "/venue" },
  { label: "Conference", href: "https://bharatemmsummit.com/" },
  { label: "Floor Plan", href: "/floor-plan" },
  { label: "Gallery", href: "/gallery" },
  { label: "Downloads", href: "/downloads" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is the India Solar International Show?",
    answer:
      "The India Solar International Show is a premier B2B exhibition and conference connecting the renewable energy value chain — solar, energy storage, microgrids, EV charging infrastructure, and more. It brings together manufacturers, developers, investors, policymakers, and buyers.",
  },
  {
    question: "When and where is the event?",
    answer:
      "The event is scheduled for 02–03–04 October 2026 at the Auto Cluster Exhibition Center, Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra, India.",
  },
  {
    question: "Who should exhibit at the show?",
    answer:
      "Solar PV manufacturers, energy storage providers, inverter companies, EPC contractors, smart energy solution providers, microgrid developers, R&D institutes, startups, testing labs, consultancies, and financiers in the renewable energy space.",
  },
  {
    question: "Who should visit the show?",
    answer:
      "Solar developers, industrial buyers, utilities, government agencies, investors, EV charging providers, consultants, media, academia, and anyone interested in renewable energy technologies and opportunities.",
  },
  {
    question: "How do I book an exhibition stall?",
    answer:
      "You can register your interest through the Exhibitor Registration form on our website, or contact our sales team directly. Our team will share stall options, pricing, and floor plan details.",
  },
  {
    question: "Is there a conference at the show?",
    answer:
      "Yes, the show features technical workshops and conference sessions covering topics like grid integration, energy storage innovation, solar rooftop adoption, financing models, policy frameworks, and more.",
  },
  {
    question: "How can I become a sponsor or media partner?",
    answer:
      "Visit the Sponsors or Media Partners page on our website and fill out the enquiry form. Our partnership team will get in touch with sponsorship tiers, benefits, and media collaboration opportunities.",
  },
  {
    question: "Is visitor registration free?",
    answer:
      "Pre-registration details and pricing will be announced closer to the event. Register your interest early to receive updates and potential early-bird offers.",
  },
  {
    question: "What are the co-located shows?",
    answer:
      "The India Solar International Show is co-located with the India Battery International Show (8th Edition) and the India EV International Show (8th Edition), creating an integrated clean-energy marketplace.",
  },
  {
    question: "Where can I download the event brochure?",
    answer:
      "Visit the Downloads page on our website to download the official event brochure, exhibitor manual, and other relevant documents.",
  },
] as const;

export const EVENT_SNAPSHOT = [
  { label: "3-Day B2B Expo", icon: "CalendarDays" },
  { label: "Pune, India", icon: "MapPin" },
  { label: "Solar + Storage + EV Ecosystem", icon: "Zap" },
  { label: "Exhibitions + Workshops", icon: "PresentationIcon" },
  { label: "Networking + B2B Matchmaking", icon: "Handshake" },
] as const;

export const ABOUT_CARDS = [
  {
    title: "Solar Technologies",
    icon: "Sun",
    desc: "PV modules, hybrid systems, and next-gen solar generation.",
  },
  {
    title: "Energy Storage",
    icon: "BatteryCharging",
    desc: "Lithium-ion, LFP, and grid-scale storage systems.",
  },
  {
    title: "Microgrids",
    icon: "Network",
    desc: "Integrated solar + storage systems for resilient power.",
  },
  {
    title: "EV Charging Integration",
    icon: "PlugZap",
    desc: "Renewable-powered mobility and charging infrastructure.",
  },
  {
    title: "Industrial Adoption",
    icon: "Factory",
    desc: "Commercial and industrial-scale renewable deployment.",
  },
  {
    title: "Policy & Investment",
    icon: "Landmark",
    desc: "Regulatory frameworks, financing, and market growth.",
  },
] as const;

export const VALUE_CHAIN = [
  {
    title: "Solar PV Modules",
    icon: "SunMedium",
    desc: "Monocrystalline, polycrystalline, thin-film, and bifacial modules generating clean power.",
  },
  {
    title: "Inverters & Converters",
    icon: "Waves",
    desc: "Grid-tie, off-grid, and hybrid inverters converting solar output into usable power.",
  },
  {
    title: "Energy Storage Systems",
    icon: "BatteryCharging",
    desc: "Li-ion, LFP, lead-acid, and hybrid storage for reliable, round-the-clock energy.",
  },
  {
    title: "Hybrid Systems",
    icon: "Combine",
    desc: "Solar + wind + storage combinations built for resilience and efficiency.",
  },
  {
    title: "Microgrids",
    icon: "Network",
    desc: "Localized, intelligent grids serving industrial and community power needs.",
  },
  {
    title: "EV Charging Infrastructure",
    icon: "PlugZap",
    desc: "Renewable-powered charging networks for the mobility transition.",
  },
  {
    title: "Utilities & DISCOMs",
    icon: "Landmark",
    desc: "Grid operators and distribution companies integrating renewable capacity.",
  },
  {
    title: "Investors & Financiers",
    icon: "TrendingUp",
    desc: "Banks, PE firms, and clean energy funds powering project growth.",
  },
  {
    title: "Industrial, Commercial & Residential End Users",
    icon: "Building2",
    desc: "The adoption layer driving demand across every sector.",
  },
] as const;

export const INDIA_MARKET = [
  { title: "Fast-Growing Renewable Market", icon: "TrendingUp" },
  { title: "Utility-Scale Projects", icon: "Factory" },
  { title: "Distributed Energy Systems", icon: "Network" },
  { title: "Hybrid Solar + Wind + Storage", icon: "Combine" },
  { title: "Grid Stability & Peak Load", icon: "Activity" },
  { title: "EV Charging Infrastructure", icon: "PlugZap" },
] as const;

export const PUNE_MARKET = [
  { title: "Industrial & IT Hub", icon: "Building2" },
  { title: "Rooftop Solar Growth", icon: "Sun" },
  { title: "Solar + Storage Adoption", icon: "BatteryCharging" },
  { title: "Corporate Renewable Energy", icon: "Briefcase" },
  { title: "Regional Buyer Access", icon: "Users" },
  { title: "Government & Municipal Connect", icon: "Landmark" },
] as const;

export const SHOW_HIGHLIGHTS = [
  {
    title: "Comprehensive Renewable Energy Exhibit",
    desc: "Solar PV modules, inverters, wind turbines, hybrid systems, and microgrids.",
    icon: "LayoutGrid",
  },
  {
    title: "Energy Storage Solutions Showcase",
    desc: "Lithium-ion, LFP, lead-acid, and hybrid energy storage systems.",
    icon: "BatteryCharging",
  },
  {
    title: "Smart Energy & Microgrid Demonstrations",
    desc: "Integrated solar + storage systems for industrial and commercial applications.",
    icon: "Network",
  },
  {
    title: "Technical Workshops & Conferences",
    desc: "Policy frameworks, grid integration, storage innovation, and financing models.",
    icon: "PresentationIcon",
  },
  {
    title: "Networking & B2B Matchmaking",
    desc: "Connect with developers, EPC companies, utilities, industrial buyers, and investors.",
    icon: "Handshake",
  },
  {
    title: "Innovation & Technology Awards",
    desc: "Recognizing breakthroughs in renewable energy and storage technologies.",
    icon: "Award",
  },
  {
    title: "Government & Policy Participation",
    desc: "Ministries, renewable energy agencies, and state incentive program stakeholders.",
    icon: "Landmark",
  },
] as const;

export type ExhibitorCategory =
  | "Solar"
  | "Storage"
  | "Wind"
  | "Microgrids"
  | "Smart Energy"
  | "EPC"
  | "Policy"
  | "Finance"
  | "Services"
  | "Innovation";

export const EXHIBITOR_FILTERS: ("All" | ExhibitorCategory)[] = [
  "All",
  "Solar",
  "Storage",
  "Wind",
  "Microgrids",
  "Smart Energy",
  "EPC",
  "Policy",
  "Finance",
  "Services",
  "Innovation",
];

export const EXHIBITOR_SEGMENTS: {
  title: string;
  desc: string;
  icon: string;
  categories: ExhibitorCategory[];
}[] = [
  {
    title: "Solar PV & Modules",
    desc: "Monocrystalline, polycrystalline, thin-film, bifacial modules",
    icon: "SunMedium",
    categories: ["Solar"],
  },
  {
    title: "Wind Energy Solutions",
    desc: "Wind turbines, small-scale and large-scale wind solutions, hybrid wind-solar systems",
    icon: "Wind",
    categories: ["Wind"],
  },
  {
    title: "Energy Storage Systems",
    desc: "Li-ion, LFP, lead-acid, hybrid storage, grid-scale and distributed ESS",
    icon: "BatteryCharging",
    categories: ["Storage"],
  },
  {
    title: "Inverters & Converters",
    desc: "Grid-tie, off-grid, hybrid inverters, microgrid controllers",
    icon: "Waves",
    categories: ["Solar", "Storage", "Microgrids"],
  },
  {
    title: "Smart Energy Management",
    desc: "Energy monitoring software, demand response, predictive analytics, IoT-based solutions",
    icon: "Cpu",
    categories: ["Smart Energy"],
  },
  {
    title: "EPC & Installation Companies",
    desc: "Solar project developers, installation companies, O&M service providers",
    icon: "HardHat",
    categories: ["EPC"],
  },
  {
    title: "Hybrid Systems & Microgrids",
    desc: "Solar + storage, wind + storage, community microgrids, industrial microgrids",
    icon: "Network",
    categories: ["Microgrids"],
  },
  {
    title: "R&D Institutes & Universities",
    desc: "Solar and storage research labs, innovation centers, technical institutes",
    icon: "FlaskConical",
    categories: ["Innovation"],
  },
  {
    title: "Startups & Innovators",
    desc: "Renewable energy startups, microgrid innovators, energy management solution providers",
    icon: "Rocket",
    categories: ["Innovation"],
  },
  {
    title: "Government / Policy Bodies",
    desc: "MNRE, state renewable energy agencies, utility regulatory authorities",
    icon: "Landmark",
    categories: ["Policy"],
  },
  {
    title: "Media & Industry Associations",
    desc: "Trade magazines, renewable energy associations, technical publications",
    icon: "Newspaper",
    categories: ["Services"],
  },
  {
    title: "Testing & Certification Labs",
    desc: "PV testing, storage testing, safety and compliance certification",
    icon: "ShieldCheck",
    categories: ["Services"],
  },
  {
    title: "Consultancy & Advisory Firms",
    desc: "Market research, technology consulting, financing advisory, policy advisory",
    icon: "Briefcase",
    categories: ["Services", "Finance"],
  },
  {
    title: "Industrial & Commercial Buyers",
    desc: "Factories, warehouses, commercial buildings, IT parks, data centers",
    icon: "Factory",
    categories: ["EPC"],
  },
  {
    title: "Financiers & Investors",
    desc: "Banks, PE firms, impact investors, venture capitalists in renewable energy",
    icon: "TrendingUp",
    categories: ["Finance"],
  },
];

export const VISITOR_SEGMENTS = [
  {
    title: "Solar & Renewable Developers",
    desc: "Utility-scale solar, rooftop solar, hybrid projects, wind developers",
    icon: "SunMedium",
  },
  {
    title: "Industrial & Commercial Buyers",
    desc: "Factories, warehouses, corporate offices, IT parks, commercial buildings",
    icon: "Factory",
  },
  {
    title: "Energy Storage Providers",
    desc: "Battery manufacturers, ESS integrators, system operators",
    icon: "BatteryCharging",
  },
  {
    title: "EV Charging & Mobility Providers",
    desc: "Integration of renewable energy + EV charging solutions",
    icon: "PlugZap",
  },
  {
    title: "Utilities & DISCOMs",
    desc: "State and private utilities, grid operators, renewable integration projects",
    icon: "Landmark",
  },
  {
    title: "R&D Professionals & Engineers",
    desc: "Solar engineers, energy storage specialists, microgrid engineers",
    icon: "FlaskConical",
  },
  {
    title: "Government & Policy Makers",
    desc: "MNRE, state energy agencies, municipal authorities, regulatory bodies",
    icon: "Building2",
  },
  {
    title: "Investors & Venture Capitalists",
    desc: "Banks, PE firms, angel investors, clean energy funds",
    icon: "TrendingUp",
  },
  {
    title: "Startups & Innovators",
    desc: "Technology scouting, partnerships, investment opportunities",
    icon: "Rocket",
  },
  {
    title: "Consultants & Analysts",
    desc: "Market research, policy advisory, strategy consulting",
    icon: "Briefcase",
  },
  {
    title: "Media & Journalists",
    desc: "Trade media, technology media, renewable energy blogs",
    icon: "Newspaper",
  },
  {
    title: "Academia & Students",
    desc: "University students, research scholars, innovation and entrepreneurship students",
    icon: "GraduationCap",
  },
  {
    title: "International Delegates",
    desc: "Renewable energy companies, investors, technology partners from global markets",
    icon: "Globe2",
  },
  {
    title: "General Public / Sustainability Advocates",
    desc: "Community groups, environmental enthusiasts, early adopters of solar and storage solutions",
    icon: "Leaf",
  },
] as const;

export const WHY_PARTICIPATE = [
  {
    title: "Business Opportunities",
    desc: "Connect with renewable energy developers, industrial buyers, utilities, and investors.",
    icon: "Handshake",
  },
  {
    title: "Technical Exposure",
    desc: "Showcase next-generation solar, storage, and hybrid energy solutions.",
    icon: "Cpu",
  },
  {
    title: "Brand Visibility",
    desc: "Position your company as a leader in renewable energy and storage technologies.",
    icon: "Eye",
  },
  {
    title: "Networking & Partnerships",
    desc: "Collaborate with OEMs, investors, policymakers, and startups.",
    icon: "Users",
  },
  {
    title: "Knowledge & Market Insights",
    desc: "Attend technical workshops, policy panels, and innovation discussions.",
    icon: "BookOpen",
  },
  {
    title: "Access to Pune & Regional Market",
    desc: "Leverage Pune's industrial base, commercial establishments, and municipal projects.",
    icon: "MapPin",
  },
] as const;

export const WORKSHOP_THEMES = [
  "Grid Integration",
  "Energy Storage Innovation",
  "Solar Rooftop Adoption",
  "Industrial Solar Applications",
  "Financing Models",
  "Policy Frameworks",
  "Microgrid Deployment",
  "EV Charging Infrastructure",
  "Hybrid Renewable Systems",
] as const;

export const INTEREST_TYPES = [
  "Visitor Registration Interest",
  "Exhbitor Registration Interest",
  "Sponsor Enquiry",
  "Brochure Request",
  "General Enquiry",
] as const;

export type InterestType = (typeof INTEREST_TYPES)[number];
