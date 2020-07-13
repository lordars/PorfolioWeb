const data = require("../model/data");

exports.getData= ()=>{
    return data;
}


exports.getTitle = () => {
    return data.name;
}

exports.getTitle = () => {
    return data.title;
}

exports.getProfession = () => {
    return data.profession;
}

exports.getDescription = () => {
    return data.description;
}

exports.getExperience = () => {
    return data.experience;
}

exports.getEducation = () => {
    return data.education;
}

exports.getSkills = () => {
    return data.skills;
}

exports.getVersion = () => {
    return data.Version;
}

