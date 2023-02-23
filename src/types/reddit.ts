type ResponseBody<T> = {
  kind: string;
  data: {
    after: string;
    children: Array<T>;
  };
};

export interface Post {
  id: string;
  name: string;
  title: string;
  score: number;
  gilded: number;
  downs: number;
  ups: number;
  total_awards_received: number;
  all_awardings: [
    {
      icon_url: string;
      resized_icons: [
        {
          width: number;
          height: number;
          url: string;
        }
      ];
    }
  ];
  permalink: string;
  url: string; // External link
  created_utc: number; // unix timestamp
  stickied: boolean;
  author: string;
  num_comments: number;
  thumbnail: string;
  is_video: boolean;
  link_flair_richtext: [{ e: string; t: string }];
  media: any;
}

export type PostRequest = ResponseBody<Post>;
