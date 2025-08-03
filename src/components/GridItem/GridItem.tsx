import style from "./GridItem.module.css";

interface GridItem {
  children: React.ReactNode
}

export default function GridItem({ children }: GridItem) {
  return <li className={style.item}>{children}</li>;
}
