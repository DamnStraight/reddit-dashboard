type ResponseBody<T> = {
  kind: string;
  data: {
    after: string;
    children: Array<{ after: string; data: T }>;
  };
};

export interface RedditPost {
  id: string;
  name: string;
  title: string;
  score: number;
  gilded: number;
  downs: number;
  ups: number;
  total_awards_received: number;
  all_awardings: Award[];
  permalink: string;
  url: string; // External link
  created_utc: number; // unix timestamp
  stickied: boolean;
  author: string;
  num_comments: number;
  thumbnail: string;
  is_video: boolean;
  link_flair_richtext: { e: string; t: string }[];
  media: any;
}

export interface Award {
  icon_url: string;
  resized_icons: AwardIcon[];
}

export interface AwardIcon {
  width: number;
  height: number;
  url: string;
}

export type PostRequest = ResponseBody<RedditPost>;
