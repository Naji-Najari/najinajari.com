"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  title?: string;
  description?: string;
  date?: string;
  [key: string]: unknown;
}

export interface TimelineStyles {
  lineColor: string;
  activeLineColor: string;
  dotColor: string;
  activeDotColor: string;
  dotSize: string;
  titleColor: string;
  activeTitleColor: string;
  descriptionColor: string;
  dateColor: string;
}

const DOT_DURATION = 0.12;
const LINE_DURATION = 0.15;
const STAGGER = 0.08;
const LINE_OFFSET = 0.04;

function computeDelays(
  index: number,
  active: number | null,
  prev: number | null,
): { dotDelay: number; lineDelay: number } {
  const a = active ?? -1;
  const p = prev ?? -1;

  if (a > p) {
    if (p < 0) {
      return {
        dotDelay: index * STAGGER,
        lineDelay: index * STAGGER + LINE_OFFSET,
      };
    }
    return {
      dotDelay: index > p ? (index - p) * STAGGER : 0,
      lineDelay:
        index === p
          ? 0
          : index > p
            ? (index - p) * STAGGER + LINE_OFFSET
            : 0,
    };
  }

  if (a < p) {
    return {
      dotDelay: index <= p && index > a ? (p - index) * STAGGER : 0,
      lineDelay:
        index >= Math.max(a, 0) && index < p
          ? (p - 1 - index) * STAGGER + LINE_OFFSET
          : 0,
    };
  }

  return { dotDelay: 0, lineDelay: 0 };
}

interface TimelineItemProps<T extends TimelineEvent> {
  event: T;
  isActive: boolean;
  isDotActive: boolean;
  isLineActive: boolean;
  isLast: boolean;
  dotDelay: number;
  lineDelay: number;
  onEnter: () => void;
  onClick?: () => void;
  styles: TimelineStyles;
  customRender?: (event: T, isActive: boolean) => ReactNode;
}

function TimelineItem<T extends TimelineEvent>({
  event,
  isActive,
  isDotActive,
  isLineActive,
  isLast,
  dotDelay,
  lineDelay,
  onEnter,
  onClick,
  styles,
  customRender,
}: TimelineItemProps<T>) {
  const dotStyle: CSSProperties = {
    width: styles.dotSize,
    height: styles.dotSize,
    borderColor: isDotActive ? styles.activeDotColor : styles.dotColor,
    backgroundColor: isDotActive ? styles.activeDotColor : "var(--background)",
    transform: isDotActive ? "scale(1.15)" : "scale(1)",
    transitionProperty: "background-color, border-color, transform",
    transitionDuration: `${DOT_DURATION}s`,
    transitionDelay: `${dotDelay}s`,
    transitionTimingFunction: "ease",
  };

  const lineFillStyle: CSSProperties = {
    backgroundColor: styles.activeLineColor,
    transform: isLineActive ? "scaleY(1)" : "scaleY(0)",
    transformOrigin: "top",
    transitionProperty: "transform",
    transitionDuration: `${LINE_DURATION}s`,
    transitionDelay: `${lineDelay}s`,
    transitionTimingFunction: "ease-in-out",
  };

  const titleStyle: CSSProperties = {
    color: isDotActive ? styles.activeTitleColor : styles.titleColor,
    transitionProperty: "color",
    transitionDuration: `${DOT_DURATION}s`,
    transitionDelay: `${dotDelay}s`,
  };

  const clickable = Boolean(onClick);

  return (
    <div
      className="flex last:mb-0"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onClick}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div className="relative me-4 flex flex-col items-center pt-1.5">
        <div
          className={cn(
            "absolute inset-y-0 w-0.5 rounded-full",
            isLast ? "hidden" : "block",
          )}
          style={{ backgroundColor: styles.lineColor }}
        >
          <div className="h-full w-full" style={lineFillStyle} />
        </div>
        <div
          className="relative z-10 rounded-full border-[3px]"
          style={dotStyle}
        />
      </div>
      <div className={cn("grow leading-5", !isLast && "mb-3")}>
        {customRender ? (
          customRender(event, isActive)
        ) : (
          <>
            <h3 className="text-lg font-semibold" style={titleStyle}>
              {event.title}
            </h3>
            {event.description && (
              <p style={{ color: styles.descriptionColor }}>{event.description}</p>
            )}
            {event.date && (
              <span className="text-sm" style={{ color: styles.dateColor }}>
                {event.date}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface AnimatedTimelineProps<T extends TimelineEvent> {
  events: T[];
  className?: string;
  styles?: Partial<TimelineStyles>;
  customEventRender?: (event: T, isActive: boolean) => ReactNode;
  onEventHover?: (event: T | null) => void;
  onEventClick?: (event: T) => void;
  initialActiveIndex?: number;
}

const defaultStyles: TimelineStyles = {
  lineColor: "var(--border)",
  activeLineColor: "var(--primary-sky)",
  dotColor: "var(--border)",
  activeDotColor: "var(--primary-sky)",
  dotSize: "1rem",
  titleColor: "var(--foreground)",
  activeTitleColor: "var(--primary-sky)",
  descriptionColor: "var(--muted-foreground)",
  dateColor: "var(--muted-foreground)",
};

export function AnimatedTimeline<T extends TimelineEvent = TimelineEvent>({
  events,
  className,
  styles: customStyles,
  customEventRender,
  onEventHover,
  onEventClick,
  initialActiveIndex,
}: AnimatedTimelineProps<T>) {
  const [state, setState] = useState<{
    active: number | null;
    prev: number | null;
  }>({
    active: initialActiveIndex ?? null,
    prev: null,
  });
  const styles = { ...defaultStyles, ...customStyles };

  const setActive = (index: number | null) => {
    setState((s) => (s.active === index ? s : { active: index, prev: s.active }));
    onEventHover?.(index !== null ? events[index] : null);
  };

  return (
    <div
      className={cn("relative py-4", className)}
      onMouseLeave={() => setActive(null)}
    >
      {events.map((event, index) => {
        const isDotActive = state.active !== null && index <= state.active;
        const isLineActive = state.active !== null && index < state.active;
        const { dotDelay, lineDelay } = computeDelays(
          index,
          state.active,
          state.prev,
        );
        return (
          <TimelineItem
            key={event.id}
            event={event}
            isActive={isDotActive}
            isDotActive={isDotActive}
            isLineActive={isLineActive}
            isLast={index === events.length - 1}
            dotDelay={dotDelay}
            lineDelay={lineDelay}
            onEnter={() => setActive(index)}
            onClick={onEventClick ? () => onEventClick(event) : undefined}
            styles={styles}
            customRender={customEventRender}
          />
        );
      })}
    </div>
  );
}
