layui.use(['form', 'layer', 'laydate', 'table', 'laytpl'], function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#rebateSearchList',
        url: '../../json/rebateSearchList.json',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limit: 20,
        limits: [10, 15, 20, 25],
        id: "rebateSearchList",
        cols: [
            [
                // {type: "checkbox", fixed:"left", width:50},
                { field: 'rebateSearchListId', title: '编号', width: 80, align: "center" },
                { field: 'rebateSearchListName', title: '事件名称', width: 100, align: "center", edit: "text" },
                {
                    field: 'rebateSearchListTime',
                    title: '创建时间',
                    align: 'center',
                    // sort: "true",
                    minWidth: 200,
                    templet: function(d) {
                        return d.rebateSearchListTime.substring(0, 20);
                    }
                },
                {
                    field: 'rebateSearchListStart',
                    title: '返水区间（起）',
                    align: 'center',
                    // sort: "true",
                    minWidth: 200,
                    templet: function(d) {
                        return d.rebateSearchListStart.substring(0, 20);
                    }
                },
                {
                    field: 'rebateSearchListEnd',
                    title: '返水区间（迄）',
                    align: 'center',
                    // sort: "true",
                    minWidth: 200,
                    templet: function(d) {
                        return d.rebateSearchListEnd.substring(0, 20);
                    }
                },
                { field: 'rebateSearchListStatus', title: '事件状态', width: 120, align: "center", templet: "#rebateSearchListStatus" },
                // {field: 'rebateSearchListPaymentSystem', title: '支付类型',  align:'center',templet:"#rebateSearchListPaymentSystem"},
                { field: 'rebateSearchListSum', title: '总人数/总金额', width: 150, align: 'center' },
                { field: 'rebateSearchListWait', title: '待返水人数/金额', width: 150, align: "center" },
                {
                    field: 'rebateSearchListDetail',
                    title: '查询明细',
                    width: 280,
                    align: "center",
                    templet: "#rebateSearchListDetail",
                    fixed: "right"
                }
            ]
        ],

    });


    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function() {
        if ($(".searchVal").val() != '') {
            table.reload("rebateSearchListListTable", {
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


    //上級查看
    table.on('tool(rebateSearchListList)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'Supdetail') { //上級路徑
            layer.confirm('<p>大大股东：' + obj.data.bigestShare + '</p><p>大股东：' + obj.data.bigShare + '</p><p>股东：' + obj.data.share + '</p><p>总代：' + obj.data.mainAgent + '</p>', { title: '上级路径' },
                function(index) {
                    // $.get("删除文章接口",{
                    //     rebateSearchListId : data.rebateSearchListId  //将需要删除的rebateSearchListId作为参数传入
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
        }
    });

    div.on('tool(rebateSearchListList)', function(obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'add1st') { //添加
            addAgent1st(data);
        }
    });

})

layui.use('table', function() {
    var table = layui.table;

    //监听单元格编辑
    table.on('edit(rebateSearchList)', function(obj) {
        var value = obj.value //得到修改后的值
            ,
            data = obj.data //得到所在行所有键值
            ,
            field = obj.field; //得到字段
        layer.msg('编号： ' + data.rebateSearchListId + '， ' + '  事件名称更改为：' + value);
    });
});