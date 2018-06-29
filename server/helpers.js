module.exports = {
  handleGetProduct: (err, data, res) => {
    if (err) {
      res.sendStatus(500);
    } else if (data) {
      res.json(data);
    } else {
      db.retrieve()
    }
  },
  handleStoreProduct: (error, storeReply) => {
    if (error) {
      res.sendStatus(500);
    } else {
      res.json(storeReply);
    }
  }
};
