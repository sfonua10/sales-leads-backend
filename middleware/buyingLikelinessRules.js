const buyingLikelinessRules = (req) => {
  let HLB_indicator = 0;
  if (String(req.body.zip)[0] === '7') {
    HLB_indicator += 1;
  }
  if (req.body.name.toLowerCase().includes('z')) {
    HLB_indicator += 1;
  }
  return HLB_indicator;
}

module.exports = { buyingLikelinessRules }