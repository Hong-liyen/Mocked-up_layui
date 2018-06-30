layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
        var form = layui.form,
            layer = parent.layer === undefined ? layui.layer : top.layer,
            $ = layui.jquery,
            laydate = layui.laydate,
            laytpl = layui.laytpl,
            table = layui.table;

        //新闻列表
        var tableIns = table.render({
            elem: '#memberList',
            url: '../../json/accountmemberList.json',
            cellMinWidth: 95,
            page: true,
            height: "full-125",
            limit: 20,
            limits: [10, 15, 20, 25],
            id: "memberListTable",
            cols: [
                [
                    //uifix_106
                    { field: 'memberId', title: '序号', width: 145, align: "center" },
                    { field: 'memberName', title: '用户名', width: 145, align: "center" },
                    { field: 'memberNickName', title: '昵称', width: 145, align: "center" },
                    { field: 'memberSup', title: '上级', width: 145, align: "center" },
                    { field: 'memberBalance', title: '账户余额', width: 145, align: 'center' },
                    { field: 'memberRebate', title: '返点', width: 145, align: 'center' },
                    { field: 'memberAccount', title: '账号', width: 145, align: 'center', templet: "#memberAccount" },
                    { field: 'memberBet', title: '投注', width: 145, align: 'center', templet: "#memberBet" },
                    {
                        field: 'memberTime',
                        title: '注册时间',
                        align: 'center',
                        sort: "true",
                        width: 145,
                        templet: function(d) {
                            return d.memberTime.substring(0, 10);
                        }
                    },
                    { field: 'memberLogin', title: '登录', width: 145, align: "center" },
                     //uifix_106 End
                    { title: '操作', width: 280, templet: '#memberListBar', fixed: "right", align: "center" },
                ]
            ]
        });

        //是否置顶
        form.on('switch(memberTop)', function(data) {
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

        //查询【此功能需要后台配合，所以暂时没有动态效果演示】
        $(".search_btn").on("click", function() {
            if ($(".searchVal").val() != '') {
                table.reload("memberListTable", {
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
        // 20180504  Amanda
        //添加非一级代理
        function addAgent(add) {
            var index = layui.layer.open({
                // title: "添加非一级代理",
                type: 2,
                content: "addnone1stmember.html",
                success: function(layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    if (edit) {
                        body.find(".memberName").val(add.memberName);
                        body.find(".abstract").val(add.abstract);
                        body.find(".thumbImg").attr("src", add.memberImg);
                        body.find("#member_content").val(add.content);
                        // body.find(".memberStatus select").val(edit.memberStatus);
                        body.find(".memberNickName").val(add.memberNickName);
                        // body.find(".openness input[name='openness'][title='"+edit.memberLook+"']").prop("checked","checked");
                        // body.find(".memberTop input[name='memberTop']").prop("checked",edit.memberTop);
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
        // $(".memberAdd_btn").click(function() {
        //         memberAdd();
        //     })
        //     //添加一级代理
        // function add1st(add1st) {
        //     var index = layui.layer.open({
        //         title: "添加一级代理",
        //         type: 2,
        //         content: "add1stmember.html",
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
                content: "memberEdit.html",
                success: function(layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    if (edit) {
                        body.find(".memberName").val(edit.memberName);
                        body.find(".abstract").val(edit.abstract);
                        body.find(".thumbImg").attr("src", edit.memberImg);
                        body.find("#member_content").val(edit.content);
                        // body.find(".memberStatus select").val(edit.memberStatus);
                        body.find(".memberNickName select").val(edit.memberNickName);
                        // body.find(".openness input[name='openness'][title='"+edit.memberLook+"']").prop("checked","checked");
                        // body.find(".memberTop input[name='memberTop']").prop("checked",edit.memberTop);
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
        $(".memberedit_btn").click(function() {
            memberedit();
        })

        //上級查看
        table.on('tool(memberList)', function(obj) {
            var layEvent = obj.event,
                data = obj.data;

            if (layEvent === 'Supdetail') { //上級路徑
                layer.confirm('</p><p>大股东：' + obj.data.bigShare + '</p><p>股东：' + obj.data.share + '</p><p>总代：' + obj.data.mainAgent + '</p>', { title: '上级路径' },
                    function(index) {
                        // $.get("删除文章接口",{
                        //     memberId : data.memberId  //将需要删除的memberId作为参数传入
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
            } else if (layEvent === 'Rebatedetail') { //返点
                layer.confirm('<table class="layui-table"><colgroup><col width="180"><col width="180"></colgroup><thead><tr><th>返点平台</th><th>明细</th></tr></thead>' +
                    '<tbody><tr><td>AG</td><td>' +
                    obj.data.RebateAG +
                    '%</td></tr><tr><td>OG</td><td>' +
                    obj.data.RebateOG +
                    '%</td></tr><tr><td>BB</td><td>' +
                    obj.data.RebateBB +
                    '%</td></tr><tr><td>ALLBET</td><td>' +
                    obj.data.RebateALLBET +
                    '%</td></tr></tbody></table>', { title: '返点' },
                    function(index) {
                        tableIns.reload();
                        layer.close(index);
                    });
            } else if (layEvent === 'Balancedetail') { //余额详情
                layer.open({
                    type: 1,
                    closeBtn: 1,
                    btn: '确定',
                    btnAlign: 'c',
                    shadeClose: true,
                    title: '余额详情',
                    area: ['610px', '280px'],
                    content: '<table class="layui-table"><thead><tr><th>总金额</th><th>现金金额</th><th>AG</th><th>OG</th><th>BB</th><th>AB</th></tr></thead>' +
                        '<tbody><tr><td>' + obj.data.BalanceTotal +
                        '</td><td>' + obj.data.BalanceCash +
                        '</td><td>' + obj.data.BalanceAG +
                        '</td><td>' + obj.data.BalanceOG +
                        '</td><td>' + obj.data.BalanceBB +
                        '</td><td>' + obj.data.BalanceAB +
                        '</td></tr><tr><td><span class="layui-blue">更新</span></td>' +
                        '<td><span class="layui-blue">更新</span></td>' +
                        '<td><span class="layui-blue">更新</span></td>' +
                        '<td><span class="layui-blue">更新</span></td>' +
                        '<td><span class="layui-blue">更新</span></td>' +
                        '<td><span class="layui-blue">更新</span></td></tr></tbody></table>'
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