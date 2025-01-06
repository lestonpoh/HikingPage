interface Props {
  children: string;
  color?: string;
  onClick: () => void;
}

const Button = ({ children, onClick, color }: Props) => {
  return (
    <button
      className={
        "bg-sky-400 text-white font-bold rounded-lg py-2 px-4 cursor-pointer hover:bg-sky-600"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
