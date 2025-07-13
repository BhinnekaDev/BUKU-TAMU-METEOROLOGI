import { ReactNode } from "react";

export interface CardProfileProps {
  children: ReactNode;
}
type Props = {
  onClose: () => void;
};

export default function CardProfile({ onClose }: Props) {
  // ...
}
