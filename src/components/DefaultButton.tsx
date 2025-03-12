import "../styles/buttons.scss";

interface DefaultButtonProps {
  text?: string;
  icon?: React.ReactElement;
  type?: "button" | "submit" | "reset" | "return";
  onClick?: () => void;
}

export const DefaultButton = ({
  text = "",
  icon,
  type = "button",
  onClick,
}: DefaultButtonProps) => {
  const buttonClass =
    type === "reset"
      ? "reset-button"
      : type === "return"
      ? "return-button"
      : "default-button";
  return (
    <button
      type={type === "return" ? "button" : type}
      className={buttonClass}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};
