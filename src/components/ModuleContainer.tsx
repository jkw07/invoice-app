import { LucideIcon } from "lucide-react";

interface ModuleContainerProps {
  text: string;
  onClick: () => void;
  Icon: LucideIcon;
}

export const ModuleContainer = ({
  text,
  onClick,
  Icon,
}: ModuleContainerProps) => {
  return (
    <button className="modules-container" onClick={onClick}>
      <Icon size={48} className="module-icon" />
      <h2>{text}</h2>
    </button>
  );
};
