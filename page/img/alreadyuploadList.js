layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#alreadyuploadList',
        url: '../../json/alreadyuploadList.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "alreadyuploadListTable",
        cols: [
            [{
                    field: 'alreadyCaseNumber',
                    title: '案件编号',
                    width: 190,
                    align: "center",
                    sort: true
                },
                {
                    field: 'alreadyCaseName',
                    title: '标题',
                    width: 310,
                    align: "center",
                    sort: true
                },
                {
                    field: 'alreadyCaseTime',
                    title: '上传时间',
                    minwidth: 300,
                    align: "center"
                },
                {
                    field: 'alreadyCaseDisplay',
                    title: '状态',
                    width: 150,
                    align: "center",
                    templet: "#alreadyuploadStatus"
                },
                { title: '操作', width: 300, templet: '#alreadyuploadListBar', fixed: "right", align: "center" },
            ]
        ]
    });

})