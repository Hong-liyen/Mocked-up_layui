layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#agentFinance',
        url : '../../json/subFinanceAgent.json',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 20,
        limits : [10,15,20,25],
        id : "agentFinanceTable",
        cols : [[
            {field: 'subagentFinanceId', title: '序号', width:100, align:"center"},
            {field: 'subagentFinanceMemberId', title: '会员账号', align:"center"},
            {field: 'subagentFinanceType', title: '交易类型', align:"center", templet:"#subagentFinanceType"},
            {field: 'subagentFinanceAmount', title: '金额', width:120, align:"center"},
            {field: 'subagentFinanceBalance', title: '小计', width:120, align:'center'},
            {field: 'subagentFinanceTime', title: '交易日期', align:'center',sort:"true", minWidth:130, templet:function(d){
                return d.subagentFinanceTime.substring(0,10);
            }},
            {field: 'subagentFinanceList', title: '单号', width:150, align:"center"},
            {field: 'subagentFinanceNote', title: '备注', width:250, align:"center"}
        ]]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("agentFinanceTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });

})