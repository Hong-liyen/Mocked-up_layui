layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#withdrawCheck',
        url: '../../json/withdrawCheckSearch.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "withdrawCheckTable",
        cols: [
            [
                { field: 'withdrawCheckName', title: '更改者', width: 200, align: "center" },
                { field: 'withdrawCheckContent', title: '内容', minWidth: 200, align: "center" },
                { 
                    field: 'withdrawCheckDate', 
                    title: '更改日期', 
                    width: 250, 
                    align: 'center',
                    templet: function(d) {
                        return d.withdrawCheckDate.substring(0, 20);
                    } 
                }
            ]
        ]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("withdrawCheckTable", {
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
    table.on('tool(withdrawCheck)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'note') { //备注
            layer.confirm('<table class="layui-table"><colgroup><col width="180"><col width="300"></colgroup>' +
                '<tbody><tr><th>会员账号</th><td>' +
                obj.data.paymentMember +
                '</td></tr><tr><th>出款日期</th><td>' +
                obj.data.paymentTime +
                '（当地时间）</td></tr><tr><th>操作时间</th><td>' +
                '</td></tr><tr><th>前台备注</th><td><textarea name="" id="" cols="20" rows="3"></textarea></td></tr><tr><th>后台备注</th><td><textarea name="" id="" cols="20" rows="3"></textarea></td></tr></tbody></table>', {
                    title: '备注'
                },
                function(index) {
                    tableIns.reload();
                    layer.close(index);
                }
            );
        } else if (layEvent === 'fast') {
            layer.confirm('<a class="layui-btn layui-btn-primary">线上出款</a><a class="layui-btn layui-btn-primary">线下出款</a>', {
                    title: '快速出款'
                },
                function(index) {
                    tableIns.reload();
                    layer.close(index);
                }
            );
        }
    });

})