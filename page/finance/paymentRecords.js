layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#paymentRecords',
        url: '../../json/paymentRecords.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "paymentRecordsTable",
        cols: [
            [
                // {type: "checkbox", fixed:"left", width:50},
                { field: 'paymentId', title: 'ID', align: "center" },
                { field: 'paymentOrderNum', title: '订单号', width: 220, align: "center" },
                { field: 'paymentWeb', title: '站别', align: 'center' },
                { field: 'paymentHierarchy', title: '层级', width: 200, align: 'center' },
                { field: 'paymentAgent', title: '代理账号', align: 'center' },
                { field: 'paymentMember', title: '会员账号', align: 'center' },
                { field: 'paymentQuota', title: '提出额度', align: 'center' },
                { field: 'paymentFees', title: '手续费', align: 'center' },
                { field: 'paymentOffer', title: '优惠金额', align: 'center' },
                { field: 'paymentAmount', title: '出款金额', align: 'center' },
                { field: 'paymentStatus', title: '出款状况', align: 'center' },
                { field: 'paymentDeduct', title: '优惠扣除', align: 'center' },
                {
                    field: 'paymentTime',
                    title: '出款日期',
                    align: 'center',
                    minWidth: 110,
                    templet: function(d) {
                        return d.paymentTime.substring(0, 10);
                    }
                },
                { field: 'paymentAlready', title: '已出款', width: 240, templet: '#paymentAlready', fixed: "right", align: "center" },
                { title: '操作者', width: 120, templet: '#paymentOperatorBar', fixed: "right", align: "center" },
                { title: '备注', width: 80, templet: '#paymentNoteBar', fixed: "right", align: "center" }
            ]
        ]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("paymentRecordsTable", {
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
    table.on('tool(paymentRecords)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'note') { //备注
            layer.confirm('<table class="layui-table"><colgroup><col width="180"><col width="300"></colgroup>' +
                '<tbody><tr><th>会员账号:</th><td>' +
                obj.data.paymentMember +
                '</td></tr><tr><th>出款日期:</th><td>' +
                obj.data.paymentTime +
                '<br>（当地时间）</td></tr><tr><th>操作时间:</th><td>' +
                '</td></tr><tr><th>前台备注:</th><td><textarea class="layui-textarea" name="" id="" cols="20" rows="3"></textarea></td></tr><tr><th>后台备注:</th><td><textarea class="layui-textarea" name="" id="" cols="20" rows="3"></textarea></td></tr></tbody></table>', {
                    title: '备注'
                },
                function(index) {
                    tableIns.reload();
                    layer.close(index);
                }
            );
        } else if (layEvent === 'fast') {
            layer.confirm('<a class="layui-btn layui-btn-primary">线上出款</a><a class="layui-btn layui-btn-primary">线下出款</a>', { title: '快速出款' },
                function(index) {
                    tableIns.reload();
                    layer.close(index);
                }
            );
        }
    });

})