"use client";

import { Badge } from "@/components/ui/badge";
import { stackCategories } from "@/lib/data";
import FramerWrapper from "@/components/animation/framer-wrapper";

export default function Stack() {
  return (
    <section id="stack" className="py-20 md:py-28 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <FramerWrapper y={-20} delay={0.1}>
          <h2 className="text-3xl font-bold text-foreground mb-16 heading-underline">
            Stack
          </h2>
        </FramerWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stackCategories.map((category, index) => (
            <FramerWrapper
              key={category.label}
              y={30}
              delay={0.1 + index * 0.08}
            >
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-primary-sky uppercase tracking-wider">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="text-sm font-medium px-3 py-1.5 border border-border hover:border-primary-sky/50 hover:bg-accent transition-all duration-200 cursor-default"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </FramerWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
