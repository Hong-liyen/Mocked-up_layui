layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
        var form = layui.form,
            layer = parent.layer === undefined ? layui.layer : top.layer,
            $ = layui.jquery,
            laydate = layui.laydate,
            laytpl = layui.laytpl,
            table = layui.table;

        //新闻列表
        var tableIns = table.render({
            elem: '#subList',
            url: '../../json/accountSubList.json',
            cellMinWidth: 95,
            page: true,
            height: "full-125",
            limit: 20,
            limits: [10, 15, 20, 25],
            id: "subListTable",
            cols: [
                [
                    { field: 'subName', title: '用户名', width: 150, align: "center" },
                    { field: 'subAccount', title: '账号', width: 100, align: 'center', templet: "#subAccount" },
                    { field: 'subNote', title: '备注', width: 150, align: 'center'},
                    {
                        field: 'subAddTime',
                        title: '注册时间',
                        align: 'center',
                        sort: "true",
                        minwidth: 160,
                        templet: function(d) {
                            return d.subAddTime.substring(0, 20);
                        }
                    },
                    {
                        field: 'subLoginTime',
                        title: '最后登入时间',
                        align: 'center',
                        sort: "true",
                        minwidth: 160,
                        templet: function(d) {
                            return d.subLoginTime.substring(0, 20);
                        }
                    },
                    { field: 'subLogin', title: '登录次数', width: 100, align: "center" },
                    { field: 'subIP', title: 'IP数量', width: 100, align: "center" },
                    { title: '操作', width: 200, templet: '#subListBar', fixed: "right", align: "center" }
                ]
            ]
        });

        //查询【此功能需要后台配合，所以暂时没有动态效果演示】
        $(".search_btn").on("click", function() {
            if ($(".searchVal").val() != '') {
                table.reload("subListTable", {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        key: $(".searchVal").val() //查询的关键字
                    }
                })
            } else {
                layer.msg("请输入查询的内容");
            }
        });
        
        $(".subedit_btn").click(function() {
                subedit();
            })
            //批量删除
            // $(".delAll_btn").click(function(){
            //     var checkStatus = table.checkStatus('subListTable'),
            //         data = checkStatus.data,
            //         subId = [];
            //     if(data.length > 0) {
            //         for (var i in data) {
            //             subId.push(data[i].subId);
            //         }
            //         layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
            //             // $.get("删除文章接口",{
            //             //     subId : subId  //将需要删除的subId作为参数传入
            //             // },function(data){
            //             tableIns.reload();
            //             layer.close(index);
            //             // })
            //         })
            //     }else{
            //         layer.msg("请选择需要删除的文章");
            //     }
            // })
        table.on('tool(subList)', function(obj) {
            var layEvent = obj.event,
                data = obj.data;

            if (layEvent === 'del') { //删除
                layer.open({
                    type: 1,
                    closeBtn: 1,
                    btn: '确定',
                    btnAlign: 'c',
                    shadeClose: true,
                    icon: 3,
                    title: '确定删除',
                    area: ['250px', '160px'],
                    content: '确定删除此账号？'
                });
            }
        });



    })
    // blockquote.on('tool(add1st)', function(obj) {
    //     var layEvent = obj.event,
    //         data = obj.data;

//     if (layEvent === 'add1st') { //添加
//         add1st(data);
//     }
// });