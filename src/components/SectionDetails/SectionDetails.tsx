import styles from "./SectionDetails.module.css";

export interface SectionDetail {
  label: string;
  text: string;
}

interface SectionDetailsProps {
  items: SectionDetail[];
}

export default function SectionDetails({ items }: SectionDetailsProps) {
  return (
    <div className={styles.details}>
      {items.map((item) => (
        <div key={item.label} className={styles.item}>
          <h3 className={styles.label}>{item.label}</h3>
          <p className={styles.text}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
