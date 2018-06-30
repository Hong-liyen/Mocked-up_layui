layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#monthlyReport',
        url: '../../json/monthlyReport.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "monthlyReportTable",
        cols: [
            [{
                    field: 'monthlyReportName',
                    title: '厅主',
                    align: "center"
                },
                {
                    field: 'monthlyReportPeriod',
                    title: '期数',
                    align: "center",
                    sort: true
                },
                {
                    field: 'monthlyReportAmount',
                    title: '应交金额',
                    align: "center",
                    sort: true
                }
            ]
        ]
    });


    //查询【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("agentListTable", {
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

   
    //上級查看
    table.on('tool(agentList)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'Supdetail') { //上級路徑
            layer.confirm('</p><p>大股东：' + obj.data.bigShare + '</p><p>股东：' + obj.data.share + '</p><p>总代：' + obj.data.mainAgent + '</p>', { title: '上级路径' },
                function(index) {
                    // $.get("删除文章接口",{
                    //     agentId : data.agentId  //将需要删除的agentId作为参数传入
                    // },function(data){
                    tableIns.reload();
                    layer.close(index);
                    // })
                });
        } else if (layEvent === 'Leveldetail') { //层级路徑
            layer.confirm(obj.data.Level1 + obj.data.Level2 + obj.data.Level3 + obj.data.Level4 + obj.data.Level5 + obj.data.Level6, { title: '<span>okok02</span>层级路径' },
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