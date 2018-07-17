const mongoose = require('mongoose')

//define the schema for the course model
//This as well as the other models inherit it from courseSchema.

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
    required: "Course name is required."},
    languages: {
        String,
        required: "Language to be used is required."},
    type: {
        type: String},
    rating: 
    {
        type: number},
    status: {
        type: String,
        required: "Status is required - open/closed"},
});

