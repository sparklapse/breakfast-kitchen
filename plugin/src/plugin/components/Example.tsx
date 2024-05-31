import type {
  ComponentEditorProps,
  ComponentProps,
} from "@sparklapse/breakfast";

// This type describes the data that can be associated with an instance of your components
// eg. A text component needs a text property for the user to be able to modify and store what
// text should be displayed.

type Props = {
  text: string;
};

// The editor is what the user will see in the breakfast scene editor when modifying an
// instance of your component. By default, the data is always empty (ie. `{}`) so make
// sure you have default values in place and can handle undefined values.

export function Editor({ data, setData }: ComponentEditorProps<Props>) {
  return (
    <textarea
      value={data.text}
      oninput={(ev) => setData("text", ev.currentTarget.value)}
    />
  );
}

// The component is what is rendered in the breakfast scene and is where you can fully
// customise how your overlays should look and feel. Remember, `data` by default is empty
// so make sure you have default values.

export function Component({ data }: ComponentProps<Props>) {
  return <p>{data.text ?? ""}</p>;
}
