// controllers/approverController.js
const db = require('../models');

exports.getAllApprovers = async (req, res) => {
  try {
    const approvers = await db.Approver.findAll();
    res.json(approvers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createApprover = async (req, res) => {
  try {
    const approver = await db.Approver.create(req.body);
    res.status(200).json(approver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateApprover = async (req, res) => {
  try {
    const [updated] = await db.Approver.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: "Approver not found" });

    const updatedApprover = await db.Approver.findByPk(req.params.id);
    res.json(updatedApprover);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};