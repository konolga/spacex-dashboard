import { graphqlClient } from '../../shared/config/graphqlClient';

const LAUNCHES_PAST_QUERY = `query LaunchesPast($limit: Int, $offset: Int) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      details
      mission_name
      launch_date_local
      launch_date_utc
      launch_year
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
      }
    }
  }
`;

export async function fetchLaunchesPast({ limit, offset }: { limit: number; offset: number }) {
  const data = await graphqlClient.request(LAUNCHES_PAST_QUERY, { limit, offset });
  return data.launchesPast ?? [];
}
