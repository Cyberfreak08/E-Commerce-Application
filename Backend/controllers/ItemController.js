const Item = require("../models/Item");

const { Op } = require("sequelize");

module.exports.get_items = async (req, res) => {
  try {
    const { search, sortBy } = req?.query;

    const whereCondition = {};
    if (search) {
      whereCondition.title = { [Op.like]: `%${search}%` };
    }
    const order = [];
    if (sortBy === "asc") {
      order.push(["title", "ASC"]);
    } else if (sortBy === "desc") {
      order.push(["title", "DESC"]);
    } else if (sortBy === "priceLowToHigh") {
      order.push(["price", "ASC"]);
    } else if (sortBy === "priceHighToLow") {
      order.push(["price", "DESC"]);
    } else {
      order.push(["date_added", "DESC"]);
    }

    const items = await Item.findAll({
      where: whereCondition,
      order: order,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

module.exports.post_item = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Failed to create item" });
  }
};

module.exports.update_item = async (req, res) => {
  try {
    const [rowsUpdated] = await Item.update(req.body, {
      where: { id: req.params.id },
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    const updatedItem = await Item.findByPk(req.params.id);
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: "Failed to update item" });
  }
};

module.exports.delete_item = async (req, res) => {
  try {
    const rowsDeleted = await Item.destroy({
      where: { id: req.params.id },
    });
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete item" });
  }
};
