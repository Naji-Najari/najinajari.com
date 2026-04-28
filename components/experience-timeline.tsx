"use client";

import { Calendar, MapPin } from "lucide-react";
import {
  AnimatedTimeline,
  type TimelineEvent,
} from "@/components/ui/animated-timeline";
import { cn } from "@/lib/utils";

interface ExperienceItem extends TimelineEvent {
  id: string;
  company: string;
  title: string;
  date: string;
  location: string;
  bullets: string[];
  tags: string[];
  logoUrl: string;
}

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <AnimatedTimeline<ExperienceItem>
      events={items}
      customEventRender={(item, isActive) => (
        <div className="pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <img
              src={item.logoUrl}
              alt={item.company}
              className="size-8 rounded-lg"
            />
            <div>
              <h3
                className={cn(
                  "text-base font-bold transition-colors",
                  isActive ? "text-primary-sky" : "text-foreground",
                )}
              >
                {item.title}
              </h3>
              <p className="text-sm font-semibold text-primary-sky">
                {item.company}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {item.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {item.location}
            </span>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-card">
            <ul className="space-y-2 mb-4">
              {item.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed ps-4 relative before:content-['·'] before:absolute before:start-0 before:text-primary-sky before:font-bold before:text-lg"
                >
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  );
}