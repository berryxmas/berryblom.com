export function ProductPreview({ slug }: { slug: string }) {
  if (slug === "mailreplai") return <MailreplaiPreview />;
  if (slug === "rankmylandingpage") return <RankPreview />;
  return <GenericPreview />;
}

function WindowChrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-[10px]"
      style={{
        background: "var(--paper)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--terracotta)" }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--border)" }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--border)" }} />
      </div>
      {children}
    </div>
  );
}

function MailreplaiPreview() {
  return (
    <WindowChrome>
      <div className="space-y-2.5 p-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-1.5 w-2/5 rounded-full" style={{ background: "var(--ink)" }} />
            <div className="h-1.5 w-4/5 rounded-full" style={{ background: "var(--border)" }} />
            <div className="h-1.5 w-3/5 rounded-full" style={{ background: "var(--border)" }} />
          </div>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em]"
            style={{ background: "var(--terracotta-pale)", color: "var(--terracotta)" }}
          >
            Draft
          </span>
        </div>
        <div
          className="rounded-md px-3 py-2.5"
          style={{ background: "var(--terracotta-pale)" }}
        >
          <div className="mb-1.5 h-1.5 w-1/3 rounded-full" style={{ background: "var(--terracotta)" }} />
          <div className="h-1.5 w-full rounded-full" style={{ background: "color-mix(in srgb, var(--terracotta) 35%, var(--paper))" }} />
          <div className="mt-1.5 h-1.5 w-2/3 rounded-full" style={{ background: "color-mix(in srgb, var(--terracotta) 25%, var(--paper))" }} />
        </div>
      </div>
    </WindowChrome>
  );
}

function RankPreview() {
  return (
    <WindowChrome>
      <div className="flex items-stretch gap-3 p-3.5">
        <div
          className="flex h-[72px] w-[72px] shrink-0 flex-col items-center justify-center rounded-full"
          style={{
            border: "3px solid var(--terracotta)",
            color: "var(--ink)",
            fontFamily: "var(--font-serif)",
          }}
        >
          <span className="text-lg leading-none">87</span>
          <span className="mt-0.5 text-[8px] uppercase tracking-[0.14em]" style={{ color: "var(--ink-faint)" }}>
            Score
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2">
          {[
            { label: "Clarity", width: "82%" },
            { label: "Persuasion", width: "70%" },
            { label: "SEO", width: "64%" },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex justify-between text-[9px] uppercase tracking-[0.1em]" style={{ color: "var(--ink-faint)" }}>
                <span>{row.label}</span>
              </div>
              <div className="h-1 rounded-full" style={{ background: "var(--border)" }}>
                <div
                  className="h-1 rounded-full"
                  style={{ width: row.width, background: "var(--terracotta)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </WindowChrome>
  );
}

function GenericPreview() {
  return (
    <WindowChrome>
      <div className="space-y-2 p-3.5">
        <div className="h-1.5 w-1/2 rounded-full" style={{ background: "var(--ink)" }} />
        <div className="h-1.5 w-full rounded-full" style={{ background: "var(--border)" }} />
        <div className="h-1.5 w-3/4 rounded-full" style={{ background: "var(--border)" }} />
        <div className="h-16 rounded-md" style={{ background: "var(--paper-raised)" }} />
      </div>
    </WindowChrome>
  );
}
