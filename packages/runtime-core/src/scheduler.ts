const queque: any[] = [];

let isFlushPending = false;
const p = Promise.resolve();
export function queueJobs(job) {
  if (!queque.includes(job)) {
    queque.push(job);
  }
  queueFlush();
}

export function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

function queueFlush() {
  if (isFlushPending) return;
  isFlushPending = true;
  nextTick(flushJobs);
}

function flushJobs() {
  isFlushPending = false;
  let job;

  while ((job = queque.shift())) {
    job && job();
  }
}
