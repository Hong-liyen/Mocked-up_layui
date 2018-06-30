layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#contactUsList',
        url: '../../json/contactUs.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "contactUsListTable",
        cols: [
            [{
                    type: "checkbox",
                    fixed: "left",
                    width: 50
                },
                {
                    field: 'memberName',
                    title: '名字',
                    width: 150,
                    align: "center"
                },
                {
                    field: 'memberPhone',
                    title: '联络电话',
                    width: 100,
                    align: 'center'
                },
                {
                    field: 'QQskype',
                    title: '留言时间',
                    width: 200,
                    align: 'center'
                },
                {
                    field: 'email',
                    title: '电邮信箱',
                    width: 200,
                    align: 'center'
                },
                {
                    field: 'time',
                    title: '创建时间',
                    width: 200,
                    align: 'center'
                }, {
                    field: 'contactEvent',
                    title: '联络事项',
                    minWidth: 200,
                    align: 'center'
                }, {
                    field: 'contactState',
                    title: '状态',
                    width: 80,
                    templet: '#contactState',
                    align: "center"
                },
                {
                    title: '操作',
                    width: 250,
                    templet: '#contactUsListBar',
                    fixed: "right",
                    align: "center"
                }
            ]
        ]
    });
    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("contactUsListTable", {
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
    table.on('tool(contactUsList)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'reply') { //回复

        } else if (layEvent === 'del') { //删除
            layer.confirm('是否确定删除？', {
                icon: 3,
                title: '提示信息'
            }, function(index) {
                // $.get("删除文章接口",{
                //     storeId : data.storeId  //将需要删除的storeId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            });
        } else if (layEvent === 'look') { //查看
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        } else if (layEvent === 'record') { //回复记录
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });
})