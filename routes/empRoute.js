const express = require("express");
const { getEmployee, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/empController");

const router = express.Router();

router.route("/employees").get(getEmployee);
router.route("/employee/add").post(createEmployee);
router.route("/employee/:id").put(updateEmployee).delete(deleteEmployee);

module.exports = router;