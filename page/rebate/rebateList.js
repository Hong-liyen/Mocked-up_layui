layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#rebateList',
        url: '../../json/rebateList.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "rebateListTable",
        cols: [
            [
                // {type: "checkbox", fixed:"left", width:50},
                { field: 'rebateId', title: '序号', width: 60, align: "center" },
                { field: 'rebateModuleName', title: '用户名', width: 110, align: "center" },
                { field: 'rebateBet', title: '有效投注', align: 'center' },
                { field: 'rebateSupLimit', title: '返点上限', align: "center" },
                { field: 'rebateEdit', title: '编辑', align: "center", templet: "#rebateEdit" }
            ]
        ]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("rebateListTable", {
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
    function addRebate(add) {
        var index = layui.layer.open({
            title: "添加文章",
            type: 2,
            content: "rebateAdd.html",
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find(".rebateName").val(add.rebateName);
                    body.find("#rebate_content").val(add.content);
                    body.find(".rebateNickName").val(add.rebateNickName);
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
    $(".rebateAdd_btn").click(function() {
        rebateAdd();
    })

    //编辑文章
    function editRebate(edit) {
        var index = layui.layer.open({
            title: "编辑文章",
            type: 2,
            content: "rebateEdit.html",
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find(".rebateName").val(add.rebateName);
                    body.find("#rebate_content").val(add.content);
                    body.find(".rebateNickName").val(add.rebateNickName);
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
    $(".rebateedit_btn").click(function() {
        rebateedit();
    })

    //上級查看
    table.on('tool(rebateList)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;


        if (layEvent === 'edit') { //编辑
            editAgent(data);
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除此文章？', { icon: 3, title: '提示信息' }, function(index) {
                // $.get("删除文章接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            });
        } else if (layEvent === 'add') { //添加
            addAgent(data);
        }
    });


})