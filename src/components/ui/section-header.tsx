import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  theme = "light",
  className,
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex flex-col mb-12 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "text-xs font-bold tracking-[0.25em] uppercase mb-3",
            isDark ? "text-[#D6B46A]" : "text-[#C59A4B]"
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl",
          isDark ? "text-[#FFFDF7]" : "text-[#342B27]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-sm md:text-base lg:text-lg max-w-2xl font-light mt-4 leading-relaxed",
            isDark ? "text-[#FFFDF7]/80" : "text-[#49332D]/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
