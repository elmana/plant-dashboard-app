# Configuration

## Client Env (example)
- `REACT_APP_SCHEDULE_INTERVAL_MIN=360`  # 6h
- `REACT_APP_SUN_LOW_THRESHOLD=30`
- `REACT_APP_HUMIDITY_LOW=30`
- `REACT_APP_HUMIDITY_HIGH=80`
- `REACT_APP_TWEET_SAMPLE_SIZE=1`

## Notes
- Intervals under ~15m are not recommended in the browser; for real schedules use server jobs.
