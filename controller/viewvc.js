const express = require('express');
const knex = require("../knex/gp");
var formidable = require('formidable');
const csv = require('csvjson');
const fs = require('fs');

exports.view_voucher = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, async function (_err, fields, files) {
        var header = fields;
        var oldpath = files.filecsv;
        const file = fs.readFileSync(oldpath, 'utf-8');
        const dataObj = csv.toObject(file);

    for (var z = 0; z < dataObj.length; z++) {
        let voucher = (dataObj[z]['VOUCHER SERIES']);
        var view = await knex('POSVC003')
        .where({POS_Voucher_Series_ID : voucher })
    }
    console.log(view);
    res.send('index');
    })
}