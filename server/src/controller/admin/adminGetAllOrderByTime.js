const { pool } = require("../../mysql/connect");

exports.adminGetAllOrderByTime = (req, res) => {
  if (req.user.role !== "admin")
    return res.send({
      message: "You do not have a permission. Please try login as Admin"
    });
  let { s_time, e_time } = req.params;
  let sql = `call admin_getAllOrderByTime(${s_time}, ${e_time});
              select count (id_order) as n_order from reservation;`;
  try {
    pool.query(sql, (error, results, feilds) => {
      if (error) return res.status(400).send({ error });

      let orders = results[0];
      for (order of orders) {
        order.time = `${parseInt(order.time / 60)}h${order.time % 60}`
        order.time_order = new Date(parseInt(order.time_order, 10)).toLocaleString();
      }
      let data = {
        n_order: results[2][0].n_order,
        instance: orders.length,
        ratio_order: orders.length / results[2][0].n_order,
        order: orders
      };
      res.status(200).send(data);
    });
  } catch (error) {
    if (error) return res.status(400).send({ error });
  }
};
