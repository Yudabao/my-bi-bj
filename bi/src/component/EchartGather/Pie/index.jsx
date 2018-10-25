import React from 'react'
import echarts from 'echarts/lib/echarts'
import  'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default class Pie extends React.Component {
  constructor() {
    super()

    this.state = {
      chartId: 'chart' + Math.random(),
      hd:1
    }
  }

  componentDidUpdate() {
    const url = window.location.search
    if (url === '?hd') {
      this.state.hd = 2
    }
    const myChart  = echarts.init(document.getElementById(this.state.chartId))
    const {roseTypeData, pieData, outside} = this.props
    const roseTypeColor = ['#0394d1', '#028217', '#799c25', '#069089', '#834611', '#036187']
    const pieColor = ['#05584c', '#097f79', '#8fb13b',  '#a65a18']
    // 绘制图表
    myChart.setOption({
      tooltip: {},
      xAxis: {
        show: false,
      },
      color: roseTypeData ? roseTypeColor : pieColor,
      legend: {
        textStyle: {
          color: '#fff',
          fontSize: 14 * this.state.hd
        },
        orient: roseTypeData ? 'horizontal' : 'vertical',
        right: roseTypeData ? '' : '3%',
        y: roseTypeData ? undefined : 'center',

        bottom: roseTypeData ? '3%' : undefined,
        x: roseTypeData ? 'center' : undefined
      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'pie',
        labelLine: {
          length: 4,
          length2: 4,
          smooth: true
        },
        radius : roseTypeData ? '62%' : '54%',
        center : roseTypeData ? ['50%', '36%'] : ['36%', '50%'],
        label: {
          position: 'outside',
          formatter: (param) => {
            // if (param.value === 0) return ''
            if (roseTypeData) return param.value + '%'
            return param.value
          },
          fontSize: 14 * this.state.hd
        },
        data: roseTypeData ? roseTypeData : pieData,
        // roseType: roseTypeData ? 'radius' : '',
      }]
    });
  }

  render() {
    return (
      <div id={this.state.chartId} style={{width: '100%', height: '100%'}}/>
    )
  }
}
