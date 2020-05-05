const express = require('express');
const knex = require("../knex/gp");
var formidable = require('formidable');
const csv = require('csvjson');
const fs = require('fs');

exports.updateitem =async (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, async function (_err, fields, files) {
        var header = fields;
        var oldpath = files.filecsv.path;
        const file = fs.readFileSync(oldpath, 'utf-8');
        const dataObj = csv.toObject(file);

    for (var z = 0; z < dataObj.length; z++) {
            let ITEMNUMBER = (dataObj[z]['Item Number']);
            await knex('IV00101')
            .where({ITEMNMBR : ITEMNUMBER})
            .update({ITEMTYPE: header.ITEM_TYPE});
    }
    res.render('index')
})
}