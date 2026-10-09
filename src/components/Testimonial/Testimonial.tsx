import styles from "./Testimonial.module.css";

interface TestimonialProps {
  quote: string;
  href: string;
  linkLabel: string;
}

export default function Testimonial({ quote, href, linkLabel }: TestimonialProps) {
  return (
    <figure className={styles.testimonial}>
      <svg
        className={styles.mark}
        viewBox="0 0 50 36"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 36V21.6C0 8.4 6.6 1.8 19.8 0l2.4 4.8C14.4 6.6 10.8 11.4 10.2 18H21V36H0zm27 0V21.6C27 8.4 33.6 1.8 46.8 0L49.2 4.8C41.4 6.6 37.8 11.4 37.2 18H48V36H27z"
        />
      </svg>
      <div className={styles.content}>
        <blockquote className={styles.quote}>
          <p>{quote}</p>
        </blockquote>
        <a
          className={styles.link}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel}
        </a>
      </div>
    </figure>
  );
}
