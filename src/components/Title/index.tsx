interface TitleProps {
  title: string
}
export function Title({ title }: TitleProps) {
  return <h2 className="font-bold text-xl">{title}</h2>
}
