export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface UserColor {
  name: string;
  rgb: RGB;
}

export interface UserColorStorage extends UserColor {
  id: string;
}

export interface UserColorUrl {
  name?: string;
  rgb: RGB;
  id?: string;
}