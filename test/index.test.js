const obj = {
  value: 5,

  ['+'](num) {
    return this.value + num;
  },

  ['-'](num) {
    return this.value - num;
  },

  ['<<'](num) {
    return this.value << num;
  },
};

it('operator test.', () => {
  opol: {
    expect(obj + 5).toBe(10);
    expect(obj - 3).toBe(2);
    expect(obj << 3).toBe(40);
  }
});

it('transform is only enable inside a `opol` block', () => {
  expect(obj + 5).not.toBe(10);
  expect(obj - 3).not.toBe(2);
  expect(obj << 3).not.toBe(40);
});
