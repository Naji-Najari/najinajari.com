declare module "react-gridlines" {
  import { FC } from "react";
  interface GridlinesProps {
    cellWidth?: number;
    cellHeight?: number;
    strokeWidth?: number;
    lineColor?: string;
    className?: string;
    children?: React.ReactNode;
  }
  const Gridlines: FC<GridlinesProps>;
  export default Gridlines;
}
