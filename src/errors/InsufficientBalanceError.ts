class InsufficientBalance extends Error {
  public status: number;
  constructor () {
    super('Insufficient balance');
    this.status = 406;
  }
}

export { InsufficientBalance };
