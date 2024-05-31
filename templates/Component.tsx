import type {
  ComponentEditorProps,
  ComponentProps,
} from "@sparklapse/breakfast";

// Specify what data your component takes
type Props = {};

// Define an editor to be able to control the data for your component
export function Editor({ data, setData }: ComponentEditorProps<Props>) {
  return <></>;
}

// Define how your component renders as a source
export function Component({ data }: ComponentProps<Props>) {
  return <></>;
}
