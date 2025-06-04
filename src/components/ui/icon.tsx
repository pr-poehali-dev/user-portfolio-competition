import { LucideIcon, icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  fallback?: keyof typeof icons;
  size?: number;
  className?: string;
}

const Icon = ({
  name,
  fallback = "CircleAlert",
  size = 20,
  className = "",
}: IconProps) => {
  const LucideIcon = icons[name] || icons[fallback];

  if (!LucideIcon) {
    const FallbackIcon = icons[fallback];
    return <FallbackIcon size={size} className={className} />;
  }

  return <LucideIcon size={size} className={className} />;
};

export default Icon;
