import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton/BackButton";
import Caption from "@/components/Caption/Caption";
import Carousel from "@/components/Carousel/Carousel";
import ComingSoonIllustration from "@/components/ComingSoonIllustration/ComingSoonIllustration";
import Hero from "@/components/Hero/Hero";
import Lightbox from "@/components/Lightbox/Lightbox";
import Metrics from "@/components/Metrics/Metrics";
import PageNav from "@/components/PageNav/PageNav";
import ProjectLayout from "@/components/ProjectLayout/ProjectLayout";
import SectionDetails from "@/components/SectionDetails/SectionDetails";
import Testimonial from "@/components/Testimonial/Testimonial";
import { getProject, projects, type ProjectMedia } from "@/data/projects";
import styles from "./page.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function subsectionId(sectionId: string, heading: string) {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${sectionId}-${slug}`;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Stephanie Bowden`,
    description: project.description,
  };
}

function SectionMedia({
  media,
}: {
  media?: ProjectMedia | ProjectMedia[] | null;
}) {
  if (media === null) return null;
  if (!media || (!Array.isArray(media) && media.type === "placeholder")) {
    return <div className={styles.mediaPlaceholder} aria-hidden="true" />;
  }
  if (Array.isArray(media)) {
    return (
      <Carousel items={media} basePath={basePath} className={styles.gallery} />
    );
  }
  return (
    <>
      <Lightbox
        media={media}
        src={`${basePath}${media.src}`}
        className={styles.media}
      />
      {media.caption && <Caption>{media.caption}</Caption>}
    </>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hero = (
    <Hero
      compact
      heading={project.title}
      subtitle={project.subtitle}
      back={<BackButton href="/" />}
      image={
        project.thumbnail?.hero
          ? {
              src: `${basePath}${project.thumbnail.src}`,
              alt: project.thumbnail.alt,
              layout: "banner",
            }
          : undefined
      }
    >
      {project.description}
    </Hero>
  );

  if (project.comingSoon) {
    return (
      <main>
        {hero}
        <ComingSoonIllustration variant={project.comingSoon.illustration} />
      </main>
    );
  }

  return (
    <main>
      {hero}
      <ProjectLayout
        nav={
          <PageNav
            label="On this page"
            items={project.sections.map(({ id, title, more }) => ({
              id,
              label: title,
              children: more
                ?.filter((block) => block.heading)
                .map((block) => ({
                  id: subsectionId(id, block.heading!),
                  label: block.heading!,
                })),
            }))}
          />
        }
      >
        {project.testimonial && (
          <Testimonial
            quote={project.testimonial.quote}
            href={project.testimonial.href}
            linkLabel={project.testimonial.linkLabel}
          />
        )}
        {project.metrics && project.metrics.length > 0 && (
          <Metrics items={project.metrics} />
        )}
        {project.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={styles.section}
            aria-labelledby={`${section.id}-title`}
          >
            <h2 id={`${section.id}-title`} className={styles.title}>
              {section.title}
            </h2>
            {(section.intro || section.bullets || section.paragraphs) && (
              <div className={styles.description}>
                {[section.intro ?? []].flat().map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}
            {section.details && <SectionDetails items={section.details} />}
            <SectionMedia media={section.media} />
            {section.more?.map((block, index) => (
              <Fragment key={index}>
                {(block.heading ||
                  block.label ||
                  block.paragraphs ||
                  block.bullets) && (
                  <div className={`${styles.description} ${styles.more}`}>
                    {block.heading && (
                      <h3
                        id={subsectionId(section.id, block.heading)}
                        className={styles.subheading}
                      >
                        {block.heading}
                      </h3>
                    )}
                    {block.label && (
                      <p className={styles.label}>{block.label}</p>
                    )}
                    {block.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {block.bullets && (
                      <ul>
                        {block.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>
                            {bullet.lead && <strong>{bullet.lead}</strong>}
                            {bullet.lead && bullet.text && " "}
                            {bullet.text}
                            {bullet.children && (
                              <ul>
                                {bullet.children.map((child) => (
                                  <li key={child}>{child}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                {block.metrics && <Metrics items={block.metrics} />}
                <SectionMedia media={block.media} />
              </Fragment>
            ))}
          </section>
        ))}
      </ProjectLayout>
    </main>
  );
}
