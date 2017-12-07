# Example Agenda usage

Issue:

* Agenda `defaultConcurrency` settings is not working as expected.

Expected:

* If `defaultConcurrency` is set to 5 then each worker process is allowed to process up to 5 jobs of the same type

Actual:

* When `defaultConcurrency` is set to 5, two worker processes will only process 5 jobs total, instead of 5 jobs each

## Steps to reproduce:

1. Checkout this repo (you should also have mongo running locally)
1. `yarn install`
1. `yarn start` (start the dev server on port 3000)
1. Open browser to http://localhost:3000/agendash
    * this will show all the jobs that agenda knows about, there should be none at this point
1. Open a new terminal window, run `yarn queue-jobs --name job-1 --num 10`
    * this will queue up 10 runs of `job-1`
1. Now, in agendash you should see 10 jobs of `job-1` "Queued"
1. Open a terminal window, run `yarn worker`
    * this will start a worker process
1. Now, in agendash you should see there are 5 jobs "Running" and 5 jobs "Queued"
1. Open a terminal window, run `yarn worker` to start a second worker process
1. Now, there are still 5 jobs "Running" and 5 jobs "Queued", the second worker process has not picked up
any jobs.
