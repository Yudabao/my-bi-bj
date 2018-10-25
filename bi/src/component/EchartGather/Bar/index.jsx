import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default class Bar extends React.Component {
  constructor() {
    super()

    this.state = {
      chartId: 'chart' + Math.random()
    }
  }

  componentDidUpdate() {
    const url = window.location.search
    if (url === '?hd') {
      this.state.hd = 2
    }
    const myChart = echarts.init(document.getElementById(this.state.chartId))
    let {verticalBar, acrossBar} = this.props
    // 绘制图表
    myChart.setOption({
      tooltip: {},
      legend: {
        right: 0,
        top: '3%',
        height: 4,
        textStyle: {
          fontSize: 18 * this.state.hd,
        },
        data: [
          {
            name: '男',
            icon: 'roundRect',
            textStyle: {
              color: '#fff'
            }
          }, {
            name: '女',
            icon: 'roundRect',
            textStyle: {
              color: '#fff'
            }
          }
        ]
      },
      grid: {
        left: verticalBar ? '12%' : '18%',
        top: verticalBar ? '20%' : '10%',
        bottom: '16%',
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: '#1b3251',
            opacity: '0.2'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 14 * this.state.hd,
        },
        minInterval: 1,
        splitLine: {
          show: !verticalBar,
          lineStyle: {
            type: 'dashed',
            opacity: '0.2'
          }
        },
        data: verticalBar ? ['<18', '18-24', '25-29', '30-34', '35-39', '40-49', '>50'] : undefined
      },
      yAxis: {
        name: verticalBar ? verticalBar.yName : undefined,
        nameTextStyle: {
          color: '#fff',
          fontSize: 14 * this.state.hd
        },
        minInterval: 1,
        axisLine: {
          lineStyle: {
            color: '#1b3251',
            opacity: '0.2'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 14 * this.state.hd,
        },
        splitLine: {
          show: !!verticalBar,
          lineStyle: {
            type: 'dashed',
            opacity: '0.2'
          }
        },
        data: verticalBar ? verticalBar.yData : ["锁房", "停电", "停水"]
      },
      series: verticalBar ?
        [
          {
            name: '男',
            data: verticalBar.seriesDataOne || [15, 12, 45],
            type: 'bar',
            stack: 'two',
            itemStyle: {color: '#00c3f4'},
            borderWidth: '40%'
          },
          {
            name: '女',
            data: verticalBar.seriesDataTwo || [10, 12, 45],
            type: 'bar',
            stack: 'two',
            itemStyle: {color: '#91f2fb'},
            borderWidth: '40%'
          },
        ] :
        {
          type: 'bar',
          barWidth: '40%',
          itemStyle: {
            color: (param) => {
              let colorList = [
                new echarts.graphic.LinearGradient(
                  0, 0, 1, 0, [
                    {offset: 0, color: '#844e0d'},
                    {offset: 1, color: '#a76a0c'}
                  ]),
                new echarts.graphic.LinearGradient(
                  0, 0, 1, 0, [
                    {offset: 0, color: '#7d771b'},
                    {offset: 1, color: '#91a532'}
                  ]),
                new echarts.graphic.LinearGradient(
                  0, 0, 1, 0, [
                    {offset: 0, color: '#068fd2'},
                    {offset: 1, color: '#16b1ac'}
                  ]),
              ]
              return colorList[param.dataIndex]
            }
          },
          data: acrossBar || [
            {name: '停水', value: 5},
            {name: '停电', value: 10},
            {name: '锁房', value: 15},
          ]
        }
    });
  }

  render() {
    return (
      <div id={this.state.chartId} style={{width: '100%', height: '100%'}}/>
    )
  }
}
