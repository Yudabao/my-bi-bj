import React from 'react'
import echarts from 'echarts/lib/echarts'
import  'echarts/lib/chart/gauge'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default class Gauge extends React.Component {
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
    const myChart  = echarts.init(document.getElementById(this.state.chartId))
    const {gaugeData} = this.props
    // 绘制图表
    myChart.setOption({
      title: {
        text: gaugeData.text,
        bottom: 0,
        textStyle: {
          color: '#fff',
          fontSize: 12 * this.state.hd
        },
        x: 'center'
      },
      tooltip: {},
      series: [{
        type: 'gauge',
        radius: '90%',
        startAngle: 210,
        endAngle: -30,
        max: gaugeData.max,
        detail: {
          formatter:'{value}',
          fontSize: 12 * this.state.hd,
          padding: [16, 0, 0, 0],
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [[0.33, '#0dcd6d'],[0.66, '#91d012'],[1, '#c16413']],
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        pointer: {
          width: 3,
          length: '70%'
        },
        data: gaugeData.data
      }]
    });
  }

  render() {
    return (
      <div id={this.state.chartId} style={{width: '100%', height: '100%'}}/>
    )
  }
}
