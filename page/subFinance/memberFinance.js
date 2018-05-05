layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#MemberFinance',
        url : '../../json/subFinanceMember.json',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 20,
        limits : [10,15,20,25],
        id : "memberFinanceTable",
        cols : [[
            {field: 'subMemberFinanceId', title: '序号', width:100, align:"center"},
            {field: 'subMemberFinanceMemberId', title: '会员账号', align:"center"},
            {field: 'subMemberFinanceType', title: '交易类型', align:"center", templet:"#subMemberFinanceType"},
            {field: 'subMemberFinanceAmount', title: '金额', width:120, align:"center"},
            {field: 'subMemberFinanceBalance', title: '小计', width:120, align:'center'},
            {field: 'subMemberFinanceTime', title: '交易日期', align:'center',sort:"true", minWidth:130, templet:function(d){
                return d.subMemberFinanceTime.substring(0,10);
            }},
            {field: 'subMemberFinanceList', title: '单号', width:150, align:"center"},
            {field: 'subMemberFinanceNote', title: '备注', width:250, align:"center"}
        ]]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("memberFinanceTable",{
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