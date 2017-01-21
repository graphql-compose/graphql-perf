import TraceEventFormat from '../TraceEventFormat';

describe('TraceEventFormat', () => {
  it('getEntries()', () => {
    const t = new TraceEventFormat();
    t._entries = [1, 2, 3];
    expect(t.getEntries()).toEqual([1, 2, 3]);
  });

  it('begin(cat, name)', () => {
    const t = new TraceEventFormat();
    t.begin('category', 'name');
    const entries = t.getEntries();
    expect(entries[0].ph).toBe('b');
    expect(entries[0].cat).toBe('category');
    expect(entries[0].name).toBe('name');
  });

  it('end(cat, name)', () => {
    const t = new TraceEventFormat();
    t.end('category', 'name');
    const entries = t.getEntries();
    expect(entries[0].ph).toBe('e');
    expect(entries[0].cat).toBe('category');
    expect(entries[0].name).toBe('name');
  });

  it('instant(cat, name)', () => {
    const t = new TraceEventFormat();
    t.instant('category', 'name');
    const entries = t.getEntries();
    expect(entries[0].ph).toBe('n');
    expect(entries[0].cat).toBe('category');
    expect(entries[0].name).toBe('name');
  });

  describe('_pushEvent(data)', () => {
    it('`cat` should obtain default value', () => {
      const t = new TraceEventFormat();
      t._pushEvent({});
      const entries = t.getEntries();
      expect(entries[0].cat).toBe('default');
    });

    it('`cat` should be joined if it is an array', () => {
      const t = new TraceEventFormat();
      t._pushEvent({ cat: ['a', 'b'] });
      const entries = t.getEntries();
      expect(entries[0].cat).toBe('a,b');
    });

    it('`ts` should be setted as current time in milliseconds', () => {
      const t = new TraceEventFormat();
      const beforeTS = process.hrtime();
      t._pushEvent({});
      const afterTS = process.hrtime();
      const entries = t.getEntries();
      expect(entries[0].ts).toBeDefined;
      expect(entries[0].ts).toBeGreaterThan(beforeTS[0] * 1000000 + Math.round(beforeTS[1]/1000));
      expect(entries[0].ts).toBeLessThan(afterTS[0] * 1000000 + Math.round(afterTS[1]/1000));
    });

    it('`args` should be {} as default', () => {
      const t = new TraceEventFormat();
      t._pushEvent({});
      const entries = t.getEntries();
      expect(entries[0].args).toBeDefined();
      expect(entries[0].args).toEqual({});
    });

    it('`pid` should be init', () => {
      const t = new TraceEventFormat();
      t._pushEvent({});
      const entries = t.getEntries();
      expect(entries[0].pid).toBe(process.pid);
    });

    it('`tid` should be init', () => {
      const t = new TraceEventFormat();
      t._pushEvent({});
      const entries = t.getEntries();
      expect(entries[0].tid).toBe(process.pid);
    });

    it('should pass `name` and `cat`', () => {
      const t = new TraceEventFormat();
      t._pushEvent({ name: 'a', cat: 'b'});
      const entries = t.getEntries();
      expect(entries[0].name).toBe('a');
      expect(entries[0].cat).toBe('b');
    });
  });

  it('t', () => {
    const t = new TraceEventFormat();
    t.begin('graphql', 'resolverA');
    for(let i=0; i<100000; i++) { try{} catch(e){}};
    t.begin('graphql', 'resolverB');
    for(let i=0; i<100000; i++) { try{} catch(e){}};
    t.begin('graphql', 'resolverC');
    for(let i=0; i<100000; i++) { try{} catch(e){}};
    t.end('graphql', 'resolverC');
    for(let i=0; i<100000; i++) { try{} catch(e){}};
    t.end('graphql', 'resolverB');
    for(let i=0; i<100000; i++) { try{} catch(e){}};
    t.end('graphql', 'resolverA');
    console.log(JSON.stringify(t.getEntries()));
  });
});
