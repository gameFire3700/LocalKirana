const ProductRequest = require("../models/ProductRequest");
const ProductMaster = require("../models/ProductMaster");

exports.getPendingRequests = async (req, res) => {
  const requests = await ProductRequest.find({ status: "pending" })
    .populate("retailer_id", "full_name email")
    .populate("category")
    .sort({ createdAt: -1 });

  res.json({ success: true, requests });
};

exports.approveRequest = async (req, res) => {
  const request = await ProductRequest.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ success: false, message: "Request not found" });
  }

  await ProductMaster.create({
    name: request.name,
    description: request.description,
    category: request.category,
    brand: request.brand,
    image: request.image,
    sku: `SKU-${Date.now()}`,
    created_by: req.user._id
  });

  request.status = "approved";
  await request.save();

  res.json({ success: true, message: "Request approved & added to master" });
};

exports.rejectRequest = async (req, res) => {
  const request = await ProductRequest.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ success: false, message: "Request not found" });
  }

  request.status = "rejected";
  request.rejection_reason = req.body.reason || "Not suitable";
  await request.save();

  res.json({ success: true, message: "Request rejected" });
};
