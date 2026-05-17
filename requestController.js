const Request = require("../models/Request");

exports.createRequest = async (req, res) => {
  try {
    const { receiverId, skillOffered, skillRequested } = req.body;

    const request = await Request.create({
      sender: req.user._id,
      receiver: receiverId,
      skillOffered,
      skillRequested
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getSentRequests = async (req, res) => {
  const requests = await Request.find({ sender: req.user._id }).populate("receiver", "name email");
  res.json(requests);
};

exports.getReceivedRequests = async (req, res) => {
  const requests = await Request.find({ receiver: req.user._id }).populate("sender", "name email");
  res.json(requests);
};

exports.updateRequestStatus = async (req, res) => {
  const { status } = req.body;

  const request = await Request.findById(req.params.id);

  if (!request) return res.status(404).json({ msg: "Request not found" });

  request.status = status;
  await request.save();

  res.json(request);
};