export interface ButtonProps {
  text: string;
  stylebutton?: string;
  onClick?: () => void;
  className?: string;
  title?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // optional
}
