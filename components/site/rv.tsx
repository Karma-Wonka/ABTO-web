/** Marks an element for the sitewide scroll-reveal observer (see reveal.tsx). */
export default function Rv({
  as: Tag = "div",
  className,
  style,
  children,
}: {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <Tag className={["rv", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </Tag>
  );
}
