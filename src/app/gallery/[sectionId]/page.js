import { notFound } from "next/navigation";
import styles from "../../page.module.css";
import sections from "../../sections.json";
import SectionGalleryViewer from "./GalleryViewer";

export function generateStaticParams() {
  return sections.map((section) => ({ sectionId: section.id }));
}

export default async function SectionGalleryPage({ params }) {
  const { sectionId } = await params;
  const section = sections.find((item) => item.id === sectionId);

  if (!section) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <main className={`${styles.main} ${styles.contentReady}`}>
        <SectionGalleryViewer section={section} />
      </main>
    </div>
  );
}
