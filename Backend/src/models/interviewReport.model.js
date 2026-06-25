const mongoose = require("mongoose");


/**
 * job description: String
 * resume text: String
 * self description : String
 * 
 * matchScore : Number
 * 
 * technical questions : 
 *          [{
 *              question: "",
 *              intention: "",
 *              answer: ""
 *          }]
 * behavioral questions: 
 *          [{
 *              question: "",
 *              intention: "",
 *              answer: ""
 *          }]
 * skill gaps: [{
 *              skill: "",
 *              severity: {
 *              type: String,
 *              enum : ["low","medium","high"]
 *              }               
 *              }]
 * preparation plan: [{
 *              day: Number,
 *               focus: String,
 *                tasks: array of string
 * }]
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
        question: {
            type: String,
            required : [true,"Technical question is required"]
        },
        intention: {
            type: String,
            required: [true,"Intention is required"]
        },
        answer: {
            type: String,
            required: [true,"Answer is required"]
        },
},{_id : false})

const behavioralQuestionSchema = new mongoose.Schema({
        question: {
            type: String,
            required : [true,"Technical question is required"]
        },
        intention: {
            type: String,
            required: [true,"Intention is required"]
        },
        answer: {
            type: String,
            required: [true,"Answer is required"]
        },
},{_id : false})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String,
        required: [true,"Skill is required"]
    },
    severity:{
        type: String,
        enum:["low","medium","high"],
        required: [true, "severity is required"]
    }
},{_id : false})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required : [true,"Day is required"]
    },
    focus: {
        type: String,
        required: [true,"focus is required"]
    },
    tasks: [{
        type:String,
        required: [true,"Task is required"]
    }]
})

const interiewReportSchema = new mongoose.Schema({
        jobDescription: {
            type: String,
            required : true
        },
        resume: {
            type: String
        },
        selfDescription:{
            type: String
        },
        matchScore: {
            type: Number,
            min: 0,
            max: 100
        },
        technicalQuestions: [technicalQuestionSchema],
        behavioralQuestions: [behavioralQuestionSchema],
        preparationPlan: [preparationPlanSchema],
        skillGaps: [skillGapSchema]

},{timestamps: true})


const interiewReportModel = mongoose.model("InterviewReport", interiewReportSchema)

module.exports = interiewReportModel