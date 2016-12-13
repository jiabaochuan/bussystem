/**
 * Created by jiabaochuan on 2016/12/11.
 */
$(document).ready(function(){
    //提示
    $("[data-toggle='popover']").popover("hide");

    //公交路线

    //按钮清除功能
    $("#bus_close_1").on("click",function(){
        $("#bus_address").empty();
    });
    $("#bus_close_2").on("click",function(){
        $("#bus_address").empty();
    });
    var city=$("#bus_city");
    var bus=$("#bus_bus");
    var address=$("#bus_address");
    //获取数据功能
    $("#bus_btn").on("click",function(){
        if(city.val()&&bus.val()) {
            $.ajax({
                    type: "get",
                    url: "https://op.juhe.cn/189/bus/busline?key=ea377a5312d13a8c708648a6a7bf735d&city="+city.val()+"&bus="+bus.val()+"",
                    dataType: "jsonp",
                    success: function (data) {
                        if(data.result==null){
                            address.append("<p>填写内容有错，请核实后再填写！！！</p>");
                        }
                        var len=data.result[0].stationdes.length;
                        (function(){
                            for(var i=0;i<len;i++){
                               address.append("第"+(i+1)+"站     <p>"+data.result[0].stationdes[i].name+"</p>")
                            }
                        })();
                    }
                }
            );
        }else{
            address.append("<p>内容不得为空！！！</p>");
        }
    });


    //途径公交车
    var city_station=$("#bus_city_station");
    var station=$("#bus_station");
    var address_1=$("#bus_address_1");

    //数据清除
    $("#bus_close_3").on("click",function(){
        $("#bus_address_1").empty();
    });
    $("#bus_close_4").on("click",function(){
        $("#bus_address_1").empty();
    });
    //数据获取
    $("#bus_btn_station").on("click",function(){
        if(city_station.val()&&station.val()) {
            $.ajax({
                    type: "get",
                    url: "https://op.juhe.cn/189/bus/station?key=ea377a5312d13a8c708648a6a7bf735d&city="+city_station.val()+"&station="+station.val()+"",
                    dataType: "jsonp",
                    success: function (data) {
                        if(data.result==null){
                            address.append("<p>填写内容有错，请核实后再填写！！！</p>");
                        }
                        var len=data.result[0].length;
                        (function(){
                            for(var i=0;i<len;i++){
                                address_1.append("第"+(i+1)+"种情况     <p>"+data.result[i].name+"</p>");
                            }
                        })();
                    }
                }
            )
        }else{
            address.append("<p>内容不得为空！！！</p>");
        }
    });
    //转车
    var city_change=$("#bus_city_change");
    var bus_change=$("#bus_change");
    var bus_num=$("#bus_num");
    var address_2=$("#bus_address_2");


    //清空数据
    $("#bus_close_5").on("click",function(){
        $("#bus_address_2").empty();
    });
    $("#bus_close_6").on("click",function(){
        $("#bus_address_2").empty();
    });

    //数据获取
    $("#bus_btn_change").on("click",function(){
        if(city_change.val()&&bus_change.val()&&bus_num.val()) {
            $.ajax({
                    type: "get",
                    url: "https://op.juhe.cn/189/bus/transfer?key=ea377a5312d13a8c708648a6a7bf735d&city="+city_change.val()+"&xys="+bus_change.val()+"&type"+bus_num.val()+"",
                    dataType: "jsonp",
                    success: function (data) {
                        if(data.result==null){
                            address.append("<p>填写内容有错，请核实后再填写！！！</p>");
                        }
                        var len=data.result.length;
                        var num=0;
                        (function(){
                            for(var i=0;i<len;i++){
                                var len_1=data.result[i].segmentList.length;
                                for(var j=0;j<len_1;j++){
                                    num+=1;
                                    address_2.append("第"+(num)+"种情况     <p>"+data.result[i].segmentList[j].busName+"</p>");
                                }
                            }
                        })();
                    }
                }

            )

        }else{
            address_2.append("<p>内容不得为空!!!</p>");
        }
    });
});