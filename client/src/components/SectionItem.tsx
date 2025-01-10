import { ReactNode } from "react";

interface Props {
  label: ReactNode;
  body: ReactNode;
}

const SectionItem = ({ label, body }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold text-xs">{label}</div>
      <div>{body}</div>
    </div>
  );
};

export default SectionItem;
