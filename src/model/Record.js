const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const RecordSchema = Schema(
  {
    name: String,
    lastName: String,
    brand: String,
    birthdate: Number,
    enum: ['Administrator', 'Employer','Custumer'],
    phone: Number,
    email: String,
    password: String,
    username: String,
    custumer: String,
    default: 'cliente',
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

RecordSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

RecordSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

module.exports = mongoose.model('Record', RecordSchema);