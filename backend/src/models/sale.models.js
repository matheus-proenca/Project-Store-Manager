const connection = require('./connection');

const getSales = async () => {
  const [sale] = await connection.execute(`SELECT
   sp.sale_id as saleId, 
   s.date, 
   sp.product_Id as productId, 
   sp.quantity 
  FROM sales as s 
  INNER JOIN sales_products as sp on s.id = sp.sale_id`);
  return sale;
};

const findSalesById = async (saleId) => {
  const [sale] = await connection.execute(`SELECT 
   s.date, 
   sp.product_Id as productId, 
   sp.quantity
 from sales as s
 inner join sales_products as sp
  on s.id = sp.sale_id
 where sale_id = ?`, [saleId]);

return sale;
};

module.exports = {
  getSales,
  findSalesById,
};
