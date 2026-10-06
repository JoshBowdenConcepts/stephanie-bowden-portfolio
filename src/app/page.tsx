import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import CardGrid from "@/components/CardGrid/CardGrid";
import Hero from "@/components/Hero/Hero";
import { projects } from "@/data/projects";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  return (
    <main>
      <Hero
        emoji="👋"
        heading="Hi I’m Stephanie Bowden a senior product designer"
        actions={<Button href="/contact">Contact</Button>}
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
          <Card
            key={project.slug}
            href={`/projects/${project.slug}`}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            imageSrc={
              project.thumbnail && `${basePath}${project.thumbnail.src}`
            }
            imageAlt={project.thumbnail?.alt}
            imagePosition={project.thumbnail?.position}
            badge={project.comingSoon ? "Coming soon" : undefined}
          />
        ))}
      </CardGrid>
    </main>
  );
}
