const crypto = require('crypto');
const mongoose = require('mongoose');

const NUMBER_OF_USERS = 100;

mongoose.connect(process.env.MONGODB_URI);
require('./models/User');
require('./models/Item');
require('./models/Comment');

const User = mongoose.model('User');
const Item = mongoose.model('Item');
const Comment = mongoose.model('Comment');

async function createUser() {
  const userUniqueId = crypto.randomUUID().split('-')[0];
  const user = new User();
  user.username = `test${userUniqueId}`;
  user.email = `test+${userUniqueId}@test.com`;
  user.setPassword('1234');
  try {
    await user.save();
    console.log(`user ${user.username} created`);
    return user._id;
  } catch (err) {
    console.log(err, "Couldn't create user");
  }
}

async function createItem(userId) {
  const itemUniqueId = crypto.randomUUID().split('-')[0];
  const item = new Item();
  item.slug = `itemSlug${itemUniqueId}`;
  item.title = 'just tile';
  item.description = 'some description';
  item.image = 'https://placebear.com/200/200';
  item.tagList = ['bear', 'test'];
  item.seller = userId;
  try {
    await item.save();
    console.log(`item ${item.slug} created`);
    return item._id;
  } catch (err) {
    console.log(err, "Couldn't create item");
  }
}

async function createComment(userId, itemId) {
  const comment = new Comment();
  comment.body = 'some comment';
  comment.seller = userId;
  comment.item = itemId;
  try {
    await comment.save();
    console.log(`comment for ${itemId} created`);
  } catch (err) {
    console.log(err, "Couldn't create comment");
  }
}

async function populate() {
  let counter = 0;
  for (let i = 0; i < NUMBER_OF_USERS; i++) {
    const userId = await createUser();
    const itemId = await createItem(userId);
    await createComment(userId, itemId);
    counter++;
  }
  console.log(`populated database with ${counter} users, items and comments`);
}

(async () => {
  await populate();
  process.exit();
})();
