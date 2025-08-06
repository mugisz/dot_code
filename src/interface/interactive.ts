type DesktopItemProps = {
  id: string;
  title: string;
  isSelected: boolean;
  removeItem: (id: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export type { DesktopItemProps };
