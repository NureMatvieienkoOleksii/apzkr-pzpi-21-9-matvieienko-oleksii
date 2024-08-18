const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ['admin', 'guide', 'tourist', 'droneOperator'], required: true },
  dateOfBirth: { type: Date, required: true },
  address: {
    street: String,
    city: String,
    country: String,
    postalCode: String
  },
  registrationDate: { type: Date, default: Date.now },
  lastLoginDate: Date,
  isActive: { type: Boolean, default: true }
});

const TouristSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  preferences: {
    activityLevel: { type: String, enum: ['low', 'medium', 'high'] },
    interests: [String]
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String
  },
  medicalInformation: String,
  pastTrips: [{
    routeId: { type: Schema.Types.ObjectId, ref: 'Route' },
    date: Date
  }]
});

const DroneOperatorSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  license: {
    number: String,
    issueDate: Date,
    expirationDate: Date
  },
  experience: { type: Number, required: true },
  specializations: [String],
  assignedDrones: [{ type: Schema.Types.ObjectId, ref: 'Drone' }]
});

const AdminSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  adminLevel: { type: String, enum: ['superAdmin', 'manager', 'support'], required: true },
  department: String,
  permissions: [String]
});

const RouteSchema = new Schema({
  name: String,
  description: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  duration: Number,
  terrainType: { type: String, enum: ['park', 'forest', 'mountains', 'river'] }
});

const RoutePointSchema = new Schema({
  routeId: { type: Schema.Types.ObjectId, ref: 'Route' },
  orderNumber: Number,
  latitude: Number,
  longitude: Number,
  description: String
});

const BookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  routeId: { type: Schema.Types.ObjectId, ref: 'Route' },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'] }
});

const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  routeId: { type: Schema.Types.ObjectId, ref: 'Route' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now }
});

const DroneSchema = new Schema({
  model: String,
  serialNumber: { type: String, unique: true },
  status: { type: String, enum: ['available', 'in use', 'maintenance'] },
  maxFlightTime: Number,
  maxRange: Number
});

const DroneRentalSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  droneId: { type: Schema.Types.ObjectId, ref: 'Drone' },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['pending', 'active', 'completed', 'cancelled'] }
});

const DroneFlightSchema = new Schema({
  droneId: { type: Schema.Types.ObjectId, ref: 'Drone' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  startDateTime: Date,
  endDateTime: Date,
  flightPath: [{ latitude: Number, longitude: Number }]
});

const SafetyMeasureSchema = new Schema({
  type: { type: String, enum: ['route', 'drone'] },
  relatedObjectId: Schema.Types.ObjectId,
  description: String,
  isRequired: Boolean
});

const EquipmentSchema = new Schema({
  name: String,
  description: String,
  quantity: Number,
  condition: { type: String, enum: ['new', 'good', 'fair', 'poor'] }
});

const NaturalConditionSchema = new Schema({
  routeId: { type: Schema.Types.ObjectId, ref: 'Route' },
  date: Date,
  weatherConditions: String,
  waterLevel: Number,
  temperature: Number,
  additionalInfo: String
});

const IncidentSchema = new Schema({
  type: { type: String, enum: ['route', 'drone'] },
  relatedObjectId: Schema.Types.ObjectId,
  dateTime: Date,
  description: String,
  actionsTaken: String
});

const GuideSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  specializations: [String],
  languages: [String],
  experience: { type: Number, required: true },
  certifications: [{
    name: String,
    issuingBody: String,
    dateObtained: Date,
    expirationDate: Date
  }],
  availability: { type: String, enum: ['available', 'busy', 'on leave'], default: 'available' },
  rating: { type: Number, min: 1, max: 5, default: 5 }
});

const GuideAssignmentSchema = new Schema({
  guideId: { type: Schema.Types.ObjectId, ref: 'Guide' },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' }
});

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Route = mongoose.model('Route', RouteSchema);
const RoutePoint = mongoose.model('RoutePoint', RoutePointSchema);
const Booking = mongoose.model('Booking', BookingSchema);
const Review = mongoose.model('Review', ReviewSchema);
const Drone = mongoose.model('Drone', DroneSchema);
const DroneRental = mongoose.model('DroneRental', DroneRentalSchema);
const DroneFlight = mongoose.model('DroneFlight', DroneFlightSchema);
const SafetyMeasure = mongoose.model('SafetyMeasure', SafetyMeasureSchema);
const Equipment = mongoose.model('Equipment', EquipmentSchema);
const NaturalCondition = mongoose.model('NaturalCondition', NaturalConditionSchema);
const Incident = mongoose.model('Incident', IncidentSchema);
const Guide = mongoose.model('Guide', GuideSchema);
const GuideAssignment = mongoose.model('GuideAssignment', GuideAssignmentSchema);
const Tourist = mongoose.model('Tourist', TouristSchema);
const DroneOperator = mongoose.model('DroneOperator', DroneOperatorSchema);

module.exports = {
  User,
  Admin,
  Route,
  RoutePoint,
  Booking,
  Review,
  Drone,
  DroneRental,
  DroneFlight,
  SafetyMeasure,
  Equipment,
  NaturalCondition,
  Incident,
  Guide,
  GuideAssignment,
  Tourist,
  DroneOperator
};