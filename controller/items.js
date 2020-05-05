const express = require('express');
const knex = require("../knex/gp");
var formidable = require('formidable');
const csv = require('csvjson');
const fs = require('fs');

exports.newitem =async (req,res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, async function (_err, fields, files) {
        var header = fields;
        var oldpath = files.filecsv.path;
        const file = fs.readFileSync(oldpath, 'utf-8');
        const dataObj = csv.toObject(file);

    for (var z = 1; z < dataObj.length; z++) {
            let ITEMNUMBER = (dataObj[z]['ITEM NUMBER']);
            // let POS_Budget_Voucher = parseInt(qty * dataObj[z]['VOUCHER POTONGAN']);
            // let POS_Voucher_Series_ID = (dataObj[z]['VOUCHER SERIES']); 
               
        await knex('IV00101').insert(
            { ITEMNMBR : ITEMNUMBER ,
                ITEMDESC : ITEMDESC ,
                NOTEINDX : '' ,
                ITMSHNAM: '' ,
                ITEMTYPE: TIPE_ITEM ,
                ITMGEDSC: '' , 
                STNDCOST: '0' ,
                CURRCOST: '0' ,
                ITEMSHWT: '0' ,
                DECPLQTY: '1' ,
                DECPLCUR: '3' ,
                ITMTSHID: 'PPN OUT INCLUDE' ,
                TAXOPTNS: '1' ,
                IVIVINDX: '56' ,
                IVIVOFIX: '56' ,
                IVCOGSIX: '378' ,
                IVSLSIDX: '324' ,
                IVSLDSIX: '348' ,
                IVSLRNIX: '336' ,
                IVINUSIX: '0' ,
                IVINSVIX: '0' ,
                IVDMGIDX: '0' ,
                IVVARIDX: '0' ,
                DPSHPIDX: '0' ,
                PURPVIDX: '213' ,
                UPPVIDX: '0' ,
                IVRETIDX: '56' ,
                ASMVRIDX: '0' ,
                ITMCLSCD: 'IC01' ,
                ITMTRKOP: '1' ,
                LOTTYPE: '' ,
                KPERHIST: '1' ,
                KPTRXHST: '1' ,
                KPCALHST: '1' ,
                KPDSTHST: '1' ,
                ALWBKORD: '0' ,
                VCTNMTHD: '3' ,
                UOMSCHDL: 'UNIT' ,
                ALTITEM1: '' ,
                ALTITEM2: '' ,
                USCATVLS_1: DEPARTEMEN ,
                USCATVLS_2: DIVISI ,
                USCATVLS_3: CATEGORY ,
                USCATVLS_4: SUB_CATEGORY ,
                USCATVLS_5: CLASS ,
                USCATVLS_6: SUB_CLASS ,
                MSTRCDTY: '1' ,
                MODIFDT: 'date' ,
                CREATDDT: 'date' ,
                WRNTYDYS: '0' ,
                PRCLEVEL: 'SALES' ,
                LOCNCODE: '' ,
                PINFLIDX: '0' ,
                PURMCIDX: '0' ,
                IVINFIDX: '0' ,
                INVMCIDX: '0' ,
                CGSINFLX: '0' ,
                CGSMCIDX: '0' ,
                ITEMCODE: '' ,
                TCC: '' ,
                PriceGroup: '' ,
                PRICMTHD: '1' ,
                PRCHSUOM: '' ,
                SELNGUOM: '' ,
                KTACCTSR: '0' ,
                LASTGENSN: '' ,
                ABCCODE: '1' ,
                Revalue_Inventory: '0' ,
                Tolerance_Percentage: '0' ,
                Purchase_Item_Tax_Sch: '' ,
                Purchase_Tax_Options: '3' ,
                ITMPLNNNGTYP: '1' ,
                STTSTCLVLPRCNTG: '0' ,
                CNTRYORGN: '' ,
                INACTIVE: '0' ,
                MINSHELF1: '0' ,
                MINSHELF2: '0' ,
                INCLUDEINDP: '0' ,
                LOTEXPWARN: '0' ,
                LOTEXPWARNDAYS: '0' ,
                LASTGENLOT: '' ,
                Lot_Split_Quantity: '0.00000' ,
                UseQtyOverageTolerance: '0' ,
                UseQtyShortageTolerance: '0' ,
                QtyOverTolerancePercent: '0' ,
                QtyShortTolerancePercent: '0' ,
                IVSCRVIX: '0' ,
                DEX_ROW_TS: '' ,
                DEX_ROW_ID: '' ,
            })

    for (var i = 1; i <= qty; i++) {
      
        await knex('IV00103').insert([
        { ITEMNMBR : ITEMNUMBER ,
         VENDORID : POS_Voucher_Series_ID ,
         ITMVNDTY : i ,
         VNDITNUM: dataObj[z]['NO VOUCHER']+i ,
         QTYRQSTN: (dataObj[z]['VOUCHER POTONGAN']) ,
         QTYONORD : 0 ,
         QTY_Drop_Shipped : 'IN' ,
         LSTORDDT: header.Released_Date ,
         LSORDQTY : 201906010 ,
         LRCPTQTY : '' ,
         LSRCPTDT : 0 ,
         AVRGLDTM : '',
         NORCTITM: '' ,
         MINORQTY: '' ,
         MAXORDQTY: '' ,
         ECORDQTY: '' ,
         VNDITDSC: '' ,
         Last_Originating_Cost: '' ,
         Last_Currency_ID: '' ,
         FREEONBOARD: '' ,
         PRCHSUOM: '' ,
         CURRNIDX: '' ,
         PLANNINGLEADTIME: '' ,
         ORDERMULTIPLE: '' ,
         MNFCTRITMNMBR: '' ,
         DEX_ROW_ID: '' ,

        } 
    ])
    }

    await knex('IV00108').insert([
        { ITEMNMBR : 2 , 
         CURNCYID : POS_Voucher_Series_ID ,
         PRCLEVEL: '16834' ,
         UOFM: dataObj[z]['ITEM NUMBER'] ,
         TOQTY: 'UNIT' ,
         FROMQTY: 1 ,
         UOMPRICE: '' ,
         QTYBSUOM: '' ,
         DEX_ROW_TS: '' ,
         DEX_ROW_ID: '' ,
        }
    ])

    let store = header.POS_STORE_GROUP_ID;
        const abc = 'ST010102LABC';
        const cmd = 'ST010103LCMD';
        const mge = 'ST010105MGE';
        const mptr = 'ST010105MPTR';
        const msa = 'ST010105MSA';
        const msba = 'ST010105MSBA';
        const whabc = ('WH0201', 'WH0203');
        const whcmd = ('WH0301', 'WH0303');
        const whmptr = 'WH0401';
        const whmsba = 'WH0501';
        const whmsa = 'WH0601';
        const whmge = 'WH0701';

        var toko;
        switch (store) {
            case "STORE GROUP ALL":
                toko = [abc, cmd, mge, mptr, msa, msba];
                break;
            case "LGN BDG CMD":
                toko = [abc, cmd];
                break;
        }
        if ( warehouse = "allstore" ){
            gudang = [ whabc, whcmd, whmptr, whmsba, whmsa, whmge]
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