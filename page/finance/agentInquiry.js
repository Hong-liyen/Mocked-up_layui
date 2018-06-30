layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#agentInquiry',
        url: '../../json/agentInquiry.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "agentInquiryTable",
        cols: [
            [
                // {type: "checkbox", fixed:"left", width:50},
                { field: 'time', title: '新增日期',  align: "center" },
                { field: 'distributor', title: '总代理',  align: "center" },
                { field: 'account', title: '账号', align: 'center', templet:function(d){
                    return '<a class="layui-blue" href="viewAccount.html">'+d.account+'</a>'
                }},
                { field: 'name', title: '名称', align: 'center' },
                { field: 'agentLevel', title: '代理层级', align: 'center' },
                { field: 'directMemberNum', title: '直属会员数', width: 100, align: 'center', templet:function(d){
                    return '<a class="layui-blue" lay-event="view">'+d.directMemberNum+'</a>'
                }},
                { field: 'telephone', title: '电话号码', width: 140, align: 'center' },
                { field: 'E-mail', title: '电子邮箱', width: 140, align: 'center' },
                { field: 'QQNum', title: 'QQ', width: 140, align: 'center' },
                { field: 'agentStatus',title: '状态', width: 100, align: 'center', fixed:"right" , templet:"#agentStatusBar"},
            ]
        ]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("agentInquiryTable", {
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
    table.on('tool(agentInquiry)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'view') { //会员资料
            layer.open({
                title: "查看直属会员",
                type: 1,
                btn: '关闭',
                content: '查看直属会员查看直属会员'
            })
        }
    });

})