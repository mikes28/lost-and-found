export interface Item {
  id: number;
  title: string;
  description: string;
  status: "talált" | "visszaadva";
  image_url: string;
}

export interface Claim {
  id: number;
  item_id: number;
  user_id: number;
  message: string;
}
