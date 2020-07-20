const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");


exports.index = function (req, res){
   
    return res.render ("students/index", { students : data.students});
};

exports.post = function (req, res){
    
    const keys = Object.keys(req.body);

    for (key of keys){
        if (req.body[key] == "")
            return res.send("Please, fill all fields!");        
    }

    let { avatar_url, birth, name, services, gender } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.students.length + 1);

    data.students.push({
        id,
        avatar_url,
        name,        
        birth,           
        gender,
        services,  
        avatar_url              
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/students")

    })

    //return res.send (req.body);
};

exports.show = function (req, res){
   
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!");
    
  
    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        
    }

    return res.render("students/show", { student });
};

exports.create = function (req, res){
    return res.render("students/create");
};

exports.edit = function (req, res){

    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return id == student.id;
    })

    if (!foundStudent) return res.send("Student not found!");

    const student = {
        ... foundStudent,
        birth: date(foundStudent.birth)
    }

    return res.render("students/edit", { student });
};

exports.put = function (req, res){

    const { id } = req.body;
    
    let index = 0;

    const foundStudent = data.students.find(function(student, foundIndex){

        if(id == student.id){
            index = foundIndex;
            return true;
        };        
    })

    if (!foundStudent) return res.send("Student not found!");

    const student = {
        ...foundStudent,
        ...req.body, 
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!");

        return res.redirect(`/students/${id}`);
    });
};

exports.delete = function (req, res){
    
    const { id } = req.body;

    const filteredStudents = data.students.filter(function(student){
        return student.id != id;
    });

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!");

        return res.redirect("/students");
    });
};

