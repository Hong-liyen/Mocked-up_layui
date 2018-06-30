layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#storePayBankList',
        url: '../../json/storePayBankList.json',
        cellMinWidth: 95,
        page: true,
        height: "full-25",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "storePayBankListTable",
        cols: [
            [
            ]
        ]
    });
})