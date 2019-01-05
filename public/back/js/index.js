$(function() {
  //功能1 : 柱状图
  var echarts_left = echarts.init(document.querySelector(".echarts_left"));

  var option = {
    // 大标题
    title: {
      // 标题内容
      text: "2019年注册人数"
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      data: ["人数","销量"]
    },
    // X轴对应的数据
    xAxis: {
      data: ["一月", "二月", "三月", "四月", "五月", "六月"]
    },
    // Y轴对应的数据
    yAxis: {},

    series: [
      {
        name: "人数",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
      },
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option);


  //功能2  : 饼形图
  var myChart = echarts.init(document.querySelector(".echarts_right"));

  option = {
    title : {
        text: '热门品牌销售',
        subtext: '2019年1月',
        x:'center'
    },
    //提示框组件
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    //图例
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'李宁'},
                {value:1548, name:'阿迪王'}
            ],
            itemStyle: {
              //添加阴影效果
                emphasis: {
                    shadowBlur: 100,
                    shadowOffsetX: 0,
                    shadowColor: 'yellow'
                }
            }
        }
    ]
};
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
});
