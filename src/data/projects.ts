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
  /** `position` is a CSS object-position; defaults to the top-left. */
  thumbnail?: { src: string; alt: string; position?: string };
  /** Shows a badge on the card and replaces the page content with an illustration. */
  comingSoon?: { illustration: "chart" | "workflow" };
  metrics: Metric[];
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
    comingSoon: { illustration: "chart" },
    thumbnail: {
      src: "/images/agentic/placeholder.svg",
      alt: "Illustration of a chat conversation generating a combined bar and line chart.",
    },
    description:
      "I led design of an AI chat tool that turns customers’ natural-language questions into custom data visualizations and dashboards, so each interface is shaped by the customer’s needs instead of a fixed template. Partnering with engineering, I defined the tools and skills the LLM uses to query customer data and generate charts with plain-language insights.",
    metrics: placeholderMetrics,
    sections: [
      { id: "the-problem", title: "The problem", paragraphs: [placeholderText] },
      { id: "discovery", title: "Discovery", paragraphs: [placeholderText] },
      { id: "design", title: "Design", paragraphs: [placeholderText] },
      { id: "my-role", title: "My role", paragraphs: [placeholderText] },
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
