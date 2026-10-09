export interface Metric {
  value: string;
  label: string;
  caption: string;
}

export interface MediaFile {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface MediaPlaceholder {
  type: "placeholder";
  alt: string;
}

export type ProjectMedia = MediaFile | MediaPlaceholder;

export interface ProjectSection {
  id: string;
  title: string;
  intro?: string;
  bullets?: string[];
  paragraphs?: string[];
  /** Omit to show a placeholder; set to `null` for no media. */
  media?: ProjectMedia | ProjectMedia[] | null;
  more?: ProjectSectionBlock[];
}

export interface ProjectBullet {
  lead?: string;
  text?: string;
  children?: string[];
}

export interface ProjectSectionBlock {
  paragraphs?: string[];
  heading?: string;
  bullets?: ProjectBullet[];
  metrics?: Metric[];
  media?: ProjectMedia | ProjectMedia[] | null;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** `position` is a CSS object-position; defaults to the top-left. `hero` also shows it in the project hero. */
  thumbnail?: { src: string; alt: string; position?: string; hero?: boolean };
  /** Shows a badge on the card and replaces the page content with an illustration. */
  comingSoon?: { illustration: "chart" | "workflow" };
  metrics?: Metric[];
  testimonial?: { quote: string; href: string; linkLabel: string };
  sections: ProjectSection[];
}

const placeholderText = "Section description coming soon.";

const placeholderMetrics: Metric[] = [
  { value: "XX+", label: "Metric", caption: "Supporting detail" },
  { value: "XX+", label: "Metric", caption: "Supporting detail" },
  { value: "XX+", label: "Metric", caption: "Supporting detail" },
];

export const projects: Project[] = [
  {
    slug: "ascent-design-systems",
    title: "Ascent Design Systems",
    subtitle: "Klaviyo",
    description:
      "As one of the founding designers on Klaviyo’s Design System team, I led the creation and evolution of a Data Visualization library that now powers analytics and reporting experiences across the platform. My work focused on enabling a team of 50+ product designers to build consistent and meaningful data experiences.",
    thumbnail: {
      src: "/images/ascent/Ascent-thumbnail.png",
      alt: "Ascent design system documentation site showing the Chart Popover specs page with an interactive stacked bar chart example.",
      hero: true,
    },
    metrics: [
      {
        value: "50+",
        label: "designers",
        caption: "Supported across 8 pillars",
      },
      {
        value: "20+",
        label: "components",
        caption: "designed with over 100 instances across the product",
      },
      {
        value: "100+",
        label: "office hours",
        caption: "Supported across 8 pillars",
      },
    ],
    sections: [
      {
        id: "the-problem",
        title: "The problem",
        bullets: [
          "Chart patterns and visuals varied widely across teams",
          "Designers and engineers often rebuilt similar solutions for each product area",
          "Accessibility issues existed in color usage and chart affordances",
          "Constrained to a prebuilt charting library (Recharts), that didn’t meet our growing needs and design preferences",
        ],
        paragraphs: [
          "As the platform scaled and the company went through a large rebrand, it was critical for the product to establish reusable scalable components and patterns to improve usability, establish trust in our data, and improve both design and engineerings speed.",
        ],
        media: null,
      },
      {
        id: "discovery",
        title: "Discovery",
        intro:
          "I did iterative rounds of discovery through auditing the data experience across the entire product. Met with designers, PM’s, Engineers and customers to help uncover:",
        bullets: [
          "Gaps in chart types and interactions",
          "Inconsistent patterns and behaviors across similar data experiences",
          "Opportunities to standardize without limiting product expression",
        ],
        media: {
          type: "image",
          src: "/images/ascent/design-audit.svg",
          alt: "Audit board organized into color-coded columns of problems and epics, each listing example screenshots from the product annotated with sticky notes tracing symptoms to root problems.",
        },
      },
      {
        id: "design",
        title: "Design",
        intro:
          "Created detailed design specs that defined the visual details and behaviors required to scale the components. Including:",
        bullets: [
          "The purpose of the component",
          "Token usage - colors, fonts, spacing, etc.",
          "States - entry, empty, loading, data density, etc.",
          "Accessibility - color, font, keyboard interactions",
          "Figma component used by all the designers to create their designs",
        ],
        media: [
          {
            type: "image",
            src: "/images/ascent/click-interactions-full-spec.svg",
            alt: "Overview of the chart click interactions spec, organized into four parts: Concept, Guidelines, Technical Information, and Future Work.",
          },
          {
            type: "image",
            src: "/images/ascent/click-interactions-concept2.svg",
            alt: "Concept section of the spec: an introduction to chart click interactions and a component anatomy diagram labeling the selected state border, Chart Popover, close button, title, chart detail, and chart actions.",
          },
          {
            type: "image",
            src: "/images/ascent/click-interactions-funnels.svg",
            alt: "Funnel chart guidelines showing single select, select all by column, select all by row, and multi select states with the Chart Popover.",
          },
          {
            type: "image",
            src: "/images/ascent/chart-click-interactions-bar.svg",
            alt: "Bar chart guidelines showing single select, select all, and multi select states across stacked, grouped, and positive-negative bar charts.",
          },
          {
            type: "image",
            src: "/images/ascent/click-interactions-line.svg",
            alt: "Line chart guidelines showing single select, select all by baseline grouping, select all by category, and multi select states with the Chart Popover.",
          },
        ],
      },
      {
        id: "usability-research",
        title: "Usability research",
        paragraphs: [
          "Iterated on design solutions and integrated user research and customer data into design decisions, particularly for complex chart interactions.",
          "Used usability testing and customer insights to advocate for interaction details that improved clarity, accessibility, and overall experience.",
          "Cross-functional collaboration with product managers and engineers to align design intent with technical feasibility, iterating collaboratively when constraints arose.",
        ],
        media: {
          type: "image",
          src: "/images/ascent/research2.gif",
          alt: "Recording of a remote usability session: a participant toggles the Clicks, Conversions, Delivered, and Opens legend items on a Campaign Performance line chart prototype.",
        },
      },
      {
        id: "documentation",
        title: "Documentation",
        intro:
          "Created documentation for every component as a reference and guideline for Product Designers, Product Engineers, and Project Managers",
        bullets: [
          "Anatomy of the component",
          "Behaviors",
          "Variants",
          "Patterns",
          "Do’s and don’ts on how to use it in the product",
          "Content",
          "Accessibility",
        ],
        media: {
          type: "video",
          src: "/images/ascent/Guidlines.mov",
          alt: "Scrolling through a component’s usage guidelines documentation.",
        },
      },
      {
        id: "my-role",
        title: "My role",
        intro: "My role spanned across every pillar of the product to help:",
        bullets: [
          "Drive visual consistency, patterns and best practice for visualizing data",
          "Documented usage guidelines and specs as resources for product teams",
          "Mentored peers, provided thoughtful critique on core product features, and guided designers contributing to the design system.",
          "Facilitated design studios, co-led weekly data experience office hours, and supported onboarding of new team members.",
        ],
        paragraphs: [
          "For larger efforts, I would embed onto pillar teams to dive deep into problem solving.",
        ],
        media: {
          type: "video",
          src: "/images/ascent/RFM-overview.mov",
          alt: "Walkthrough of Klaviyo’s marketing analytics, including a funnel analysis showing drop-off from clicked email to placed order.",
        },
        more: [
          {
            paragraphs: [
              "I joined the pillar team to bring systems-level thinking and data visualization best practices to a net-new RFM analytics experience. Marketers had customer data, but it lived in spreadsheets and disconnected metrics, so they struggled to prioritize who to target, see how engagement changed over time, or decide what to do next.",
              "After aligning with the Product Pillar Triad on goals, constraints, and success metrics, and building on early research from the PM and Pillar Designer, I focused on visualizing customer data as movement and progression. The designs unified fragmented data into clear visuals, revealed risk and opportunity between segments, and let marketers trigger campaigns and flows directly from what they saw, turning analytics into a decision engine.",
            ],
            media: null,
          },
          {
            heading: "Key insights into my role",
            bullets: [
              {
                lead: "Advocated for action in GA scope:",
                text: "When time and technical constraints put “taking action on data” at risk of being cut, I pushed to keep it, arguing that users couldn’t realize the full value of the journey insights without the ability to act on them.",
              },
              {
                lead: "Chose chart types intentionally:",
                text: "Sankey charts make movement between segments visible, so drop-off and recovery patterns read as a clear visual narrative. Funnel charts clarify step-by-step lifecycle progression and pinpoint exactly where drop-off occurs.",
              },
              {
                lead: "Reduced cognitive load:",
                text: "Together, the two visualizations help users understand what’s happening and confidently decide which customer segments to target.",
              },
            ],
            media: null,
          },
          {
            metrics: [
              {
                value: "$6.5K",
                label: "incremental revenue",
                caption: "Ruffwear, from RFM-triggered retention flows in month one",
              },
              {
                value: "2x+",
                label: "win-back revenue",
                caption: "Tibi’s top RFM-triggered win-back flows vs. its prior flow, in the first month",
              },
              {
                value: "61%",
                label: "ROAS growth",
                caption: "2xist’s YoY Facebook ROAS with RFM-based audiences",
              },
            ],
            media: null,
          },
        ],
      },
    ],
  },
  {
    slug: "agentic-chart-building",
    title: "Agentic chart building",
    subtitle: "Klaviyo",
    thumbnail: {
      src: "/images/agentic/Ai-chart-creation-dashboard%20.png",
      alt: "Custom dashboard of revenue charts beside an AI chat that summarizes flow and campaign performance.",
      hero: true,
    },
    description:
      "I led design of an AI chat tool that turns customers’ natural-language questions into custom data visualizations and dashboards, so each interface is shaped by the customer’s needs instead of a fixed template. Partnering with engineering, I defined the tools and skills the LLM uses to query customer data and generate charts with plain-language insights.",
    testimonial: {
      quote:
        "I had the pleasure of working with Stephanie in the Reporting & Analytics team at Klaviyo. As an engineer implementing her work, I found Stephanie’s designs to be thoughtful, creative, and comprehensive...",
      href: "https://www.linkedin.com/in/stephanieclearydesign/details/recommendations/",
      linkLabel: "Read the full quote on LinkedIn",
    },
    sections: [
      {
        id: "the-problem",
        title: "The problem",
        paragraphs: [
          "Customers wanted more flexibility and insight into their data but data was spread across the product and the dashboard page was bogged down by data heavy reports with a limited set of prebuilt views. This made it challenging for customers to organize their data around their own mental models.",
          "Beyond a more flexible data experience, customers also needed better ways of understanding their data and insights into how they could improve important metrics.",
        ],
        media: null,
      },
      {
        id: "discovery",
        title: "The users",
        media: null,
        more: [
          {
            heading: "Pain points",
            bullets: [
              {
                text: "Entrepreneur: Doesn’t know which metrics matter or whether a number is good or bad, and can’t tell what is helping or hurting performance. Too many tabs to flip through.",
              },
              {
                text: "SMB / Mid-Market: Hard to find the cause of a dip, and charts can’t be compared across areas. Detailed views show too much at once, and custom dashboards are limited to about 10 prebuilt widgets.",
              },
              {
                text: "Enterprise: Klaviyo’s dashboard isn’t where analysis happens; it’s one source checked against their own data.",
              },
            ],
            media: null,
          },
          {
            heading: "Workarounds",
            bullets: [
              {
                text: "Entrepreneur: Leans on home page numbers and prebuilt dashboards, and digs through the data manually.",
              },
              {
                text: "SMB / Mid-Market: Takes screenshots for PowerPoint, builds documents and spreadsheets, and pulls data into BI tools, which lose the bigger picture.",
              },
              {
                text: "Enterprise: Exports data to Snowflake and their own data warehouse, where analysts work outside Klaviyo.",
              },
            ],
            media: null,
          },
          {
            heading: "Asks",
            bullets: [
              {
                text: "Entrepreneur: A simple view of what matters, the ability to choose metrics on prebuilt dashboards, suggestions for improving a metric, and alerts when something is low.",
              },
              {
                text: "SMB / Mid-Market: Their own organized dashboards with different views, free choice of data, and easy sharing with a manager.",
              },
              {
                text: "Enterprise: Access to data so that it can be hooked into existing data warehouses. Use Klaviyo data as the source of truth.",
              },
            ],
            media: null,
          },
        ],
      },
      {
        id: "the-vision",
        title: "The vision",
        paragraphs: [
          "Designed a mid-fi prototype using V0 to get feedback on the longer term vision. Here are some key themes I explored in this vision:",
        ],
        media: null,
        more: [
          {
            heading: "1. Ask questions of your data in plain language",
            paragraphs: [
              "Customers build a dashboard by asking a question in plain language instead of setting up reports by hand. Composer, Klaviyo’s AI assistant, turns the question into a chart, and opening it from a dashboard gives it context about what you’re looking at, so follow-up questions pick up where you left off.",
            ],
            media: null,
          },
          {
            heading: "2. Keep the answers that matter",
            paragraphs: [
              "Some questions are answered once and forgotten, and others you come back to every week. A useful chart shouldn’t disappear when the chat ends. Customers can pin it to a dashboard where it stays, ready to revisit and monitor over time.",
            ],
            media: null,
          },
          {
            heading: "3. A canvas that fits how you work",
            paragraphs: [
              "The dashboard is a flexible canvas. Customers can drag, resize and rearrange charts around their own priorities, and the layout holds its shape as the screen changes. It’s one dashboard experience that works alongside existing dashboards rather than splitting into two separate products.",
            ],
            media: null,
          },
          {
            heading: "4. From insight to action",
            paragraphs: [
              "A dashboard should help you decide what to do next. Each chart can carry a short insight explaining what it shows, dashboards can be shared with the people who need them, and the long-term aim is for Composer to suggest the next step, like starting a campaign when a trend changes.",
            ],
            media: {
              type: "video",
              src: "/images/agentic/Agentic%20dashboard%20creation.mov",
              alt: "Agentic dashboard creation, showing a chat conversation turning a question into a custom dashboard.",
            },
          },
        ],
      },
      {
        id: "design",
        title: "The design",
        paragraphs: [
          "The first release focused on turning an answer from Composer into something customers revisit and customize.",
          "Charts sit on react grid layout where customers can drag, resize and rearrange. Keeping the scope this tight let us get the core flow right before expanding into editing, sharing and fully AI-generated dashboards.",
        ],
        media: {
          type: "video",
          src: "/images/agentic/agentic-dashboard%20.mov",
          alt: "Agentic dashboard design walkthrough.",
        },
      },
      {
        id: "my-role",
        title: "My role",
        paragraphs: [
          "I led design from the first concept to launch, working closely with product and engineering to define what the experience should be and what the first release needed.",
        ],
        media: null,
        more: [
          {
            heading: "Setting the vision",
            paragraphs: [
              "I wrote the product spec for the full dashboard experience, covering the canvas, widgets, sharing and permissions, the dashboard library, and how Composer fits in. I used it to help the team agree on what belonged in the first release and what could wait.",
            ],
            media: null,
          },
          {
            heading: "Solving the hard interaction problems",
            paragraphs: [
              "I designed the grid and resize behavior, the save model, and how a single global filter works alongside charts with their own settings. I made the case for clearly marking charts that ignore a filter instead of hiding the filter.",
            ],
            media: null,
          },
          {
            heading: "Prototyping and validating",
            paragraphs: [
              "I built interactive prototypes to test layout behavior early, wrote the customer research guide for exploring how people create, explore, monitor, share and act on their data, and demoed the product to customers.",
            ],
            media: null,
          },
          {
            heading: "Partnering with engineering",
            paragraphs: [
              "I ran design reviews on the working build and turned them into specific fixes for layout, responsiveness and chart labels. I also set up a routine of quick design check-ins whenever an engineer picked up a frontend task, which kept design and engineering aligned all the way through.",
            ],
            media: null,
          },
        ],
      },
      {
        id: "the-event",
        title: "The event",
        paragraphs: [
          "Klaviyo hosts a big product launch and roadmap event every year for their customers and partners. This project was featured as a part of the Composer agents data platform capabilities. I put together a demo walkthrough of the features my engineering team and I worked on.",
        ],
        media: {
          type: "video",
          src: "/images/agentic/KBOS-demo.mov",
          alt: "Demo walkthrough of the dashboard features shown at K:BOS.",
        },
        more: [
          {
            media: {
              type: "image",
              src: "/images/agentic/KBOS.jpg",
              alt: "Audience seated at the K:BOS celebration, facing a stage with screens reading K:BOS celebration and KBOS 2026.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "patient-support",
    title: "Patient support",
    subtitle: "Vertex Pharmaceuticals",
    comingSoon: { illustration: "workflow" },
    description:
      "To prepare Vertex’s Patient Support team for a new launch, I researched their biggest workflow gaps and redesigned patient onboarding and data updates in their case management system. This halved the time per patient, reduced errors, and earned a company recognition with a Silver VOCAB award.",
    thumbnail: {
      src: "/images/ascent/vertex-research.png",
      alt: "Vertex Patient Support team members gathered at a wall of sticky notes during a research workshop.",
      position: "center",
    },
    metrics: placeholderMetrics,
    sections: [
      { id: "the-problem", title: "The problem", paragraphs: [placeholderText] },
      { id: "research", title: "Research", paragraphs: [placeholderText] },
      { id: "design", title: "Design", paragraphs: [placeholderText] },
      { id: "my-role", title: "My role", paragraphs: [placeholderText] },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
