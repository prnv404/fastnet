// example.ts
 function add(a: number, b: number): number {
    return a + b;
 }
  
 describe('add function', () => {
    it('adds two numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });
  
    it('adds negative numbers correctly', () => {
      expect(add(-2, -3)).toBe(-5);
    });
  
    it('adds a positive and a negative number correctly', () => {
      expect(add(2, -3)).toBe(-1);
    });
  })
  