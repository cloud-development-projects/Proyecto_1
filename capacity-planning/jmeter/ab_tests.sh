#!/bin/bash

# ==========================
# ANB Rising Stars - AB Tests
# ==========================
# This script runs quick load tests using Apache Bench (ab)
# against the public API endpoint.
#
# Results: stored as text files in ./capacity-planning/jmeter/results/

URL="http://localhost:8080/api/public/videos"
TOTAL_REQUESTS=500   # total number of requests per test
RESULTS_DIR="./capacity-planning/jmeter/results"

# Create results directory if it does not exist
mkdir -p $RESULTS_DIR

echo "Starting load tests with Apache Bench"
echo "Target endpoint: $URL"
echo "Results will be saved in: $RESULTS_DIR"
echo

# Concurrency levels to test
for c in 10 50 100 200 500
do
  echo "Running test with $c concurrent users..."
  ab -n $TOTAL_REQUESTS -c $c $URL > "$RESULTS_DIR/ab_c${c}.txt"
  echo "   Result saved to $RESULTS_DIR/ab_c${c}.txt"
done

echo
echo "All tests completed."
