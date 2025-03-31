declare module "simple-color-converter" {
  interface ColorInput {
    [colorSpace: string]: any;
    to?: string;
  }

  class SimpleColorConverter {
    constructor(input: ColorInput);
    [key: string]: any;
  }

  export = SimpleColorConverter;
}
