interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-transparent">
      <div className="flex items-center px-6 h-16">
        <span className="text-caption font-semibold tracking-widest uppercase text-text-muted">
          {title}
        </span>
      </div>
    </header>
  );
}
