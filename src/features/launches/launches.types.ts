export type LaunchApi = {
  id: string;
  details: string | null;
  mission_name: string | null;
  launch_date_local: string | null;
  launch_date_utc: string | null;
  launch_year: string | null;
  links: {
    article_link: string | null;
    video_link: string | null;
  } | null;
  rocket: {
    rocket_name: string | null;
  } | null;
};

export type Launch = {
  id: string;
  missionName: string;
  launchDateUtc: string | null;
  launchDateLocal: string | null;
  launchYear: number | null;
  rocketName: string | null;
  articleLink: string | null;
  videoLink: string | null;
  details: string | null;
};

export type LaunchesByYear = {
  year: number | null;
  count: number;
  missions: string[];
};
