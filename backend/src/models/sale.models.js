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
 FROM sales as s
 INNER JOIN sales_products as sp
  ON s.id = sp.sale_id
 WHERE sale_id = ?`, [saleId]);

return sale;
};

const createSale = async (itemsSold) => {
  let insertPromises = [];
  const [sale] = await connection.execute(`INSERT INTO sales (date)
VALUES (NOW())`);
  insertPromises = itemsSold.map(({ productId, quantity }) => connection
  .execute(`INSERT INTO sales_products (sale_id,product_id,quantity)
    VALUES (?,?,?)`, [sale.insertId, productId, quantity]));
  await Promise.all(insertPromises);
  return sale.insertId;
};

module.exports = {
  getSales,
  findSalesById,
  createSale,
};
