/** @type {import("@sparklapse/breakfast/overlay").Script} */
export default {
  id: "script-id",
  label: "Your Script",
  version: 0,
  sources: [
    {
      label: "Example",
      subLabel: "An example source",
      tag: "example-source",
      inputs: [
        {
          id: "meal",
          type: "text",
          label: "Favourite meal",
          defaultValue: "breakfast",
          target: "props.meal",
        },
      ],
    },
  ],
};

