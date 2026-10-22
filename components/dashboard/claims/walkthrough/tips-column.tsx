"use client";

import type { TipCard } from "@/lib/dashboard/claim-walkthrough-data";
import { SIGNAL, type SignalName } from "@/lib/dashboard/signal-colors";
import {
  CircleInfo,
  CircleQuestion,
  FileText,
  Headphones,
  Star,
  TriangleExclamation,
} from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import type { ComponentType, SVGProps } from "react";

const TONE_ICONS: Partial<
  Record<SignalName, ComponentType<SVGProps<SVGSVGElement>>>
> = {
  green: Star,
  blue: FileText,
  amber: TriangleExclamation,
  rose: CircleQuestion,
};

export function TipsColumn({ tips }: { tips: TipCard[] }) {
  return (
    <aside aria-label="Help for this step" className="flex flex-col gap-3">
      {tips.map((tip) => {
        const styles = SIGNAL[tip.tone];
        const Icon = TONE_ICONS[tip.tone] ?? CircleInfo;

        return (
          <section key={tip.id} className={`rounded-xl p-4 ${styles.tile}`}>
            <div className="flex items-center gap-2.5">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
              >
                <Icon className="size-4" />
              </span>
              <h3 className={`type-row ${styles.ink}`}>{tip.title}</h3>
            </div>

            {tip.bullets ? (
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 type-body font-medium text-foreground marker:text-muted">
                {tip.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}

            {tip.facts ? (
              <dl className="mt-3 flex flex-col gap-1.5 rounded-lg bg-surface/70 px-3 py-2.5 type-body">
                {tip.facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-3">
                    <dt className="font-medium text-muted">{fact.label}</dt>
                    <dd className="text-right">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {tip.body ? (
              <p className="mt-3 type-body font-medium text-foreground">
                {tip.body}
              </p>
            ) : null}

            {tip.ctaLabel ? (
              <Button
                className="mt-3 h-10 gap-2 px-3.5 type-body"
                size="sm"
                variant="outline"
              >
                <Headphones className="size-4" />
                {tip.ctaLabel}
              </Button>
            ) : null}
          </section>
        );
      })}
    </aside>
  );
}
