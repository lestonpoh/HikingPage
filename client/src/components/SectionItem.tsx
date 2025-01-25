import { ReactNode } from "react";

interface Props {
  label: ReactNode;
  body: ReactNode;
  className?: string;
}

const SectionItem = ({ label, body, className }: Props) => {
  return (
    <div className={`${className ? className + " " : ""}flex flex-col gap-1`}>
      <div className="font-bold text-xs">{label}</div>
      <div>{body}</div>
    </div>
  );
};

export default SectionItem;
