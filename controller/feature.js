const express = require('express');
const knex = require("../knex/gp");
var formidable = require('formidable');
const csv = require('csvjson');
const fs = require('fs');

exports.fitur =async (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, async function (_err, fields, files) {
        var header = fields;
        var oldpath = files.filecsv.path;
        const file = fs.readFileSync(oldpath, 'utf-8');
        const dataObj = csv.toObject(file);

        for (var z = 1; z < dataObj.length; z++) {
            let FEATURE = (dataObj[z]['Feature']);
            let ISI_FEATURE = (dataObj[z]['Isi Feature']);
            let ITEM_NUMBER = (dataObj[z]['Item Number']); 
            
            await knex('CSGIS003')
            .insert(
                // SET IDENTITY_INSERT ['CSGIS003'] ON
                {  USCATVAL : FEATURE ,
                    CSG_USCATDSC : ISI_FEATURE ,
                    LNITMSEQ : '' ,
                    ITEMNMBR: ITEM_NUMBER ,
                    DEX_ROW_ID: ''
                })
        }  
        res.render('index')
})
}