const queque: any[] = [];
const activePreFlushCbs: any[] = [];
let isFlushPending = false;
const p = Promise.resolve();

export function queueJobs(job) {
  if (!queque.includes(job)) {
    queque.push(job);
  }
  queueFlush();
}

export function queuePreFlushCb(job) {
  activePreFlushCbs.push(job);

  queueFlush();
}

export function nextTick(fn?) {
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

  //

  flushPreFlushCbs();

  // component render

  while ((job = queque.shift())) {
    job && job();
  }
}

function flushPreFlushCbs() {
  for (let i = 0; i < activePreFlushCbs.length; i++) {
    activePreFlushCbs[i]();
  }
}
