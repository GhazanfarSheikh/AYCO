import { cn } from "@/lib/cn";

import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  description?: string;
  eyebrow?: string;
  title?: string;
  useContainer?: boolean;
};

export function Section({
  children,
  className,
  contentClassName,
  description,
  eyebrow,
  title,
  useContainer = true,
}: SectionProps) {
  const content = (
    <>
      {(eyebrow || title || description) && (
        <div className="mb-6 space-y-3 sm:mb-8 lg:mb-10">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? (
            <h2 className="font-[var(--font-heading)] text-[var(--text-h2)] font-bold tracking-tight text-[var(--text-strong)]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-3xl text-sm text-[var(--text-body)] sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </>
  );

  return (
    <section className={cn("section-space", className)}>
      {useContainer ? <Container>{content}</Container> : content}
    </section>
  );
}
