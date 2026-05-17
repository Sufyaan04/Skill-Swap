const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createRequest,
  getSentRequests,
  getReceivedRequests,
  updateRequestStatus,
} = require("../controllers/requestController");

router.post("/", protect, createRequest);
router.get("/sent", protect, getSentRequests);
router.get("/received", protect, getReceivedRequests);
router.put("/:id", protect, updateRequestStatus);

module.exports = router;