export interface Metric {
  value: string;
  label: string;
  caption: string;
}

export interface MediaFile {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
}

export interface MediaPlaceholder {
  type: "placeholder";
  alt: string;
}

export type ProjectMedia = MediaFile | MediaPlaceholder;

export interface ProjectSection {
  id: string;
  title: string;
  intro?: string | string[];
  bullets?: string[];
  paragraphs?: string[];
  details?: { label: string; text: string }[];
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
  /** Bold lead-in above the paragraphs; unlike `heading`, not listed in the page nav. */
  label?: string;
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
      "As one of the founding designers on Klaviyo’s Design System team, I led the creation and evolution of a Data Visualization library that now powers analytics experiences across the platform. My work focused on enabling a team of 50+ product designers to build consistent and meaningful data experiences.",
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
        caption: "designed with continued iteration",
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
        intro:
          "As the platform scaled and the company went through a large rebrand, it was critical for the product to establish reusable scalable components and patterns to improve usability, establish trust in our data, and improve both design and engineerings speed.",
        bullets: [
          "Patterns and visuals were inconsistent and at times outdated or broken",
          "Design and engineering often rebuilt similar solutions",
          "Accessibility issues in color usage and chart affordances",
          "Constrained to a pre-built charting library that didn’t meet growing needs",
        ],
        details: [
          {
            label: "My role",
            text: "Senior Product Designer (Design Systems)",
          },
          {
            label: "Cross functional team",
            text: "Component Library Engineers, Product designers across the product pillars, Product Managers, Product Engineers",
          },
        ],
        media: [
          {
            type: "image",
            src: "/images/ascent/Klaviyo-old.jpg",
            alt: "Earlier Klaviyo campaign report with an area chart of opens and clicks above campaign stats.",
            caption: "Klaviyo before the Ascent Design System and company rebrand.",
          },
          {
            type: "image",
            src: "/images/ascent/Klaviyo-Dashboard-old.png",
            alt: "Earlier Klaviyo analytics dashboard with metric cards, a stacked bar chart of revenue, and a campaign revenue table.",
            caption: "Klaviyo before the Ascent Design System and company rebrand.",
          },
          {
            type: "image",
            src: "/images/ascent/Klaviyo-Email-Marketing-Dashboard-old.jpg",
            alt: "Earlier Klaviyo revenue board with metric cards, bar and line charts, and a campaign revenue table.",
            caption: "Klaviyo before the Ascent Design System and company rebrand.",
          },
        ],
      },
      {
        id: "discovery",
        title: "Discovery & roadmap",
        intro:
          "I did iterative rounds of discovery through auditing the data experience across the entire product. Met with designers, product managers, engineers and customers to help uncover:",
        bullets: [
          "Gaps in chart types and interactions",
          "Inconsistent patterns and behaviors across similar data experiences",
          "Opportunities to standardize without limiting product expression",
        ],
        paragraphs: [
          "I owned the roadmap and planning for each component and feature release, working with the product teams to align with their teams' roadmaps.",
        ],
        media: {
          type: "image",
          src: "/images/ascent/design-audit.svg",
          alt: "Audit board organized into color-coded columns of problems and epics, each listing example screenshots from the product annotated with sticky notes tracing symptoms to root problems.",
        },
      },
      {
        id: "design",
        title: "Design process",
        intro:
          "My process involved collaboration, detailed design, documentation and mentorship to ensure I was designing components that were consistent but scaled well.",
        bullets: [
          "Meet with the users and product teams to understand the needs",
          "Competitive research",
          "Design iteration and feedback sessions",
          "Detailed technical specs for engineering to build the component with variants and prop considerations",
          "Final Figma component for designers to quickly prototype consistent designs",
          "Detailed documentation for product teams to reference on component usage and best practices",
        ],
        media: null,
        more: [
          {
            heading: "Chart legend filtering",
            paragraphs: [
              "Chart filtering was inconsistent across the product, with dropdown menus blocking the data and duplicating legend content, which made for a poor user experience.",
              "I started with ideation research on interaction patterns for chart legend filtering and then held feedback sessions for design iterations.",
            ],
            media: [
              {
                type: "image",
                src: "/images/ascent/chart%20filtering%20competitive%20analysis.svg",
                alt: "Competitive analysis of chart filtering patterns.",
                caption: "Ideation research on interaction patterns for chart legend filtering.",
              },
              {
                type: "image",
                src: "/images/ascent/Design%20Iteration%20chart%20legend.svg",
                alt: "Design iterations for chart legend filtering.",
                caption: "Iterations for design feedback.",
              },
            ],
          },
          {
            heading: "Usability research",
            paragraphs: [
              "When stakeholders disagreed on which interaction would be best for the customer, I used usability testing to advocate for the interaction pattern that improved clarity, accessibility, and overall experience.",
            ],
            media: {
              type: "image",
              src: "/images/ascent/research2.gif",
              alt: "Recording of a remote usability session: a participant toggles the Clicks, Conversions, Delivered, and Opens legend items on a Campaign Performance line chart prototype.",
            },
          },
          {
            heading: "Final design",
            paragraphs: [
              "The final design simplifies the chart filtering interaction into a single pattern that is scalable across the product. After completing this design I worked across the product teams to update this pattern within the product.",
            ],
            media: [
              {
                type: "video",
                src: "/images/ascent/deliverability-filtering-b%26a.mov",
                alt: "Before and after of chart filtering on a deliverability chart.",
              },
              {
                type: "video",
                src: "/images/ascent/engagment-filtering-b%26a.mov",
                alt: "Before and after of chart filtering on an engagement chart.",
              },
              {
                type: "video",
                src: "/images/ascent/growth-filtering-b%26a.mov",
                alt: "Before and after of chart filtering on a growth chart.",
              },
            ],
          },
          {
            heading: "Design spec",
            paragraphs: [
              "For each component I created detailed design specs that defined the visual details and behaviors required to scale the components. Including:",
            ],
            bullets: [
              { text: "The purpose of the component" },
              { text: "Token usage - colors, fonts, spacing, etc." },
              { text: "States - entry, empty, loading, data density, etc." },
              { text: "Accessibility - color, font, keyboard interactions" },
              { text: "Figma component used by all the designers to create their designs" },
            ],
            media: {
              type: "image",
              src: "/images/ascent/chart%20filtering%20spec.svg",
              alt: "Design spec for the chart filtering pattern.",
            },
          },
        ],
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
        id: "measuring-success",
        title: "Measuring success",
        intro:
          "Driving adoption and tracking the success of the components across the product was an important part of our team’s process. We measured success through:",
        bullets: [
          "Weekly office hours feedback",
          "Usability testing with customers",
          "Customer support tickets",
          "Design system feedback form",
          "Design system request form",
        ],
        media: null,
        more: [
          {
            metrics: [
              {
                value: "100%",
                label: "Product team adoption",
                caption: "All product teams actively used Ascent components in 2025.",
              },
              {
                value: "8.8/10",
                label: "satisfaction",
                caption: "Up from 7.1/10 in early 2024.",
              },
              {
                value: "+24%",
                label: "Satisfaction improvement",
                caption: "Relative increase from early 2024 through late 2025.",
              },
            ],
            media: null,
          },
        ],
      },
      {
        id: "my-role",
        title: "Pillar team support",
        paragraphs: [
          "For larger efforts, I would embed onto pillar teams to dive deep into a new feature or problem space. I partnered with the analytics product team to bring systems-level thinking and data visualization best practices to a net-new RFM analytics experience.",
        ],
        media: null,
        more: [
          {
            heading: "The problem",
            paragraphs: [
              "Customers had data that lived in spreadsheets and disconnected metrics, so they struggled to prioritize who to target, see how engagement changed over time, or decide what to do next.",
            ],
            media: {
              type: "image",
              src: "/images/ascent/RFM%20competitive.svg",
              alt: "Competitive analysis of RFM analytics experiences.",
              caption: "Competitive analysis and ideation research for illustrating RFM data.",
            },
          },
          {
            paragraphs: [
              "After aligning with the Product Pillar Triad on goals, constraints, and success metrics, and building on early research from the PM and Pillar Designer, I focused on visualizing customer data as movement and progression. The designs unified fragmented data into clear visuals, revealed risk and opportunity between segments, and let marketers trigger campaigns and flows directly from what they saw, turning analytics into a decision engine.",
            ],
            media: {
              type: "image",
              src: "/images/ascent/Design%20Iterations%20RFM.svg",
              alt: "Design iterations for the RFM analytics experience.",
              caption: "Design iterations for RFM analysis.",
            },
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
            media: {
              type: "video",
              src: "/images/ascent/RFM-overview.mov",
              alt: "Walkthrough of Klaviyo’s marketing analytics, including a funnel analysis showing drop-off from clicked email to placed order.",
            },
          },
          {
            heading: "Customer success stories",
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
        media: {
          type: "video",
          src: "/images/agentic/Dashbaord%20test.mov",
          alt: "Walkthrough of the existing Klaviyo dashboard page, with stacked report cards for deliverability and funnel summary.",
          caption: "Klaviyo’s old dashboard experience with limited ways to customize and organize dashboards.",
        },
      },
      {
        id: "discovery",
        title: "The users",
        intro:
          "We were getting a lot of requests from customers for more flexibility in creating charts and dashboards. Customers wanted to dig into their specific data questions and have guidance on understanding and taking actions off the data. In the existing dashboard space, users struggled to sift through the many metrics layered behind progressive disclosures, and to organize the data in a way that made sense to them and to the stakeholders they shared it with.",
        bullets: [
          "Customers couldn’t tell which metrics mattered or whether a number was good or bad",
          "Finding the cause of a dip was difficult, and charts couldn’t be compared across areas",
          "Custom dashboards were limited to about 10 prebuilt widgets, and detailed views showed too much at once",
          "Teams relied on screenshots, spreadsheets, BI tools, and warehouse exports to analyze data outside the product",
        ],
        media: null,
      },
      {
        id: "the-vision",
        title: "The vision",
        paragraphs: [
          "Designed a mid-fi prototype using V0 to get feedback on the longer term vision. Here are some key themes:",
        ],
        media: null,
        more: [
          {
            label: "Ask questions of your data in plain language",
            paragraphs: [
              "Customers build a dashboard by asking a question in plain language instead of setting up reports by hand. Composer, Klaviyo’s AI assistant, turns the question into a chart, and opening it from a dashboard gives it context about what you’re looking at, so follow-up questions pick up where you left off.",
            ],
            media: null,
          },
          {
            label: "A canvas that fits how you work",
            paragraphs: [
              "The dashboard is a flexible canvas that lets you drag, resize and rearrange charts around your own priorities, and the layout holds its shape as the screen changes. It’s one dashboard experience that works alongside existing dashboards rather than splitting into two separate products.",
            ],
            media: null,
          },
          {
            label: "From insight to action",
            paragraphs: [
              "A dashboard should help you decide what to do next. Each chart can carry a short insight explaining what it shows, dashboards can be shared with the people who need them, and the long-term aim is for Composer to suggest the next step, like starting a campaign when a trend changes.",
            ],
            media: {
              type: "video",
              src: "/images/agentic/Agentic%20dashboard%20creation.mov",
              alt: "Agentic dashboard creation, showing a chat conversation turning a question into a custom dashboard.",
              caption:
                "V0 vision prototype used for early conversations about the vision and direction.",
            },
          },
          {
            paragraphs: [
              "I led the planning of the roadmap for this project by working with engineering, product leadership and design leadership to determine incremental milestones for this effort.",
            ],
            media: {
              type: "image",
              src: "/images/agentic/milestone-planning.png",
              alt: "Flexible Dashboards release plan spreadsheet listing requirements grouped by milestone, from MVP through M2, M3, M4 and post-MVP.",
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
          caption:
            "Claude Design prototype used for conversations and engineering handoff.",
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
              "I ran design reviews on the working build and turned them into specific fixes for layout, responsiveness and chart labels. I also set up a routine of quick design check-ins whenever an engineer picked up a frontend task, which kept design and engineering aligned all the way through. I contributed small PR updates to the component library and product.",
            ],
            media: [
              {
                type: "image",
                src: "/images/agentic/PR%20Gif%201.gif",
                alt: "Omnichannel attribution chart and table, with a cursor hovering the Active on site column.",
                caption:
                  "Contributing to the production code, before and after switching stacked bar charts on a time series to a stacked area chart.",
              },
              {
                type: "image",
                src: "/images/agentic/PR%20Gif%202.gif",
                alt: "Customer Hub overview with a stacked bar chart of attributed revenue.",
                caption:
                  "Contributing to the production code, before and after switching stacked bar charts on a time series to a stacked area chart.",
              },
              {
                type: "image",
                src: "/images/agentic/PR%20Gif%203.gif",
                alt: "Deliverability email rates beside a line chart of open rate and click rate.",
                caption:
                  "Mentored our animation designer in using Cursor to add motion design to our existing components.",
              },
            ],
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
