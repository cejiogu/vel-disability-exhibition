import { useState, type ReactNode } from "react";

type AdjustableTextSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  as?: "section" | "article";
};

export function AdjustableTextSection({
  title,
  children,
  className = "panel",
  contentClassName = "",
  as = "section",
}: AdjustableTextSectionProps) {
  const [step, setStep] = useState(0);
  const Tag = as;
  const isMin = step <= -2;
  const isMax = step >= 2;
  const fontSize = `${1 + step * 0.125}rem`;

  return (
    <Tag className={className}>
      <div className="adjustable-text-header">
        <h2>{title}</h2>
        <div className="text-size-controls" aria-label={`Font size controls for ${title}`}>
          <button
            type="button"
            className="text-size-button"
            aria-label="Decrease font size"
            disabled={isMin}
            onClick={() => setStep((currentStep) => Math.max(-2, currentStep - 1))}
          >
            A-
          </button>
          <button
            type="button"
            className="text-size-button"
            aria-label="Increase font size"
            disabled={isMax}
            onClick={() => setStep((currentStep) => Math.min(2, currentStep + 1))}
          >
            A+
          </button>
        </div>
      </div>
      <div
        className={`adjustable-text-body ${contentClassName}`.trim()}
        style={{ fontSize }}
      >
        {children}
      </div>
    </Tag>
  );
}
