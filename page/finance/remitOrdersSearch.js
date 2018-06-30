layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#remitOrdersSearch',
        url: '../../json/remitOrdersSearch.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "remitOrdersSearchTable",
        cols: [
            [
                {
                    field: 'remitOrderNumber',
                    title: '订单号',
                    width: 180,
                    align: "center"
                },
                {
                    field: 'remitOrderMember',
                    title: '会员账号',
                    width: 150,
                    align: 'center'
                },
                {
                    field: 'remitWechat',
                    title: '微信昵称',
                    width: 150,
                    align: 'center'
                },
                {
                    field: 'remitPayLevel',
                    title: '会员支付层级',
                    minWidth: 120,
                    align: 'center'
                },
                {
                    field: 'remitTime',
                    title: '时间',
                    minWidth: 150,
                    align: 'center',
                    templet: function(d) {
                        return d.remitTime.substring(0, 20);
                    }
                },
                {
                    field: 'remitAmount',
                    title: '存入金额',
                    align: 'center',
                    minWidth: 100,
                },
                {
                    field: 'remitCashFlow',
                    title: '金流',
                    width: 180,
                    align: "center"
                }
            ]
        ]
    });

    //是否置顶
    form.on('switch(remitTop)', function(data) {
        var index = layer.msg('修改中，请稍候', {
            icon: 16,
            time: false,
            shade: 0.8
        });
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
            table.reload("remitOrdersSearchTable", {
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

    //添加文章
    function addNews(edit) {
        var index = layui.layer.open({
            title: "添加文章",
            type: 2,
            content: "remitAdd.html",
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find(".remitName").val(edit.remitName);
                    body.find(".abstract").val(edit.abstract);
                    body.find(".thumbImg").attr("src", edit.remitImg);
                    body.find("#remit_content").val(edit.content);
                    // body.find(".remitStatus select").val(edit.remitStatus);
                    body.find(".remitPaymentSystem select").val(edit.remitPaymentSystem);
                    body.find(".openness input[name='openness'][title='" + edit.remitLook + "']").prop("checked", "checked");
                    body.find(".remitTop input[name='remitTop']").prop("checked", edit.remitTop);
                    form.render();
                }
                setTimeout(function() {
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function() {
            layui.layer.full(index);
        })
    }
    
})