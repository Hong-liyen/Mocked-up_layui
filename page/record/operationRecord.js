layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#operationRecord',
        url: '../../json/operationRecord.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "operationRecord",
        cols: [
            [
                // {type: "checkbox", fixed:"left", width:50},
                { field: 'operationRecordId', title: '编号', width: 80, align: "center" },
                { field: 'operationRecordName', title: '操作人员', width: 120, align: "center" },
                {
                    field: 'operationRecordTime',
                    title: '创建时间',
                    align: 'center',
                    width: 200,
                    templet: function(d) {
                        return d.operationRecordTime.substring(0, 20);
                    }
                },
                { field: 'operationRecordDomain', title: '访问域名', width: 200, align: "center", templet: "#operationRecordDomain" },
                { field: 'operationRecordItems', title: '操作名称', width: 200, align: 'center' },
                {
                    field: 'operationRecordDetail',
                    title: '参数',
                    align: "left",
                    templet: "#operationRecordDetail",
                    fixed: "right"
                }
            ]
        ],

    }); 

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("operationRecordListTable", {
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
})
 