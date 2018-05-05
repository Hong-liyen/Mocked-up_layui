layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#rebateSearchList',
        url : '../../json/rebateSearchList.json',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 20,
        limits : [10,15,20,25],
        id : "rebateSearchListTable",
        cols : [[
            // {type: "checkbox", fixed:"left", width:50},
            {field: 'rebateSearchListId', title: '编号', width:80, align:"center"},
            {field: 'rebateSearchListName', title: '事件名称', width:110, align:"center"},
            {field: 'rebateSearchListTime', title: '注册时间', align:'center',sort:"true", minWidth:130, templet:function(d){
                return d.rebateSearchListTime.substring(0,10);
            }},
            {field: 'rebateSearchListStart', title: '返水区间（起）', align:'center',sort:"true", minWidth:140, templet:function(d){
                return d.rebateSearchListStart.substring(0,10);
            }},
            {field: 'rebateSearchListEnd', title: '返水区间（迄）', align:'center',sort:"true", minWidth:140, templet:function(d){
                return d.rebateSearchListEnd.substring(0,10);
            }},
            {field: 'rebateSearchListStatus', title: '事件状态', width:80, align:"center",templet:"#rebateSearchListStatus"},
            // {field: 'rebateSearchListPaymentSystem', title: '支付类型',  align:'center',templet:"#rebateSearchListPaymentSystem"},
            {field: 'rebateSearchListSum', title: '总人数/总金额', width:150, align:'center'},
            {field: 'rebateSearchListWait', title: '待返水人数/金额', width:90, align:"center"},
            {field: 'rebateSearchListDetail', title: '查询明细', width:90, align:"center",templet:"#rebateSearchListDetail"}
        ]],
    
    });


    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("rebateSearchListListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });


    //上級查看
    table.on('tool(rebateSearchListList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'Supdetail'){ //上級路徑
            layer.confirm('<p>大大股东：' + obj.data.bigestShare + '</p><p>大股东：' + obj.data.bigShare+ '</p><p>股东：' + obj.data.share +'</p><p>总代：' + obj.data.mainAgent + '</p>',
                {title:'上级路径'},
                function(index){
                // $.get("删除文章接口",{
                //     rebateSearchListId : data.rebateSearchListId  //将需要删除的rebateSearchListId作为参数传入
                // },function(data){
                    tableIns.reload();
                    layer.close(index);
                // })
            });
        } else if(layEvent === 'Leveldetail'){ //上級路徑
            layer.confirm(obj.data.Level1 + obj.data.Level2 + obj.data.Level3 + obj.data.Level4 + obj.data.Level5 + obj.data.Level6,
                {title:'帐号层级'},
                function(index){
                    tableIns.reload();
                    layer.close(index);
            });
        } else if(layEvent === 'Rebatedetail'){ //返点明细
            layer.confirm('<table class="layui-table"><colgroup><col width="180"><col width="180"></colgroup><thead><tr><th>返点平台</th><th>明细</th></tr></thead>'
                + '<tbody><tr><td>AG</td><td>'
                + obj.data.RebateAG 
                + '%</td></tr><tr><td>OG</td><td>'
                + obj.data.RebateOG
                + '%</td></tr><tr><td>BB</td><td>'
                + obj.data.RebateBB
                + '%</td></tr><tr><td>ALLBET</td><td>'
                + obj.data.RebateALLBET 
                + '%</td></tr></tbody></table>',
                {title:'返点明细'},
                function(index){
                    tableIns.reload();
                    layer.close(index);
            });
        } else if(layEvent === 'edit'){ //编辑
            editAgent(data);
        } else if(layEvent === 'authority'){ //權限
            layer.confirm('此帐户权限为 OOOO',{icon:3, title:'帐户权限'},function(index){
                    tableIns.reload();
                    layer.close(index);
            });
        } else if(layEvent === 'info'){ //帐户信息
            layer.alert("帐户信息帐户信息帐户信息帐户信息帐户信息")
        } else if(layEvent === 'add'){ //添加
            addAgent(data);
        }
    });
   
    div.on('tool(rebateSearchListList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'add1st'){ //添加
            addAgent1st(data);
        }
    });

})