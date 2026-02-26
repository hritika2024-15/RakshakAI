const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true, unique: true },
  petitionerName: { type: String, required: true },
  respondentName: { type: String, required: true },
  petitionerId: { type: String },
  advocateName: { type: String },
  courtName: { type: String },
  caseType: { type: String },
  filingDate: { type: Date },
  disposalDate: { type: Date },
  status: { type: String, enum: ['Pending', 'Dismissed', 'Frivolous', 'Closed', 'Ongoing', 'Withdrawn'] },
  costs: { type: Number, default: 0 },
  remarks: { type: String }
});

module.exports = mongoose.model('Case', CaseSchema);