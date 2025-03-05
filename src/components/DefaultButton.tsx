import "../styles/buttons.scss"

interface DefaultButtonProps {
    text?: string;
    icon?: React.ReactElement;
}


export const DefaultButton = ({ text = "", icon }: DefaultButtonProps) => {
    return (
        <button className="default-button">
            {icon}
            {text}
        </button>
    );
};