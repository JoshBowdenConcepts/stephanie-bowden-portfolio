import Card from "@/components/Card/Card";
import CardGrid from "@/components/CardGrid/CardGrid";
import Hero from "@/components/Hero/Hero";

const projects = [
  {
    title: "Ascent Design Systems",
    subtitle: "Klaviyo",
    description:
      "As one of the founding designers on Klaviyo’s Design System team, I led the creation and evolution of a Data Visualization library that now powers analytics and reporting experiences across the platform. My work focused on enabling a team of 50+ product designers to build consistent and meaningful data experiences.",
  },
  {
    title: "Agentic chart building",
    subtitle: "Klaviyo",
    description:
      "I led design of an AI chat tool that turns customers’ natural-language questions into custom data visualizations and dashboards, so each interface is shaped by the customer’s needs instead of a fixed template. Partnering with engineering, I defined the tools and skills the LLM uses to query customer data and generate charts with plain-language insights.",
  },
  {
    title: "Patient support",
    subtitle: "Vertex Pharmaceuticals",
    description:
      "To prepare Vertex’s Patient Support team for a new launch, I researched their biggest workflow gaps and redesigned patient onboarding and data updates in their case management system. This halved the time per patient, reduced errors, and earned a company recognition with a Silver VOCAB award.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero
        emoji="👋"
        heading="Hi I’m Stephanie Bowden a senior product designer"
      >
        specializing in design systems and data visualization, with a focus on
        making complex, data-heavy products feel clear and intuitive. At
        Klaviyo, I was a founding designer on the design system team, where I
        built the core charting components and interactions used across the
        platform and helped shape the strategy for analytics and AI. Before
        that, at Vertex, I led research driven design for scientific and
        patient support tools, including work that cut patient onboarding time
        by about 50% during a critical drug launch.
      </Hero>
      <CardGrid label="Selected work">
        {projects.map((project) => (
          <Card key={project.title} {...project} />
        ))}
      </CardGrid>
    </main>
  );
}
