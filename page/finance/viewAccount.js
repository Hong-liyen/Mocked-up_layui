layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#viewAccount',
        url: '../../json/viewAccount.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "viewAccountTable",
        cols: [
            [
                // {type: "checkbox", fixed:"left", width:50},
                { field: 'time', title: '新增日期', width: 140 , align: "center" },
                { field: 'account', title: '账号', align: 'center', templet:function(d){
                    return '<a class="layui-blue" lay-event="details">'+d.account+'</a>'
                }},
                { field: 'name', title: '名称', width: 100, align: 'center'},
                { field: 'currency', title: '币别', width: 100, align: 'center'},
                { field: 'balance', title: '余额', width: 100, align: 'center'},
                { field: 'depositTimes', title: '存款次数', align: 'center'},
                { field: 'totalDeposits', title: '存款总数', width: 140, align: 'center' },
                { field: 'withdrawals', title: '提款次数', width: 140, align: 'center' },
                { field: 'manualWithdrawals', title: '人工提款次数', width: 140, align: 'center' },
                { field: 'totalWithdrawals', title: '提款总数', width: 140, align: 'center' },
                { field: 'country', title: '国家', width: 80, align: 'center' },
                { field: 'telephone', title: '电话号码', width: 140, align: 'center' },
                { field: 'E-mail', title: '电子邮箱', width: 140, align: 'center' },
                { field: 'QQNum', title: 'QQ', width: 140, align: 'center' },
                { field: 'agentStatus',title: '状态', width: 140, align: 'center', fixed:"right" , templet:"#agentStatusBar"}
            ]
        ]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("viewAccountTable", {
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
    table.on('tool(viewAccount)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'details') { //会员资料
            layer.open({
                title: "会员资料",
                type: 1,
                btn: '关闭',
                area:['500px','500px'],
                content: '<table class="layui-table rebateChargeoff">' +
                '<tr><th>账号</th><td>34wr</td></tr>'+
                '<tr><th>名称</th><td> </td></tr>'+
                '<tr><th>生日日期</th><td> </td></tr>'+
                '<tr><th>国家</th><td> </td></tr>'+
                '<tr><th>电话号码</th><td>123132</td></tr>'+
                '<tr><th>电子邮箱</th><td>123@123.com</td></tr>'+
                '<tr><th>QQ</th><td>15646</td></tr>'+
                '<tr><th>币别</th><td>RMB</td></tr>'+
                '<tr><th>现金金额</th><td>200.0</td></tr>'+
                '<tr><th>新增日期</th><td>2018-05-31</td></tr>'+
                '<tr><th>状态</th><td>正常</td></tr>'+
                '<tr><th>代理商</th><td>sfsf</td></tr>'+
            '</table>'
            })
        } else if( layEvent === 'view'){
            layer.open({
                title: "查看余额",
                type: 1,
                btn: '关闭',
                area:['1100px','420px'],
                content: '<table class="layui-table rebateChargeoff">' +
                '<tr><th>总金额</th><th>现金余额</th><th>传统彩余额</th><th>皇冠体育余额</th><th>AG余额</th><th>OG余额</th><th>BB余额</th><th>MG余额</th><th>沙巴余额</th><th>OPUS余额</th><th>LEBO余额</th><th>AB余额</th><th>DS余额</th><th>MWG余额</th><th>PT余额</th><th>新MG余额</th><th>PP余额</th><th>CMD余额</th><th>VG余额</th><th>VGS余额</th><th>CQ9余额</th></tr>'+
                '<tr><td>350</td><td>350</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>' +
                '<tr><td colspan="21"><a class="layui-btn layui-btn-normal">更新</a></td></tr>' +
                '</table>'
            })
        }
    });

})