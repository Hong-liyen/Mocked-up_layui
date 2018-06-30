layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //入款历史记录
    var tableIns = table.render({
        elem: '#paymentHistory',
        url: '../../json/paymentHistory.json',
        cellMinWidth: 95,
        page: true,
        footer:true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "paymentHistoryTable",
        cols: [
            [
                // {type: "checkbox", fixed:"left", width:50},
                { field: 'historyHierarchy', title: '层级', align: "center", width:80 },
                { field: 'historyOrderNum', title: '订单号', align: "center" , width:200 },
                { field: 'historyAgent', title: '代理', align: 'center', width:120 },
                { field: 'historyMember', title: '会员账号', align: 'center', width:120  },
                { field: 'historyBank', title: '会员银行账户', align: 'center', width:150, templet:function(d){
                    return '<p>银行：台州银行</p>\
                            <p>存款人：Gxhd</p>\
                            <P>方式：网银转账</P>\
                            <p>备注：鄙人</p>'
                }},
                { field: 'historyAmount', title: '存入金额', align: 'center', width:150, templet:function(d){
                    return '<p>存入金额：<span class="layui-red">20.0</span></p>\
                            <p>存款优惠：2.0</p>\
                            <P>其他优惠：0.0</P>\
                            <p>存入总金额：22.0</p>'
                } },
                { field: 'historyDepositBank',title: '存入银行', align: 'center', width:150 , templet:function(d){
                    return '<p>银行：北京银行</p>\
                            <p>卡主姓名：李三</p>'
                }},
                { field:'historyStatus',title: '状态', align: 'center', width:140 , templet:function(d){
                    return '<a class="layui-btn layui-btn-xs layui-btn-border-normal" lay-event="define">确认</a>\
                            <a class="layui-btn layui-btn-xs layui-btn-border-normal" lay-event="recall">取消</a>'
                }},
                { field: 'historyAlready', title: '操作者', align: 'center' , width:140},
                { field: 'historyTime', title: '时间', align:'center',  templet:function(d){
                    return '<p>会员填写：2018-05-31 13:41:36(当地)</p>\
                            <p>系统提交：2018-05-31 01:41:49(美东)</p>'
                }}
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
        } else if (layEvent === 'recall'){
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