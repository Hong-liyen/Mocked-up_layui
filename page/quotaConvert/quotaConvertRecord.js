layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#quotaConvertRecord',
        url: '../../json/quotaConvertRecord.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "quotaConvertRecordTable",
        cols: [
            [
                // {type: "checkbox", fixed:"left", width:50},
                { field: 'CR-memberAccount', title: '会员账号', width: 140, align: "center" },
                { field: 'CR-intoPlatform', title: '转入平台', width: 140, align: "center" },
                { field: 'CR-outPlatform', title: '转出平台', width: 140, align: 'center' },
                { field: 'CR-orderNumber', title: '单号', align: 'center' },
                { field: 'CR-orderNumberAPI', title: 'API单号', align: 'center' },
                { field: 'CR-transaction', title: '交易金额', width: 100, align: 'center' },
                { field: 'CR-time', title: '交易时间', align: 'center' },
                {
                    field: 'CR-status',
                    title: '状态',
                    width: 140,
                    align: 'center',
                    templet: function(d) {
                        return d.CR - status === "0" ? "未交易" : "已确认";
                    }
                },
                { field: 'CR-note', title: '备注', width: 140, align: 'center' },
                {
                    title: '操作',
                    align: 'center',
                    width: 100,
                    templet: function(d) {
                        return '<a href="operatorRecord.html" class="layui-btn layui-btn-border-normal layui-btn-xs">操作记录</a>'
                    }
                }
            ]
        ]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("quotaConvertRecordTable", {
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
    table.on('tool(quotaConvertRecord)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'operator') { //操作记录
            var index = layui.layer.open({
                title: "操作记录",
                type: 2,
                content: "operatorRecord.html",
                success: function(layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                }
            })
            layui.layer.full(index);
            window.sessionStorage.setItem("index", index);
            //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
            $(window).on("resize", function() {
                layui.layer.full(window.sessionStorage.getItem("index"));
            })
        }
    });

})