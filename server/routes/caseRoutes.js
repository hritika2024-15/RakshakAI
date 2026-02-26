const express = require('express');
const router = express.Router();
const { getVexProfile, getPetitionerProfile, analyzePetitioner } = require('../controllers/caseController');

router.get('/analyze', getVexProfile);
router.get('/petitioner', getPetitionerProfile);
router.post('/analyze-petitioner', analyzePetitioner);

module.exports = router;