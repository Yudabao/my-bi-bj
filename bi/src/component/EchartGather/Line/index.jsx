import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default class Line extends React.Component {
  constructor() {
    super()

    this.state = {
      chartId: 'chart' + Math.random(),
      hd: 1
    }
  }

  componentDidUpdate() {

    const url = window.location.search
    if (url === '?hd') {
      this.state.hd = 2
    }
    const myChart = echarts.init(document.getElementById(this.state.chartId))
    const { singleLineObj, doubleLineObj, xLineData } = this.props
    // 绘制图表
    myChart.setOption({
      title: {
        textStyle: {
          color: '#05ded9',
          fontSize: 16 * this.state.hd
        },
        top: '3%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#05ded9'
          }
        }
      },
      grid: {
        left: this.props.shouru ? '20%' : '11%',
        top: singleLineObj ? '18%' : '20%',
        right: '4%'
      },
      legend: {
        textStyle: {
          color: '#fff'
        },
        right: '3%',
        height: 4,
        data: singleLineObj ?
          {
            name: singleLineObj.name,
            icon: 'roundRect',
            textStyle: {
              color: '#fff'
            }
          } : [
            {
              name: doubleLineObj.nameOne,
              icon: 'roundRect',
              textStyle: {
                color: '#fff',
                fontSize: 14 * this.state.hd
              }
            }, {
              name: doubleLineObj.nameTwo,
              icon: 'roundRect',
              textStyle: {
                color: '#fff',
                fontSize: 14 * this.state.hd
              }
            }
          ]
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: '#fff',
          textStyle: {
            fontSize: 14 * this.state.hd
          },
        },
        axisPointer: {
          handle: {
            show: true,
            color: '#03deab',
            size: 0
          },
        },
        data: xLineData
      },
      yAxis: {
        name: singleLineObj ? singleLineObj.yName : doubleLineObj.yName,
        nameTextStyle: {
          color: '#fff',
          fontSize: 14 * this.state.hd
        },
        axisLabel: {
          color: '#fff',
          textStyle: {
            fontSize: 14 * this.state.hd
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            opacity: '0.2'
          }
        },
      },
      series:
        singleLineObj ?
          {
            name: singleLineObj.name,
            type: 'line',
            itemStyle: {
              color: '#03deab'
            },
            label: {
              color: '#fff'
            },
            areaStyle: singleLineObj.color ? {
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0, [
                  { offset: 0, color: '#07c6a5' },
                  { offset: 1, color: '#074e54' }
                ]),
            } : null,
            data: singleLineObj.data
          } :
          [
            {
              name: doubleLineObj.nameOne,
              type: 'line',
              itemStyle: {
                color: '#01fc9c'
              },
              label: {
                color: '#fff'
              },
              data: doubleLineObj.dataOne
            },
            {
              name: doubleLineObj.nameTwo,
              type: 'line',
              itemStyle: {
                color: '#0be4f1'
              },
              lineStyle: {
                type: 'dotted'
              },
              label: {
                color: '#fff'
              },
              data: doubleLineObj.dataTwo
            },
          ]
    });

    let runTime = 0
    let xLength = 0
    if (this.chartInterval) {
      clearInterval(this.chartInterval)
    }

    this.chartInterval = setInterval(() => {
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: singleLineObj ? 0 : 1,//第几条series
        dataIndex: runTime//第几个tooltip
      })
      runTime++
      if (singleLineObj) {
        xLength  = singleLineObj.data.length - 1
      } else {
        xLength  = doubleLineObj.dataOne.length - 1
      }

      if (runTime>xLength) {
        runTime = 0
      }
    }, 3000)
  }

  render() {
    return (
      <div id={this.state.chartId} style={{ width: '100%', height: '100%' }} />
    )
  }
}
