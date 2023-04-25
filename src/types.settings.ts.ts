interface EntryValue<T> {
    key: string;
    value: T;
    setValue: (value: T) => void;
  }
  
  interface SubEntry<T> {
    key: string;
    subEntries: Array<Entry<T>>;
  }
  
  type Entry<T> = {
    header: string;
    subEntry: SubEntry<T> | Array<SubEntry<T>>;
  };
  
  type GreatEntry<T> = {
    header: string;
    entries: Array<Entry<T>>;
  };
  
  export type { EntryValue, SubEntry, Entry, GreatEntry };
  