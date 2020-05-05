var express = require('express');
var router = express.Router();
var voucher = require("../controller/voucher")
var viewvc = require("../controller/viewvc")
var items = require("../controller/items")
var update_items = require("../controller/update_items")
var update_vouchers = require("../controller/update_vouchers")
var feature = require("../controller/feature")

/* GET home page. */
router.get('/',(req, res, next) => {
    res.render('index');
})
router.get('/voucher/upload',(req, res, next) => {
    res.render('upload');
})
router.get('/item',(req, res, next) => {
    res.render('item');
})
router.get('/viewvc/view_voucher',(req, res, next) => {
    res.render('view_voucher');
})
router.get('/update_item',(req, res, next) => {
    res.render('update_item');
})
router.get('/update_vouchers/update_voucher',(req, res, next) => {
    res.render('update_voucher');
})
router.get('/feature',(req, res, next) => {
    res.render('feature');
})

router.get('/viewvoucher', viewvc.view_voucher);
router.post('/uploadvoucher', voucher.listPending);
router.post('/uploaditem', items.newitem);
router.post('/updateitem', update_items.updateitem);
router.post('/updatevoucher', update_vouchers.updatevoucher);
router.post('/updatefeature', feature.fitur);


// router.get('/master/category',items.getMasterCategory);
// router.get('/master/items',items.getMasterItems);

module.exports = router;