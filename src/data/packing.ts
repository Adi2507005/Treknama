
export type PackingItem = {
    id: string;
    name: string;
  };
  
  export type PackingCategory = {
    name: string;
    items: PackingItem[];
  };
  
  export const packingGuides: Record<string, PackingCategory[]> = {
    "triund": [
      {
        name: "Trekking essentials",
        items: [
          { id: "triund-shoes", name: "Comfortable trekking shoes" },
          { id: "triund-backpack", name: "Day backpack" },
          { id: "triund-bottle", name: "Reusable water bottle" },
          { id: "triund-poles", name: "Trekking poles (optional)" },
        ],
      },
      {
        name: "Clothing",
        items: [
          { id: "triund-jacket", name: "Warm jacket or fleece" },
          { id: "triund-raincoat", name: "Rain jacket or poncho" },
          { id: "triund-socks", name: "Extra pairs of socks" },
          { id: "triund-cap", name: "Cap and warm headwear" },
        ],
      },
      {
        name: "Safety and personal care",
        items: [
          { id: "triund-firstaid", name: "Basic first-aid kit" },
          { id: "triund-sunscreen", name: "Sunscreen and sunglasses" },
          { id: "triund-meds", name: "Personal medication" },
          { id: "triund-phone", name: "Charged phone and power bank" },
        ],
      },
    ],
  
    "nag-tibba": [
      {
        name: "Trekking essentials",
        items: [
          { id: "nag-shoes", name: "Trekking shoes with good grip" },
          { id: "nag-backpack", name: "Day backpack" },
          { id: "nag-bottle", name: "Reusable water bottle" },
          { id: "nag-poles", name: "Trekking poles" },
        ],
      },
      {
        name: "Clothing",
        items: [
          { id: "nag-thermal", name: "Thermal innerwear" },
          { id: "nag-jacket", name: "Warm insulated jacket" },
          { id: "nag-gloves", name: "Warm gloves" },
          { id: "nag-socks", name: "Extra trekking socks" },
          { id: "nag-rain", name: "Waterproof jacket or poncho" },
        ],
      },
      {
        name: "Safety and personal care",
        items: [
          { id: "nag-firstaid", name: "First-aid kit" },
          { id: "nag-sunscreen", name: "Sunscreen and sunglasses" },
          { id: "nag-meds", name: "Personal medication" },
          { id: "nag-light", name: "Headlamp or flashlight" },
        ],
      },
    ],
  
    "hampta-pass": [
      {
        name: "Trekking equipment",
        items: [
          { id: "hampta-boots", name: "Water-resistant trekking boots" },
          { id: "hampta-backpack", name: "Trekking backpack" },
          { id: "hampta-poles", name: "Trekking poles" },
          { id: "hampta-cover", name: "Waterproof backpack cover" },
          { id: "hampta-bottle", name: "Reusable water bottle" },
        ],
      },
      {
        name: "Clothing and layers",
        items: [
          { id: "hampta-thermal", name: "Thermal innerwear" },
          { id: "hampta-fleece", name: "Fleece or mid-layer jacket" },
          { id: "hampta-down", name: "Insulated warm jacket" },
          { id: "hampta-rain", name: "Waterproof outer layer" },
          { id: "hampta-gloves", name: "Warm gloves" },
          { id: "hampta-socks", name: "Extra trekking socks" },
        ],
      },
      {
        name: "Safety and personal care",
        items: [
          { id: "hampta-firstaid", name: "First-aid kit" },
          { id: "hampta-sunscreen", name: "Sunscreen and sunglasses" },
          { id: "hampta-meds", name: "Personal medication" },
          { id: "hampta-light", name: "Headlamp or flashlight" },
          { id: "hampta-power", name: "Power bank" },
          { id: "hampta-water", name: "Water purification supplies" },
        ],
      },
    ],
  
    "kedarkantha": [
      {
        name: "Trekking equipment",
        items: [
          { id: "ked-boots", name: "Suitable trekking boots" },
          { id: "ked-backpack", name: "Trekking backpack" },
          { id: "ked-poles", name: "Trekking poles" },
          { id: "ked-cover", name: "Backpack rain cover" },
          { id: "ked-bottle", name: "Reusable water bottle" },
        ],
      },
      {
        name: "Cold-weather clothing",
        items: [
          { id: "ked-thermal", name: "Thermal innerwear" },
          { id: "ked-fleece", name: "Fleece mid-layer" },
          { id: "ked-jacket", name: "Insulated winter jacket" },
          { id: "ked-gloves", name: "Warm waterproof gloves" },
          { id: "ked-socks", name: "Warm trekking socks" },
          { id: "ked-cap", name: "Warm cap and neck warmer" },
        ],
      },
      {
        name: "Safety and personal care",
        items: [
          { id: "ked-firstaid", name: "First-aid kit" },
          { id: "ked-sunscreen", name: "Sunscreen and sunglasses" },
          { id: "ked-meds", name: "Personal medication" },
          { id: "ked-light", name: "Headlamp or flashlight" },
          { id: "ked-power", name: "Power bank" },
          { id: "ked-water", name: "Water purification supplies" },
        ],
      },
    ],
  
    "everest-base-camp": [
      {
        name: "Trekking equipment",
        items: [
          { id: "ebc-boots", name: "Broken-in trekking boots" },
          { id: "ebc-backpack", name: "Comfortable trekking backpack" },
          { id: "ebc-poles", name: "Trekking poles" },
          { id: "ebc-bottle", name: "Reusable water bottles" },
          { id: "ebc-purifier", name: "Water purification supplies" },
        ],
      },
      {
        name: "High-altitude clothing",
        items: [
          { id: "ebc-thermal", name: "Thermal base layers" },
          { id: "ebc-fleece", name: "Fleece or insulating mid-layer" },
          { id: "ebc-down", name: "Warm down jacket" },
          { id: "ebc-shell", name: "Waterproof outer shell" },
          { id: "ebc-gloves", name: "Insulated gloves" },
          { id: "ebc-socks", name: "Warm trekking socks" },
          { id: "ebc-cap", name: "Warm hat and neck covering" },
        ],
      },
      {
        name: "Safety and personal essentials",
        items: [
          { id: "ebc-firstaid", name: "First-aid kit" },
          { id: "ebc-meds", name: "Personal medication" },
          { id: "ebc-sun", name: "High-protection sunscreen and sunglasses" },
          { id: "ebc-light", name: "Headlamp or flashlight" },
          { id: "ebc-power", name: "Power bank and charging accessories" },
          { id: "ebc-docs", name: "Passport and required travel documents" },
          { id: "ebc-toiletries", name: "Personal hygiene supplies" },
        ],
      },
    ],
  };
  