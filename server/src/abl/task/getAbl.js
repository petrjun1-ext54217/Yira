const taskDAO = require("../../DAO/taskDAO.js");


async function GetAbl(req, res) {
  try {
    const { id } = req.params;

    const task = taskDAO.get(id);

    res.json(task);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;