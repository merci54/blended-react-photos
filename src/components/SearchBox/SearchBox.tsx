import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (newQuery: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return <input className={css.input} type="text" placeholder="Search posts" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }} />;
}
