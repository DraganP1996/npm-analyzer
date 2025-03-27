// types/table.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ColumnMeta } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    className?: string;
  }
}
