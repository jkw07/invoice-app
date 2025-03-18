import "../styles/buttons.scss";

interface DefaultButtonProps {
  text?: string;
  icon?: React.ReactElement;
  type?: "submit" | "reset" | "button" | undefined;
  className?: "default-button" | "reset-buton" | "return-button";
  onClick?: () => void;
}

export const DefaultButton = ({
  text = "",
  icon,
  className = "default-button",
  type = "button",
  onClick,
}: DefaultButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};
