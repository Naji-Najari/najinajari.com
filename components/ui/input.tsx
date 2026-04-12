import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-xl border border-neutral-200 bg-background px-4 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:focus:border-neutral-600",
        className
      )}
      {...props}
    />
  );
}

export { Input };
