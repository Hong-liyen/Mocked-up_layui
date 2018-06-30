layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //入款历史记录
    var tableIns = table.render({
        elem: '#paymentMemberAmount',
        url: '../../json/paymentMemberAmount.json',
        cellMinWidth: 95,
        page: true,
        footer: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "paymentMemberAmountTable",
        cols: [
            [
                { field: 'paymentMemberName', title: '会员账号', align: "center" },
                { field: 'paymentMemberItem', title: '项目', align: "center" },
                { field: 'paymentMemberAmount', title: '金额', align: 'center' },
                { field: 'paymentMemberAgent', title: '代理', align: 'center' },
                { field: 'paymentMemberNumber', title: '单号', align: 'center' },
                { field: 'paymentMemberNote', title: '备注', align: 'center' },
                { field: 'paymentMemberTime', title: '时间', align: 'center' }
            ]
        ]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("paymentHistoryTable", {
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
    //列表操作
    table.on('tool(paymentHistory)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'define') { //
            layer.confirm('是否确定存入？', { icon: 3, title: '提示信息' }, function(index) {
                // $.get("接口",{
                //     historyOrderNum : data.historyOrderNum  //将需要确认的订单号作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            });
        } else if (layEvent === 'recall') {
            layer.confirm('是否确定取消？', { icon: 3, title: '提示信息' }, function(index) {
                // $.get("接口",{
                //     historyOrderNum : data.historyOrderNum  //将需要取消的订单号作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            });
        }
    });



})