const express = require('express');
const router = express.Router();
const { createAuditLog, fetchAuditLogs, updateAuditLog, deleteAuditLog, fetchAuditLogsById } = require('../controller/AuditlogController');

router.post('/', createAuditLog);

router.get('/', fetchAuditLogs);

router.get('/:id', fetchAuditLogsById);

router.put('/:id', updateAuditLog);

router.delete('/:id', deleteAuditLog);

module.exports = router;
