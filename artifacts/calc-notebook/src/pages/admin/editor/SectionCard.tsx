import type { ReactNode } from 'react';

/* Shared white card wrapper used by every right-panel section. */
export function SectionCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="asb-panel">
      <div className="asb-panel-head">
        {icon}
        <span className="asb-panel-title">{title}</span>
        {action && <span className="asb-panel-action">{action}</span>}
      </div>
      <div className="asb-panel-body">{children}</div>
    </section>
  );
}