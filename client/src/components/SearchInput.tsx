import SearchIcon from "@mui/icons-material/Search";

interface Props {
  placeholder?: string;
}

const SearchInput = ({ placeholder = "Search" }: Props) => {
  return (
    <div className="relative flex items-center input">
      <div className="">
        <SearchIcon className="dark:text-white" />
      </div>
      <input
        className="absolute top-0 left-0 right-0 bottom-0 bg-transparent pl-10 pr-2.5 py-2 dark:text-white"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
