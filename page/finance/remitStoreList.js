layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#remitStoreList',
        url: '../../json/remitStoreList.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "remitStoreListTable",
        cols: [
            [
                { field: 'storeId', title: '编号', width: 60, align: "center" },
                { field: 'storeName', title: '商家代称', width: 300, align: "center" },
                { field: 'storePaymentType', title: '支付系统', width: 200, align: 'center' },
                { field: 'storeNumber', title: '商号', align: 'center' },
                { field: 'storeLevel', title: '层级名称', width: 450, align: "center" },
                { title: '操作', width: 280, templet: '#remitStoreListBar', fixed: "right", align: "center" }
            ]
        ]
    });

    //是否置顶
    form.on('switch(storeTop)', function(data) {
        var index = layer.msg('修改中，请稍候', { icon: 16, time: false, shade: 0.8 });
        setTimeout(function() {
            layer.close(index);
            if (data.elem.checked) {
                layer.msg("置顶成功！");
            } else {
                layer.msg("取消置顶成功！");
            }
        }, 500);
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("storeListTable", {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val() //搜索的关键字
                }
            })
        } else {
            layer.msg("请输入搜索的内容");
        }
    });

    
    //列表操作//uifix_121
    table.on('tool(remitStoreList)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'chosebank') { //银行选择//uifix_addoutpage
                var index = layui.layer.open({
                title: "新易付支付银行对应表",
                type: 2,
                content: "storePayBankList.html",
                success: function (layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                }
            })
            layui.layer.full(index);
            window.sessionStorage.setItem("index", index);
            //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
            $(window).on("resize", function () {
                layui.layer.full(window.sessionStorage.getItem("index"));
            })
        }
    });

})