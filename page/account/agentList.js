layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
        var form = layui.form,
            layer = parent.layer === undefined ? layui.layer : top.layer,
            $ = layui.jquery,
            laydate = layui.laydate,
            laytpl = layui.laytpl,
            table = layui.table;

        //新闻列表
        var tableIns = table.render({
            elem: '#agentList',
            url: '../../json/accountAgentList.json',
            cellMinWidth: 95,
            page: true,
            height: "full-125",
            limit: 20,
            limits: [10, 15, 20, 25],
            id: "agentListTable",
            cols: [
                [
                    // {type: "checkbox", fixed:"left", width:50},
                    { field: 'agentId', title: '序号', width: 70, align: "center" },
                    { field: 'agentName', title: '用户名', width: 145, align: "center" },
                    { field: 'agentNickName', title: '昵称', width: 145, align: "center" },
                    { field: 'agentSup', title: '上级', width: 80, align: "center" },
                    // {field: 'agentPaymentSystem', title: '支付类型',  align:'center',templet:"#agentPaymentSystem"},
                    { field: 'agentBalance', title: '账户余额', width: 180, align: 'center' },
                    { field: 'agentSubAgent', title: '下级代理', width: 100, align: "center" },
                    { field: 'agentSubMember', title: '下级会员', width: 100, align: "center" },
                    { field: 'agentLevel', title: '层级', width: 70, align: "center" },
                    { field: 'agentRebate', title: '返点明细', width: 100, align: 'center' },
                    { field: 'agentAccount', title: '账号', width: 100, align: 'center', templet: "#agentAccount" },
                    { field: 'agentBet', title: '投注', width: 100, align: 'center', templet: "#agentBet" },
                    // {field: 'agentTop', title: '是否置顶', align:'center', templet:function(d){
                    //     return '<input type="checkbox" name="agentTop" lay-filter="agentTop" lay-skin="switch" lay-text="是|否" '+d.agentTop+'>'
                    // }},
                    {
                        field: 'agentTime',
                        title: '注册时间',
                        align: 'center',
                        sort: "true",
                        minwidth: 160,
                        templet: function(d) {
                            return d.agentTime.substring(0, 10);
                        }
                    },
                    { field: 'agentLogin', title: '登录', width: 60, align: "center" },
                    { title: '操作', width: 280, templet: '#agentListBar', fixed: "right", align: "center" },
                ]
            ]
        });

        //是否置顶
        form.on('switch(agentTop)', function(data) {
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
                table.reload("agentListTable", {
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
        // 20180504  Amanda
        //添加非一级代理
        function addAgent(add) {
            var index = layui.layer.open({
                title: "添加非一级代理",
                type: 2,
                content: "addnone1stagent.html",
                success: function(layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    if (edit) {
                        body.find(".agentName").val(add.agentName);
                        body.find(".abstract").val(add.abstract);
                        body.find(".thumbImg").attr("src", add.agentImg);
                        body.find("#agent_content").val(add.content);
                        // body.find(".agentStatus select").val(edit.agentStatus);
                        body.find(".agentNickName").val(add.agentNickName);
                        // body.find(".openness input[name='openness'][title='"+edit.agentLook+"']").prop("checked","checked");
                        // body.find(".agentTop input[name='agentTop']").prop("checked",edit.agentTop);
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
        // $(".agentAdd_btn").click(function() {
        //         agentAdd();
        //     })
        //     //添加一级代理
        // function add1st(add1st) {
        //     var index = layui.layer.open({
        //         title: "添加一级代理",
        //         type: 2,
        //         content: "add1stagent.html",
        //         success: function(layero, index) {

        //             setTimeout(function() {
        //                 layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
        //                     tips: 3
        //                 });
        //             }, 500)
        //         }
        //     })
        //     layui.layer.full(index);
        //     //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        //     $(window).on("resize", function() {
        //         layui.layer.full(index);
        //     })
        // }
        // $(".add1st").click(function() {
        //     add1st();
        // })

        //编辑文章
        function editAgent(edit) {
            var index = layui.layer.open({
                title: "编辑文章",
                type: 2,
                content: "agentEdit.html",
                success: function(layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    if (edit) {
                        body.find(".agentName").val(edit.agentName);
                        body.find(".abstract").val(edit.abstract);
                        body.find(".thumbImg").attr("src", edit.agentImg);
                        body.find("#agent_content").val(edit.content);
                        // body.find(".agentStatus select").val(edit.agentStatus);
                        body.find(".agentNickName select").val(edit.agentNickName);
                        // body.find(".openness input[name='openness'][title='"+edit.agentLook+"']").prop("checked","checked");
                        // body.find(".agentTop input[name='agentTop']").prop("checked",edit.agentTop);
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
        $(".agentedit_btn").click(function() {
                agentedit();
            })
            //批量删除
            // $(".delAll_btn").click(function(){
            //     var checkStatus = table.checkStatus('agentListTable'),
            //         data = checkStatus.data,
            //         agentId = [];
            //     if(data.length > 0) {
            //         for (var i in data) {
            //             agentId.push(data[i].agentId);
            //         }
            //         layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
            //             // $.get("删除文章接口",{
            //             //     agentId : agentId  //将需要删除的agentId作为参数传入
            //             // },function(data){
            //             tableIns.reload();
            //             layer.close(index);
            //             // })
            //         })
            //     }else{
            //         layer.msg("请选择需要删除的文章");
            //     }
            // })

        //上級查看
        table.on('tool(agentList)', function(obj) {
            var layEvent = obj.event,
                data = obj.data;

            if (layEvent === 'Supdetail') { //上級路徑
                layer.confirm('<p>大大股东：' + obj.data.bigestShare + '</p><p>大股东：' + obj.data.bigShare + '</p><p>股东：' + obj.data.share + '</p><p>总代：' + obj.data.mainAgent + '</p>', { title: '上级路径' },
                    function(index) {
                        // $.get("删除文章接口",{
                        //     agentId : data.agentId  //将需要删除的agentId作为参数传入
                        // },function(data){
                        tableIns.reload();
                        layer.close(index);
                        // })
                    });
            } else if (layEvent === 'Leveldetail') { //上級路徑
                layer.confirm(obj.data.Level1 + obj.data.Level2 + obj.data.Level3 + obj.data.Level4 + obj.data.Level5 + obj.data.Level6, { title: '账号层级' },
                    function(index) {
                        tableIns.reload();
                        layer.close(index);
                    });
            } else if (layEvent === 'Rebatedetail') { //返点明细
                layer.confirm('<table class="layui-table"><colgroup><col width="180"><col width="180"></colgroup><thead><tr><th>返点平台</th><th>明细</th></tr></thead>' +
                    '<tbody><tr><td>AG</td><td>' +
                    obj.data.RebateAG +
                    '%</td></tr><tr><td>OG</td><td>' +
                    obj.data.RebateOG +
                    '%</td></tr><tr><td>BB</td><td>' +
                    obj.data.RebateBB +
                    '%</td></tr><tr><td>ALLBET</td><td>' +
                    obj.data.RebateALLBET +
                    '%</td></tr></tbody></table>', { title: '返点明细' },
                    function(index) {
                        tableIns.reload();
                        layer.close(index);
                    });



            } else if (layEvent === 'edit') { //编辑
                editAgent(data);
            } else if (layEvent === 'authority') { //權限
                layer.confirm('此账户权限为 OOOO', { icon: 3, title: '账户权限' }, function(index) {
                    tableIns.reload();
                    layer.close(index);
                });
            } else if (layEvent === 'info') { //账户信息
                layer.alert("账户信息账户信息账户信息账户信息账户信息")
            } else if (layEvent === 'add') { //添加
                addAgent(data);
            } else if (layEvent === 'add1st') { //添加
                addAgent1st(data);
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