import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterSelectProps {
  sortFilterBy: string;
  onChange: (value: string) => void;
  placeholder: string;
  items: { value: string; label: string }[];
}

export default function FilterSelect({ sortFilterBy, onChange, placeholder, items }: FilterSelectProps) {
  return (
    <Select value={sortFilterBy} onValueChange={onChange}>
      <SelectTrigger className="cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
