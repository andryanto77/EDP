const express = require('express');
const knex = require("../knex/gp");
var formidable = require('formidable');
const csv = require('csvjson');
const fs = require('fs');

exports.listPending =async (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, async function (_err, fields, files) {
        var header = fields;
        var oldpath = files.filecsv.path;
        const file = fs.readFileSync(oldpath, 'utf-8');
        const dataObj = csv.toObject(file);

    for (var z = 1; z < dataObj.length; z++) {
            let qty = parseInt(dataObj[z]['QTY']);
            let POS_Budget_Voucher = parseInt(qty * dataObj[z]['VOUCHER POTONGAN']);
            let POS_Voucher_Series_ID = (dataObj[z]['VOUCHER SERIES']); 
               
        await knex('POSVC003').insert(
            { POS_Voucher_Series_ID : POS_Voucher_Series_ID ,
                POS_Description : header.POS_Description ,
                POS_Voucher_Type : '2' ,
                Released_Date: header.Released_Date ,
                EXPNDATE: header.EXPNDATE ,
                POS_Active_CB: '1' , 
                POS_STORE_GROUP_ID: header.POS_STORE_GROUP_ID ,
                POS_Value_Used: '1' ,
                POS_In_Out_RG: '0' ,
                POS_Range_ID: '' ,
                POS_Budget_Voucher: POS_Budget_Voucher ,
                POS_Remaining_Budget: '0' ,
                POS_All_Category_CB: '0' ,
                CREATDDT: header.CREATDDT ,
                CRUSRID: '201906010' ,
                MODIFDT: '' ,
                MDFUSRID: '' ,
                AI_Sync_Flag: '0' ,
                AI_Last_Sync_Date: '' ,
                POS_Remarks_TX: '' 
            })

    for (var i = 1; i <= qty; i++) {
      
        await knex('POSVC004').insert([
        { POS_Voucher_Type : 2 ,
         POS_Voucher_Series_ID : POS_Voucher_Series_ID ,
         LNITMSEQ : i ,
         POS_Voucher_Series_No: dataObj[z]['NO VOUCHER']+i ,
         POS_Voucher_Amount: (dataObj[z]['VOUCHER POTONGAN']) ,
         POS_Voucher_Status : 0 ,
         POS_StatusM : 'IN' ,
         CREATDDT: header.Released_Date ,
         CRUSRID : 201906010 ,
         MODIFDT : '' ,
         AI_Sync_Flag : 0 ,
         AI_Last_Sync_Date : ''} 
    ])
    }

    await knex('POSGO204').insert([
        { POS_Voucher_Type : 2 , 
         POS_Voucher_Series_ID : POS_Voucher_Series_ID ,
         LNITMSEQ: '16834' ,
         ITEMNMBR: dataObj[z]['ITEM NUMBER'] ,
         UOFM: 'UNIT' ,
         MINORQTY: 1 }
    ])

    let store = header.POS_STORE_GROUP_ID;
        const abc = 'ST010102LABC';
        const cmd = 'ST010103LCMD';
        const mge = 'ST010105MGE';
        const mptr = 'ST010105MPTR';
        const msa = 'ST010105MSA';
        const msba = 'ST010105MSBA';
        var toko;
        switch (store) {
            case "STORE GROUP ALL":
                toko = [abc, cmd, mge, mptr, msa, msba];
                break;
            case "STORE GROUP ALL1":
                toko = [abc, cmd, mge, msba];
                break;
            case "STORE GROUP ACS":
                toko = [abc, cmd, msba];
                break;
            case "LGN BDG CMD":
                toko = [abc, cmd];
                break;
            case "STORE GROUP LOG IN":
                toko = [abc];
                break;
            case "STORE GROUP LGN CMD":
                toko = [cmd];
                break;
            case "STORE GROUP MEDIUM":
                toko = [mge, mptr, msa, msba];
                break;
            case "STORE GROUP ACS":
                toko = [abc, cmd, msba];
                break;
        }
    for (var x = 0; x < toko.length; x++) {
        await knex('POSFL018').insert([
        { POS_Voucher_Type : 2 , 
         POS_Voucher_Series_ID : POS_Voucher_Series_ID ,
         POS_Flags: 0 ,
         POS_Sync_Date: '' ,
         POS_Store_ID: toko[x] }
    ])
    }  
}   
res.render('index')
})
}