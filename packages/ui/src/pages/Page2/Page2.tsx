import { Typography } from '@mui/material';

import { FullSizeCentered } from '@/components/styled';

function Page2() {
  return (
    <>
      <meta name="title" content="Page 2" />
      <FullSizeCentered>
        <Typography variant="h3">Page 2</Typography>
      </FullSizeCentered>
    </>
  );
}

export default Page2;

/*

// Get the schedule table for a given station
curl 'https://www.garesetconnexions.sncf/schedule-table/Departures/0087384008' \
  -H 'accept: application/json' \
  -H 'accept-language: en-US,en;q=0.9,fr;q=0.8' \
  -H 'dnt: 1' \
  -H 'if-modified-since: Thu, 29 May 2025 13:09:23 GMT' \
  -H 'priority: u=1, i' \
  -H 'referer: https://www.garesetconnexions.sncf/fr/gares-services/paris-saint-lazare/horaires' \
  -H 'sec-ch-device-memory: 8' \
  -H 'sec-ch-ua: "Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"' \
  -H 'sec-ch-ua-arch: "arm"' \
  -H 'sec-ch-ua-full-version-list: "Chromium";v="136.0.7103.114", "Google Chrome";v="136.0.7103.114", "Not.A/Brand";v="99.0.0.0"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-model: ""' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'


  

*/