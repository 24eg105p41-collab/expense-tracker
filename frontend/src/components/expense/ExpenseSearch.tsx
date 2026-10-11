interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ExpenseSearch({ value, onChange }: Props) {
  return (
    <div className="search-box">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, description or category…"
        aria-label="Search expenses"
      />
    </div>
  );
}
