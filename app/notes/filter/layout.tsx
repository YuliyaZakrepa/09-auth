import css from './LayoutNotes.module.css'
interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}
export default function FilterLayout({sidebar, children}:FilterLayoutProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
