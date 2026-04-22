import { useSearchParams } from 'react-router-dom';

export function useToggleSortFilterBy() {
  const [searchParams, setSearchParams] = useSearchParams();

  function toggleSortFilterBy(field: string, value: string) {
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }

  return toggleSortFilterBy;
}
