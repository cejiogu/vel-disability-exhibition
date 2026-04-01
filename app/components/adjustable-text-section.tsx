import { useId, useState, type ReactNode } from "react";

type AdjustableTextSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  as?: "section" | "article";
};

const FONT_SIZE_STEPS = [-2, -1, 0, 1, 2] as const;

function getFontSizeClass(step: (typeof FONT_SIZE_STEPS)[number]) {
  switch (step) {
    case -2:
      return "adjustable-text-body size-step--2";
    case -1:
      return "adjustable-text-body size-step--1";
    case 1:
      return "adjustable-text-body size-step-1";
    case 2:
      return "adjustable-text-body size-step-2";
    default:
      return "adjustable-text-body size-step-0";
  }
}

export function AdjustableTextSection({
  title,
  children,
  className = "panel",
  contentClassName = "",
  as = "section",
}: AdjustableTextSectionProps) {
  const [stepIndex, setStepIndex] = useState(2);
  const regionId = useId();
  const Tag = as;
  const isMin = stepIndex === 0;
  const isMax = stepIndex === FONT_SIZE_STEPS.length - 1;
  const sizeClass = getFontSizeClass(FONT_SIZE_STEPS[stepIndex]);

  return (
    <Tag className={className}>
      <div className="adjustable-text-header">
        <h2>{title}</h2>
        <div className="text-size-controls" aria-label={`Font size controls for ${title}`}>
          <button
            type="button"
            className="text-size-button"
            aria-label={`Decrease font size for ${title} section`}
            aria-controls={regionId}
            disabled={isMin}
            onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
          >
            A-
          </button>
          <button
            type="button"
            className="text-size-button"
            aria-label={`Increase font size for ${title} section`}
            aria-controls={regionId}
            disabled={isMax}
            onClick={() =>
              setStepIndex((value) => Math.min(FONT_SIZE_STEPS.length - 1, value + 1))
            }
          >
            A+
          </button>
        </div>
      </div>
      <div id={regionId} className={`${sizeClass} ${contentClassName}`.trim()}>
        {children}
      </div>
    </Tag>
  );
}
