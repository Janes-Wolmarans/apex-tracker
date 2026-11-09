# APEX // TRACKER

A responsive live Apex Legends stats dashboard using the unofficial Apex Legends Status API.

## Run

1. Install Node.js 18 or newer.
2. Obtain an API key from https://apexlegendsapi.com/ .
3. In this folder, run:

**Windows PowerShell**
```powershell
$env:APEX_API_KEY="YOUR_API_KEY"
node server.js
```

**Linux/macOS**
```bash
APEX_API_KEY="YOUR_API_KEY" node server.js
```

4. Open http://localhost:3000 .

## Notes

- API keys remain on the server, not in browser JavaScript.
- Player search requires an EA account name on PC, even if playing via Steam.
- Auto-refresh is every two minutes while the tab is visible.
- Apex banner trackers do not guarantee complete lifetime stats. Missing data displays N/A.
- K/D is not provided by this API and is intentionally not fabricated.
- Match history requires separate restricted API access and is not implemented.
- For public deployment use HTTPS, set APEX_API_KEY as a server secret, and add your own IP-based rate limiting.
- This is an unofficial fan project and is not endorsed by EA or Respawn.
