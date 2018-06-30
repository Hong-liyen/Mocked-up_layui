layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#storeList',
        url: '../../json/storeList.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "storeListTable",
        cols: [
            [
                // {type: "checkbox", fixed:"left", width:50},
                { field: 'storeId', title: '编号', width: 60, align: "center" },
                { field: 'storeName', title: '商家代称', width: 300, align: "center" },
                { field: 'storePaymentSystem', title: '支付类型', align: 'center', templet: "#storePaymentSystem" },
                { field: 'storePaymentType', title: '支付系统', width: 200, align: 'center' },
                { field: 'storeNumber', title: '商号', align: 'center' },
                // {field: 'storeTop', title: '是否置顶', align:'center', templet:function(d){
                //     return '<input type="checkbox" name="storeTop" lay-filter="storeTop" lay-skin="switch" lay-text="是|否" '+d.storeTop+'>'
                // }},
                // {field: 'storeTime', title: '发布时间', align:'center', minWidth:110, templet:function(d){
                //     return d.storeTime.substring(0,10);
                // }},
                { field: 'storeLevel', title: '层级名称', width: 450, align: "center" },
                { title: '操作', width: 280, templet: '#storeListBar', fixed: "right", align: "center" }
            ]
        ]
    });

    //是否置顶
    form.on('switch(storeTop)', function(data) {
        var index = layer.msg('修改中，请稍候', { icon: 16, time: false, shade: 0.8 });
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
            table.reload("storeListTable", {
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
            content: "storeAdd.html",
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                if (edit) {
                    body.find(".storeName").val(edit.storeName);
                    body.find(".abstract").val(edit.abstract);
                    body.find(".thumbImg").attr("src", edit.storeImg);
                    body.find("#store_content").val(edit.content);
                    // body.find(".storeStatus select").val(edit.storeStatus);
                    body.find(".storePaymentSystem select").val(edit.storePaymentSystem);
                    body.find(".openness input[name='openness'][title='" + edit.storeLook + "']").prop("checked", "checked");
                    body.find(".storeTop input[name='storeTop']").prop("checked", edit.storeTop);
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
    // $(".addNews_btn").click(function(){
    //     addNews();
    // })

    //批量删除
    // $(".delAll_btn").click(function(){
    //     var checkStatus = table.checkStatus('storeListTable'),
    //         data = checkStatus.data,
    //         storeId = [];
    //     if(data.length > 0) {
    //         for (var i in data) {
    //             storeId.push(data[i].storeId);
    //         }
    //         layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
    //             // $.get("删除文章接口",{
    //             //     storeId : storeId  //将需要删除的storeId作为参数传入
    //             // },function(data){
    //             tableIns.reload();
    //             layer.close(index);
    //             // })
    //         })
    //     }else{
    //         layer.msg("请选择需要删除的文章");
    //     }
    // })

    //列表操作
    table.on('tool(storeList)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            addStore(data);
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定停用此商户？', { icon: 3, title: '提示信息' }, function(index) {
                // $.get("删除文章接口",{
                //     storeId : data.storeId  //将需要删除的storeId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            });
        } else if (layEvent === 'look') { //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        } else if (layEvent === 'chosebank') { //银行选择//uifix_addoutpage
            var index = layui.layer.open({
                title: "新易付支付银行对应表",
                type: 2,
                content: "storePayBankList.html",
                success: function (layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                }
            })
            layui.layer.full(index);
            window.sessionStorage.setItem("index", index);
            //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
            $(window).on("resize", function () {
                layui.layer.full(window.sessionStorage.getItem("index"));
            })
        } else if (layEvent === 'chosecard') { //银行选择//uifix_addoutpage
            var index = layui.layer.open({
                title: "网易点卡点卡对应表",
                type: 2,
                content: "storePayCardList.html",
                success: function (layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                }
            })
            layui.layer.full(index);
            window.sessionStorage.setItem("index", index);
            //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
            $(window).on("resize", function () {
                layui.layer.full(window.sessionStorage.getItem("index"));
            })
        }
    });

})