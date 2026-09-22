import { Link } from "react-router-dom";

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to?: string;
  onClick?: () => void;
  action?: React.ReactNode;
}

export function OptionCard({ icon, title, description, to, onClick, action }: OptionCardProps) {
  const content = (
    <div className="flex flex-1 items-center justify-between gap-4 p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm hover:border-gray-300 hover:shadow transition-all text-left">
      <div className="flex items-center gap-3">
        <div className="text-zinc-700 shrink-0">{icon}</div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-zinc-900">{title}</span>
          <span className="text-xs text-zinc-500">{description}</span>
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );

  if (to) {
    return <Link to={to} className="block w-full">{content}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
}
