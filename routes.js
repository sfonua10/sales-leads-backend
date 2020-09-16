const express = require("express");
const router = express.Router();
const Leads = require("./models/Leads");
const { sortByHLB } = require('./middleware/sortByHLB');
const { buyingLikelinessRules } = require('./middleware/buyingLikelinessRules');
const { eligibleState } = require('./middleware/eligibleState');

router.get("/leads", async (req, res) => {
  const leads = await Leads.find().sort({ 'highleyLikelyToBuy': -1 });
  //sortByHLB, HLB stands for Highley Likely to Buy
  const sortedLeads = sortByHLB(leads);
  res.send(sortedLeads);
})

router.post("/leads", async (req, res) => {
  //call function to set points so easier to sort
  const HLB_points = buyingLikelinessRules(req);
  const isEligible = eligibleState(req.body.state)
  const lead = new Leads({
    highleyLikelyToBuy: HLB_points,
    eligibleLead: isEligible,
    name: req.body.name,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    preferredContactMethod: req.body.preferredContactMethod
  })
  await lead.save();
  res.send(lead);
})

// router.delete('/leads/', async (req, res) => {
//   try {
//     const lead = await Leads.deleteMany({ state: /Utah/ });
//     console.log('deleted lead: ', lead)
//     if (!lead) {
//       return res.status(404).send();
//     }
//     res.send(lead)
//   } catch (e) {
//     res.status(500).send()
//   }
// })
router.delete('/leads/:id', async (req, res) => {
  console.log('req.params.id', req.params.id)
  try {
    const lead = await Leads.findByIdAndDelete(req.params.id);
    console.log('lead', lead)
    if(!lead) {
      return res.status(404).send();
    }

    res.send(lead)
  } catch(e) {
    res.status(500).send();
  }
})

module.exports = router;