const sortByHLB = (leads) => {
  return leads.sort((a, b) => a.state === 'Ohio' ? -1 : 1)
}

module.exports = { sortByHLB }