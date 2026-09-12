interface TitleProps {
  title: string;
  className?: string;
}
export function Title({ title, className = '' }: TitleProps) {
  return <h2 className={className ? className : 'font-bold text-xl text-brand-primary-deep'}>
    {title}
  </h2>
}
