const { faker } = require("@faker-js/faker");

const foodImage = () => faker.image.food(256, 256);

const generateOrderEntity = () => {
  const customerInfo = {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    avatar: faker.image.avatar(),
  };

  const orderItems = Array.from(
    { length: faker.datatype.number({ min: 1, max: 5 }) },
    () => ({
      id: faker.datatype.uuid(),
      sku: faker.random.word(),
      name: faker.commerce.productName(),
      image: foodImage(),
      product_info: {},
      additional_information: {},
      grand_total: faker.datatype.number({ max: 39999 }),
      parent_sku: faker.word.adjective(5),
      product_detail_id: faker.datatype.uuid(),
      quantity_ordered: faker.datatype.number({ min: 1, max: 10 }),
      status: ["pending", "shipped", "delivered"][faker.datatype.number(2)],
      status_description: faker.lorem.sentence(),
      is_free_item: faker.datatype.boolean(),
      unit_price: faker.datatype.number({ min: 30, max: 555 }),
      original_unit_price: faker.datatype.number({ min: 30, max: 555 }),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
    })
  );

  return {
    id: faker.datatype.uuid(),
    created_at: faker.date.past().toISOString(),
    customer_id: faker.datatype.uuid(),
    order_number: `#AZ-ORDER-${faker.datatype.number({
      min: 100000,
      max: 999999,
    })}`,
    customer_info: customerInfo,
    status: [
      "waiting_confirmed",
      "confirmed",
      "ready_to_ship",
      "in_delivery",
      "waiting_confirm_received",
      "completed",
      "cancelled",
    ][faker.datatype.number(6)],
    status_description: faker.lorem.sentence(),
    cancel_reason: faker.lorem.sentence(),
    customer_name: faker.name.fullName(),
    customer_note: faker.lorem.sentence(),
    grand_total: faker.datatype.number({ min: 300, max: 4000 }),
    payment_method: ["cod", "true_money"][faker.datatype.number(1)],
    shipping_method: ["home_delivery", "station_delivery"][
      faker.datatype.number(1)
    ],
    transporter: faker.company.companyName(),
    order_items: orderItems,
    seller_note: faker.lorem.sentence(),
    shop_id: faker.datatype.uuid(),
    sub_status: faker.random.word(),
    total_item_count: faker.datatype.number({ min: 1, max: 20 }),
    total_quantity_ordered: faker.datatype.number({ min: 1, max: 50 }),
    updated_at: faker.date.recent().toISOString(),
    waybill_number: faker.random.alphaNumeric(10),
  };
};

const fs = require("fs");

const orders = Array.from({ length: 95 }, generateOrderEntity);

fs.writeFile("./data.json", JSON.stringify(orders, null, 2), (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("File has been created");
});
console.log("🚀 ~ file: index.js:60 ~ orders:", orders);
