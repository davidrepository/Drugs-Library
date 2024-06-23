export type Alignment = "list" | "table";

export interface HandleChangeAlignmentEvent {
  (event: React.MouseEvent<HTMLElement>, newAlignment: Alignment): void;
}
