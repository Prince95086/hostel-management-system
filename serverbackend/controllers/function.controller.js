import FunctionModel from "../models/function.model.js";

/* CREATE */
export const createFunction = async (req, res) => {
  try {
    const newFunction = await FunctionModel.create(req.body);
    res.status(201).json(newFunction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL */
export const getFunctions = async (req, res) => {
  try {
    const functions = await FunctionModel.find().sort({ createdAt: -1 });
    res.json(functions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const updateFunction = async (req, res) => {
  try {
    const updated = await FunctionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE */
export const deleteFunction = async (req, res) => {
  try {
    await FunctionModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Function deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE STATUS */
export const updateStatus = async (req, res) => {
  try {
    const updated = await FunctionModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
