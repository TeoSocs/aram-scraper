class TierList {
  constructor() {
    this.data = {}
  }
  add(championData) {
    if (this.data[championData.tier] == null) {
      this.data[championData.tier] = [];
    }
    this.data[championData.tier].push(championData);
  }
  erase() {
    this.data = {}
  }
}

tierList = new TierList()

module.exports = tierList