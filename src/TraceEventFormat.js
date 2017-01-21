// While nodejs tracer in progress, will use this class.
// Track tracer progress urls:
//    https://github.com/nodejs/diagnostics/issues/53
//    https://github.com/jasongin/nodejs/blob/tracejs/tracing.d.ts

export default class TraceEventFormat {
  constructor() {
    this._entries = [];
  }

  getEntries() {
    return this._entries;
  }

  begin(cat, name) {
    this._pushEvent({ ph: 'b', cat, name });
  }

  instant(cat, name) {
    this._pushEvent({ ph: 'n', cat, name });
  }

  end(cat, name) {
    this._pushEvent({ ph: 'e', cat, name });
  }

  _pushEvent(data) {
    if (!data.cat) {
      data.cat = 'default';
    } else if (Array.isArray(data.cat)) {
      data.cat = data.cat.join(',');
    }

    if (!data.ts) {
      const hrtime = process.hrtime(); // [seconds, nanoseconds]
      data.ts = hrtime[0] * 1000000 + Math.round(hrtime[1]/1000); // microseconds
    }

    if (!data.args) {
      data.args = {};
    }

    if (!data.pid) {
      data.pid = process.pid;
    }

    if (!data.tid) {
      data.tid = process.pid;
    }

    this._entries.push(data);
  }
}
